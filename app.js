// ============================================================
// DONNÉES
// ============================================================
let taches = JSON.parse(localStorage.getItem('taches')) || [];
let categories = JSON.parse(localStorage.getItem('categories')) || [
  { id:'cat-1', nom:'Études',   icon:'📚', couleur:'#8b5cf6' },
  { id:'cat-2', nom:'Code',     icon:'💻', couleur:'#06b6d4' },
  { id:'cat-3', nom:'Contenu',  icon:'🎬', couleur:'#c9a84c' },
  { id:'cat-4', nom:'Ménage',   icon:'🏠', couleur:'#10b981' },
  { id:'cat-5', nom:'Veille',   icon:'👁️', couleur:'#f59e0b' },
];
let theme = localStorage.getItem('theme') || 'dark';
let pomoHistory = JSON.parse(localStorage.getItem('pomo-history')) || [];
let charts = {};
let modalTacheId = null;
let semaineOffset = 0;
let catFiltreActif = null;

// ============================================================
// INIT
// ============================================================
if (theme === 'dark') document.body.classList.add('dark');
updateThemeBtn();
if ('Notification' in window) Notification.requestPermission();
majCategoriesSelect();
majDashboard();
majBellBadge();
afficher();
genererRecurrentes();
taches.forEach(t => { if (t.echeance && t.heure && !t.faite) demanderNotif(t.texte, t.echeance, t.heure); });
document.getElementById('new-task').addEventListener('keydown', e => { if (e.key === 'Enter') ajouterTache(); });
document.getElementById('new-subtask').addEventListener('keydown', e => { if (e.key === 'Enter') ajouterSousTache(); });
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') fermerModalBtn();
  if (e.key === 'n' && !['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)) {
    showPage('taches', document.querySelector('[data-page="taches"]'));
    document.getElementById('new-task').focus();
  }
});
document.getElementById('is-recurrente').addEventListener('change', function() {
  document.getElementById('recurrence-type').style.display = this.checked ? 'block' : 'none';
  document.getElementById('recurrence-jours').style.display = 'none';
});
document.getElementById('recurrence-type').addEventListener('change', function() {
  document.getElementById('recurrence-jours').style.display = this.value === 'personnalise' ? 'block' : 'none';
});

// ============================================================
// SONS
// ============================================================
let audioCtx = null;
function getAudio() { if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)(); return audioCtx; }
function playSound(type) {
  try {
    const ctx = getAudio();
    const configs = {
      add:    [[520,0],[780,.15]],
      done:   [[440,0],[660,.1],[880,.2]],
      delete: [[300,0],[100,.2]],
      notif:  [[523,0],[659,.15],[784,.3]],
      pomo:   [[784,0],[659,.15],[523,.3],[392,.45]],
    };
    (configs[type] || configs.add).forEach(([freq, t]) => {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.connect(g); g.connect(ctx.destination);
      o.frequency.setValueAtTime(freq, ctx.currentTime + t);
      g.gain.setValueAtTime(0.18, ctx.currentTime + t);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + t + 0.18);
      o.start(ctx.currentTime + t); o.stop(ctx.currentTime + t + 0.18);
    });
  } catch(e) {}
}

// ============================================================
// TOAST
// ============================================================
function showToast(msg) {
  const t = document.getElementById('notif-toast');
  t.textContent = msg; t.classList.add('show');
  clearTimeout(t._to);
  t._to = setTimeout(() => t.classList.remove('show'), 3500);
}

// ============================================================
// NOTIFICATIONS
// ============================================================
function demanderNotif(texte, echeance, heure) {
  if (!echeance || !heure) return;
  const delta = new Date(`${echeance}T${heure}`) - new Date();
  if (delta <= 0) return;
  setTimeout(() => {
    playSound('notif'); showToast('🔔 Rappel : ' + texte);
    if (Notification.permission === 'granted') new Notification('📋 Rappel', { body: texte });
    majBellBadge();
  }, delta);
}
function majBellBadge() {
  const today = new Date().toISOString().split('T')[0];
  const n = taches.filter(t => t.echeance && t.echeance <= today && !t.faite).length;
  const b = document.getElementById('bell-badge');
  b.style.display = n > 0 ? 'inline' : 'none'; b.textContent = n;
}

// ============================================================
// SAUVEGARDE
// ============================================================
function sauvegarder() {
  localStorage.setItem('taches', JSON.stringify(taches));
  localStorage.setItem('categories', JSON.stringify(categories));
  majDashboard(); majBellBadge();
}

// ============================================================
// NAVIGATION
// ============================================================
function showPage(page, btn) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('actif'));
  document.getElementById('page-' + page).classList.add('active');
  if (btn) btn.classList.add('actif');
  else { const b = document.querySelector(`[data-page="${page}"]`); if (b) b.classList.add('actif'); }
  const titles = { dashboard:'Dashboard', taches:'Tâches', semaine:'Vue Semaine', categories:'Catégories', recurrentes:'Récurrentes', pomodoro:'🍅 Pomodoro', rappels:'Rappels', collab:'Partage' };
  document.getElementById('topbar-title').textContent = titles[page] || '';
  if (page === 'dashboard')   majDashboard();
  if (page === 'semaine')     renderSemaine();
  if (page === 'categories')  renderCategories();
  if (page === 'recurrentes') renderRecurrentes();
  if (page === 'pomodoro')    renderPomoHistory();
  if (page === 'rappels')     afficherRappels();
  if (window.innerWidth <= 700) { document.getElementById('sidebar').classList.remove('open'); document.getElementById('overlay').classList.remove('show'); }
}
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('overlay').classList.toggle('show');
}

