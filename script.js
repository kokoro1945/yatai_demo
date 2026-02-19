const ADMIN_EDIT_TOKEN = "ADMIN_EDIT_TOKEN";
const STORAGE_KEY = "yatai_dashboard_status";

const yataiMaster = [
  {
    yatai_id: "A01",
    area: "A",
    org_name: "軽音楽研究会",
    booth_name: "スパイスカレー屋台",
    menu_json: JSON.stringify(["チキンカレー", "バターチキン", "ラッシー"]),
    leader_name: "佐藤 玲奈",
    leader_phone: "090-1234-5678"
  },
  {
    yatai_id: "A02",
    area: "A",
    org_name: "漫画研究会",
    booth_name: "もちもち団子",
    menu_json: JSON.stringify(["みたらし", "黒蜜きなこ", "いちご"]),
    leader_name: "高橋 悠斗",
    leader_phone: "090-9876-5432"
  },
  {
    yatai_id: "B01",
    area: "B",
    org_name: "写真部",
    booth_name: "レモネードスタンド",
    menu_json: JSON.stringify(["レモネード", "レモンスカッシュ", "ミントソーダ"]),
    leader_name: "小林 葵",
    leader_phone: "080-2222-3333"
  },
  {
    yatai_id: "B02",
    area: "B",
    org_name: "茶道部",
    booth_name: "抹茶たい焼き",
    menu_json: JSON.stringify(["抹茶たい焼き", "ほうじ茶ラテ", "白玉ぜんざい"]),
    leader_name: "松田 颯",
    leader_phone: "080-4444-5555"
  },
  {
    yatai_id: "C01",
    area: "C",
    org_name: "ダンスサークル",
    booth_name: "ガーリックシュリンプ",
    menu_json: JSON.stringify(["シュリンプ", "ライスボウル", "ハーブティー"]),
    leader_name: "田中 美空",
    leader_phone: "070-1111-2222"
  },
  {
    yatai_id: "C02",
    area: "C",
    org_name: "天文研究会",
    booth_name: "星空クレープ",
    menu_json: JSON.stringify(["チョコバナナ", "ストロベリー", "月見クレープ"]),
    leader_name: "斉藤 誠",
    leader_phone: "070-3333-4444"
  }
];

const defaultStatus = {
  warn_count: 0,
  kenshoku: 1,
  gas_check: 1,
  sales_allowed: 1,
  memo_today: "",
  updated_at: new Date().toISOString(),
  updated_by: "本部 初期" 
};

let statusStore = {};
let currentId = null;

const elements = {
  grid: document.getElementById("yatai-grid"),
  search: document.getElementById("search"),
  areaFilter: document.getElementById("area-filter"),
  totalCount: document.getElementById("total-count"),
  lastUpdated: document.getElementById("last-updated"),
  detailSubtitle: document.getElementById("detail-subtitle"),
  detailStatus: document.getElementById("detail-status"),
  detailId: document.getElementById("detail-id"),
  detailArea: document.getElementById("detail-area"),
  detailOrg: document.getElementById("detail-org"),
  detailBooth: document.getElementById("detail-booth"),
  detailMenu: document.getElementById("detail-menu"),
  detailLeader: document.getElementById("detail-leader"),
  detailPhone: document.getElementById("detail-phone"),
  detailWarn: document.getElementById("detail-warn"),
  detailKenshoku: document.getElementById("detail-kenshoku"),
  detailGas: document.getElementById("detail-gas"),
  detailSales: document.getElementById("detail-sales"),
  detailMemo: document.getElementById("detail-memo"),
  detailUpdated: document.getElementById("detail-updated"),
  adminToken: document.getElementById("admin-token"),
  adminForm: document.getElementById("admin-form"),
  warnCount: document.getElementById("warn-count"),
  kenshoku: document.getElementById("kenshoku"),
  gasCheck: document.getElementById("gas-check"),
  salesAllowed: document.getElementById("sales-allowed"),
  memo: document.getElementById("memo"),
  updatedBy: document.getElementById("updated-by")
};

function loadStatusStore() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return;
  try {
    statusStore = JSON.parse(raw);
  } catch (error) {
    console.warn("status store parse failed", error);
  }
}

function saveStatusStore() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(statusStore));
}

function getStatus(id) {
  return {
    ...defaultStatus,
    ...(statusStore[id] || {})
  };
}

function getStatusClass(status) {
  if (status.gas_check === 0 || status.kenshoku === 0) return "gray";
  if (status.sales_allowed === 0) return "red";
  if (status.warn_count >= 2) return "orange";
  if (status.warn_count === 1) return "yellow";
  return "green";
}

function getStatusLabel(status) {
  if (status.gas_check === 0 || status.kenshoku === 0) return "確認未完了";
  if (status.sales_allowed === 0) return "販売停止";
  if (status.warn_count >= 2) return "警告2以上";
  if (status.warn_count === 1) return "警告1";
  return "正常";
}

