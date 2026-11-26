// ===== ТОХИРГОО: эндээс засна =====
// Season 3 эхлэх огноо (ISO). Мэдэгдэхгүй бол null.
// Жишээ: "2026-12-05T20:00:00+08:00" (Улаанбаатар = +08:00)
const SEASON_START = "2026-11-25T21:00:00+08:00";

const TEAMS = [
  { name: "USUHUU",  color: "#ffc400", poster: "assets/usuhuu.jpg",  players: ["USUHUU","ODKO","TUUGUU","BALU","SARAA"] },
  { name: "JOEY",    color: "#ff4fa3", poster: "assets/joey.jpg",    players: ["JOEY","GANBAA","BABU","ERDENEE","MISHEEL"] },
  { name: "DAVKA",   color: "#4de1ff", poster: "assets/davka.jpg",   players: ["DAVKA","TUGSUU","EEGII","BRAZIL","LIGDEN"] },
  { name: "UUGANAA", color: "#5dff7a", poster: "assets/uuganaa.jpg", players: ["UUGANAA","CHAAGII","BOOGII","GORI","TSETSEN"] }
];

// Map бүрийн зураг: assets/maps/<нэр жижиг үсгээр>.jpg
const MAPS = ["Mirage","Inferno","Nuke","Ancient","Anubis","Dust2","Cache"];

// Хуваарийн хэсэг сайтаас хасагдсан. Энэ жагсаалтаас одоо зөвхөн map veto-гийн анхны 2 баг (эхний тоглолт)
// болон дээд талын "Гранд финал" формат (format: "BO3") авагдана.
const SCHEDULE = [
  { stage: "1-р долоо хоног", date: null, matches: [
    { a: "USUHUU", b: "JOEY" },
    { a: "DAVKA",  b: "UUGANAA" }
  ]},
  { stage: "2-р долоо хоног", date: null, matches: [
    { a: "Хожсон баг",    b: "Хожсон баг" },
    { a: "Хожигдсон баг", b: "Хожигдсон баг" }
  ]},
  { stage: "Гранд финал", date: null, final: true, matches: [
    { a: "TBD", b: "TBD", format: "BO3" }
  ]}
];

// MVP. Зургаа assets хавтсанд хийгээд нэрийг нь photo-д бичнэ.
// Зураг байхгүй бол оронд нь дүрс харагдана.
const MVPS = [
  { season: "Season 01", name: "donk",   photo: "assets/mvp-odko.jpg" },
  { season: "Season 02", name: "VPN",    photo: "assets/mvp-tugsuu.jpg" }
];

// Аварга багууд. Лого/зургийг assets хавтсанд хийгээд нэрийг нь photo-д бичнэ.
// logo: true бол зургийг тайралгүй бүтнээр нь голд харуулна.
const CHAMPIONS = [
  { season: "Season 01", team: "D13",    photo: "assets/champ-d13.jpg",    logo: true },
  { season: "Season 02", team: "NONAME", photo: "assets/champ-noname.jpg", logo: true }
];

// ---- Тоглолтын статистик ----
// Тоглоом доторх нэр → лигийн тоглогч. Том/жижиг үсэг, emoji, тэмдэгт тоохгүй
// ("Tsenherayga💙" = "tsenherayga"). Нэр нь лигийн нэртэй адилхан бол бичих шаардлагагүй, өөрөө таарна.
const NICKS = {
  "BBH":                "BABU",
  "STM":                "BALU",
  "BYWOO":              "BOOGII",
  "BRAZIL":             "BRAZIL",
  ".":                  "CHAAGII",
  "911":                "DAVKA",
  "13":                 "EEGII",
  "ERDENE":             "ERDENEE",
  "21":                 "GANBAA",
  "GORI":               "GORI",
  "JOEY":               "JOEY",
  "SHIFUU":             "LIGDEN",
  "MISHKA":             "MISHEEL",
  "DONK":               "ODKO",
  "SWEETYMOON":         "SARAA",
  "TSENHERAYGA":        "TSETSEN",
  "VPN":                "TUGSUU",
  "..!.. VeNoM (0)))":  "TUUGUU",
  "DEGGUI JAAL USUKKU": "USUHUU",
  "ZUGA":               "UUGANAA",
};

// Улирлын тойргийн тоо. Тойрог бүрт баг бүр бусад 3 багтай нэг удаа тоглоно → баг бүр 15 тоглолт, дараа нь финал.
const ROUNDS = 5;