// ============================================================
// CATEGORIES SELECT
// ============================================================
function majCategoriesSelect() {
  const sel = document.getElementById('categorie-select');
  sel.innerHTML = '<option value="">📁 Catégorie...</option>';
  categories.forEach(c => { sel.innerHTML += `<option value="${c.id}">${c.icon} ${c.nom}</option>`; });

  const bar = document.getElementById('cat-filtre-bar');
  bar.innerHTML = '<button class="cat-filtre-btn actif" onclick="setCatFiltre(null,this)">Toutes</button>';
  categories.forEach(c => {
    bar.innerHTML += `<button class="cat-filtre-btn" onclick="setCatFiltre('${c.id}',this)" style="border-color:${c.couleur}33;color:${c.couleur}">${c.icon} ${c.nom}</button>`;
  });

  const sel2 = document.getElementById('pomo-tache-select');
  if (sel2) {
    sel2.innerHTML = '<option value="">— Aucune tâche liée —</option>';
    taches.filter(t => !t.faite).forEach(t => { sel2.innerHTML += `<option value="${t.id}">${t.texte}</option>`; });
  }
}
function setCatFiltre(catId, btn) {
  catFiltreActif = catId;
  document.querySelectorAll('.cat-filtre-btn').forEach(b => b.classList.remove('actif'));
  btn.classList.add('actif');
  afficher(filtreActif());
}

// ============================================================
// AJOUTER TACHE
// ============================================================
function ajouterTache() {
  const input = document.getElementById('new-task');
  const texte = input.value.trim();
  if (!texte) return;
  const priorite   = document.getElementById('priorite').value;
  const catId      = document.getElementById('categorie-select').value;
  const echeance   = document.getElementById('echeance').value;
  const heure      = document.getElementById('heure-rappel').value;
  const heureFin   = document.getElementById('heure-fin').value;
  const note       = document.getElementById('new-note').value.trim();
  const isRecur    = document.getElementById('is-recurrente').checked;
  const recurType  = document.getElementById('recurrence-type').value;
  const recurJours = parseInt(document.getElementById('recurrence-jours').value) || null;

  let dureeMinutes = null;
  if (heure && heureFin) {
    const [h1,m1] = heure.split(':').map(Number);
    const [h2,m2] = heureFin.split(':').map(Number);
    dureeMinutes = (h2*60+m2) - (h1*60+m1);
    if (dureeMinutes <= 0) { showToast('⚠️ L\'heure de fin doit être après le début'); return; }
  }

  const t = {
    id: Date.now(), texte, faite: false, priorite,
    catId: catId || null, echeance: echeance || null,
    heure: heure || null, heureFin: heureFin || null, dureeMinutes,
    note: note || '', sousTaches: [],
    creee: new Date().toISOString(),
    recurrente: isRecur,
    recurType: isRecur ? recurType : null,
    recurJours: (isRecur && recurType === 'personnalise') ? recurJours : null,
    derniereGen: isRecur ? new Date().toISOString().split('T')[0] : null,
  };
  taches.unshift(t);
  sauvegarder(); afficher(filtreActif());
  demanderNotif(texte, echeance, heure);
  playSound('add');
  const extra = dureeMinutes ? ` · ⏱ ${dureeMinutes} min` : '';
  showToast('✅ Tâche ajoutée' + (isRecur ? ' (récurrente)' : '') + extra);
  input.value = '';
  ['echeance','heure-rappel','heure-fin','new-note'].forEach(id => { document.getElementById(id).value = ''; });
  document.getElementById('is-recurrente').checked = false;
  document.getElementById('recurrence-type').style.display = 'none';
  document.getElementById('recurrence-jours').style.display = 'none';
  document.getElementById('recurrence-jours').value = '';
  majCategoriesSelect();
  input.focus();
}

