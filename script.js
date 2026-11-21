// ===== ТОХИРГОО: эндээс засна =====
// Season 3 эхлэх огноо (ISO). Мэдэгдэхгүй бол null.
// Жишээ: "2026-12-05T20:00:00+08:00" (Улаанбаатар = +08:00)
const SEASON_START = null;

const TEAMS = [
  { name: "USUHUU",  color: "#ffe14d", hp: 90,  players: ["USUHUU","ODKO","TUUGUU","BALU","SARAA"] },
  { name: "JOEY",    color: "#ff4fa3", hp: 70,  players: ["JOEY","GANBAA","BABU","ERDENEE","MISHEEL"] },
  { name: "DAVKA",   color: "#4de1ff", hp: 100, players: ["DAVKA","TUGSUU","EEGII","BRAZIL","LIGDEN"] },
  { name: "UUGANAA", color: "#5dff7a", hp: 55,  players: ["UUGANAA","CHAAGII","BOOGII","GORI","TSETSEN"] }
];
const MAPS = ["Mirage","Inferno","Nuke","Ancient","Anubis","Dust2","Overpass"];
const SCHEDULE = [
  { wk: "WEEK 1", lines: ["USUHUU vs JOEY", "DAVKA vs UUGANAA"], date: "[ОГНОО]", color: "#4de1ff" },
  { wk: "WEEK 2", lines: ["Хожсон vs Хожсон", "Хожигдсон vs Хожигдсон"], date: "[ОГНОО]", color: "#5dff7a" },
  { wk: "FINAL BOSS", lines: ["ГРАНД ФИНАЛ · BO3"], date: "[ОГНОО]", color: "#ff4fa3" }
];
// ===================================

const $ = (id) => document.getElementById(id);

// pixel тоглогч
const sprite = (c) => `<svg viewBox="0 0 8 8" width="128" height="128" shape-rendering="crispEdges" aria-hidden="true">
<rect x="2" y="0" width="4" height="1" fill="${c}"/><rect x="1" y="1" width="6" height="3" fill="${c}"/>
<rect x="2" y="2" width="1" height="1" fill="#140b2b"/><rect x="5" y="2" width="1" height="1" fill="#140b2b"/>
<rect x="1" y="4" width="6" height="2" fill="${c}"/><rect x="0" y="4" width="1" height="2" fill="#fff"/><rect x="7" y="4" width="1" height="2" fill="#fff"/>
<rect x="2" y="6" width="2" height="2" fill="${c}"/><rect x="4" y="6" width="2" height="2" fill="${c}"/></svg>`;

$("team-grid").innerHTML = TEAMS.map((t) =>
  `<article class="team" style="--col:${t.color}"><div class="sprite">${sprite(t.color)}</div><h3>TEAM ${t.name}</h3><ul>${t.players.map((p) => `<li>${p}</li>`).join("")}</ul><div class="hpl">HP</div><div class="hp"><i style="width:${t.hp}%"></i></div></article>`
).join("");

$("schedule-grid").innerHTML = SCHEDULE.map((s) =>
  `<div class="match" style="--col:${s.color}"><div class="px">${s.wk}</div><div>${s.lines.join("<br>")}<small>${s.date}</small></div></div>`
).join("");

// Map veto
let banned = new Set();
function renderMaps() {
  const left = MAPS.filter((m) => !banned.has(m));
  $("map-grid").innerHTML = "";
  MAPS.forEach((m) => {
    const out = banned.has(m), win = left.length === 1 && !out;
    const b = document.createElement("button");
    b.type = "button";
    b.className = "map" + (out ? " out" : "") + (win ? " win" : "");
    b.innerHTML = `${m}<small>${out ? "ХАСАГДСАН" : win ? "СОНГОГДСОН" : "ИДЭВХТЭЙ"}</small>`;
    b.onclick = () => { sfx(out ? 520 : 180); if (out) banned.delete(m); else if (left.length > 1) banned.add(m); renderMaps(); };
    $("map-grid").appendChild(b);
  });
  $("remaining").textContent = left.length === 1 ? left[0] : left.length + " map";
}
$("reset").onclick = () => { banned = new Set(); renderMaps(); };
renderMaps();

// Countdown
function tick() {
  if (!SEASON_START) { $("cd-label").textContent = "ЭХЛЭХ ОГНОО:"; $("cd-text").textContent = "УДАХГҮЙ ЗАР БОЛНО"; return; }
  const diff = new Date(SEASON_START) - new Date();
  if (diff <= 0) { $("cd-label").textContent = "SEASON 3"; $("cd-text").textContent = "ЭХЭЛЛЭЭ!"; return; }
  const s = Math.floor(diff / 1000), p = (n) => String(n).padStart(2, "0");
  $("cd-text").textContent = `${Math.floor(s / 86400)} ӨДӨР ${p(Math.floor(s / 3600) % 24)}:${p(Math.floor(s / 60) % 60)}:${p(s % 60)}`;
  setTimeout(tick, 1000);
}
tick();

// ===== Дуу: 8-bit хөгжим + coin дуу (Web Audio) =====
let ctx;
const audio = () => (ctx = ctx || new (window.AudioContext || window.webkitAudioContext)());
function tone(f, t0, dur, type = "square", vol = 0.05) {
  const a = audio(), o = a.createOscillator(), g = a.createGain();
  o.type = type; o.frequency.value = f;
  g.gain.setValueAtTime(vol, t0); g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  o.connect(g); g.connect(a.destination); o.start(t0); o.stop(t0 + dur + 0.01);
}
function sfx(f) { try { tone(f, audio().currentTime, 0.12, "square", 0.06); } catch (e) {} }
function coinSound() { try { const t = audio().currentTime; tone(988, t, 0.08); tone(1319, t + 0.08, 0.3); } catch (e) {} }

const MELODY = [330,0,392,0,440,0,392,0, 330,0,262,0,294,0,330,0, 349,0,440,0,523,0,440,0, 392,0,330,0,294,0,262,0];
const BASS   = [110,110,110,110,98,98,98,98,87,87,87,87,98,98,98,98];
let music = false, step = 0, timer;
function musicTick() {
  const t = audio().currentTime, i = step % MELODY.length;
  if (MELODY[i]) tone(MELODY[i], t, 0.14, "square", 0.04);
  if (i % 2 === 0) tone(BASS[(i / 2) % BASS.length], t, 0.2, "triangle", 0.07);
  step++;
}
$("music").onclick = () => {
  music = !music;
  if (music) { audio().resume(); timer = setInterval(musicTick, 150); } else { clearInterval(timer); }
  $("music").textContent = "♪ MUSIC: " + (music ? "ON" : "OFF");
  $("music").setAttribute("aria-pressed", music);
};

$("coin").onclick = () => {
  coinSound();
  $("coin-box").hidden = true;
  $("ready").hidden = false;
};