// Тоглолт бүр. round = тойргийн дугаар (1-5) эсвэл "final". a/b = багийн нэр, sa/sb = оноо, side: "a" эсвэл "b".
// Нэг талын 3+ тоглогч нэг багийнх бол a/b-ийн оронд "Team <багийн нэр>" өөрөө гарна.
// Баганын дараалал: нэр, side, K, D, A, DMG (нийт damage), Rating (HLTV 2.1), KAST %, Open kill, Trade kill,
//                   Util (гранатын damage), Flash (сохолсон дайсан). ADR = DMG ÷ раунд (өөрөө бодогдоно).
// Мэдэгдэхгүй тоог null гэж бичнэ.
const MATCHES = [
  { round: 1, date: "2026-11-25T22:18:47+08:00", map: "Nuke", a: "Team USUHUU", b: "Team UUGANAA", sa: 13, sb: 10, halves: "6:6 · 7:4", source: "xplay.gg",
    players: [
      ["donk",               "a", 24, 15, 4, 2524, 1.48, 86, 1, 4, 302,  1],
      ["deggui jaal usukku", "a", 21, 19, 5, 2425, 1.44, 73, 6, 4,   0,  4],
      ["STM",                "a", 20, 11, 5, 1962, 1.39, 86, 1, 3,  97,  3],
      ["..!.. VeNoM (0)))",  "a", 16, 15, 4, 1766, 1.02, 65, 2, 2,  10,  8],
      ["Sweetymoon",         "a", 12, 17, 5, 1254, 0.85, 69, 3, 1,  26,  2],
      [".",                  "b", 22, 18, 2, 2149, 1.21, 56, 2, 6,   7,  3],
      ["ZUGA♠️♥️♣️♦",        "b", 17, 18, 7, 2059, 1.08, 69, 2, 5,  82, 11],
      ["BYWOO",              "b", 16, 17, 1, 1564, 1.00, 65, 4, 1,  25,  4],
      ["Gori",               "b", 14, 20, 4, 1430, 0.75, 60, 2, 6,  16,  0],
      ["Tsenherayga💙",      "b",  8, 21, 6, 1145, 0.57, 78, 0, 2,  68,  2]
    ] },
  { round: 1, date: "2026-11-25T21:39:39+08:00", map: "Ancient", a: "Team USUHUU", b: "Team UUGANAA", sa: 13, sb: 10, halves: "8:3 · 5:7", source: "xplay.gg",
    players: [
      ["..!.. VeNoM (0)))",  "a", 26, 13, 1, 2318, 1.55, 78, 2, 2,  76,  7],
      ["deggui jaal usukku", "a", 20, 17, 1, 2174, 1.26, 65, 4, 1,   3,  2],
      ["STM",                "a", 12, 13, 1, 1285, 0.89, 69, 1, 1,  68,  9],
      ["donk",               "a", 11, 17, 8, 1665, 0.89, 73, 2, 2, 129,  4],
      ["Sweetymoon",         "a",  9, 18, 6, 1231, 0.70, 69, 0, 2,   9,  2],
      [".",                  "b", 27, 18, 4, 2641, 1.66, 73, 7, 3,  44,  4],
      ["ZUGA♠️♥️♣️♦",        "b", 17, 13, 3, 1607, 1.20, 73, 3, 3,  48,  4],
      ["Tsenherayga💙",      "b", 12, 16, 4, 1558, 0.87, 69, 1, 0, 163,  2],
      ["Gori",               "b", 11, 16, 3, 1414, 0.79, 52, 3, 0,  24, 19],
      ["BYWOO",              "b", 11, 15, 3, 1226, 0.78, 60, 0, 2,   0,  3]
    ] }
];
// ===================================

const $ = (s) => document.querySelector(s);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const findTeam = (n) => TEAMS.find((t) => t.name === n);

// ---- Тоон үзүүлэлт ----
const finalMatch = (SCHEDULE.find((r) => r.final) || {}).matches?.[0];
$("#stats").innerHTML = [
  [TEAMS.length, "Баг"],
  [TEAMS.reduce((n, t) => n + t.players.length, 0), "Тоглогч"],
  [MAPS.length, "Map pool"],
  [(finalMatch && finalMatch.format) || "TBD", "Гранд финал"]
].map(([v, l]) => `<div><b>${esc(v)}</b><span>${l}</span></div>`).join("");

// ---- Hero: оч + parallax ----
const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!calm) {
  $("#sparks").innerHTML = Array.from({ length: 28 }, () => {
    const l = Math.random() * 100, d = 6 + Math.random() * 8, dl = -Math.random() * d, dx = Math.round(Math.random() * 80 - 40);
    return `<i style="left:${l.toFixed(1)}%;animation-duration:${d.toFixed(1)}s;animation-delay:${dl.toFixed(1)}s;--dx:${dx}px"></i>`;
  }).join("");
  if (matchMedia("(pointer: fine)").matches) {
    const hero = $(".hero"), ct = $(".op-ct"), tt = $(".op-t");
    hero.addEventListener("pointermove", (e) => {
      const r = hero.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      ct.style.setProperty("--px", (x * -22).toFixed(1) + "px"); ct.style.setProperty("--py", (y * -10).toFixed(1) + "px");
      tt.style.setProperty("--px", (x * -30).toFixed(1) + "px"); tt.style.setProperty("--py", (y * -12).toFixed(1) + "px");
    });
    hero.addEventListener("pointerleave", () => [ct, tt].forEach((el) => { el.style.setProperty("--px", "0px"); el.style.setProperty("--py", "0px"); }));
  }
}

// ---- Гүйдэг мөр ----
const tick = ["Season 03", "5v5", ...TEAMS.map((t) => "Team " + t.name), "GL HF"];
$("#ticker").innerHTML = [...tick, ...tick].map((t) => `<span>${esc(t)}</span>`).join("");

// ---- Багууд ----
// Дарахад тоглогчид багийн нэрийг тойрон эгнээ үүсгэнэ (Gestalt):
//  ойрын зарчим – нэг багийнхан нэг дор бөөгнөрнө; ижил төстэй – багийн өнгөөр нэгдэнэ;
//  нийтлэг хувь заяа – хамт хөдөлнө; битүүмжлэл – шугам нь хүрээ үүсгэнэ; дүрс/фон – бусад баг бүдгэрнэ.
const ring = (n) => Array.from({ length: n }, (_, k) => {
  const a = (-90 + (k * 360) / n) * Math.PI / 180;
  return [+(50 + 36 * Math.cos(a)).toFixed(2), +(50 + 38 * Math.sin(a)).toFixed(2)];
});
$("#team-grid").innerHTML = TEAMS.map((t, i) => {
  const pts = ring(t.players.length);
  return `
<article class="team" style="--col:${t.color}">
  <div class="team-img">
    <img src="${esc(t.poster)}" alt="TEAM ${esc(t.name)} постер" loading="lazy" width="1536" height="1024">
    <span class="seed">TEAM ${String(i + 1).padStart(2, "0")}</span>
  </div>
  <div class="team-body">
    <div class="team-top"><h3>${esc(t.name)}</h3><a class="poster-link" href="${esc(t.poster)}" target="_blank" rel="noopener">Постер ↗</a></div>
    <div class="formation">
      <div class="orbit">
        <svg class="ring" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><polygon points="${pts.map((p) => p.join(",")).join(" ")}" pathLength="100"/></svg>
        <div class="core" aria-hidden="true"><small>TEAM</small><b>${esc(t.name)}</b></div>
        <ul class="roster">${t.players.map((p, k) => `<li data-k="${k}" style="--x:${pts[k][0]}%;--y:${pts[k][1]}%">${esc(p)}</li>`).join("")}</ul>
      </div>
    </div>
    <div class="team-rec" data-team="${esc(t.name)}"></div>
    <div class="team-games" data-team="${esc(t.name)}"></div>
    <button class="team-toggle" type="button" aria-expanded="false">Тоглогч, map ▸</button>
  </div>
</article>`;
}).join("");

