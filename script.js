// 全屋台の状態を保持するオブジェクト（B01〜B30）
const booths = {};
// 現在パネルで編集している屋台ID
let currentBoothId = null;

// B01〜B30の初期データを生成
function createBooths() {
  for (let i = 1; i <= 30; i++) {
    const id = `B${String(i).padStart(2, "0")}`;
    booths[id] = {
      status: "normal",
      checklist: [false, false, false],
      price: "",
      person: ""
    };
  }
}

// 屋台の状態に合わせて色を更新
function updateBoothColor(id) {
  const elem = document.getElementById(id);
  if (!elem) return;
  const status = booths[id].status;

  if (status === "normal") {
    elem.setAttribute("fill", "#6fc46f");
  } else {
    elem.setAttribute("fill", "#e25a5a");
  }
}

// 全屋台の色を一括更新
function updateAllColors() {
  Object.keys(booths).forEach(updateBoothColor);
}

// SVGの各屋台にクリックイベントを付与
function bindBoothClicks(onSelect) {
  const boothElems = document.querySelectorAll(".booth");
  boothElems.forEach((elem) => {
    elem.addEventListener("click", () => {
      onSelect(elem.id);
    });
  });
}

// 右側の編集パネルのイベントとデータ反映
function setupPanel() {
  const title = document.getElementById("booth-title");
  const statusSelect = document.getElementById("status");
  const checkboxes = [
    document.getElementById("check-0"),
    document.getElementById("check-1"),
    document.getElementById("check-2")
  ];
  const priceInput = document.getElementById("price");
  const personInput = document.getElementById("person");
  const saveBtn = document.getElementById("save-btn");

  // 状態変更を即時反映（保存前でも色を切り替える）
  function applyStatusChange() {
    if (!currentBoothId) return;
    booths[currentBoothId].status = statusSelect.value;
    updateBoothColor(currentBoothId);
  }

  // 指定屋台の情報をパネルに読み込む
  function loadBooth(id) {
    currentBoothId = id;
    const data = booths[id];
    title.textContent = `${id} の情報`;
    statusSelect.value = data.status;
    checkboxes.forEach((box, idx) => {
      box.checked = Boolean(data.checklist[idx]);
    });
    priceInput.value = data.price;
    personInput.value = data.person;
    saveBtn.disabled = false;
  }

  // 状態プルダウンの変更で即時色更新
  statusSelect.addEventListener("change", applyStatusChange);

  // 保存ボタン：入力内容をデータに反映し色も更新
  saveBtn.addEventListener("click", () => {
    if (!currentBoothId) return;
    const data = booths[currentBoothId];
    data.status = statusSelect.value;
    data.checklist = checkboxes.map((box) => box.checked);
    data.price = priceInput.value;
    data.person = personInput.value;

    updateBoothColor(currentBoothId);
    alert(`${currentBoothId} を保存しました`);
  });

  return loadBooth;
}

// ページ初期化処理
function init() {
  createBooths();
  // 初期表示で全屋台を通常色にセット
  document.querySelectorAll(".booth").forEach((elem) => {
    elem.setAttribute("fill", "#6fc46f");
  });
  const loadBooth = setupPanel();
  bindBoothClicks(loadBooth);
  updateAllColors();
}

document.addEventListener("DOMContentLoaded", init);
