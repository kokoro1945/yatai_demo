export const GRID_ROWS = 12;
export const GRID_COLS = 37;
export const ROWS = "abcdefghijkl";

const rangeIds = (prefix, start, end) => {
  const ids = [];
  for (let i = start; i <= end; i += 1) {
    ids.push(`${prefix}${i}`);
  }
  return ids;
};

const parseCell = (cell) => {
  const rowChar = cell[0].toLowerCase();
  const col = Number(cell.slice(1));
  const row = ROWS.indexOf(rowChar) + 1;
  return { row, col };
};

const buildPlacements = (ranges) => {
  const placements = [];
  ranges.forEach(({ start, end, ids }) => {
    const s = parseCell(start);
    const e = parseCell(end);
    const rowStep = s.row === e.row ? 0 : s.row < e.row ? 1 : -1;
    const colStep = s.col === e.col ? 0 : s.col < e.col ? 1 : -1;
    let row = s.row;
    let col = s.col;
    ids.forEach((id) => {
      placements.push({ id, row, col });
      if (rowStep !== 0) row += rowStep;
      if (colStep !== 0) col += colStep;
    });
  });
  return placements;
};

export const CAMPUS_LAYOUTS = {
  hon: {
    name: "本キャン",
    areas: ["A", "B", "C", "D", "E", "F"],
    placements: buildPlacements([
      { start: "a3", end: "a12", ids: rangeIds("A", 1, 10) },
      { start: "a2", end: "j2", ids: rangeIds("B", 1, 10) },
      { start: "a1", end: "j1", ids: rangeIds("C", 1, 10) },
      { start: "j3", end: "j12", ids: rangeIds("D", 1, 10) },
      { start: "j13", end: "j25", ids: rangeIds("E", 1, 13) },
      { start: "j26", end: "j37", ids: rangeIds("F", 1, 12) }
    ])
  },
  e: {
    name: "Eキャン",
    areas: ["G", "H", "I", "J", "K", "L"],
    placements: buildPlacements([
      { start: "l1", end: "l6", ids: rangeIds("G", 1, 6) },
      { start: "k1", end: "k5", ids: rangeIds("H", 1, 5) },
      { start: "l7", end: "l15", ids: rangeIds("I", 1, 9) },
      { start: "k15", end: "g15", ids: rangeIds("J", 1, 5) },
      { start: "l16", end: "a16", ids: rangeIds("K", 1, 12) },
      { start: "a17", end: "a31", ids: rangeIds("L", 1, 15) }
    ])
  }
};