const teamGrid = $("#team-grid");
function setActiveTeam(card) {
  const lis = [...teamGrid.querySelectorAll(".roster li")];
  const first = new Map(lis.map((li) => [li, li.getBoundingClientRect()]));
  teamGrid.querySelectorAll(".team").forEach((c) => {
    const on = c === card, btn = c.querySelector(".team-toggle");
    c.classList.toggle("active", on);
    btn.setAttribute("aria-expanded", on);
    btn.textContent = on ? "Хаах ✕" : "Тоглогч, map ▸";
  });
  teamGrid.classList.toggle("focus", !!card);
  if (calm) return;
  // FLIP: хуучин байрлалаас шинэ рүү бүгд нэг хэмнэлээр гулсана
  lis.forEach((li) => {
    const f = first.get(li), l = li.getBoundingClientRect();
    const dx = f.left - l.left, dy = f.top - l.top;
    if (Math.abs(dx) + Math.abs(dy) < 1) return;
    li.animate([{ transform: `translate(${dx}px,${dy}px)` }, { transform: "translate(0,0)" }],
      { duration: 800, delay: +li.dataset.k * 45, easing: "cubic-bezier(.22,1,.36,1)", fill: "backwards" });
  });
}
teamGrid.addEventListener("click", (e) => {
  if (e.target.closest("a")) return;
  const card = e.target.closest(".team");
  if (card) setActiveTeam(card.classList.contains("active") ? null : card);
});
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && teamGrid.classList.contains("focus")) setActiveTeam(null); });

// ---- Алдрын картууд (MVP + Аваргууд) ----
const silhouette = `<svg viewBox="0 0 200 240" aria-hidden="true"><circle cx="100" cy="86" r="44" fill="currentColor"/><path d="M14 240c0-58 38-96 86-96s86 38 86 96Z" fill="currentColor"/></svg>`;
const cupShape = `<svg viewBox="0 0 200 240" aria-hidden="true"><path d="M52 24h96v62a48 48 0 0 1-96 0Z" fill="currentColor"/><path d="M52 40H26v16a30 30 0 0 0 30 30M148 40h26v16a30 30 0 0 1-30 30" fill="none" stroke="currentColor" stroke-width="12"/><path d="M88 132h24v46H88z" fill="currentColor"/><path d="M60 178h80l8 30H52Z" fill="currentColor"/><path d="M40 208h120v32H40z" fill="currentColor"/></svg>`;
const crown = `<svg class="crown" viewBox="0 0 24 16" aria-hidden="true"><path d="M3 12.5 1.5 3l6 4.5L12 1l4.5 6.5 6-4.5-1.5 9.5Zm0 2h18" fill="currentColor" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/></svg>`;
const cup = `<svg class="crown" viewBox="0 0 24 20" aria-hidden="true"><path d="M6 1h12v5.5a6 6 0 0 1-12 0Z" fill="currentColor"/><path d="M6 3H2.5v1.5A3.5 3.5 0 0 0 6.3 8M18 3h3.5v1.5A3.5 3.5 0 0 1 17.7 8" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M10.5 12h3v3.5h-3zM7 15.5h10V19H7z" fill="currentColor"/></svg>`;

function gloryCard({ no, ribbon, name, sub, photo, alt, icon, shape, logo }) {
  return `
<article class="mvp">
  <div class="mvp-frame"><div class="mvp-in">
    <div class="mvp-photo${logo ? " logo" : " tone"}">
      ${logo ? `<img class="bg" src="${esc(photo)}" alt="" aria-hidden="true">` : ""}<img class="fg" src="${esc(photo)}" alt="${esc(alt)}">${logo ? "" : `<img class="color" src="${esc(photo)}" alt="" aria-hidden="true">`}
      <div class="ph">${shape}<small>Зураг: ${esc(photo)}</small></div>
    </div>
    <span class="big-no" aria-hidden="true">${String(no).padStart(2, "0")}</span>
    <span class="ribbon">${esc(ribbon)}</span>
    <div class="mvp-info">${icon}<div class="mvp-name">${esc(name)}</div><div class="mvp-sub">${esc(sub)}</div></div>
  </div></div>
</article>`;
}
function mysteryCard({ ribbon, sub, icon, shape, names }) {
  return `
<article class="mvp next">
  <div class="mvp-frame"><div class="mvp-in">
    <div class="mvp-photo nophoto"><div class="ph">${shape}</div></div>
    <span class="q" aria-hidden="true">?</span>
    <span class="ribbon">${esc(ribbon)}</span>
    <div class="mvp-info">${icon}<div class="mvp-name"><span class="slot" data-names="${esc(names.join("|"))}">???</span></div><div class="mvp-sub">${esc(sub)}</div></div>
  </div></div>
</article>`;
}

$("#mvp-grid").innerHTML = MVPS.map((m, i) => gloryCard({
  no: i + 1, ribbon: m.season + " · MVP", name: m.name, sub: "Most valuable player",
  photo: m.photo, alt: m.season + " MVP " + m.name, icon: crown, shape: silhouette
})).join("") + mysteryCard({ ribbon: "Season 03 · MVP", sub: "Хэн болох вэ?", icon: crown, shape: silhouette,
  names: TEAMS.flatMap((t) => t.players).map((p) => Object.keys(NICKS).find((k) => NICKS[k] === p) || p) });

$("#hof").innerHTML = CHAMPIONS.map((c, i) => gloryCard({
  no: i + 1, ribbon: c.season + " · Аварга", name: c.team, sub: "Champions",
  photo: c.photo, alt: c.team + " лого", icon: cup, shape: cupShape, logo: c.logo
})).join("") + mysteryCard({ ribbon: "Season 03 · Аварга", sub: "Аварга хэн болох вэ?", icon: cup, shape: cupShape, names: TEAMS.map((t) => t.name) });