function formatDate(value) {
  if (!value) return "--";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function renderGrid() {
  const keyword = elements.search.value.trim().toLowerCase();
  const area = elements.areaFilter.value;

  const filtered = yataiMaster.filter((item) => {
    const matchesArea = area === "all" || item.area === area;
    const matchesKeyword = [
      item.yatai_id,
      item.org_name,
      item.booth_name
    ].some((text) => text.toLowerCase().includes(keyword));
    return matchesArea && matchesKeyword;
  });

  elements.grid.innerHTML = "";
  filtered.forEach((item, index) => {
    const status = getStatus(item.yatai_id);
    const statusClass = getStatusClass(status);
    const card = document.createElement("article");
    card.className = `card card--${statusClass}`;
    card.style.animationDelay = `${index * 0.03}s`;
    card.innerHTML = `
      <span class="card__tag">${item.area}エリア</span>
      <h3 class="card__title">${item.booth_name}</h3>
      <p class="card__subtitle">${item.org_name}</p>
      <div class="card__meta">
        <span>${item.yatai_id}</span>
        <span>${getStatusLabel(status)}</span>
      </div>
    `;
    card.addEventListener("click", () => selectYatai(item.yatai_id));
    elements.grid.appendChild(card);
  });

  elements.totalCount.textContent = `${filtered.length}件 / 全${yataiMaster.length}件`;
  elements.lastUpdated.textContent = formatDate(getLatestUpdated());
}

function getLatestUpdated() {
  const dates = yataiMaster.map((item) => getStatus(item.yatai_id).updated_at);
  const valid = dates
    .map((value) => new Date(value).getTime())
    .filter((value) => !Number.isNaN(value));
  if (!valid.length) return null;
  return new Date(Math.max(...valid)).toISOString();
}

function selectYatai(id) {
  currentId = id;
  const item = yataiMaster.find((yatai) => yatai.yatai_id === id);
  if (!item) return;
  const status = getStatus(id);
  elements.detailSubtitle.textContent = `${item.booth_name} (${item.yatai_id})`;
  elements.detailStatus.textContent = getStatusLabel(status);
  elements.detailStatus.className = `status-chip status-chip--${getStatusClass(status)}`;
  elements.detailId.textContent = item.yatai_id;
  elements.detailArea.textContent = item.area;
  elements.detailOrg.textContent = item.org_name;
  elements.detailBooth.textContent = item.booth_name;
  elements.detailLeader.textContent = item.leader_name;
  elements.detailPhone.textContent = item.leader_phone;

  elements.detailMenu.innerHTML = "";
  const menu = JSON.parse(item.menu_json || "[]");
  menu.forEach((entry) => {
    const li = document.createElement("li");
    li.textContent = entry;
    elements.detailMenu.appendChild(li);
  });

  elements.detailWarn.textContent = `${status.warn_count}件`;
  elements.detailKenshoku.textContent = status.kenshoku ? "完了" : "未完了";
  elements.detailGas.textContent = status.gas_check ? "完了" : "未完了";
  elements.detailSales.textContent = status.sales_allowed ? "販売可" : "販売停止";
  elements.detailMemo.textContent = status.memo_today || "--";
  elements.detailUpdated.textContent = `${formatDate(status.updated_at)} / ${status.updated_by}`;

  elements.warnCount.value = status.warn_count;
  elements.kenshoku.value = String(status.kenshoku);
  elements.gasCheck.value = String(status.gas_check);
  elements.salesAllowed.value = String(status.sales_allowed);
  elements.memo.value = status.memo_today;
  elements.updatedBy.value = status.updated_by;

  renderGrid();
}

function handleAdminToken() {
  const allowed = elements.adminToken.value === ADMIN_EDIT_TOKEN;
  elements.adminForm.hidden = !allowed;
}

function handleAdminSubmit(event) {
  event.preventDefault();
  if (!currentId) return;
  if (elements.adminToken.value !== ADMIN_EDIT_TOKEN) return;

  statusStore[currentId] = {
    warn_count: Number(elements.warnCount.value),
    kenshoku: Number(elements.kenshoku.value),
    gas_check: Number(elements.gasCheck.value),
    sales_allowed: Number(elements.salesAllowed.value),
    memo_today: elements.memo.value.trim(),
    updated_at: new Date().toISOString(),
    updated_by: elements.updatedBy.value.trim() || "本部"
  };

  saveStatusStore();
  selectYatai(currentId);
}

function init() {
  loadStatusStore();
  renderGrid();

  elements.search.addEventListener("input", renderGrid);
  elements.areaFilter.addEventListener("change", renderGrid);
  elements.adminToken.addEventListener("input", handleAdminToken);
  elements.adminForm.addEventListener("submit", handleAdminSubmit);

  selectYatai(yataiMaster[0].yatai_id);
}

document.addEventListener("DOMContentLoaded", init);
