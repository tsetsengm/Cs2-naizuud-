// ===== ТОХИРГОО: эндээс засна =====
// Season 3 эхлэх огноо (ISO). Мэдэгдэхгүй бол null.
// Жишээ: "2026-12-05T20:00:00+08:00" (Улаанбаатар = +08:00)
const SEASON_START = "2026-11-26T20:00:00+08:00";

const TEAMS = [
  { name: "USUHUU",  color: "#ffc400", poster: "assets/usuhuu.jpg",  players: ["USUHUU","ODKO","TUUGUU","BALU","SARAA"] },
  { name: "JOEY",    color: "#ff4fa3", poster: "assets/joey.jpg",    players: ["JOEY","GANBAA","BABU","ERDENEE","MISHEEL"] },
  { name: "DAVKA",   color: "#4de1ff", poster: "assets/davka.jpg",   players: ["DAVKA","TUGSUU","EEGII","BRAZIL","LIGDEN"] },
  { name: "UUGANAA", color: "#5dff7a", poster: "assets/uuganaa.jpg", players: ["UUGANAA","CHAAGII","BOOGII","GORI","TSETSEN"] }
];

// Map бүрийн зураг: assets/maps/<нэр жижиг үсгээр>.jpg
const MAPS = ["Mirage","Inferno","Nuke","Ancient","Anubis","Dust2","Cache"];

// Тоглолт: a, b = багийн нэр. Оноо орвол sa, sb-д бичнэ (жишээ: sa: 13, sb: 9).
// format: "BO1" / "BO3" гэх мэт (заавал биш). date: "12/05 · 20:00" гэх мэт, эсвэл null.
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
  { season: "Season 01", name: "ODKO",   photo: "assets/mvp-odko.jpg" },
  { season: "Season 02", name: "TUGSUU", photo: "assets/mvp-tugsuu.jpg" }
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

// Тоглолт бүр. a/b = багийн нэр, sa/sb = оноо, side: "a" эсвэл "b".
// Баганын дараалал: нэр, side, K, D, A, DMG (нийт damage), Rating (HLTV 2.1), KAST %, Open kill, Trade kill,
//                   Util (гранатын damage), Flash (сохолсон дайсан). ADR = DMG ÷ раунд (өөрөө бодогдоно).
// Мэдэгдэхгүй тоог null гэж бичнэ.
const MATCHES = [
  { date: "2026-11-25T22:18:47+08:00", map: "Nuke", a: "Team 2", b: "Team 1", sa: 13, sb: 10, halves: "6:6 · 7:4", source: "xplay.gg",
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
    <button class="team-toggle" type="button" aria-expanded="false">Тоглогчид ▸</button>
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
    btn.textContent = on ? "Хаах ✕" : "Тоглогчид ▸";
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
})).join("") + mysteryCard({ ribbon: "Season 03 · MVP", sub: "Хэн болох вэ?", icon: crown, shape: silhouette, names: TEAMS.flatMap((t) => t.players) });

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

// ---- Хуваарь ----
function side(name, score, other) {
  const t = findTeam(name);
  const scored = score != null && other != null;
  const cls = !t ? "tbd" : scored ? (score > other ? "win" : score < other ? "lose" : "") : "";
  return `<div class="side ${cls}">
    <span class="tag"${t ? ` style="--col:${t.color}"` : ""}>${t ? esc(name[0]) : "?"}</span>
    <span class="nm">${esc(name)}</span>
    <span class="sc">${score ?? "–"}</span>
  </div>`;
}
let matchNo = 0;
$("#bracket-grid").innerHTML = SCHEDULE.map((r) => `
<div class="round${r.final ? " final" : ""}">
  <h4><span>${esc(r.stage)}</span><span>${esc(r.date || "Огноо удахгүй")}</span></h4>
  <div class="matches">${r.matches.map((m) => `
    <div class="match">
      <div class="match-meta"><span>${r.final ? "★ Аваргын тоглолт" : "Тоглолт " + ++matchNo}</span><span>${esc(m.format || "")}</span></div>
      ${side(m.a, m.sa, m.sb)}${side(m.b, m.sb, m.sa)}
    </div>`).join("")}
  </div>
</div>`).join("");

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