// Зураг байхгүй бол дүрс харуулна
document.querySelectorAll(".mvp-photo .fg").forEach((img) => {
  img.addEventListener("error", () => {
    const box = img.parentNode;
    box.classList.remove("tone"); box.classList.add("nophoto"); box.querySelectorAll("img").forEach((el) => el.remove());
  });
});
// Season 3 картууд дээр нэрс ээлжилнэ
if (!calm) {
  document.querySelectorAll(".slot").forEach((slot, n) => {
    const pool = slot.dataset.names.split("|").sort(() => Math.random() - 0.5);
    let k = 0;
    setTimeout(() => setInterval(() => {
      slot.textContent = pool[k++ % pool.length];
      slot.classList.remove("tick"); void slot.offsetWidth; slot.classList.add("tick");
    }, 1200), n * 600);
  });
}

// ---- Map veto ----
const MAP_BG = {
  Mirage: ["#c9a26b", "#5b3f22"], Inferno: ["#b8562f", "#3a160d"], Nuke: ["#5f8496", "#16232b"],
  Ancient: ["#56804c", "#14240f"], Anubis: ["#3b918c", "#2b2410"], Dust2: ["#d6b47a", "#4f391f"],
  Cache: ["#8a9aa6", "#1e262c"]
};
const selA = $("#veto-a"), selB = $("#veto-b");
const opts = TEAMS.map((t) => `<option>${esc(t.name)}</option>`).join("");
selA.innerHTML = opts; selB.innerHTML = opts;
selA.value = SCHEDULE[0].matches[0].a; selB.value = SCHEDULE[0].matches[0].b;
let vetoLog = [];

function renderVeto() {
  const banned = new Set(vetoLog.map((v) => v.map));
  const left = MAPS.filter((m) => !banned.has(m));
  const done = left.length === 1;
  const turn = vetoLog.length % 2 === 0 ? selA.value : selB.value;

  $("#veto-turn").innerHTML = done
    ? `Тоглох map: <b>${esc(left[0])}</b>`
    : `<b>${esc(turn)}</b> хасах ээлж · ${left.length} үлдсэн`;

  $("#map-grid").innerHTML = MAPS.map((m) => {
    const ban = vetoLog.find((v) => v.map === m);
    const pick = done && !ban;
    const [c1, c2] = MAP_BG[m] || ["#555", "#111"];
    const st = ban ? "BAN · " + ban.by : pick ? "DECIDER" : "";
    return `<button type="button" class="map${ban ? " ban" : ""}${pick ? " pick" : ""}" data-map="${esc(m)}"
      style="--c1:${c1};--c2:${c2};--img:url(assets/maps/${esc(m.toLowerCase())}.jpg)" ${ban || done ? "disabled" : ""} aria-label="${esc(m)}${st ? ", " + esc(st) : ""}">
      ${st ? `<span class="st">${esc(st)}</span>` : ""}
      <span class="code">de_${esc(m.toLowerCase())}</span>
      <span class="nm">${esc(m)}</span>
    </button>`;
  }).join("");

  $("#veto-log").innerHTML = vetoLog.map((v, i) => `<li>${i + 1}. ${esc(v.by)} <b>хассан</b> ${esc(v.map)}</li>`).join("")
    + (done ? `<li class="dec">Үлдсэн: <b>${esc(left[0])}</b></li>` : "");
  $("#veto-undo").disabled = vetoLog.length === 0;
}
$("#map-grid").addEventListener("click", (e) => {
  const b = e.target.closest(".map");
  if (!b || b.disabled) return;
  vetoLog.push({ map: b.dataset.map, by: vetoLog.length % 2 === 0 ? selA.value : selB.value });
  renderVeto();
});
$("#veto-undo").onclick = () => { vetoLog.pop(); renderVeto(); };
$("#veto-reset").onclick = () => { vetoLog = []; renderVeto(); };
function onTeamChange(changed, other) {
  if (changed.value === other.value) other.value = TEAMS.find((t) => t.name !== changed.value).name;
  vetoLog = []; renderVeto();
}
selA.onchange = () => onTeamChange(selA, selB);
selB.onchange = () => onTeamChange(selB, selA);
renderVeto();

// ---- Тоолуур / LIVE самбар ----
// Эхлэхээс өмнө: LCD тоолуур буцаж тоолно. Эхэлсний дараа: LIVE самбар — эхэлснээс хойших хугацаа,
// тоглолтын тоо, тэргүүлэгч, сүүлийн тоглолт. (Файлын төгсгөлд, статистик бодогдсоны дараа дуудагдана.)
const p2 = (n) => String(n).padStart(2, "0");
const lcdHtml = () => `<div class="lcd">${["Өдөр", "Цаг", "Мин", "Сек"].map((l, i) =>
  `${i ? '<b class="colon">:</b>' : ""}<div class="seg"><span class="ghost">88</span><span class="dig">--</span><small>${l}</small></div>`).join("")}</div>`;
const setDigs = (vals) => $("#cd").querySelectorAll(".dig").forEach((d, i) => (d.textContent = vals[i]));
const split = (ms) => { const x = Math.max(0, Math.floor(ms / 1000)); return [Math.floor(x / 86400), Math.floor(x / 3600) % 24, Math.floor(x / 60) % 60, x % 60]; };

function liveBoard(start) {
  const last = games[0];
  const kills = games.reduce((n, g) => n + g.ps.reduce((m, p) => m + (p.k || 0), 0), 0);
  const lead = board.filter((s) => s.rating != null).sort((a, b) => b.rating - a.rating)[0];
  const wl = (a, b) => (a > b ? "w" : a < b ? "l" : "");
  $("#cd").innerHTML = `<div class="soon live">
    <div class="soon-top"><i class="led"></i><span><b class="live-tag">LIVE</b>Season 03 явагдаж байна</span><i class="led"></i></div>
    ${lcdHtml()}
    <div class="lcd-cap">⏱️ Улирал эхэлснээс хойш</div>
    <div class="live-chips">
      <span>🎮 <b>${games.length}</b> тоглолт</span>
      <span>🔫 <b>${kills}</b> kill</span>
      ${lead ? `<span>⭐ Тэргүүлэгч <b>${esc(lead.name)}</b> ${lead.rating.toFixed(2)}</span>` : ""}
    </div>
    ${last ? `<a class="live-last" href="#${last.id}" style="--img:url(assets/maps/${esc(last.map.toLowerCase())}.jpg)">
      <small>Сүүлийн тоглолт · ${ubTime(last.time)}</small>
      <span class="ll-map">🗺️ ${esc(last.map)}</span>
      <span class="ll-sc"><em>${esc(last.na)}</em><b class="${wl(last.sa, last.sb)}">${last.sa}</b>:<b class="${wl(last.sb, last.sa)}">${last.sb}</b><em>${esc(last.nb)}</em></span>
      <span class="ll-go">Scoreboard →</span>
    </a>` : `<div class="soon-note">Эхэллээ! GL HF</div>`}
    <div class="soon-bar"><i></i></div>
  </div>`;
  $("#status").classList.add("live");
  const tick = () => {
    const t = split(Date.now() - start);
    setDigs(t.map(p2));
    $("#status-t").textContent = `LIVE · ${t[0] + 1}-Р ӨДӨР`;
  };
  tick();
  if (!calm) setInterval(tick, 1000);
}

