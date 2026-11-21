// ===== ТОХИРГОО: эндээс засна =====
// Season 3 эхлэх огноо (ISO). Мэдэгдэхгүй бол null.
// Жишээ: "2026-12-05T20:00:00+08:00" (Улаанбаатар = +08:00)
const SEASON_START = null;

const TEAMS = [
  { name: "USUHUU",  color: "#ffc400", poster: "assets/usuhuu.jpg",  players: ["USUHUU","ODKO","TUUGUU","BALU","SARAA"] },
  { name: "JOEY",    color: "#ff4fa3", poster: "assets/joey.jpg",    players: ["JOEY","GANBAA","BABU","ERDENEE","MISHEEL"] },
  { name: "DAVKA",   color: "#4de1ff", poster: "assets/davka.jpg",   players: ["DAVKA","TUGSUU","EEGII","BRAZIL","LIGDEN"] },
  { name: "UUGANAA", color: "#5dff7a", poster: "assets/uuganaa.jpg", players: ["UUGANAA","CHAAGII","BOOGII","GORI","TSETSEN"] }
];

const MAPS = ["Mirage","Inferno","Nuke","Ancient","Anubis","Dust2","Overpass"];

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

const CHAMPIONS = [
  { season: "Season 01", team: "D13" },
  { season: "Season 02", team: "NONAME" }
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

// ---- MVP ----
const silhouette = `<svg viewBox="0 0 200 240" aria-hidden="true"><circle cx="100" cy="86" r="44" fill="currentColor"/><path d="M14 240c0-58 38-96 86-96s86 38 86 96Z" fill="currentColor"/></svg>`;
const crown = `<svg class="crown" viewBox="0 0 24 16" aria-hidden="true"><path d="M3 12.5 1.5 3l6 4.5L12 1l4.5 6.5 6-4.5-1.5 9.5Zm0 2h18" fill="currentColor" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/></svg>`;
$("#mvp-grid").innerHTML = MVPS.map((m, i) => `
<article class="mvp">
  <div class="mvp-frame"><div class="mvp-in">
    <div class="mvp-photo">
      <img src="${esc(m.photo)}" alt="${esc(m.season)} MVP ${esc(m.name)}">
      <div class="ph">${silhouette}<small>Зураг: ${esc(m.photo)}</small></div>
    </div>
    <span class="big-no" aria-hidden="true">${String(i + 1).padStart(2, "0")}</span>
    <span class="ribbon">${esc(m.season)} · MVP</span>
    <div class="mvp-info">${crown}<div class="mvp-name">${esc(m.name)}</div><div class="mvp-sub">Most valuable player</div></div>
  </div></div>
</article>`).join("") + `
<article class="mvp next">
  <div class="mvp-frame"><div class="mvp-in">
    <div class="mvp-photo nophoto"><div class="ph">${silhouette}</div></div>
    <span class="q" aria-hidden="true">?</span>
    <span class="ribbon">Season 03 · MVP</span>
    <div class="mvp-info">${crown}<div class="mvp-name"><span id="mvp-slot">???</span></div><div class="mvp-sub">Хэн болох вэ?</div></div>
  </div></div>
</article>`;
$("#mvp-grid").querySelectorAll(".mvp-photo img").forEach((img) => {
  const miss = () => { img.parentNode.classList.add("nophoto"); img.remove(); };
  img.addEventListener("error", miss);
});
if (!calm) {
  const pool = TEAMS.flatMap((t) => t.players).sort(() => Math.random() - 0.5);
  const slot = $("#mvp-slot");
  let k = 0;
  setInterval(() => {
    slot.textContent = pool[k++ % pool.length];
    slot.classList.remove("tick"); void slot.offsetWidth; slot.classList.add("tick");
  }, 1200);
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
  Overpass: ["#7f8f6d", "#20251c"]
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
      style="--c1:${c1};--c2:${c2}" ${ban || done ? "disabled" : ""} aria-label="${esc(m)}${st ? ", " + esc(st) : ""}">
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

// ---- Аваргууд ----
const trophy = `<svg class="trophy" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4h10v3a5 5 0 0 1-10 0V4Zm10 1h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3m5 2v4m-4 4h8m-6-4h4l1 4H9l1-4Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>`;
$("#hof").innerHTML = CHAMPIONS.map((c) =>
  `<article class="champ">${trophy}<div class="s">${esc(c.season)}</div><div class="n">${esc(c.team)}</div><p>Аварга баг</p></article>`
).join("") + `<article class="champ next">${trophy}<div class="s">Season 03</div><div class="n">???</div><p>Дараагийн аварга хэн бэ?</p></article>`;

// ---- Тоолуур ----
function countdown() {
  const el = $("#cd");
  if (!SEASON_START) {
    el.innerHTML = `<div class="cd-box wide"><span>Эхлэх огноо</span><b>Удахгүй зарлана</b></div>`;
    $("#status-t").textContent = "УДАХГҮЙ";
    return;
  }
  const diff = new Date(SEASON_START) - Date.now();
  if (diff <= 0) {
    el.innerHTML = `<div class="cd-box wide"><span>Season 03</span><b>Эхэллээ!</b></div>`;
    $("#status").classList.add("live");
    $("#status-t").textContent = "LIVE";
    return;
  }
  const s = Math.floor(diff / 1000), p = (n) => String(n).padStart(2, "0");
  el.innerHTML = [[Math.floor(s / 86400), "Өдөр"], [p(Math.floor(s / 3600) % 24), "Цаг"], [p(Math.floor(s / 60) % 60), "Мин"], [p(s % 60), "Сек"]]
    .map(([v, l]) => `<div class="cd-box"><b>${v}</b><span>${l}</span></div>`).join("");
  $("#status-t").textContent = Math.floor(s / 86400) + " ӨДӨР ҮЛДЛЭЭ";
  setTimeout(countdown, 1000);
}
countdown();