// ============================================================
// AFFICHER TACHES
// ============================================================
function afficher(filtre = 'toutes') {
  const liste = document.getElementById('liste-taches');
  const recherche = document.getElementById('recherche').value.toLowerCase();
  const today = new Date().toISOString().split('T')[0];
  liste.innerHTML = '';

  let visibles = taches.filter(t => {
    if (filtre === 'actives')   return !t.faite;
    if (filtre === 'terminees') return t.faite;
    if (filtre === 'haute')     return t.priorite === 'haute' && !t.faite;
    if (filtre === 'retard')    return t.echeance && t.echeance < today && !t.faite;
    return true;
  });
  if (catFiltreActif) visibles = visibles.filter(t => t.catId === catFiltreActif);
  if (recherche) visibles = visibles.filter(t => t.texte.toLowerCase().includes(recherche) || (t.note && t.note.toLowerCase().includes(recherche)));

  if (visibles.length === 0) { liste.innerHTML = '<div class="empty">Aucune tâche ici 🎉</div>'; majCompteur(); return; }

  visibles.forEach(t => {
    const cat = categories.find(c => c.id === t.catId);
    const enRetard = t.echeance && t.echeance < today && !t.faite;
    const sousFaites = (t.sousTaches || []).filter(s => s.faite).length;
    const sousTotal  = (t.sousTaches || []).length;

    const li = document.createElement('li');
    if (t.faite) li.classList.add('done-item');

    // Checkbox
    const cb = document.createElement('input'); cb.type = 'checkbox'; cb.checked = t.faite;
    cb.onchange = () => { t.faite = cb.checked; if (t.faite) playSound('done'); sauvegarder(); afficher(filtreActif()); };

    // Body
    const body = document.createElement('div'); body.className = 'task-body';
    body.onclick = () => ouvrirModal(t.id);

    const span = document.createElement('span');
    span.className = 'task-text' + (t.faite ? ' done' : '');
    span.textContent = t.texte;

    const meta = document.createElement('div'); meta.className = 'task-meta';

    // Badge priorité
    const bp = document.createElement('span');
    bp.className = `badge-prio prio-${t.priorite}`;
    bp.textContent = { haute:'🔴 Haute', normale:'🟢 Normale', basse:'🔵 Basse' }[t.priorite];
    meta.appendChild(bp);

    // Badge catégorie
    if (cat) {
      const bc = document.createElement('span'); bc.className = 'badge-cat';
      bc.style.cssText = `background:${cat.couleur}22;color:${cat.couleur};border:.5px solid ${cat.couleur}44`;
      bc.textContent = cat.icon + ' ' + cat.nom; meta.appendChild(bc);
    }
    // Badge date
    if (t.echeance) {
      const bd = document.createElement('span'); bd.className = 'badge-date' + (enRetard ? ' retard' : '');
      bd.textContent = (enRetard ? '⚠️ ' : '📅 ') + formatDate(t.echeance) + (t.heure ? ' ' + t.heure + (t.heureFin ? '→'+t.heureFin : '') : '');
      meta.appendChild(bd);
    }
    // Badge récurrent
    if (t.recurrente) {
      const br = document.createElement('span'); br.className = 'badge-recur';
      br.textContent = '🔁 ' + (t.recurType === 'personnalise' && t.recurJours ? `/${t.recurJours}j` : t.recurType || '');
      meta.appendChild(br);
    }
    // Badge note
    if (t.note) { const bn = document.createElement('span'); bn.className = 'badge-note'; bn.textContent = '📝 Note'; meta.appendChild(bn); }
    // Sous-tâches
    if (sousTotal > 0) { const bs = document.createElement('span'); bs.className = 'subtask-progress'; bs.textContent = `✅ ${sousFaites}/${sousTotal}`; meta.appendChild(bs); }
    // Timer de session
    if (t.dureeMinutes) {
      const bt = document.createElement('span');
      bt.className = 'task-timer-badge' + (timerData.tacheId === t.id ? ' running' : '');
      bt.textContent = (timerData.tacheId === t.id ? '▶ ' : '⏱ ') + t.dureeMinutes + ' min';
      bt.onclick = (e) => { e.stopPropagation(); demarrerTimer(t.id); };
      meta.appendChild(bt);
    }
    // Chrono rapide
    const bch = document.createElement('span'); bch.className = 'task-chrono-badge';
    bch.textContent = (chronoData.tacheId === t.id && chronoData.running ? '⏱ En cours' : '⏱ Chrono');
    bch.onclick = (e) => { e.stopPropagation(); demarrerChrono(t.id, t.texte); };
    meta.appendChild(bch);

    body.appendChild(span); body.appendChild(meta);

    // Actions
    const actions = document.createElement('div'); actions.className = 'task-actions';
    const btnO = document.createElement('button'); btnO.className = 'btn-open'; btnO.textContent = '📂'; btnO.title = 'Détails';
    btnO.onclick = (e) => { e.stopPropagation(); ouvrirModal(t.id); };
    const btnE = document.createElement('button'); btnE.className = 'btn-edit'; btnE.textContent = '✏️';
    btnE.onclick = (e) => { e.stopPropagation(); const n = prompt('Modifier :', t.texte); if (n && n.trim()) { t.texte = n.trim(); sauvegarder(); afficher(filtreActif()); } };
    const btnD = document.createElement('button'); btnD.className = 'btn-del'; btnD.textContent = '🗑️';
    btnD.onclick = (e) => { e.stopPropagation(); playSound('delete'); taches = taches.filter(x => x.id !== t.id); sauvegarder(); afficher(filtreActif()); };
    actions.appendChild(btnO); actions.appendChild(btnE); actions.appendChild(btnD);

    li.appendChild(cb); li.appendChild(body); li.appendChild(actions);
    liste.appendChild(li);
  });
  majCompteur();
}

function supprimerTerminees() {
  if (!taches.some(t => t.faite)) return;
  if (confirm('Supprimer toutes les tâches terminées ?')) {
    playSound('delete'); taches = taches.filter(t => !t.faite); sauvegarder(); afficher(filtreActif());
  }
}
function majCompteur() {
  const total = taches.length, faites = taches.filter(t => t.faite).length, r = total - faites;
  document.getElementById('compteur').textContent = total === 0 ? '' : r === 0 ? '✅ Tout est fait !' : `${r} restante${r>1?'s':''} · ${faites}/${total} faites`;
}
function filtreActif() { const a = document.querySelector('.filtres-bar button.actif'); return a ? a.dataset.filtre : 'toutes'; }
function setFiltre(btn) {
  document.querySelectorAll('.filtres-bar button').forEach(b => b.classList.remove('actif'));
  btn.classList.add('actif'); afficher(btn.dataset.filtre);
}