function countdown() {
  if (!SEASON_START) {
    $("#cd").innerHTML = `<div class="soon tba">
      <div class="soon-top"><i class="led"></i><span>Season 03 · Coming soon</span><i class="led"></i></div>
      ${lcdHtml()}<div class="soon-bar"><i></i></div><div class="soon-note">Эхлэх огноо удахгүй зарлагдана</div></div>`;
    $("#status-t").textContent = "COMING SOON";
    if (calm) return setDigs(["--", "--", "--", "--"]);
    const rnd = () => p2(Math.floor(Math.random() * 100));
    setInterval(() => setDigs(Date.now() % 4000 < 1600 ? [1, 2, 3, 4].map(rnd) : ["--", "--", "--", "--"]), 70);
    return;
  }
  const start = new Date(SEASON_START);
  if (Date.now() >= start) return liveBoard(start);
  const ub = new Date(start.getTime() + 8 * 3600e3); // Улаанбаатарын цаг
  $("#cd").innerHTML = `<div class="soon">
    <div class="soon-top"><i class="led"></i><span>Season 03 · Тоолол эхэллээ</span><i class="led"></i></div>
    ${lcdHtml()}<div class="soon-bar"><i></i></div>
    <div class="soon-note">Эхлэх: ${ub.getUTCMonth() + 1} сарын ${ub.getUTCDate()} · ${p2(ub.getUTCHours())}:${p2(ub.getUTCMinutes())}</div></div>`;
  const tick = () => {
    const diff = start - Date.now();
    if (diff <= 0) return liveBoard(start);
    const t = split(diff);
    setDigs(t.map(p2));
    $("#status-t").textContent = t[0] + " ӨДӨР ҮЛДЛЭЭ";
    setTimeout(tick, 1000);
  };
  tick();
}

// ===== Тоглолтын статистик =====
// Өгөгдөл: дээрх MATCHES. Энд юу ч засах шаардлагагүй.
const STAT = {
  rating: ["⭐", "Rating", "HLTV 2.1 rating — тоглолтод үзүүлсэн нийт нөлөө. 1.00 дундаж · 1.10+ сайн · 1.30+ од"],
  adr:    ["💥", "ADR", "Раунд бүрт дунджаар өгсөн damage. 70 дундаж · 85+ сайн · 100+ гайхалтай"],
  kd:     ["⚖️", "K/D", "Kill ÷ Death. 1.00-аас дээш бол үхсэнээсээ олон алсан"],
  k:      ["🔫", "Kill", "Хэдэн дайсан алсан"],
  d:      ["💀", "Death", "Хэдэн удаа үхсэн (бага байх тусам сайн)"],
  a:      ["🤝", "Assist", "Дайсныг гэмтээж, багийнханд нь алуулахад тусалсан"],
  pm:     ["±", "+/−", "Kill − Death. Нэмэх бол алснаасаа цөөн үхсэн"],
  dmg:    ["🩸", "DMG", "Тоглолтын турш өгсөн нийт damage"],
  kast:   ["🛡️", "KAST", "Раундын хэдэн хувьд нь Kill, Assist хийсэн, амьд үлдсэн (Survive) эсвэл Trade хийлгэсэн"],
  ok:     ["🚪", "Open", "Opening kill — раундын хамгийн эхний kill"],
  tk:     ["🔁", "Trade", "Trade kill — нөхрөө алсан дайсныг тэр дор нь буцааж алсан"],
  ud:     ["💣", "Util", "Гранатаар (HE, molotov) өгсөн damage"],
  ef:     ["😵", "Flash", "Flash-аар сохолсон дайсны тоо"],
  mp:     ["🎮", "Тоглолт", "Тоглосон тоглолтын тоо"],
  wr:     ["🏆", "Хожил", "Хожсон тоглолтын хувь"]
};
const LOW_BETTER = new Set(["d"]);
const TONES = { rating: [1.1, 0.95], adr: [85, 70], kd: [1.1, 0.95], kast: [72, 65], pm: [1, 0], wr: [55, 45] };
const tone = (k, v) => {
  const t = TONES[k];
  return !t || v == null ? "" : v >= t[0] ? "c-g" : v >= t[1] ? "c-y" : "c-r";
};
const fmt = (k, v) => {
  if (v == null || Number.isNaN(v)) return "—";
  if (k === "rating" || k === "kd") return v.toFixed(2);
  if (k === "kast" || k === "wr") return Math.round(v) + "%";
  if (k === "pm") return (v > 0 ? "+" : "") + v;
  if (k === "adr") return v.toFixed(1);
  return String(Math.round(v));
};

