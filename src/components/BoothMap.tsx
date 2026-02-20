import { useMemo } from "react";
import type { Booth, BoothStatus } from "../types";
import { CAMPUS_LAYOUTS, GRID_COLS, GRID_ROWS } from "../data/layout";

const resolveDisplayStatus = (status?: BoothStatus) => {
  if (!status) return "UNKNOWN";
  if (!status.sales_allowed) return "STOP";
  if (status.warn_count >= 2) return "DANGER";
  if (status.warn_count === 1) return "WARNING";
  if (!status.gas_check || !status.kenshoku) return "UNCHECKED";
  return "OK";
};

const statusClassMap: Record<string, string> = {
  STOP: "tile--red",
  DANGER: "tile--orange",
  WARNING: "tile--yellow",
  UNCHECKED: "tile--gray",
  OK: "tile--green",
  UNKNOWN: "tile--gray"
};

export type BoothMapProps = {
  campus: "hon" | "e";
  booths: Booth[];
  statuses: Record<string, BoothStatus>;
  selectedId?: string | null;
  onSelect: (id: string) => void;
};

export function BoothMap({ campus, booths, statuses, selectedId, onSelect }: BoothMapProps) {
  const layout = CAMPUS_LAYOUTS[campus];

  const boothMap = useMemo(() => {
    const map = new Map<string, Booth>();
    booths.forEach((booth) => map.set(booth.yatai_id, booth));
    return map;
  }, [booths]);

  return (
    <div className="booth-map">
      <div
        className="map-canvas"
        style={{
          "--rows": GRID_ROWS,
          "--cols": GRID_COLS
        } as React.CSSProperties}
      >
        {layout.placements.map((placement) => {
          const booth = boothMap.get(placement.id);
          const status = booth ? statuses[placement.id] : undefined;
          const resolved = resolveDisplayStatus(status);
          const classes = [
            "tile",
            statusClassMap[resolved],
            selectedId === placement.id ? "tile--selected" : ""
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <button
              type="button"
              key={placement.id}
              className={classes}
              style={{
                gridRow: placement.row,
                gridColumn: placement.col
              }}
              onClick={() => onSelect(placement.id)}
              title={booth ? booth.booth_name : "未登録"}
            >
              <span className="tile__id">{placement.id}</span>
              <span className="tile__name">{booth?.booth_name ?? "未登録"}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