// ============================================================
// MODAL TACHE
// ============================================================
function ouvrirModal(id) {
  const t = taches.find(x => x.id === id); if (!t) return;
  modalTacheId = id;
  document.getElementById('modal-titre').textContent = t.texte;
  document.getElementById('modal-note').value = t.note || '';
  document.getElementById('report-date').value = t.echeance || '';
  document.getElementById('modal-heure-debut').value = t.heure || '';
  document.getElementById('modal-heure-fin').value = t.heureFin || '';
  renderSousTaches(t);
  document.getElementById('modal-tache').classList.add('open');
}
function fermerModal(e) { if (e.target === document.getElementById('modal-tache')) fermerModalBtn(); }
function fermerModalBtn() { document.getElementById('modal-tache').classList.remove('open'); modalTacheId = null; }
function sauvegarderModal() {
  const t = taches.find(x => x.id === modalTacheId); if (!t) return;
  t.note = document.getElementById('modal-note').value.trim();
  sauvegarder(); afficher(filtreActif()); fermerModalBtn();
  showToast('💾 Tâche mise à jour !');
}
function renderSousTaches(t) {
  const container = document.getElementById('modal-subtasks'); container.innerHTML = '';
  (t.sousTaches || []).forEach((s, i) => {
    const div = document.createElement('div'); div.className = 'subtask-item';
    const cb = document.createElement('input'); cb.type = 'checkbox'; cb.checked = s.faite;
    cb.onchange = () => { s.faite = cb.checked; sauvegarder(); };
    const span = document.createElement('span'); span.className = 'subtask-text' + (s.faite ? ' done' : ''); span.textContent = s.texte;
    const btnD = document.createElement('button'); btnD.className = 'subtask-del'; btnD.textContent = '✕';
    btnD.onclick = () => { t.sousTaches.splice(i, 1); sauvegarder(); renderSousTaches(t); };
    div.appendChild(cb); div.appendChild(span); div.appendChild(btnD); container.appendChild(div);
  });
}
function ajouterSousTache() {
  const input = document.getElementById('new-subtask'); const texte = input.value.trim(); if (!texte) return;
  const t = taches.find(x => x.id === modalTacheId); if (!t) return;
  if (!t.sousTaches) t.sousTaches = [];
  t.sousTaches.push({ texte, faite: false });
  sauvegarder(); renderSousTaches(t); input.value = '';
}
function reporterTache() {
  const t = taches.find(x => x.id === modalTacheId); if (!t) return;
  const date = document.getElementById('report-date').value; if (!date) return;
  t.echeance = date; t.faite = false;
  sauvegarder(); afficher(filtreActif());
  showToast('📅 Reportée au ' + formatDate(date)); fermerModalBtn();
}
function demarrerTimerModal() {
  const debut = document.getElementById('modal-heure-debut').value;
  const fin   = document.getElementById('modal-heure-fin').value;
  const t = taches.find(x => x.id === modalTacheId); if (!t) return;
  if (debut && fin) {
    const [h1,m1] = debut.split(':').map(Number);
    const [h2,m2] = fin.split(':').map(Number);
    const duree = (h2*60+m2) - (h1*60+m1);
    if (duree <= 0) { showToast('⚠️ Heure de fin invalide'); return; }
    t.heure = debut; t.heureFin = fin; t.dureeMinutes = duree;
    sauvegarder();
  }
  fermerModalBtn();
  if (t.dureeMinutes) demarrerTimer(t.id);
}

// ============================================================
// TIMER DE SESSION
// ============================================================
let timerInterval = null;
let timerData = { debut:null, dureeMs:null, tacheId:null, pause:false, tempsEcoule:0 };

function demarrerTimer(tacheId) {
  const t = taches.find(x => x.id === tacheId);
  if (!t || !t.dureeMinutes) { showToast('⚠️ Pas de durée définie pour cette tâche'); return; }
  if (timerInterval) stopTimer();
  timerData = { debut:Date.now(), dureeMs:t.dureeMinutes*60000, tacheId, pause:false, tempsEcoule:0 };
  document.getElementById('timer-ftitle').textContent = '⏱ ' + t.texte;
  document.getElementById('timer-floating').style.display = 'block';
  document.getElementById('timer-pause-btn').textContent = '⏸ Pause';
  timerInterval = setInterval(tickTimer, 1000);
  playSound('add'); showToast('⏱ Timer démarré — ' + t.dureeMinutes + ' min');
  afficher(filtreActif());
}
function tickTimer() {
  if (timerData.pause) return;
  timerData.tempsEcoule += 1000;
  const restant = Math.max(0, timerData.dureeMs - timerData.tempsEcoule);
  const pct = Math.min(100, Math.round(timerData.tempsEcoule / timerData.dureeMs * 100));
  document.getElementById('timer-ftime').textContent = msToHMS(restant);
  document.getElementById('timer-fbar').style.width = pct + '%';
  document.getElementById('timer-fsub').textContent = restant > 0 ? Math.round(restant/60000) + ' min restantes' : '✅ Temps écoulé !';
  if (restant <= 0) {
    clearInterval(timerInterval); timerInterval = null;
    playSound('notif');
    const nom = taches.find(x => x.id === timerData.tacheId)?.texte || '';
    showToast('🎉 Session terminée : ' + nom);
    if (Notification.permission === 'granted') new Notification('⏱ Session terminée !', { body: nom });
    document.getElementById('timer-fbar').style.background = '#10b981';
  }
}
function pauseTimer() {
  timerData.pause = !timerData.pause;
  document.getElementById('timer-pause-btn').textContent = timerData.pause ? '▶ Reprendre' : '⏸ Pause';
}
function stopTimer() {
  clearInterval(timerInterval); timerInterval = null;
  document.getElementById('timer-floating').style.display = 'none';
  timerData = { debut:null, dureeMs:null, tacheId:null, pause:false, tempsEcoule:0 };
  afficher(filtreActif());
}

// ============================================================
// CHRONOMÈTRE RAPIDE (Pomodoro-style pour tâches rapides)
// ============================================================
let chronoInterval = null;
let chronoData = { debut:null, elapsed:0, tacheId:null, running:false, pause:false, laps:[] };

function demarrerChrono(tacheId, nom) {
  if (chronoInterval) {
    if (chronoData.tacheId === tacheId) { chronoStop(); return; }
    chronoStop();
  }
  chronoData = { debut:Date.now(), elapsed:0, tacheId, running:true, pause:false, laps:[], nom };
  document.getElementById('chrono-floating').style.display = 'block';
  document.getElementById('chrono-pause-btn').textContent = '⏸ Pause';
  document.getElementById('chrono-laps').innerHTML = '';
  chronoInterval = setInterval(tickChrono, 1000);
  playSound('add'); showToast('⏱ Chrono lancé pour : ' + nom);
  afficher(filtreActif());
}
function tickChrono() {
  if (chronoData.pause) return;
  chronoData.elapsed += 1000;
  document.getElementById('chrono-time').textContent = msToHMS(chronoData.elapsed);
}
function chronoPause() {
  chronoData.pause = !chronoData.pause;
  document.getElementById('chrono-pause-btn').textContent = chronoData.pause ? '▶ Reprendre' : '⏸ Pause';
}
function chronoLap() {
  const lapTime = msToHMS(chronoData.elapsed);
  const lapN = chronoData.laps.length + 1;
  chronoData.laps.push(lapTime);
  const el = document.createElement('div'); el.className = 'chrono-lap-item';
  el.innerHTML = `<span>Tour ${lapN}</span><span>${lapTime}</span>`;
  document.getElementById('chrono-laps').prepend(el);
  showToast(`🏁 Tour ${lapN} : ${lapTime}`);
}
function chronoStop() {
  clearInterval(chronoInterval); chronoInterval = null;
  const total = msToHMS(chronoData.elapsed);
  document.getElementById('chrono-floating').style.display = 'none';
  if (chronoData.elapsed > 0) showToast(`⏱ Chrono arrêté — ${total}`);
  chronoData = { debut:null, elapsed:0, tacheId:null, running:false, pause:false, laps:[] };
  afficher(filtreActif());
}