// Тоглоом доторх нэрийг лигийн тоглогчтой холбоно
const ROSTER = new Map(TEAMS.flatMap((t) => t.players.map((p) => [p.toLowerCase(), { name: p, team: t }])));
// Зөвхөн үсэг, тоог үлдээнэ. "." шиг зөвхөн тэмдэгттэй нэр бол тэр чигээр нь хэрэглэнэ.
const normNick = (s) => String(s).toLowerCase().replace(/[^\p{L}\p{N}]/gu, "") || String(s).trim().toLowerCase();
const NICK_MAP = new Map(Object.entries(NICKS).map(([k, v]) => [normNick(k), v]));
function who(nick) {
  const n = normNick(nick);
  const r = ROSTER.get(String(NICK_MAP.get(n) || "").toLowerCase()) || ROSTER.get(n);
  if (!r) return { key: "~" + nick, name: nick, team: null, nick: "" };
  // Сайт дээр Steam нэрээр нь харуулна; лигийн нэр нь зөвхөн тоог нэгтгэх, багийн өнгөнд хэрэглэгдэнэ
  return { key: r.name, name: nick, team: r.team, nick: "" };
}

const FIELDS = ["nick", "side", "k", "d", "a", "dmg", "rating", "kast", "ok", "tk", "ud", "ef"];
const games = MATCHES.map((m) => {
  const rounds = m.sa + m.sb;
  const ps = m.players.map((row) => {
    const p = Object.fromEntries(FIELDS.map((f, j) => [f, row[j] ?? null]));
    const won = p.side === "a" ? m.sa > m.sb : m.sb > m.sa;
    return { ...p, ...who(p.nick), pm: p.k - p.d, adr: p.dmg != null && rounds ? p.dmg / rounds : null, won };
  });
  // Нэг талын 3+ тоглогч нэг багийнх бол тэр багийн тоглолт гэж үзнэ
  const sideTeam = (side) => {
    const n = new Map();
    ps.forEach((p) => { if (p.side === side && p.team) n.set(p.team, (n.get(p.team) || 0) + 1); });
    const [t, c] = [...n].sort((x, y) => y[1] - x[1])[0] || [];
    return c >= 3 ? t : null;
  };
  const ta = sideTeam("a"), tb = sideTeam("b");
  return { ...m, rounds, ps, time: new Date(m.date), ta, tb, na: ta ? "Team " + ta.name : m.a, nb: tb ? "Team " + tb.name : m.b };
}).sort((x, y) => y.time - x.time).map((g, i) => ({ ...g, id: "game-" + (MATCHES.length - i) }));

function aggregate() {
  const by = new Map();
  const add = (s, k, v) => { if (v != null) s[k] += v; };
  games.forEach((g) => g.ps.forEach((p) => {
    const s = by.get(p.key) || { key: p.key, name: p.name, team: p.team, nicks: new Set(), mp: 0, w: 0, k: 0, d: 0, a: 0,
      dmg: 0, dr: 0, rs: 0, rr: 0, ks: 0, kr: 0, ok: 0, tk: 0, ud: 0, ef: 0 };
    if (p.nick) s.nicks.add(p.nick);
    s.mp++; s.w += p.won ? 1 : 0;
    ["k", "d", "a", "ok", "tk", "ud", "ef"].forEach((k) => add(s, k, p[k]));
    if (p.dmg != null) { s.dmg += p.dmg; s.dr += g.rounds; }
    if (p.rating != null) { s.rs += p.rating * g.rounds; s.rr += g.rounds; }
    if (p.kast != null) { s.ks += p.kast * g.rounds; s.kr += g.rounds; }
    by.set(p.key, s);
  }));
  return [...by.values()].map((s) => ({
    ...s, nick: [...s.nicks].join(", "),
    adr: s.dr ? s.dmg / s.dr : null, kd: s.d ? s.k / s.d : s.k, rating: s.rr ? s.rs / s.rr : null,
    kast: s.kr ? s.ks / s.kr : null, wr: (s.w / s.mp) * 100
  }));
}
const board = aggregate();

// ---- Хүснэгтийн хэсгүүд ----
let sortK = "rating", sortDir = -1;
function headTh(k, sortable) {
  const [e, l, t] = STAT[k];
  const inner = `<span class="e" aria-hidden="true">${e}</span><span class="l">${esc(l)}</span>`;
  const title = esc(l + " — " + t);
  if (!sortable) return `<th scope="col" title="${title}">${inner}</th>`;
  const on = sortK === k;
  return `<th scope="col" title="${title}" class="${on ? "sorted" : ""}" aria-sort="${on ? (sortDir < 0 ? "descending" : "ascending") : "none"}"><button type="button" data-k="${k}">${inner}</button></th>`;
}
function cell(k, v, { star = false, txt, on = false } = {}) {
  const cls = [tone(k, v), on && "sorted"].filter(Boolean).join(" ");
  const bar = k === "rating" && v != null ? `<i class="rt-bar"><i style="--w:${(Math.min(v / 1.6, 1) * 100).toFixed(0)}%"></i></i>` : "";
  return `<td${cls ? ` class="${cls}"` : ""}>${txt ?? fmt(k, v)}${star ? `<span class="best" aria-label="шилдэг">★</span>` : ""}${bar}</td>`;
}
function whoCell(p, pre = "") {
  const tip = p.team ? "TEAM " + p.team.name : "Лигийн тоглогчтой холбогдоогүй нэр";
  return `<th scope="row" class="pc">${pre}<span class="who" style="--col:${p.team ? p.team.color : "#5c5c66"}" title="${esc(tip)}"><i class="dot"></i><span><b>${esc(p.name)}</b>${p.nick ? `<small>${esc(p.nick)}</small>` : ""}</span></span></th>`;
}

// ---- Шилдэгүүд ----
function renderHighlights() {
  const pick = (k) => board.filter((s) => s[k] != null).sort((x, y) => y[k] - x[k])[0];
  $("#hl").innerHTML = [["rating", "Хамгийн өндөр rating"], ["adr", "Хамгийн өндөр ADR"], ["k", "Хамгийн олон kill"], ["kast", "Хамгийн өндөр KAST"]]
    .map(([k, label]) => {
      const s = pick(k);
      if (!s) return "";
      return `<div class="hl-card" style="--col:${s.team ? s.team.color : "var(--y)"}"><span class="e" aria-hidden="true">${STAT[k][0]}</span>
        <small>${label}</small><b>${esc(s.name)}</b><span>${fmt(k, s[k])}</span></div>`;
    }).join("");
}

