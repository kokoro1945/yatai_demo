import { useEffect, useMemo, useState } from "react";
import { supabase } from "./lib/supabase";
import { BoothMap } from "./components/BoothMap";
import { StatusLegend } from "./components/StatusLegend";
import { CAMPUS_LAYOUTS } from "./data/layout";
import type { Booth, BoothStatus } from "./types";
import "./App.css";

const ROLE_LABELS: Record<string, string> = {
  ADMIN: "本部（ADMIN）",
  LEAD: "巡回リーダー（LEAD）",
  PATROL: "巡回（PATROL）"
};

type Profile = {
  id: string;
  role: string | null;
  area: string | null;
};

type BoothRow = {
  yatai_id: string;
  area: string | null;
  booth_no: number | null;
  booth_name: string | null;
  org_name: string | null;
  sponsor_flag: boolean | null;
};

type BoothStatusRow = {
  yatai_id: string;
  warn_count: number | null;
  kenshoku: boolean | null;
  gas_check: boolean | null;
  sales_allowed: boolean | null;
};

const normalizeId = (id: string) => id.replace(/([A-Z])0+(\d+)/, "$1$2");

const createDefaultStatuses = (booths: Booth[]) => {
  const statuses: Record<string, BoothStatus> = {};
  booths.forEach((booth) => {
    statuses[booth.yatai_id] = {
      yatai_id: booth.yatai_id,
      warn_count: 0,
      kenshoku: true,
      gas_check: true,
      sales_allowed: true
    };
  });
  return statuses;
};

const mergeStatusRow = (prev: Record<string, BoothStatus>, row: BoothStatusRow | null) => {
  if (!row) return prev;
  const id = normalizeId(row.yatai_id);
  return {
    ...prev,
    [id]: {
      yatai_id: id,
      warn_count: row.warn_count ?? 0,
      kenshoku: row.kenshoku ?? false,
      gas_check: row.gas_check ?? false,
      sales_allowed: row.sales_allowed ?? false
    }
  };
};