// ============================================================
// POMODORO
// ============================================================
let pomoState = {
  running: false, paused: false,
  mode: 'work', // 'work' | 'short' | 'long'
  sessionsDone: 0,
  timeLeft: 25 * 60,
  totalTime: 25 * 60,
  interval: null,
};
const CIRCUMFERENCE = 2 * Math.PI * 88; // r=88

function pomoGetSettings() {
  return {
    work:     parseInt(document.getElementById('pomo-work').value) || 25,
    short:    parseInt(document.getElementById('pomo-short').value) || 5,
    long:     parseInt(document.getElementById('pomo-long').value) || 15,
    sessions: parseInt(document.getElementById('pomo-sessions').value) || 4,
  };
}
function pomoUpdateSettings() {
  if (!pomoState.running) {
    const s = pomoGetSettings();
    pomoState.timeLeft = s.work * 60;
    pomoState.totalTime = s.work * 60;
    pomoState.mode = 'work';
    pomoRenderDisplay();
  }
}
function pomoDemarrer() {
  if (pomoState.running) return;
  if (pomoState.paused) {
    pomoState.paused = false;
    document.getElementById('pomo-start-btn').style.display = 'none';
    document.getElementById('pomo-pause-btn').style.display = 'inline-flex';
    pomoState.interval = setInterval(pomoTick, 1000);
    return;
  }
  const s = pomoGetSettings();
  pomoState.running = true; pomoState.paused = false;
  pomoState.timeLeft  = (pomoState.mode === 'work' ? s.work : pomoState.mode === 'short' ? s.short : s.long) * 60;
  pomoState.totalTime = pomoState.timeLeft;
  document.getElementById('pomo-start-btn').style.display = 'none';
  document.getElementById('pomo-pause-btn').style.display = 'inline-flex';
  pomoState.interval = setInterval(pomoTick, 1000);
  playSound('add');
  // Mini topbar
  document.getElementById('pomo-mini').style.display = 'flex';
}
function pomoPause() {
  clearInterval(pomoState.interval);
  pomoState.running = false; pomoState.paused = true;
  document.getElementById('pomo-start-btn').style.display = 'inline-flex';
  document.getElementById('pomo-pause-btn').style.display = 'none';
  document.getElementById('pomo-start-btn').textContent = '▶ Reprendre';
}
function pomoStop() {
  clearInterval(pomoState.interval);
  pomoState.running = false; pomoState.paused = false; pomoState.mode = 'work';
  const s = pomoGetSettings();
  pomoState.timeLeft = s.work * 60; pomoState.totalTime = s.work * 60;
  document.getElementById('pomo-start-btn').style.display = 'inline-flex';
  document.getElementById('pomo-pause-btn').style.display = 'none';
  document.getElementById('pomo-start-btn').textContent = '▶ Démarrer';
  document.getElementById('pomo-mini').style.display = 'none';
  pomoRenderDisplay();
}
function pomoTick() {
  pomoState.timeLeft--;
  pomoRenderDisplay();
  if (pomoState.timeLeft <= 0) {
    clearInterval(pomoState.interval);
    pomoState.running = false;
    pomoSessionFinie();
  }
}
function pomoSessionFinie() {
  const s = pomoGetSettings();
  playSound('pomo');
  const tacheEl = document.getElementById('pomo-tache-select');
  const tacheId = tacheEl ? parseInt(tacheEl.value) : null;
  const tacheNom = tacheId ? taches.find(t => t.id === tacheId)?.texte : null;

  if (pomoState.mode === 'work') {
    pomoState.sessionsDone++;
    document.getElementById('pomo-count').textContent = pomoState.sessionsDone;
    const entry = { type:'work', heure:new Date().toLocaleTimeString('fr'), tache:tacheNom };
    pomoHistory.unshift(entry);
    localStorage.setItem('pomo-history', JSON.stringify(pomoHistory.slice(0,50)));
    renderPomoHistory();
    if (Notification.permission === 'granted') new Notification('🍅 Pomodoro terminé !', { body: tacheNom ? `Session sur : ${tacheNom}` : 'Prenez une pause !' });
    showToast('🍅 Session terminée ! Pause méritée.');
    // Passer à pause
    const isPauseLongue = pomoState.sessionsDone % s.sessions === 0;
    pomoState.mode = isPauseLongue ? 'long' : 'short';
    pomoState.timeLeft  = (isPauseLongue ? s.long : s.short) * 60;
    pomoState.totalTime = pomoState.timeLeft;
  } else {
    const entry = { type: pomoState.mode, heure:new Date().toLocaleTimeString('fr'), tache:null };
    pomoHistory.unshift(entry);
    localStorage.setItem('pomo-history', JSON.stringify(pomoHistory.slice(0,50)));
    renderPomoHistory();
    showToast('☕ Pause terminée ! Retour au travail.');
    pomoState.mode = 'work';
    pomoState.timeLeft  = s.work * 60;
    pomoState.totalTime = pomoState.timeLeft;
  }

  document.getElementById('pomo-start-btn').style.display = 'inline-flex';
  document.getElementById('pomo-pause-btn').style.display = 'none';
  document.getElementById('pomo-start-btn').textContent = '▶ Démarrer';
  pomoRenderDisplay();
}
function pomoRenderDisplay() {
  const mm = String(Math.floor(pomoState.timeLeft / 60)).padStart(2,'0');
  const ss = String(pomoState.timeLeft % 60).padStart(2,'0');
  const timeStr = `${mm}:${ss}`;
  document.getElementById('pomo-time').textContent = timeStr;
  document.getElementById('pomo-mini-time').textContent = timeStr;

  const pct = pomoState.totalTime > 0 ? pomoState.timeLeft / pomoState.totalTime : 1;
  const offset = CIRCUMFERENCE * pct;
  const circle = document.getElementById('pomo-circle');
  circle.style.strokeDashoffset = CIRCUMFERENCE - offset;

  const labels = { work:'🍅 Travail', short:'☕ Pause courte', long:'🌴 Pause longue' };
  const colors  = { work:'#c9a84c',   short:'#10b981',       long:'#8b5cf6' };
  document.getElementById('pomo-label').textContent = labels[pomoState.mode];
  document.getElementById('pomo-session-label').textContent = labels[pomoState.mode];
  circle.style.stroke = colors[pomoState.mode];
}
function renderPomoHistory() {
  const container = document.getElementById('pomo-history-list');
  if (!container) return;
  const today = pomoHistory.filter(h => true).slice(0,10);
  if (today.length === 0) { container.innerHTML = '<div style="color:var(--text-muted);font-size:13px;padding:8px 0">Aucune session aujourd\'hui.</div>'; return; }
  container.innerHTML = today.map(h => {
    const icons = { work:'🍅', short:'☕', long:'🌴' };
    return `<div class="pomo-history-item">
      <span class="pomo-history-icon">${icons[h.type]||'🍅'}</span>
      <span class="pomo-history-info">${h.type === 'work' ? 'Session de travail' : h.type === 'short' ? 'Pause courte' : 'Pause longue'}${h.tache ? ' — ' + h.tache : ''}</span>
      <span class="pomo-history-time">${h.heure}</span>
    </div>`;
  }).join('');
}