// ---- Эрэмбэ ----
const LB_COLS = ["rating", "adr", "kd", "k", "d", "a", "kast", "ok", "tk", "ud", "ef", "mp", "wr"];
const MEDAL = ["🥇", "🥈", "🥉"];
function renderBoard() {
  if (!board.length) { $("#lb").innerHTML = `<caption class="lb-empty">Одоогоор тоглолт алга</caption>`; return; }
  const list = [...board].sort((x, y) => {
    const a = x[sortK], b = y[sortK];
    if (a == null || b == null) return (a == null) - (b == null);
    return (a - b) * sortDir || x.name.localeCompare(y.name);
  });
  $("#lb").innerHTML = `<thead><tr><th scope="col" class="pc">Тоглогч</th>${LB_COLS.map((k) => headTh(k, true)).join("")}</tr></thead>
    <tbody>${list.map((s, i) => `<tr>${whoCell(s, `<span class="rk2">${i < 3 ? MEDAL[i] : i + 1}</span>`)}${LB_COLS.map((k) => cell(k, s[k], { on: k === sortK })).join("")}</tr>`).join("")}</tbody>`;
}
$("#lb").addEventListener("click", (e) => {
  const b = e.target.closest("button[data-k]");
  if (!b) return;
  const k = b.dataset.k;
  if (k === sortK) sortDir = -sortDir; else { sortK = k; sortDir = LOW_BETTER.has(k) ? 1 : -1; }
  renderBoard();
  $(`#lb button[data-k="${k}"]`).focus();
});

// ---- Тоглолтууд ----
const G_COLS = ["k", "d", "a", "pm", "dmg", "adr", "rating", "kast", "ok", "tk", "ud", "ef"];
const ubTime = (d) => {
  const u = new Date(d.getTime() + 8 * 3600e3), p2 = (n) => String(n).padStart(2, "0");
  return `${u.getUTCFullYear()}.${p2(u.getUTCMonth() + 1)}.${p2(u.getUTCDate())} · ${p2(u.getUTCHours())}:${p2(u.getUTCMinutes())}`;
};
// Формат: тойрог бүрт баг бүр бусад 3 багтай нэг нэг удаа тоглоно (6 тоглолт).
// 5 тойрог → баг бүр 15 тоглолт, дараа нь финал.
const PER_ROUND = (TEAMS.length * (TEAMS.length - 1)) / 2;
let gameFilter = ""; // багийн нэр, эсвэл "" = бүгд

function gameBody(g) {
  const best = {};
  G_COLS.filter((k) => k !== "pm").forEach((k) => {
    const vals = g.ps.map((p) => p[k]).filter((v) => v != null);
    if (vals.length) best[k] = LOW_BETTER.has(k) ? Math.min(...vals) : Math.max(...vals);
  });
  const draw = g.sa === g.sb;
  const team = (side) => {
    const name = side === "a" ? g.na : g.nb, t = side === "a" ? g.ta : g.tb, won = side === "a" ? g.sa > g.sb : g.sb > g.sa;
    const rows = g.ps.filter((p) => p.side === side).sort((x, y) => (y.rating ?? 0) - (x.rating ?? 0) || y.k - x.k);
    return `<div class="g-team"><h4${t ? ` style="--col:${t.color}"` : ""}>${esc(name)} <span class="res ${draw ? "" : won ? "win" : "lose"}">${draw ? "🤝 Тэнцсэн" : won ? "✅ Хожсон" : "❌ Хожигдсон"}</span></h4>
      <div class="tbl-wrap"><table class="sb"><thead><tr><th scope="col" class="pc">Тоглогч</th>${G_COLS.map((k) => headTh(k)).join("")}</tr></thead>
      <tbody>${rows.map((p) => `<tr>${whoCell(p)}${G_COLS.map((k) => cell(k, p[k], {
        star: k !== "pm" && best[k] > 0 && p[k] === best[k],
        txt: k === "adr" && p.adr != null ? String(Math.round(p.adr)) : undefined
      })).join("")}</tr>`).join("")}</tbody></table></div></div>`;
  };
  const meta = [g.halves && "⏱️ Хагас " + esc(g.halves), "🔢 " + g.rounds + " раунд", g.source && "Эх сурвалж: " + esc(g.source), "★ = тоглолтын шилдэг тоо"];
  return `${team("a")}${team("b")}<p class="g-foot">${meta.filter(Boolean).join(" · ")}</p>`;
}

function gameRow(g) {
  const mvp = [...g.ps].sort((x, y) => (y.rating ?? 0) - (x.rating ?? 0))[0];
  const wl = (s, o) => (s > o ? "win" : s < o ? "lose" : "");
  const side = (t, name, s, o) => `<span class="gm-t ${wl(s, o)}"${t ? ` style="--col:${t.color}"` : ""}><i class="dot"></i><span>${esc(name)}</span></span>`;
  return `<details class="gm" id="${g.id}">
    <summary>
      <span class="gm-map" style="--img:url(assets/maps/${esc(g.map.toLowerCase())}.jpg)"><b>${esc(g.map)}</b><small>${ubTime(g.time)}</small></span>
      <span class="gm-score">${side(g.ta, g.na, g.sa, g.sb)}<b class="${wl(g.sa, g.sb)}">${g.sa}</b><i>:</i><b class="${wl(g.sb, g.sa)}">${g.sb}</b>${side(g.tb, g.nb, g.sb, g.sa)}</span>
      ${mvp && mvp.rating != null ? `<span class="gm-mvp" title="Тоглолтын MVP (хамгийн өндөр rating)">👑 ${esc(mvp.name)}<em>${mvp.rating.toFixed(2)}</em></span>` : "<span></span>"}
      <span class="gm-chev" aria-hidden="true">▾</span>
    </summary>
    <div class="gm-body">${gameBody(g)}</div>
  </details>`;
}

const roundOf = (g) => (g.round === "final" ? "final" : +g.round || 0);
const roundCount = (r) => games.filter((g) => roundOf(g) === r).length;

