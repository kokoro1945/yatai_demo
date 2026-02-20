const ADMIN_EDIT_TOKEN = "ADMIN_EDIT_TOKEN";
const STORAGE_KEY = "yatai_dashboard_status";

const CAMPUS_LAYOUTS = {
  hon: {
    name: "本キャン",
    width: 820,
    height: 320,
    areas: {
      A: { direction: "row", ids: ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10"], x: 120, y: 10, width: 560 },
      B: { direction: "col", ids: ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10"], x: 120, y: 90, width: 120 },
      C: { direction: "col", ids: ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10"], x: 10, y: 10, width: 120 },
      D: { direction: "row", ids: ["D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "D10"], x: 120, y: 190, width: 680 }
    }
  },
  e: {
    name: "Eキャン",
    width: 900,
    height: 360,
    areas: {
      L: { direction: "row", ids: ["L1", "L2", "L3", "L4", "L5", "L6", "L7", "L8", "L9", "L10", "L11", "L12", "L13", "L14", "L15"], x: 200, y: 10, width: 640 },
      I: { direction: "col", ids: ["I1", "I2", "I3", "I4", "I5", "I6", "I7", "I8", "I9"], x: 200, y: 90, width: 120 },
      F: { direction: "row", ids: ["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12"], x: 320, y: 140, width: 520 },
      E: { direction: "row", ids: ["E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9", "E10", "E11", "E12", "E13"], x: 320, y: 210, width: 560 },
      H: { direction: "row", ids: ["H1", "H2", "H3", "H4", "H5"], x: 40, y: 230, width: 220 },
      G: { direction: "row", ids: ["G1", "G2", "G3", "G4", "G5", "G6"], x: 40, y: 280, width: 260 },
      J: { direction: "row", ids: ["J1", "J2", "J3", "J4", "J5"], x: 520, y: 80, width: 260 },
      K: { direction: "row", ids: ["K1", "K2", "K3", "K4", "K5", "K6", "K7", "K8", "K9", "K10", "K11", "K12"], x: 580, y: 110, width: 320 }
    }
  }
};

const yataiMaster = [
  {
    yatai_id: "A1",
    area: "A",
    org_name: "",
    booth_name: "GGクロッフル",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "A2",
    area: "A",
    org_name: "",
    booth_name: "ジャンボフランクフルト",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "A3",
    area: "A",
    org_name: "",
    booth_name: "花より団子",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "A4",
    area: "A",
    org_name: "",
    booth_name: "トッポギハウス",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "A5",
    area: "A",
    org_name: "",
    booth_name: "フランク信江❤️",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "A6",
    area: "A",
    org_name: "",
    booth_name: "近響が奏でるベビーカステるん",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "A7",
    area: "A",
    org_name: "",
    booth_name: "たこせん屋",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "A8",
    area: "A",
    org_name: "",
    booth_name: "ローバー焼き鳥",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "A9",
    area: "A",
    org_name: "",
    booth_name: "510雑貨店",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "A10",
    area: "A",
    org_name: "",
    booth_name: "土木のおいも",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "B1",
    area: "B",
    org_name: "",
    booth_name: "覇王樹座たこ焼きぶ",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "B2",
    area: "B",
    org_name: "",
    booth_name: "フェスチキ",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "B3",
    area: "B",
    org_name: "",
    booth_name: "布施ラボ スイーツ部",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "B4",
    area: "B",
    org_name: "",
    booth_name: "つっちーの激うまミニ揚げパン",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "B5",
    area: "B",
    org_name: "",
    booth_name: "陶龍包",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "B6",
    area: "B",
    org_name: "",
    booth_name: "瞬たこFLASH",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "B7",
    area: "B",
    org_name: "",
    booth_name: "爆裂⭐ ️ポップ道",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "B8",
    area: "B",
    org_name: "",
    booth_name: "ふみちゃんのポップコーン畑",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "B9",
    area: "B",
    org_name: "",
    booth_name: "川村ゼミプロデュースパリパリウインナー",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "B10",
    area: "B",
    org_name: "",
    booth_name: "行列のできる渡辺フランクフルト",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "C1",
    area: "C",
    org_name: "",
    booth_name: "トリカワ",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "C2",
    area: "C",
    org_name: "",
    booth_name: "あるま de たまごせんべい",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "C3",
    area: "C",
    org_name: "",
    booth_name: "箏林堂",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "C4",
    area: "C",
    org_name: "",
    booth_name: "熱三明治男",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "C5",
    area: "C",
    org_name: "",
    booth_name: "林ゼミのあったか1杯",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "C6",
    area: "C",
    org_name: "",
    booth_name: "サイクルドッグ",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "C7",
    area: "C",
    org_name: "",
    booth_name: "肉とは",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "C8",
    area: "C",
    org_name: "",
    booth_name: "近フル",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "C9",
    area: "C",
    org_name: "",
    booth_name: "つるっとわかめうどん",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "C10",
    area: "C",
    org_name: "",
    booth_name: "ゆず風味牛すじうどん",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "D1",
    area: "D",
    org_name: "",
    booth_name: "ギョギョそば〜魚の音読みはウォウォ〜",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "D2",
    area: "D",
    org_name: "",
    booth_name: "能登のよみがえりトート",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "D3",
    area: "D",
    org_name: "",
    booth_name: "大人の屋台",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "D4",
    area: "D",
    org_name: "",
    booth_name: "金さんの韓国おでん",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "D5",
    area: "D",
    org_name: "",
    booth_name: "酸いも甘イモ〜青春味〜",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "D6",
    area: "D",
    org_name: "",
    booth_name: "焼きとりさ",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "D7",
    area: "D",
    org_name: "",
    booth_name: "石村よりたいを込めて",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "D8",
    area: "D",
    org_name: "",
    booth_name: "福岡製麺",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "D9",
    area: "D",
    org_name: "",
    booth_name: "イカ焼き研究所",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "D10",
    area: "D",
    org_name: "",
    booth_name: "アゲアゲ↑↑パンっ！！スターズ⭐ ️",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "E1",
    area: "E",
    org_name: "",
    booth_name: "もっふるん♪",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "E2",
    area: "E",
    org_name: "",
    booth_name: "ふらっとフランクフルト",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "E3",
    area: "E",
    org_name: "",
    booth_name: "もちるんとん",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "E4",
    area: "E",
    org_name: "",
    booth_name: "うまそうなもんやっ豚汁",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "E5",
    area: "E",
    org_name: "",
    booth_name: "ホルモンクエソバ",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "E6",
    area: "E",
    org_name: "",
    booth_name: "JAGAR HITODSHI⭐ ️#じゃがバタ界隈",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "E7",
    area: "E",
    org_name: "",
    booth_name: "潜水食堂ソーキそば",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "E8",
    area: "E",
    org_name: "",
    booth_name: "はしまきのはまーず",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "E9",
    area: "E",
    org_name: "",
    booth_name: "あったか〜いはらパインパンケーキ",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "E10",
    area: "E",
    org_name: "",
    booth_name: "フランクフルト屋さん",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "E11",
    area: "E",
    org_name: "",
    booth_name: "ブロッ子特製ベビーカステラ",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "E12",
    area: "E",
    org_name: "",
    booth_name: "ガラス造形ゼミ",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "E13",
    area: "E",
    org_name: "",
    booth_name: "二刀流蛸焼き",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "F1",
    area: "F",
    org_name: "",
    booth_name: "宇宙 de シチュー営業中",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "F2",
    area: "F",
    org_name: "",
    booth_name: "錦起文藝",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "F3",
    area: "F",
    org_name: "",
    booth_name: "電研バーガー",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "F4",
    area: "F",
    org_name: "",
    booth_name: "布施ラボ コスメ開発部",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "F5",
    area: "F",
    org_name: "",
    booth_name: "さとしのポップコーン",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "F6",
    area: "F",
    org_name: "",
    booth_name: "Airうどん",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "F7",
    area: "F",
    org_name: "",
    booth_name: "ギョーザマン〜ドリンを添えて〜",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "F8",
    area: "F",
    org_name: "",
    booth_name: "チュロス屋さん",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "F9",
    area: "F",
    org_name: "",
    booth_name: "探検焼きそば隊",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "F10",
    area: "F",
    org_name: "",
    booth_name: "Nuclear童話標本室",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "F11",
    area: "F",
    org_name: "",
    booth_name: "わたあめ三郎",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "F12",
    area: "F",
    org_name: "",
    booth_name: "みるせん at UNIONE",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "G1",
    area: "G",
    org_name: "",
    booth_name: "Hot ひといき",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "G2",
    area: "G",
    org_name: "",
    booth_name: "今夜焼きたいのは餃子か、貴方の未練か。",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "G3",
    area: "G",
    org_name: "",
    booth_name: "SEMBA DOGG",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "G4",
    area: "G",
    org_name: "",
    booth_name: "ハリケーン！！ポテト⭐ ️",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "G5",
    area: "G",
    org_name: "",
    booth_name: "やきそば大将",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "G6",
    area: "G",
    org_name: "",
    booth_name: "豚々",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "H1",
    area: "H",
    org_name: "",
    booth_name: "いか一家 Final",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "H2",
    area: "H",
    org_name: "",
    booth_name: "変草屋",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "H3",
    area: "H",
    org_name: "",
    booth_name: "揚げ今川焼き",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "H4",
    area: "H",
    org_name: "",
    booth_name: "カイグン ヘイチョウガ ヤク ヤキトリ（正しい表記は韓国語）",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "H5",
    area: "H",
    org_name: "",
    booth_name: "亜留満流小籠包",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "I1",
    area: "I",
    org_name: "",
    booth_name: "イラゼミ屋",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "I2",
    area: "I",
    org_name: "",
    booth_name: "タカミのウマウマたません",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "I3",
    area: "I",
    org_name: "",
    booth_name: "文デザストア",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "I4",
    area: "I",
    org_name: "",
    booth_name: "のりちゃん焼きそば",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "I5",
    area: "I",
    org_name: "",
    booth_name: "ソーセージ焼き屋さん",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "I6",
    area: "I",
    org_name: "",
    booth_name: "辛聞トッポギ",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "I7",
    area: "I",
    org_name: "",
    booth_name: "高原パスタ",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "I8",
    area: "I",
    org_name: "",
    booth_name: "パクッとパラチュロ！",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "I9",
    area: "I",
    org_name: "",
    booth_name: "揚げパン工房田中堂",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "J1",
    area: "J",
    org_name: "",
    booth_name: "〜おでんに候〜衣笠ゼミパビリオン",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "J2",
    area: "J",
    org_name: "",
    booth_name: "モ〜烈！！鉄板'sシェフ",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "J3",
    area: "J",
    org_name: "",
    booth_name: "ギョさこい乱舞",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "J4",
    area: "J",
    org_name: "",
    booth_name: "100円揚げ餃子屋〜味と安さとetc.〜",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "J5",
    area: "J",
    org_name: "",
    booth_name: "揚げ物の活学",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "K1",
    area: "K",
    org_name: "",
    booth_name: "揚げパン屋さん",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "K2",
    area: "K",
    org_name: "",
    booth_name: "ポップコーン論I",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "K3",
    area: "K",
    org_name: "",
    booth_name: "激甘リカバリーたい焼き",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "K4",
    area: "K",
    org_name: "",
    booth_name: "Spi's kitchen 2",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "K5",
    area: "K",
    org_name: "",
    booth_name: "MORI✖ ️MAI",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "K6",
    area: "K",
    org_name: "",
    booth_name: "なぶちのひとくち",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "K7",
    area: "K",
    org_name: "",
    booth_name: "くろっふる日和",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "K8",
    area: "K",
    org_name: "",
    booth_name: "YABAちゃん魂のIPPON PON PON",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "K9",
    area: "K",
    org_name: "",
    booth_name: "中華ネギネギ餅屋",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "K10",
    area: "K",
    org_name: "",
    booth_name: "チュロス",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "K11",
    area: "K",
    org_name: "",
    booth_name: "ふみくんのチュロすてないで！",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "K12",
    area: "K",
    org_name: "",
    booth_name: "揚げぽよ",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "L1",
    area: "L",
    org_name: "",
    booth_name: "揚げパン屋さん",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "L2",
    area: "L",
    org_name: "",
    booth_name: "池田家の豚汁",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "L3",
    area: "L",
    org_name: "",
    booth_name: "DYE's Chicken Burger",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "L4",
    area: "L",
    org_name: "",
    booth_name: "ニア教授のとうもろこし屋さん",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "L5",
    area: "L",
    org_name: "",
    booth_name: "揚げパン",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "L6",
    area: "L",
    org_name: "",
    booth_name: "ISHI'sキッチン",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "L7",
    area: "L",
    org_name: "",
    booth_name: "マンゴーわたがし",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "L8",
    area: "L",
    org_name: "",
    booth_name: "来世もきっと思い出す唐沢ポテ子",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "L9",
    area: "L",
    org_name: "",
    booth_name: "BOLEの餃子 記は韓国語）",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "L10",
    area: "L",
    org_name: "",
    booth_name: "Lucky Potato",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "L11",
    area: "L",
    org_name: "",
    booth_name: "ふぞろいチップス",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "L12",
    area: "L",
    org_name: "",
    booth_name: "つるん。",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "L13",
    area: "L",
    org_name: "",
    booth_name: "焼きうどんJAPAN",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "L14",
    area: "L",
    org_name: "",
    booth_name: "生駒フランク本店",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
  },
  {
    yatai_id: "L15",
    area: "L",
    org_name: "",
    booth_name: "「あの」わたがし",
    menu_json: "[]",
    leader_name: "",
    leader_phone: ""
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
  const campusAreas = Object.keys(CAMPUS_LAYOUTS[currentCampus].areas);

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
  elements.canvas.style.height = `${campus.height}px`;
  elements.map.style.minHeight = `${campus.height + 32}px`;

  Object.entries(campus.areas).forEach(([area, config]) => {
    const section = document.createElement("section");
    section.className = "area-section";
    section.style.left = `${config.x}px`;
    section.style.top = `${config.y}px`;
    section.style.width = `${config.width}px`;

    const header = document.createElement("div");
    header.className = "area-header";
    header.innerHTML = `<span>${area} エリア</span><span>${config.ids.length}ブロック</span>`;

    const track = document.createElement("div");
    track.className = `area-track area-track--${config.direction}`;

    config.ids.forEach((id, index) => {
      const item = yataiMaster.find((yatai) => yatai.yatai_id === id);
      const status = item ? getStatus(id) : null;
      const tile = document.createElement("div");
      tile.className = `tile tile--${getStatusClass(status)}`;
      tile.style.animationDelay = `${index * 0.02}s`;

      if (!item) {
        tile.classList.add("tile--disabled");
      }

      if (item && !matchesFilters(item, status)) {
        tile.classList.add("tile--hidden");
      }

      if (currentId === id) {
        tile.classList.add("tile--selected");
      }

      tile.innerHTML = `
        <div class="tile__id">${id}</div>
        <div class="tile__name">${item ? item.booth_name : "未登録"}</div>
        <div class="tile__org">${item ? item.org_name : ""}</div>
      `;

      if (item) {
        tile.title = `${item.booth_name} / ${getStatusLabel(status)}`;
        tile.addEventListener("click", () => selectYatai(id));
      }

      track.appendChild(tile);
    });

    section.appendChild(header);
    section.appendChild(track);

    if (elements.areaFilter.value !== "all" && elements.areaFilter.value !== area) {
      section.style.display = "none";
    }

    elements.canvas.appendChild(section);
  });

  const campusAreas = Object.keys(CAMPUS_LAYOUTS[currentCampus].areas);
  const campusItems = yataiMaster.filter((item) => campusAreas.includes(item.area));
  const visibleCount = campusItems.filter((item) => matchesFilters(item, getStatus(item.yatai_id))).length;
  elements.totalCount.textContent = `${visibleCount}件 / 全${campusItems.length}件`;
  elements.lastUpdated.textContent = formatDate(getLatestUpdated());
}

function getLatestUpdated() {
  const campusAreas = Object.keys(CAMPUS_LAYOUTS[currentCampus].areas);
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

function init() {
  loadStatusStore();
  elements.areaCount.textContent = Object.keys(CAMPUS_LAYOUTS[currentCampus].areas).join(" / ");
  renderMap();

  elements.search.addEventListener("input", renderMap);
  elements.areaFilter.addEventListener("change", renderMap);
  elements.statusFilter.addEventListener("change", renderMap);
  elements.adminToken.addEventListener("input", handleAdminToken);
  elements.adminForm.addEventListener("submit", handleAdminSubmit);

  elements.tabHon.addEventListener("click", () => setCampus("hon"));
  elements.tabE.addEventListener("click", () => setCampus("e"));

  if (yataiMaster.length) {
    selectYatai(yataiMaster[0].yatai_id);
  }
}

function setCampus(next) {
  if (!CAMPUS_LAYOUTS[next]) return;
  currentCampus = next;
  elements.tabHon.classList.toggle("is-active", next === "hon");
  elements.tabE.classList.toggle("is-active", next === "e");
  elements.tabHon.setAttribute("aria-selected", String(next === "hon"));
  elements.tabE.setAttribute("aria-selected", String(next === "e"));
  elements.areaFilter.value = "all";
  elements.areaCount.textContent = Object.keys(CAMPUS_LAYOUTS[currentCampus].areas).join(" / ");
  renderMap();
}

document.addEventListener("DOMContentLoaded", init);
