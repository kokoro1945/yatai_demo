import { GRID_ROWS, GRID_COLS, CAMPUS_LAYOUTS } from "./data/layout.js";
import { yataiMaster } from "./data/yataiData.js";

const ADMIN_EDIT_TOKEN = "ADMIN_EDIT_TOKEN";
const STORAGE_KEY = "yatai_dashboard_status";

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
let currentCampus = "hon";

const elements = {
  map: document.getElementById("booth-map"),
  canvas: document.getElementById("map-canvas"),
  tabHon: document.getElementById("tab-hon"),
  tabE: document.getElementById("tab-e"),
  search: document.getElementById("search"),
  areaFilter: document.getElementById("area-filter"),
  statusFilter: document.getElementById("status-filter"),
  totalCount: document.getElementById("total-count"),
  lastUpdated: document.getElementById("last-updated"),
  areaCount: document.getElementById("area-count"),
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

const detailElements = [
  "detailSubtitle",
  "detailStatus",
  "detailId",
  "detailArea",
  "detailOrg",
  "detailBooth",
  "detailMenu",
  "detailLeader",
  "detailPhone",
  "detailWarn",
  "detailKenshoku",
  "detailGas",
  "detailSales",
  "detailMemo",
  "detailUpdated",
  "adminToken",
  "adminForm",
  "warnCount",
  "kenshoku",
  "gasCheck",
  "salesAllowed",
  "memo",
  "updatedBy"
];

function hasDetailPanel() {
  return detailElements.every((key) => elements[key]);
}

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

function resolveDisplayStatus(status) {
  if (!status) return "UNKNOWN";
  if (status.sales_allowed === 0) return "STOP";
  if (status.warn_count >= 2) return "DANGER";
  if (status.warn_count === 1) return "WARNING";
  if (status.gas_check === 0 || status.kenshoku === 0) return "UNCHECKED";
  return "OK";
}

function getStatusClass(status) {
  const resolved = resolveDisplayStatus(status);
  switch (resolved) {
    case "STOP":
      return "red";
    case "DANGER":
      return "orange";
    case "WARNING":
      return "yellow";
    case "UNCHECKED":
      return "gray";
    case "OK":
      return "green";
    default:
      return "gray";
  }
}

function getStatusLabel(status) {
  const resolved = resolveDisplayStatus(status);
  switch (resolved) {
    case "STOP":
      return "販売停止";
    case "DANGER":
      return "警告2以上";
    case "WARNING":
      return "警告1";
    case "UNCHECKED":
      return "確認未完了";
    case "OK":
      return "正常";
    default:
      return "未登録";
  }
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

function matchesFilters(item, status) {
  const keyword = elements.search.value.trim().toLowerCase();
  const area = elements.areaFilter.value;
  const statusFilter = elements.statusFilter.value;
  const campusAreas = CAMPUS_LAYOUTS[currentCampus].areas;

  const inCampus = campusAreas.includes(item.area);
  const matchesArea = area === "all" || item.area === area;
  const matchesKeyword = [
    item.yatai_id,
    item.org_name,
    item.booth_name
  ].some((text) => text.toLowerCase().includes(keyword));
  const statusKey = resolveDisplayStatus(status);
  const matchesStatus = statusFilter === "all" || statusKey === statusFilter;

  return inCampus && matchesArea && matchesKeyword && matchesStatus;
}

function renderMap() {
  elements.canvas.innerHTML = "";
  const campus = CAMPUS_LAYOUTS[currentCampus];
  elements.canvas.style.setProperty("--rows", GRID_ROWS);
  elements.canvas.style.setProperty("--cols", GRID_COLS);

  campus.placements.forEach((placement, index) => {
    const item = yataiMaster.find((yatai) => yatai.yatai_id === placement.id);
    const status = item ? getStatus(placement.id) : null;
    const tile = document.createElement("div");
    tile.className = `tile tile--${getStatusClass(status)}`;
    tile.style.gridRow = placement.row;
    tile.style.gridColumn = placement.col;

    if (!item) {
      tile.classList.add("tile--disabled");
    }

    if (item && !matchesFilters(item, status)) {
      tile.classList.add("tile--hidden");
    }

    if (currentId === placement.id) {
      tile.classList.add("tile--selected");
    }

    tile.innerHTML = `
      <div class="tile__id">${placement.id}</div>
      <div class="tile__name">${item ? item.booth_name : "未登録"}</div>
      <div class="tile__org">${item ? item.org_name : ""}</div>
    `;

    if (item) {
      tile.title = `${item.booth_name} / ${getStatusLabel(status)}`;
      tile.addEventListener("click", () => selectYatai(placement.id));
    }

    elements.canvas.appendChild(tile);
  });

  const campusAreas = CAMPUS_LAYOUTS[currentCampus].areas;
  const campusItems = yataiMaster.filter((item) => campusAreas.includes(item.area));
  const visibleCount = campusItems.filter((item) => matchesFilters(item, getStatus(item.yatai_id))).length;
  elements.totalCount.textContent = `${visibleCount}件 / 全${campusItems.length}件`;
  elements.lastUpdated.textContent = formatDate(getLatestUpdated());
}

function getLatestUpdated() {
  const campusAreas = CAMPUS_LAYOUTS[currentCampus].areas;
  const dates = yataiMaster
    .filter((item) => campusAreas.includes(item.area))
    .map((item) => getStatus(item.yatai_id).updated_at);
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
  if (!hasDetailPanel()) {
    renderMap();
    return;
  }
  const status = getStatus(id);
  elements.detailSubtitle.textContent = `${item.booth_name} (${item.yatai_id})`;
  elements.detailStatus.textContent = getStatusLabel(status);
  elements.detailStatus.className = `status-chip status-chip--${getStatusClass(status)}`;
  elements.detailId.textContent = item.yatai_id;
  elements.detailArea.textContent = item.area;
  elements.detailOrg.textContent = item.org_name || "--";
  elements.detailBooth.textContent = item.booth_name;
  elements.detailLeader.textContent = item.leader_name || "--";
  elements.detailPhone.textContent = item.leader_phone || "--";

  elements.detailMenu.innerHTML = "";
  const menu = JSON.parse(item.menu_json || "[]");
  if (!menu.length) {
    const li = document.createElement("li");
    li.textContent = "未登録";
    elements.detailMenu.appendChild(li);
  } else {
    menu.forEach((entry) => {
      const li = document.createElement("li");
      li.textContent = entry;
      elements.detailMenu.appendChild(li);
    });
  }

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

  renderMap();
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

function setCampus(next) {
  if (!CAMPUS_LAYOUTS[next]) return;
  currentCampus = next;
  elements.tabHon.classList.toggle("is-active", next === "hon");
  elements.tabE.classList.toggle("is-active", next === "e");
  elements.tabHon.setAttribute("aria-selected", String(next === "hon"));
  elements.tabE.setAttribute("aria-selected", String(next === "e"));
  elements.areaFilter.value = "all";
  elements.areaCount.textContent = CAMPUS_LAYOUTS[currentCampus].areas.join(" / ");
  renderMap();
}

function init() {
  loadStatusStore();
  elements.areaCount.textContent = CAMPUS_LAYOUTS[currentCampus].areas.join(" / ");
  renderMap();

  elements.search.addEventListener("input", renderMap);
  elements.areaFilter.addEventListener("change", renderMap);
  elements.statusFilter.addEventListener("change", renderMap);
  if (elements.adminToken) {
    elements.adminToken.addEventListener("input", handleAdminToken);
  }
  if (elements.adminForm) {
    elements.adminForm.addEventListener("submit", handleAdminSubmit);
  }
  elements.tabHon.addEventListener("click", () => setCampus("hon"));
  elements.tabE.addEventListener("click", () => setCampus("e"));

  if (yataiMaster.length) {
    selectYatai(yataiMaster[0].yatai_id);
  }
}

document.addEventListener("DOMContentLoaded", init);