// ---- Тоолуур ----
// LCD самбар: огноо тодорхойгүй бол тоонууд эргэлдэж "Coming soon" хүлээлт үүсгэнэ.
$("#cd").innerHTML = `<div class="soon${SEASON_START ? "" : " tba"}">
  <div class="soon-top"><i class="led"></i><span id="soon-t">Season 03 · Coming soon</span><i class="led"></i></div>
  <div class="lcd">${["Өдөр", "Цаг", "Мин", "Сек"].map((l, i) =>
    `${i ? '<b class="colon">:</b>' : ""}<div class="seg"><span class="ghost">88</span><span class="dig">--</span><small>${l}</small></div>`).join("")}</div>
  <div class="soon-bar"><i></i></div>
  <div class="soon-note" id="soon-note"></div>
</div>`;
const digs = [...$("#cd").querySelectorAll(".dig")];
const setDigs = (vals) => digs.forEach((d, i) => (d.textContent = vals[i]));
function countdown() {
  if (!SEASON_START) {
    $("#soon-note").textContent = "Эхлэх огноо удахгүй зарлагдана";
    $("#status-t").textContent = "COMING SOON";
    if (calm) return setDigs(["--", "--", "--", "--"]);
    const rnd = () => String(Math.floor(Math.random() * 100)).padStart(2, "0");
    setInterval(() => {
      const scramble = Date.now() % 4000 < 1600;
      setDigs(scramble ? digs.map(rnd) : ["--", "--", "--", "--"]);
    }, 70);
    return;
  }
  const start = new Date(SEASON_START);
  const ub = new Date(start.getTime() + 8 * 3600e3), p2 = (n) => String(n).padStart(2, "0"); // Улаанбаатарын цаг
  $("#soon-note").textContent = `Эхлэх: ${ub.getUTCMonth() + 1} сарын ${ub.getUTCDate()} · ${p2(ub.getUTCHours())}:${p2(ub.getUTCMinutes())}`;
  const tick = () => {
    const diff = start - Date.now();
    if (diff <= 0) {
      setDigs(["00", "00", "00", "00"]);
      $("#soon-t").textContent = "Season 03 · LIVE";
      $("#soon-note").textContent = "Эхэллээ! GL HF";
      $("#status").classList.add("live"); $("#status-t").textContent = "LIVE";
      return;
    }
    const x = Math.floor(diff / 1000), p = (n) => String(n).padStart(2, "0");
    setDigs([p(Math.floor(x / 86400)), p(Math.floor(x / 3600) % 24), p(Math.floor(x / 60) % 60), p(x % 60)]);
    $("#soon-t").textContent = "Season 03 · Тоолол эхэллээ";
    $("#status-t").textContent = Math.floor(x / 86400) + " ӨДӨР ҮЛДЛЭЭ";
    setTimeout(tick, 1000);
  };
  tick();
}
countdown();

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
  return { ...m, rounds, ps, time: new Date(m.date) };
}).sort((x, y) => y.time - x.time);

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
function renderGames() {
  $("#games").innerHTML = games.map((g) => {
    const best = {};
    G_COLS.filter((k) => k !== "pm").forEach((k) => {
      const vals = g.ps.map((p) => p[k]).filter((v) => v != null);
      if (vals.length) best[k] = LOW_BETTER.has(k) ? Math.min(...vals) : Math.max(...vals);
    });
    const mvp = [...g.ps].sort((x, y) => (y.rating ?? 0) - (x.rating ?? 0))[0];
    const draw = g.sa === g.sb;
    const res = (won) => (draw ? "" : won ? "win" : "lose");
    const team = (side) => {
      const name = side === "a" ? g.a : g.b, won = side === "a" ? g.sa > g.sb : g.sb > g.sa;
      const rows = g.ps.filter((p) => p.side === side).sort((x, y) => (y.rating ?? 0) - (x.rating ?? 0) || y.k - x.k);
      return `<div class="g-team"><h4>${esc(name)} <span class="res ${res(won)}">${draw ? "🤝 Тэнцсэн" : won ? "✅ Хожсон" : "❌ Хожигдсон"}</span></h4>
        <div class="tbl-wrap"><table class="sb"><thead><tr><th scope="col" class="pc">Тоглогч</th>${G_COLS.map((k) => headTh(k)).join("")}</tr></thead>
        <tbody>${rows.map((p) => `<tr>${whoCell(p)}${G_COLS.map((k) => cell(k, p[k], {
          star: k !== "pm" && best[k] > 0 && p[k] === best[k],
          txt: k === "adr" && p.adr != null ? String(Math.round(p.adr)) : undefined
        })).join("")}</tr>`).join("")}</tbody></table></div></div>`;
    };
    return `<article class="game">
      <header class="g-head" style="--img:url(assets/maps/${esc(g.map.toLowerCase())}.jpg)">
        <div class="g-meta"><span class="g-map">🗺️ ${esc(g.map)}</span><span>📅 ${ubTime(g.time)}</span>${g.halves ? `<span>⏱️ Хагас: ${esc(g.halves)}</span>` : ""}<span>🔢 ${g.rounds} раунд</span></div>
        <div class="g-score"><span class="tn ${res(g.sa > g.sb)}">${esc(g.a)}</span><b class="${res(g.sa > g.sb)}">${g.sa}</b><i>:</i><b class="${res(g.sb > g.sa)}">${g.sb}</b><span class="tn ${res(g.sb > g.sa)}">${esc(g.b)}</span></div>
        ${mvp && mvp.rating != null ? `<div class="g-mvp">👑 MVP · ${esc(mvp.name)} · ${mvp.rating.toFixed(2)}</div>` : "<div></div>"}
      </header>
      ${team("a")}${team("b")}
      <p class="g-foot">★ = тоглолтын шилдэг тоо${g.source ? " · Эх сурвалж: " + esc(g.source) : ""}</p>
    </article>`;
  }).join("") || `<p class="lb-empty">Одоогоор тоглолт алга</p>`;
}

// ---- Тайлбар ----
$("#legend").innerHTML = ["rating", "adr", "kd", "k", "d", "a", "pm", "kast", "ok", "tk", "ud", "ef"]
  .map((k) => `<div><span class="e" aria-hidden="true">${STAT[k][0]}</span><b>${esc(STAT[k][1])}</b><p>${esc(STAT[k][2])}</p></div>`).join("");

const steamName = new Map([...Object.entries(NICKS)].reverse().map(([nick, p]) => [p, nick]));
const idle = TEAMS.flatMap((t) => t.players).filter((p) => !board.some((s) => s.key === p)).map((p) => steamName.get(p) || p);
$("#st-sum").textContent = `${games.length} тоглолт · ${board.length} тоглогч`;
$("#idle").textContent = idle.length ? `⏳ Одоогоор статистикгүй: ${idle.join(", ")}` : "";
renderHighlights(); renderBoard(); renderGames();
