const booths = {};
let currentBoothId = null;

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

function updateAllColors() {
  Object.keys(booths).forEach(updateBoothColor);
}

function bindBoothClicks(onSelect) {
  const boothElems = document.querySelectorAll(".booth");
  boothElems.forEach((elem) => {
    elem.addEventListener("click", () => {
      onSelect(elem.id);
    });
  });
}

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