function renderTrack() {
  const steps = Array.from({ length: ROUNDS }, (_, i) => i + 1);
  const cur = steps.find((r) => roundCount(r) < PER_ROUND) ?? "final";
  const finalDone = roundCount("final") > 0;
  $("#track").innerHTML = `<ol class="track">${steps.map((r) => {
    const n = roundCount(r), done = n >= PER_ROUND;
    return `<li class="${done ? "done" : ""}${r === cur ? " cur" : ""}" style="--p:${Math.min(n / PER_ROUND, 1) * 100}%">
      <b>${r}-р тойрог</b><small>${done ? "✓ Дууссан" : `${n} / ${PER_ROUND}`}</small></li>`;
  }).join("")}<li class="fin${cur === "final" ? " cur" : ""}${finalDone ? " done" : ""}" style="--p:${finalDone ? 100 : 0}%"><b>🏆 Финал</b><small>${finalDone ? "✓ Дууссан" : "Тойргуудын дараа"}</small></li></ol>
    <p class="track-note">Нийт <b>${games.filter((g) => roundOf(g) !== "final").length} / ${PER_ROUND * ROUNDS}</b> тоглолт · баг бүр ${(TEAMS.length - 1) * ROUNDS} тоглолт · ${ROUNDS} тойрог → финал</p>`;
}

function renderFilter() {
  const n = (t) => games.filter((g) => g.ta === t || g.tb === t).length;
  $("#gm-filter").innerHTML = `<button type="button" data-t="" aria-pressed="${!gameFilter}">Бүгд<small>${games.length}</small></button>`
    + TEAMS.map((t) => `<button type="button" data-t="${esc(t.name)}" aria-pressed="${gameFilter === t.name}" style="--col:${t.color}">${esc(t.name)}<small>${n(t)}</small></button>`).join("");
}
$("#gm-filter").addEventListener("click", (e) => {
  const b = e.target.closest("button[data-t]");
  if (!b) return;
  gameFilter = b.dataset.t;
  renderFilter(); renderGames();
});

function renderGames() {
  const list = games.filter((g) => !gameFilter || (g.ta && g.ta.name === gameFilter) || (g.tb && g.tb.name === gameFilter));
  const keys = [...new Set(list.map(roundOf))].sort((a, b) => (a === "final" ? -1 : b === "final" ? 1 : (b || 99) - (a || 99)));
  $("#games").innerHTML = keys.map((r) => {
    const rows = list.filter((g) => roundOf(g) === r);
    const label = r === "final" ? "🏆 Финал" : r ? `${r}-р тойрог` : "Бусад тоглолт";
    const count = r && r !== "final" ? `${roundCount(r)} / ${PER_ROUND} тоглолт` : `${rows.length} тоглолт`;
    return `<section class="rd"><h4 class="rd-head"><span>${label}</span><span class="rd-n">${count}</span></h4>${rows.map(gameRow).join("")}</section>`;
  }).join("") || `<p class="lb-empty">${gameFilter ? "Энэ баг одоогоор тоглоогүй" : "Одоогоор тоглолт алга"}</p>`;
}

// #game-N руу очих холбоос дарахад тэр тоглолтыг задалж харуулна
function openGame(id) {
  if (!document.getElementById(id)) { gameFilter = ""; renderFilter(); renderGames(); }
  const d = document.getElementById(id);
  if (d) d.open = true;
}
document.addEventListener("click", (e) => {
  const a = e.target.closest('a[href^="#game-"]');
  if (a) openGame(a.getAttribute("href").slice(1));
});

// ---- Тайлбар ----
$("#legend").innerHTML = ["rating", "adr", "kd", "k", "d", "a", "pm", "kast", "ok", "tk", "ud", "ef"]
  .map((k) => `<div><span class="e" aria-hidden="true">${STAT[k][0]}</span><b>${esc(STAT[k][1])}</b><p>${esc(STAT[k][2])}</p></div>`).join("");

const steamName = new Map([...Object.entries(NICKS)].reverse().map(([nick, p]) => [p, nick]));
const idle = TEAMS.flatMap((t) => t.players).filter((p) => !board.some((s) => s.key === p)).map((p) => steamName.get(p) || p);
$("#st-sum").textContent = `${games.length} тоглолт · ${board.length} тоглогч`;
$("#idle").textContent = idle.length ? `⏳ Одоогоор статистикгүй: ${idle.join(", ")}` : "";
renderHighlights(); renderBoard(); renderTrack(); renderFilter(); renderGames();
if (location.hash.startsWith("#game-")) openGame(location.hash.slice(1));

// ---- Багийн карт: тоглосон map-ууд ----
TEAMS.forEach((t) => {
  const mine = games.filter((g) => g.ta === t || g.tb === t).map((g) => {
    const isA = g.ta === t, us = isA ? g.sa : g.sb, them = isA ? g.sb : g.sa;
    return { g, us, them, opp: isA ? g.nb : g.na, r: us > them ? "win" : us < them ? "lose" : "draw" };
  });
  const w = mine.filter((x) => x.r === "win").length, l = mine.filter((x) => x.r === "lose").length;
  const sel = `[data-team="${CSS.escape(t.name)}"]`;
  $(".team-rec" + sel).innerHTML = mine.length
    ? `🗺️ ${mine.length} map · <b class="c-g">${w}W</b> – <b class="c-r">${l}L</b>`
    : "🗺️ Одоогоор тоглоогүй";
  $(".team-games" + sel).innerHTML = mine.length
    ? `<h4>Тоглосон map</h4><ul>${mine.map((x, i) => `<li style="--i:${i}">
        <a class="tg ${x.r}" href="#${x.g.id}" style="--img:url(assets/maps/${esc(x.g.map.toLowerCase())}.jpg)" aria-label="${esc(x.g.map)}, ${esc(x.opp)}-тай ${x.us}:${x.them}, scoreboard харах">
          <span class="tg-map">${esc(x.g.map)}</span>
          <span class="tg-vs">vs ${esc(x.opp)} · ${ubTime(x.g.time).split(" · ")[0]}</span>
          <span class="tg-sc"><b>${x.us}:${x.them}</b><small>${x.r === "win" ? "✅ Хожсон" : x.r === "lose" ? "❌ Хожигдсон" : "🤝 Тэнцсэн"}</small></span>
        </a></li>`).join("")}</ul>`
    : `<p class="tg-none">Тоглолт нэмэгдэхээр энд map-ууд гарна.</p>`;
});

countdown();