const statusLabel = (status?: BoothStatus) => {
  if (!status) return "未登録";
  if (!status.sales_allowed) return "販売停止";
  if (status.warn_count >= 2) return "警告2以上";
  if (status.warn_count === 1) return "警告1";
  if (!status.gas_check || !status.kenshoku) return "確認未完了";
  return "正常";
};

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [dataError, setDataError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [campus, setCampus] = useState<"hon" | "e">("hon");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [booths, setBooths] = useState<Booth[]>([]);
  const [statuses, setStatuses] = useState<Record<string, BoothStatus>>({});
  const [dataLoading, setDataLoading] = useState(false);

  const roleLabel = useMemo(() => {
    if (!profile?.role) return "未設定";
    return ROLE_LABELS[profile.role] ?? profile.role;
  }, [profile]);

  const campusAreas = CAMPUS_LAYOUTS[campus].areas.join(" / ");

  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getSession();
      const session = data.session;
      setUserId(session?.user.id ?? null);
      if (session?.user.id) {
        await fetchProfile(session.user.id);
        await fetchBoothData();
        subscribeToStatus();
      }
      setLoading(false);
    };

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setUserId(session?.user.id ?? null);
        if (session?.user.id) {
          await fetchProfile(session.user.id);
          await fetchBoothData();
          subscribeToStatus();
        } else {
          setProfile(null);
          setBooths([]);
          setStatuses({});
          unsubscribeFromStatus();
        }
      }
    );

    init();

    return () => {
      authListener.subscription.unsubscribe();
      unsubscribeFromStatus();
    };
  }, []);

  useEffect(() => {
    if (!selectedId && booths.length > 0) {
      setSelectedId(booths[0].yatai_id);
    }
  }, [booths, selectedId]);

  let statusChannel: ReturnType<typeof supabase.channel> | null = null;

  const subscribeToStatus = () => {
    if (statusChannel) return;
    statusChannel = supabase
      .channel("booth-status-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "booth_status" },
        (payload) => {
          const row = payload.new as BoothStatusRow | null;
          if (payload.eventType === "DELETE") {
            const oldRow = payload.old as BoothStatusRow | null;
            if (!oldRow) return;
            const id = normalizeId(oldRow.yatai_id);
            setStatuses((prev) => {
              const next = { ...prev };
              delete next[id];
              return next;
            });
            return;
          }
          setStatuses((prev) => mergeStatusRow(prev, row));
        }
      )
      .subscribe();
  };

  const unsubscribeFromStatus = () => {
    if (statusChannel) {
      supabase.removeChannel(statusChannel);
      statusChannel = null;
    }
  };

  const fetchProfile = async (id: string) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("id, role, area")
      .eq("id", id)
      .maybeSingle();

    if (error) {
      setAuthError(`profiles 取得エラー: ${error.message}`);
      setProfile(null);
      return;
    }

    setProfile(data ?? null);
  };

  const fetchBoothData = async () => {
    setDataLoading(true);
    setDataError(null);

    const { data: boothRows, error: boothError } = await supabase
      .from("booths")
      .select("yatai_id, area, booth_no, booth_name, org_name, sponsor_flag")
      .order("booth_no", { ascending: true });

    if (boothError) {
      setDataError(`booths 取得エラー: ${boothError.message}`);
      setDataLoading(false);
      return;
    }

    const normalizedBooths: Booth[] = (boothRows as BoothRow[]).map((row) => ({
      yatai_id: normalizeId(row.yatai_id),
      area: row.area ?? "",
      booth_no: row.booth_no ?? undefined,
      booth_name: row.booth_name ?? "未登録",
      org_name: row.org_name ?? undefined,
      sponsor_flag: row.sponsor_flag ?? undefined
    }));

    const { data: statusRows, error: statusError } = await supabase
      .from("booth_status")
      .select("yatai_id, warn_count, kenshoku, gas_check, sales_allowed");

    if (statusError) {
      setDataError(`booth_status 取得エラー: ${statusError.message}`);
      setDataLoading(false);
      return;
    }

    const statusMap: Record<string, BoothStatus> = createDefaultStatuses(normalizedBooths);
    (statusRows as BoothStatusRow[]).forEach((row) => {
      const id = normalizeId(row.yatai_id);
      statusMap[id] = {
        yatai_id: id,
        warn_count: row.warn_count ?? 0,
        kenshoku: row.kenshoku ?? false,
        gas_check: row.gas_check ?? false,
        sales_allowed: row.sales_allowed ?? false
      };
    });

    setBooths(normalizedBooths);
    setStatuses(statusMap);
    setDataLoading(false);
  };

  const handleSignIn = async (event: React.FormEvent) => {
    event.preventDefault();
    setAuthError(null);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      setAuthError(error.message);
    }
  };

  const handleSignOut = async () => {
    setAuthError(null);
    await supabase.auth.signOut();
  };

  const selectedBooth = booths.find((booth) => booth.yatai_id === selectedId) ?? null;
  const selectedStatus = selectedId ? statuses[selectedId] : undefined;

  if (loading) {
    return (
      <div className="app">
        <div className="card">
          <h1>屋台部ダッシュボード</h1>
          <p>読み込み中...</p>
        </div>
      </div>
    );
  }

  if (!userId) {
    return (
      <div className="app">
        <div className="card">
          <h1>屋台部ダッシュボード</h1>
          <p className="muted">ログインが必要です。</p>
          <form onSubmit={handleSignIn} className="form">
            <label className="field">
              <span>Email</span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="example@example.com"
                required
              />
            </label>
            <label className="field">
              <span>Password</span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="********"
                required
              />
            </label>
            {authError && <div className="error">{authError}</div>}
            <button type="submit">ログイン</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="app dashboard">
      <header className="header">
        <div>
          <h1>屋台部ダッシュボード</h1>
          <p className="muted">ログイン済み</p>
        </div>
        <button type="button" onClick={handleSignOut}>
          ログアウト
        </button>
      </header>

      <section className="panel">
        <h2>ユーザー情報</h2>
        <div className="profile">
          <div>
            <span className="label">ユーザーID</span>
            <span>{userId}</span>
          </div>
          <div>
            <span className="label">ロール</span>
            <span>{roleLabel}</span>
          </div>
          <div>
            <span className="label">担当エリア</span>
            <span>{profile?.area ?? "未設定"}</span>
          </div>
        </div>
        {authError && <div className="error">{authError}</div>}
      </section>

      <section className="panel">
        <div className="panel__header">
          <div>
            <h2>屋台マップ</h2>
            <p className="muted">対象エリア: {campusAreas}</p>
          </div>
          <div className="campus-tabs" role="tablist" aria-label="キャンパス切替">
            <button
              className={`tab ${campus === "hon" ? "is-active" : ""}`}
              type="button"
              role="tab"
              aria-selected={campus === "hon"}
              onClick={() => setCampus("hon")}
            >
              本キャン
            </button>
            <button
              className={`tab ${campus === "e" ? "is-active" : ""}`}
              type="button"
              role="tab"
              aria-selected={campus === "e"}
              onClick={() => setCampus("e")}
            >
              Eキャン
            </button>
          </div>
        </div>

        <StatusLegend />

        {dataLoading && <p className="muted">屋台データを取得中...</p>}
        {dataError && <div className="error">{dataError}</div>}

        {!dataLoading && !dataError && booths.length > 0 && (
          <div className="map-layout">
            <BoothMap
              campus={campus}
              booths={booths}
              statuses={statuses}
              selectedId={selectedId}
              onSelect={(id) => setSelectedId(id)}
            />
            <div className="detail">
              <div className="detail__header">
                <div>
                  <h3>屋台詳細</h3>
                  <p className="muted">{selectedBooth?.booth_name ?? "未選択"}</p>
                </div>
                <span className="status-chip">{statusLabel(selectedStatus)}</span>
              </div>
              <div className="detail__body">
                <div className="detail__row">
                  <span className="label">屋台番号</span>
                  <span>{selectedBooth?.yatai_id ?? "--"}</span>
                </div>
                <div className="detail__row">
                  <span className="label">エリア</span>
                  <span>{selectedBooth?.area ?? "--"}</span>
                </div>
                <div className="detail__row">
                  <span className="label">団体名</span>
                  <span>{selectedBooth?.org_name ?? "--"}</span>
                </div>
                <div className="detail__row">
                  <span className="label">警告</span>
                  <span>{selectedStatus?.warn_count ?? 0}件</span>
                </div>
                <div className="detail__row">
                  <span className="label">検食</span>
                  <span>{selectedStatus?.kenshoku ? "完了" : "未完了"}</span>
                </div>
                <div className="detail__row">
                  <span className="label">ガス</span>
                  <span>{selectedStatus?.gas_check ? "完了" : "未完了"}</span>
                </div>
                <div className="detail__row">
                  <span className="label">販売可否</span>
                  <span>{selectedStatus?.sales_allowed ? "販売可" : "販売停止"}</span>
                </div>
              </div>
              <div className="detail__footer">
                <button type="button" disabled>
                  停止/解除（次ステップ）
                </button>
              </div>
            </div>
          </div>
        )}

        {!dataLoading && !dataError && booths.length === 0 && (
          <p className="muted">屋台データがありません。</p>
        )}
      </section>
    </div>
  );
}

export default App;