// ============================================================
// VUE SEMAINE
// ============================================================
function renderSemaine() {
  const jours = ['Lun','Mar','Mer','Jeu','Ven','Sam','Dim'];
  const today  = new Date();
  const lundi  = new Date(today);
  lundi.setDate(today.getDate() - ((today.getDay()+6)%7) + semaineOffset*7);
  document.getElementById('semaine-label').textContent = `Semaine du ${lundi.getDate()}/${lundi.getMonth()+1}/${lundi.getFullYear()}`;
  let html = '';
  for (let i = 0; i < 7; i++) {
    const d = new Date(lundi); d.setDate(lundi.getDate() + i);
    const dateStr  = d.toISOString().split('T')[0];
    const todayStr = today.toISOString().split('T')[0];
    const isToday  = dateStr === todayStr;
    const tachesDuJour = taches.filter(t => t.echeance === dateStr);
    html += `<div class="jour-col ${isToday ? 'aujourd-hui' : ''}">
      <div class="jour-col-header">${jours[i]}</div>
      <div class="jour-col-date">${d.getDate()}/${d.getMonth()+1}</div>`;
    tachesDuJour.forEach(t => {
      const cat = categories.find(c => c.id === t.catId);
      html += `<div class="jour-task-item ${t.faite?'done':''}" onclick="ouvrirModal(${t.id})" style="${cat?`border-color:${cat.couleur}44`:''}">
        ${cat?cat.icon+' ':''}${t.texte}</div>`;
    });
    html += `<button class="jour-add-btn" onclick="ajouterTacheJour('${dateStr}')">+ Ajouter</button></div>`;
  }
  document.getElementById('semaine-grid').innerHTML = html;
}
function changerSemaine(dir) { semaineOffset += dir; renderSemaine(); }
function ajouterTacheJour(dateStr) {
  const texte = prompt('Tâche pour le ' + formatDate(dateStr) + ' :');
  if (!texte || !texte.trim()) return;
  taches.unshift({ id:Date.now(), texte:texte.trim(), faite:false, priorite:'normale', catId:null, echeance:dateStr, heure:null, heureFin:null, dureeMinutes:null, note:'', sousTaches:[], creee:new Date().toISOString(), recurrente:false });
  sauvegarder(); renderSemaine(); playSound('add');
}

