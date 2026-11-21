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

// ===== ADR статистик (Supabase) =====
// Унших: хэн ч. Нэмэх/устгах: админ PIN шаардана (сервер талд шалгана).
const SB_URL = "https://fhsodtjkcvpgydkllrcv.supabase.co";
const SB_KEY = "sb_publishable_arwnPNC-cyRlAZAnROSaUg_DcaorOQK"; // нийтэд нээлттэй түлхүүр
async function sb(path, opts = {}) {
  const r = await fetch(SB_URL + "/rest/v1/" + path, {
    ...opts, headers: { apikey: SB_KEY, "Content-Type": "application/json", ...(opts.headers || {}) }
  });
  if (!r.ok) throw new Error(r.status + " " + (await r.text()));
  return r.status === 204 ? null : r.json();
}
const rpc = (fn, args) => sb("rpc/" + fn, { method: "POST", body: JSON.stringify(args) });
const teamOf = (p) => TEAMS.find((t) => t.players.includes(p));
const store = {
  get: () => { try { return sessionStorage.getItem("cs2-pin"); } catch (e) { return null; } },
  set: (v) => { try { v ? sessionStorage.setItem("cs2-pin", v) : sessionStorage.removeItem("cs2-pin"); } catch (e) {} }
};
let adrRows = [];

function renderLeaderboard() {
  const by = new Map();
  adrRows.forEach((r) => {
    const s = by.get(r.player) || { player: r.player, sum: 0, n: 0, best: 0 };
    s.sum += +r.adr; s.n++; s.best = Math.max(s.best, +r.adr);
    by.set(r.player, s);
  });
  TEAMS.flatMap((t) => t.players).forEach((p) => { if (!by.has(p)) by.set(p, { player: p, sum: 0, n: 0, best: 0 }); });
  const list = [...by.values()].map((s) => ({ ...s, avg: s.n ? s.sum / s.n : -1 })).sort((a, b) => b.avg - a.avg || a.player.localeCompare(b.player));
  const top = Math.max(list[0].avg, 1);
  $("#lb").innerHTML = `<div class="lb-grid">${list.map((s, i) => {
    const t = teamOf(s.player), col = t ? t.color : "#777", none = !s.n;
    const tip = (t ? "TEAM " + t.name : "") + (none ? " · тоглоогүй" : ` · ${s.n} тоглолт · шилдэг ${s.best.toFixed(1)}`);
    return `<div class="lbi${none ? " none" : i < 3 ? " r" + (i + 1) : ""}" style="--col:${col}" title="${esc(tip)}">
      <span class="rk">${none ? "–" : i + 1}</span>
      <span class="nm2"><i class="dot"></i>${esc(s.player)}</span>
      <span class="bar"><i style="--w:${none ? 0 : ((s.avg / top) * 100).toFixed(1)}%"></i></span>
      <span class="avg">${none ? "—" : s.avg.toFixed(1)}</span>
      <span class="cnt">${none ? "" : "×" + s.n}</span>
    </div>`;
  }).join("")}</div>`;
}
function renderRecent() {
  $("#recent").innerHTML = adrRows.slice(0, 40).map((r) =>
    `<li><b>${esc(r.player)}</b><span>${(+r.adr).toFixed(1)}</span><span class="rm">${esc(r.match_label || "")}</span>
      <time>${new Date(r.created_at).toLocaleDateString("mn-MN")}</time>
      <button type="button" data-del="${r.id}" aria-label="${esc(r.player)} ${(+r.adr).toFixed(1)} устгах">✕</button></li>`
  ).join("") || `<li>Одоогоор алга</li>`;
}
async function loadAdr() {
  try {
    adrRows = await sb("adr_entries?select=id,player,adr,match_label,created_at&order=created_at.desc&limit=2000");
    renderLeaderboard(); renderRecent();
  } catch (e) {
    adrRows = []; renderLeaderboard(); $("#lb").insertAdjacentHTML("afterbegin", `<div class="lb-empty err">Статистикийн сервертэй холбогдож чадсангүй. Оноо хараахан хадгалагдахгүй.</div>`);
    console.error(e);
  }
}