// ============================================================
// CATEGORIES
// ============================================================
function ajouterCategorie() {
  const nom = document.getElementById('new-cat-nom').value.trim(); if (!nom) return;
  const icon = document.getElementById('new-cat-icon').value;
  const couleur = document.getElementById('new-cat-couleur').value;
  categories.push({ id:'cat-'+Date.now(), nom, icon, couleur });
  sauvegarder(); majCategoriesSelect(); renderCategories();
  document.getElementById('new-cat-nom').value = '';
  showToast('🗂️ Catégorie créée !');
}
function renderCategories() {
  const container = document.getElementById('categories-list'); container.innerHTML = '';
  if (categories.length === 0) { container.innerHTML = '<div class="empty">Aucune catégorie.</div>'; return; }
  categories.forEach(cat => {
    const tachesCat = taches.filter(t => t.catId === cat.id);
    const faites = tachesCat.filter(t => t.faite).length;
    const pct = tachesCat.length > 0 ? Math.round(faites/tachesCat.length*100) : 0;
    const div = document.createElement('div'); div.className = 'cat-card';
    div.innerHTML = `
      <div class="cat-card-header">
        <div class="cat-card-left">
          <div class="cat-dot" style="background:${cat.couleur}"></div>
          <div><div class="cat-name">${cat.icon} ${cat.nom}</div><div class="cat-count">${tachesCat.length} tâche${tachesCat.length!==1?'s':''} · ${pct}% fait</div></div>
        </div>
        <div class="cat-actions">
          <button class="btn-edit" onclick="filtrerParCat('${cat.id}')" style="font-size:12px;padding:5px 12px;background:${cat.couleur}22;border-color:${cat.couleur}44;color:${cat.couleur}">Voir</button>
          <button class="btn-del" onclick="supprimerCategorie('${cat.id}')">🗑️</button>
        </div>
      </div>
      <div class="cat-bar"><div class="cat-bar-fill" style="width:${pct}%;background:${cat.couleur}"></div></div>
      <div class="cat-task-list" style="margin-top:10px">
        ${tachesCat.slice(0,3).map(t => `<div class="cat-task-mini ${t.faite?'done':''}"><span>${t.faite?'✅':'○'}</span>${t.texte}</div>`).join('')}
        ${tachesCat.length>3?`<div style="font-size:11px;color:var(--text-muted);padding:4px 0">+${tachesCat.length-3} autres...</div>`:''}
      </div>`;
    container.appendChild(div);
  });
}
function supprimerCategorie(id) {
  if (!confirm('Supprimer cette catégorie ?')) return;
  categories = categories.filter(c => c.id !== id);
  taches.forEach(t => { if (t.catId === id) t.catId = null; });
  sauvegarder(); majCategoriesSelect(); renderCategories();
}
function filtrerParCat(catId) {
  catFiltreActif = catId;
  showPage('taches', document.querySelector('[data-page="taches"]'));
  setTimeout(() => {
    document.querySelectorAll('.cat-filtre-btn').forEach(b => {
      b.classList.toggle('actif', b.getAttribute('onclick')?.includes(catId));
    });
    afficher(filtreActif());
  }, 50);
}

// ============================================================
// RECURRENTES
// ============================================================
function genererRecurrentes() {
  const today = new Date(); const todayStr = today.toISOString().split('T')[0];
  taches.filter(t => t.recurrente).forEach(t => {
    if (!t.derniereGen) { t.derniereGen = todayStr; return; }
    const derniere = new Date(t.derniereGen);
    let intervalle = 1;
    if (t.recurType === 'hebdo')       intervalle = 7;
    else if (t.recurType === 'mensuel') intervalle = 30;
    else if (t.recurType === 'personnalise' && t.recurJours) intervalle = t.recurJours;
    if (Math.floor((today-derniere)/86400000) >= intervalle) {
      const clone = { ...t, id:Date.now()+Math.random(), faite:false, creee:new Date().toISOString(), derniereGen:todayStr, recurrente:false };
      taches.unshift(clone); t.derniereGen = todayStr;
    }
  });
  sauvegarder();
}
function renderRecurrentes() {
  const container = document.getElementById('recurrentes-list');
  const recur = taches.filter(t => t.recurrente);
  if (recur.length === 0) { container.innerHTML = '<div class="empty">Aucune tâche récurrente.<br>Cochez "Récurrente" lors de la création.</div>'; return; }
  container.innerHTML = recur.map(t => {
    const cat = categories.find(c => c.id === t.catId);
    const freqLabels = { quotidien:'Chaque jour', hebdo:'Chaque semaine', mensuel:'Chaque mois', personnalise: t.recurJours ? `Tous les ${t.recurJours} jours` : 'Personnalisé' };
    const badgeClass = t.recurType === 'personnalise' ? 'recur-perso-badge' : 'recur-badge';
    const badgeText  = t.recurType === 'personnalise' && t.recurJours ? `↻ /${t.recurJours}j` : t.recurType || '';
    return `<div class="recur-card">
      <div class="recur-icon">${cat?cat.icon:'🔁'}</div>
      <div class="recur-info"><div class="recur-name">${t.texte}</div><div class="recur-freq">${freqLabels[t.recurType]||''}${cat?' · '+cat.nom:''}</div></div>
      <span class="${badgeClass}">${badgeText}</span>
      <button class="btn-del" onclick="supprimerRecurrente(${t.id})">🗑️</button>
    </div>`;
  }).join('');
}
function supprimerRecurrente(id) { taches = taches.filter(t => t.id !== id); sauvegarder(); renderRecurrentes(); }

// ============================================================
// RAPPELS
// ============================================================
function afficherRappels() {
  const now = new Date(), container = document.getElementById('liste-rappels');
  const avecRappel = taches.filter(t => t.echeance && t.heure && !t.faite);
  container.innerHTML = '';
  if (avecRappel.length === 0) { container.innerHTML = '<div class="empty">Aucun rappel défini.</div>'; return; }
  avecRappel.sort((a,b) => new Date(`${a.echeance}T${a.heure}`) - new Date(`${b.echeance}T${b.heure}`));
  avecRappel.forEach(t => {
    const passe = new Date(`${t.echeance}T${t.heure}`) < now;
    const div = document.createElement('div'); div.className = 'rappel-card';
    div.innerHTML = `<div><div class="rappel-info">${t.texte}</div><div class="rappel-time">📅 ${formatDate(t.echeance)} ${t.heure}${t.heureFin?' → '+t.heureFin:''}</div></div>
      <span class="rappel-badge ${passe?'passe':''}">${passe?'✅ Passé':'⏳ À venir'}</span>`;
    container.appendChild(div);
  });
}