// Оноо оруулах форм (4 баг × 5 тоглогч)
$("#adr-groups").innerHTML = TEAMS.map((t) => `
  <fieldset class="adr-group" style="--col:${t.color}"><legend>${esc(t.name)}</legend>
    ${t.players.map((p) => `<label><span>${esc(p)}</span><input type="number" inputmode="decimal" min="0" max="999" step="0.1" data-player="${esc(p)}" placeholder="—" enterkeyhint="next"></label>`).join("")}
  </fieldset>`).join("");
const adrInputs = [...$("#adr-groups").querySelectorAll("input")];
const msg = (text, ok) => { const el = $("#panel-msg"); el.textContent = text; el.className = "msg " + (ok ? "ok" : "err"); };
const PIN_ERR = { bad: "PIN буруу байна.", locked: "Хэт олон буруу оролдлого. 10 минутын дараа дахин оролдоно уу." };
const currentPin = () => store.get() || $("#pin").value.trim();
function syncPinUi() {
  const saved = !!store.get();
  $("#pin-field").hidden = saved;
  $("#admin-logout").hidden = !saved;
  $("#recent").classList.toggle("can-del", saved);
}
// Enter → дараагийн тоглогч (сүүлчийнх дээр Enter = хадгалах)
adrInputs.forEach((inp, i) => inp.addEventListener("keydown", (e) => {
  if (e.key !== "Enter") return;
  e.preventDefault();
  if (i < adrInputs.length - 1) adrInputs[i + 1].focus(); else $("#adr-form").requestSubmit();
}));
$("#adr-clear").onclick = () => { adrInputs.forEach((i) => (i.value = "")); $("#match-label").value = ""; msg("", true); };
$("#admin-logout").onclick = () => { store.set(null); syncPinUi(); msg("PIN-ээс гарлаа.", true); };
$("#adr-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const entries = adrInputs.filter((i) => i.value.trim() !== "")
    .map((i) => ({ player: i.dataset.player, adr: Math.round(parseFloat(i.value) * 10) / 10 }));
  if (!entries.length) return msg("Дор хаяж нэг тоглогчийн ADR оруулна уу.", false);
  if (entries.some((x) => !(x.adr >= 0 && x.adr <= 999))) return msg("ADR 0-999 хооронд байх ёстой.", false);
  const pin = currentPin();
  if (!pin) { $("#pin").focus(); return msg("Админ PIN оруулна уу.", false); }
  $("#adr-save").disabled = true; msg("Хадгалж байна…", true);
  try {
    const res = await rpc("add_adr_batch", { p_pin: pin, p_match: $("#match-label").value, p_entries: entries });
    if (res.status !== "ok") {
      if (res.status === "bad") { store.set(null); syncPinUi(); $("#pin").value = ""; $("#pin").focus(); }
      return msg(PIN_ERR[res.status] || "Алдаа гарлаа.", false);
    }
    store.set(pin); $("#pin").value = ""; syncPinUi();
    adrInputs.forEach((i) => (i.value = ""));
    msg(`${res.added} тоглогчийн оноо нэмэгдлээ ✓`, true);
    await loadAdr();
  } catch (err) { msg("Хадгалж чадсангүй. Сервер эсвэл интернэтээ шалгана уу.", false); console.error(err); }
  finally { $("#adr-save").disabled = false; }
});
$("#recent").addEventListener("click", async (e) => {
  const b = e.target.closest("[data-del]");
  if (!b || !store.get() || !confirm("Энэ оноог устгах уу?")) return;
  try {
    const res = await rpc("delete_adr", { p_pin: store.get(), p_id: +b.dataset.del });
    if (res.status !== "ok") return msg(PIN_ERR[res.status] || "Алдаа гарлаа.", false);
    await loadAdr();
  } catch (err) { msg("Устгаж чадсангүй.", false); }
});
syncPinUi();
loadAdr();