// ============================================================
// DASHBOARD
// ============================================================
function majDashboard() {
  const today = new Date().toISOString().split('T')[0];
  const total  = taches.length;
  const faites = taches.filter(t => t.faite).length;
  const actives = total - faites;
  const retard  = taches.filter(t => t.echeance && t.echeance < today && !t.faite).length;
  const pct = total === 0 ? 0 : Math.round(faites/total*100);
  document.getElementById('s-total').textContent   = total;
  document.getElementById('s-faites').textContent  = faites;
  document.getElementById('s-actives').textContent = actives;
  document.getElementById('s-retard').textContent  = retard;
  document.getElementById('progress-fill').style.width = pct + '%';
  document.getElementById('progress-pct').textContent  = pct + '%';
  majChartDoughnut(faites, actives, retard);
  majChartBar(); majChartLine();
}
function gc() { return { text:'#a0aec0', grid:'rgba(255,255,255,0.05)' }; }
function majChartDoughnut(f,a,r) {
  const ctx = document.getElementById('chart-doughnut').getContext('2d'), c = gc();
  if (charts.doughnut) charts.doughnut.destroy();
  charts.doughnut = new Chart(ctx, { type:'doughnut', data:{ labels:['Terminées','Actives','En retard'], datasets:[{ data:[f,a,r], backgroundColor:['#1D9E75','#BA7517','#e24b4a'], borderWidth:0 }] }, options:{ plugins:{ legend:{ labels:{ color:c.text, font:{ size:11 }, boxWidth:12 } } }, cutout:'65%' } });
}
function majChartBar() {
  const ctx = document.getElementById('chart-bar').getContext('2d'), c = gc();
  const h = taches.filter(t => t.priorite==='haute').length, n = taches.filter(t => t.priorite==='normale').length, b = taches.filter(t => t.priorite==='basse').length;
  if (charts.bar) charts.bar.destroy();
  charts.bar = new Chart(ctx, { type:'bar', data:{ labels:['Haute','Normale','Basse'], datasets:[{ data:[h,n,b], backgroundColor:['#e24b4a','#1D9E75','#378ADD'], borderRadius:6, borderWidth:0 }] }, options:{ plugins:{ legend:{ display:false } }, scales:{ y:{ ticks:{ color:c.text, stepSize:1 }, grid:{ color:c.grid } }, x:{ ticks:{ color:c.text }, grid:{ display:false } } } } });
}
function majChartLine() {
  const ctx = document.getElementById('chart-line').getContext('2d'), c = gc();
  const labels=[], data=[];
  for (let i=6; i>=0; i--) { const d=new Date(); d.setDate(d.getDate()-i); const str=d.toISOString().split('T')[0]; labels.push(formatDate(str)); data.push(taches.filter(t=>t.creee&&t.creee.startsWith(str)).length); }
  if (charts.line) charts.line.destroy();
  charts.line = new Chart(ctx, { type:'line', data:{ labels, datasets:[{ label:'Créées', data, borderColor:'#c9a84c', backgroundColor:'rgba(201,168,76,0.1)', fill:true, tension:0.4, pointBackgroundColor:'#c9a84c', pointRadius:4 }] }, options:{ plugins:{ legend:{ display:false } }, scales:{ y:{ ticks:{ color:c.text, stepSize:1 }, grid:{ color:c.grid } }, x:{ ticks:{ color:c.text, font:{ size:11 } }, grid:{ display:false } } } } });
}

// ============================================================
// COLLAB
// ============================================================
function exporterTaches() {
  const blob = new Blob([JSON.stringify({ taches, categories }, null, 2)], { type:'application/json' });
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
  a.download = 'todo-backup-' + new Date().toISOString().split('T')[0] + '.json'; a.click();
  showToast('📤 Export téléchargé !');
}
function copierCode() {
  navigator.clipboard.writeText(btoa(JSON.stringify({ taches, categories }))).then(() => showToast('📋 Code copié !'));
}
function importerCode() {
  const code = document.getElementById('import-code').value.trim(); if (!code) return;
  try {
    const data = JSON.parse(atob(code));
    if (data.taches) taches = [...taches, ...data.taches.filter(n => !taches.find(e => e.id===n.id))];
    if (data.categories) categories = [...categories, ...data.categories.filter(n => !categories.find(e => e.id===n.id))];
    sauvegarder(); majCategoriesSelect();
    document.getElementById('collab-status').textContent = `✅ ${data.taches?.length||0} tâches importées !`;
    showToast('📥 Import réussi !');
  } catch(e) { showToast('⚠️ Code invalide'); }
}
function importerFichier() {
  const file = document.getElementById('import-file').files[0]; if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    try {
      const data = JSON.parse(e.target.result);
      if (data.taches) taches = [...taches, ...data.taches.filter(n => !taches.find(ex => ex.id===n.id))];
      if (data.categories) categories = [...categories, ...data.categories.filter(n => !categories.find(ex => ex.id===n.id))];
      sauvegarder(); majCategoriesSelect();
      document.getElementById('collab-status').textContent = `✅ ${data.taches?.length||0} tâches importées !`;
      showToast('📥 Fichier importé !');
    } catch(err) { showToast('⚠️ Fichier invalide'); }
  };
  reader.readAsText(file);
}

// ============================================================
// THÈME
// ============================================================
function toggleTheme() {
  document.body.classList.toggle('dark');
  theme = document.body.classList.contains('dark') ? 'dark' : 'light';
  localStorage.setItem('theme', theme); updateThemeBtn(); majDashboard();
}
function updateThemeBtn() {
  const btn = document.getElementById('theme-btn');
  if (btn) btn.textContent = theme === 'dark' ? '☀️ Thème clair' : '🌙 Thème sombre';
}

// ============================================================
// UTILITAIRES
// ============================================================
function formatDate(s) { if (!s) return ''; const [y,m,d] = s.split('-'); return `${d}/${m}/${y}`; }
function msToHMS(ms) {
  const h = Math.floor(ms/3600000), m = Math.floor((ms%3600000)/60000), s = Math.floor((ms%60000)/1000);
  return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}

// Init Pomodoro display
pomoRenderDisplay();
