let taches = JSON.parse(localStorage.getItem('taches')) || [];
let theme = localStorage.getItem('theme') || 'light';
let charts = {};
let audioCtx = null;

if (theme === 'dark') document.body.classList.add('dark');
updateThemeBtn();

// SONS
function getAudio() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return audioCtx;
}

function playSound(type) {
  try {
    const ctx = getAudio();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'add') {
      osc.frequency.setValueAtTime(520, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(780, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      osc.start(); osc.stop(ctx.currentTime + 0.25);
    } else if (type === 'done') {
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.setValueAtTime(660, ctx.currentTime + 0.1);
      osc.frequency.setValueAtTime(880, ctx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
      osc.start(); osc.stop(ctx.currentTime + 0.35);
    } else if (type === 'delete') {
      osc.frequency.setValueAtTime(300, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
      osc.start(); osc.stop(ctx.currentTime + 0.2);
    } else if (type === 'notif') {
      [0, 0.15, 0.3].forEach((t, i) => {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.connect(g); g.connect(ctx.destination);
        o.frequency.setValueAtTime([523, 659, 784][i], ctx.currentTime + t);
        g.gain.setValueAtTime(0.2, ctx.currentTime + t);
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + t + 0.12);
        o.start(ctx.currentTime + t);
        o.stop(ctx.currentTime + t + 0.12);
      });
    }
  } catch(e) {}
}

// NOTIFICATIONS
if ('Notification' in window) Notification.requestPermission();

function demanderNotif(texte, echeance, heure) {
  if (!echeance || !heure) return;
  const dateRappel = new Date(`${echeance}T${heure}`);
  const delta = dateRappel - new Date();
  if (delta <= 0) return;
  setTimeout(() => {
    playSound('notif');
    showToast('🔔 Rappel : ' + texte);
    if (Notification.permission === 'granted') {
      new Notification('📋 Rappel TodoApp', { body: texte });
    }
    majBellBadge();
  }, delta);
}

function showToast(msg) {
  const t = document.getElementById('notif-toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 4000);
}

function majBellBadge() {
  const today = new Date().toISOString().split('T')[0];
  const n = taches.filter(t => t.echeance && t.echeance <= today && !t.faite).length;
  const badge = document.getElementById('bell-badge');
  badge.style.display = n > 0 ? 'inline' : 'none';
  badge.textContent = n;
}

// NAVIGATION
function showPage(page, btn) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('actif'));
  document.getElementById('page-' + page).classList.add('active');
  if (btn) btn.classList.add('actif');
  else {
    const b = document.querySelector(`[data-page="${page}"]`);
    if (b) b.classList.add('actif');
  }
  const titles = { dashboard: 'Dashboard', taches: 'Tâches', rappels: 'Rappels' };
  document.getElementById('topbar-title').textContent = titles[page] || '';
  if (page === 'dashboard') majDashboard();
  if (page === 'rappels') afficherRappels();
  if (window.innerWidth <= 700) closeSidebar();
}

function toggleSidebar() {
  const s = document.getElementById('sidebar');
  const o = document.getElementById('overlay');
  s.classList.toggle('open');
  o.classList.toggle('show');
}

function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('overlay').classList.remove('show');
}

// TACHES
function sauvegarder() {
  localStorage.setItem('taches', JSON.stringify(taches));
  majDashboard();
  majBellBadge();
}

function ajouterTache() {
  const input = document.getElementById('new-task');
  const texte = input.value.trim();
  if (!texte) return;
  const priorite = document.getElementById('priorite').value;
  const echeance = document.getElementById('echeance').value;
  const heure = document.getElementById('heure-rappel').value;

  taches.unshift({
    id: Date.now(), texte, faite: false,
    priorite, echeance: echeance || null,
    heure: heure || null,
    creee: new Date().toISOString()
  });

  sauvegarder();
  afficher(filtreActif());
  demanderNotif(texte, echeance, heure);
  playSound('add');
  showToast('✅ Tâche ajoutée' + (heure ? ' · rappel à ' + heure : ''));
  input.value = '';
  document.getElementById('echeance').value = '';
  document.getElementById('heure-rappel').value = '';
  input.focus();
}

function afficher(filtre = 'toutes') {
  const liste = document.getElementById('liste-taches');
  const recherche = document.getElementById('recherche').value.toLowerCase();
  const today = new Date().toISOString().split('T')[0];
  liste.innerHTML = '';

  let visibles = taches.filter(t => {
    if (filtre === 'actives') return !t.faite;
    if (filtre === 'terminees') return t.faite;
    if (filtre === 'haute') return t.priorite === 'haute' && !t.faite;
    if (filtre === 'retard') return t.echeance && t.echeance < today && !t.faite;
    return true;
  });

  if (recherche) visibles = visibles.filter(t => t.texte.toLowerCase().includes(recherche));

  if (visibles.length === 0) {
    liste.innerHTML = '<div class="empty">Aucune tâche ici 🎉</div>';
    majCompteur(); return;
  }

  visibles.forEach(t => {
    const li = document.createElement('li');
    if (t.faite) li.classList.add('done-item');

    const cb = document.createElement('input');
    cb.type = 'checkbox'; cb.checked = t.faite;
    cb.onchange = () => {
      t.faite = cb.checked;
      if (t.faite) playSound('done');
      sauvegarder();
      afficher(filtreActif());
    };

    const body = document.createElement('div');
    body.className = 'task-body';

    const span = document.createElement('span');
    span.className = 'task-text' + (t.faite ? ' done' : '');
    span.textContent = t.texte;

    const meta = document.createElement('div');
    meta.className = 'task-meta';

    const bp = document.createElement('span');
    bp.className = `badge-prio prio-${t.priorite}`;
    bp.textContent = { haute: '🔴 Haute', normale: '🟢 Normale', basse: '🔵 Basse' }[t.priorite];
    meta.appendChild(bp);

    if (t.echeance) {
      const bd = document.createElement('span');
      const enRetard = t.echeance < today && !t.faite;
      bd.className = 'badge-date' + (enRetard ? ' retard' : '');
      bd.textContent = (enRetard ? '⚠️ ' : '📅 ') + formatDate(t.echeance) + (t.heure ? ' à ' + t.heure : '');
      meta.appendChild(bd);
    }

    body.appendChild(span);
    body.appendChild(meta);

    const actions = document.createElement('div');
    actions.className = 'task-actions';

    const btnE = document.createElement('button');
    btnE.className = 'btn-edit'; btnE.textContent = '✏️';
    btnE.onclick = () => {
      const n = prompt('Modifier :', t.texte);
      if (n && n.trim()) { t.texte = n.trim(); sauvegarder(); afficher(filtreActif()); }
    };

    const btnD = document.createElement('button');
    btnD.className = 'btn-del'; btnD.textContent = '🗑️';
    btnD.onclick = () => {
      playSound('delete');
      taches = taches.filter(x => x.id !== t.id);
      sauvegarder(); afficher(filtreActif());
    };

    actions.appendChild(btnE);
    actions.appendChild(btnD);
    li.appendChild(cb); li.appendChild(body); li.appendChild(actions);
    liste.appendChild(li);
  });

  majCompteur();
}

function supprimerTerminees() {
  if (!taches.some(t => t.faite)) return;
  if (confirm('Supprimer toutes les tâches terminées ?')) {
    playSound('delete');
    taches = taches.filter(t => !t.faite);
    sauvegarder(); afficher(filtreActif());
  }
}

function majCompteur() {
  const total = taches.length;
  const faites = taches.filter(t => t.faite).length;
  const r = total - faites;
  document.getElementById('compteur').textContent =
    total === 0 ? '' :
    r === 0 ? '✅ Tout est fait !' :
    `${r} restante${r > 1 ? 's' : ''} · ${faites}/${total} faites`;
}

function filtreActif() {
  const a = document.querySelector('.filtres-bar button.actif');
  return a ? a.dataset.filtre : 'toutes';
}

function setFiltre(btn) {
  document.querySelectorAll('.filtres-bar button').forEach(b => b.classList.remove('actif'));
  btn.classList.add('actif');
  afficher(btn.dataset.filtre);
}

// DASHBOARD
function majDashboard() {
  const today = new Date().toISOString().split('T')[0];
  const total = taches.length;
  const faites = taches.filter(t => t.faite).length;
  const actives = total - faites;
  const retard = taches.filter(t => t.echeance && t.echeance < today && !t.faite).length;
  const pct = total === 0 ? 0 : Math.round(faites / total * 100);

  document.getElementById('s-total').textContent = total;
  document.getElementById('s-faites').textContent = faites;
  document.getElementById('s-actives').textContent = actives;
  document.getElementById('s-retard').textContent = retard;
  document.getElementById('progress-fill').style.width = pct + '%';
  document.getElementById('progress-pct').textContent = pct + '%';

  majChartDoughnut(faites, actives, retard);
  majChartBar();
  majChartLine();
}

function gc() {
  const dark = document.body.classList.contains('dark');
  return { text: dark ? '#a0aec0' : '#888', grid: dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' };
}

function majChartDoughnut(faites, actives, retard) {
  const ctx = document.getElementById('chart-doughnut').getContext('2d');
  const c = gc();
  if (charts.doughnut) charts.doughnut.destroy();
  charts.doughnut = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Terminées', 'Actives', 'En retard'],
      datasets: [{ data: [faites, actives, retard], backgroundColor: ['#1D9E75','#BA7517','#e24b4a'], borderWidth: 0 }]
    },
    options: {
      plugins: { legend: { labels: { color: c.text, font: { size: 11 }, boxWidth: 12 } } },
      cutout: '65%'
    }
  });
}

function majChartBar() {
  const ctx = document.getElementById('chart-bar').getContext('2d');
  const c = gc();
  const haute = taches.filter(t => t.priorite === 'haute').length;
  const normale = taches.filter(t => t.priorite === 'normale').length;
  const basse = taches.filter(t => t.priorite === 'basse').length;
  if (charts.bar) charts.bar.destroy();
  charts.bar = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Haute', 'Normale', 'Basse'],
      datasets: [{ data: [haute, normale, basse], backgroundColor: ['#e24b4a','#1D9E75','#378ADD'], borderRadius: 6, borderWidth: 0 }]
    },
    options: {
      plugins: { legend: { display: false } },
      scales: {
        y: { ticks: { color: c.text, stepSize: 1 }, grid: { color: c.grid } },
        x: { ticks: { color: c.text }, grid: { display: false } }
      }
    }
  });
}

function majChartLine() {
  const ctx = document.getElementById('chart-line').getContext('2d');
  const c = gc();
  const labels = [], data = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const str = d.toISOString().split('T')[0];
    labels.push(formatDate(str));
    data.push(taches.filter(t => t.creee && t.creee.startsWith(str)).length);
  }
  if (charts.line) charts.line.destroy();
  charts.line = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Créées',
        data,
        borderColor: '#1D9E75',
        backgroundColor: 'rgba(29,158,117,0.1)',
        fill: true, tension: 0.4,
        pointBackgroundColor: '#1D9E75',
        pointRadius: 4
      }]
    },
    options: {
      plugins: { legend: { display: false } },
      scales: {
        y: { ticks: { color: c.text, stepSize: 1 }, grid: { color: c.grid } },
        x: { ticks: { color: c.text, font: { size: 11 } }, grid: { display: false } }
      }
    }
  });
}

// RAPPELS
function afficherRappels() {
  const now = new Date();
  const container = document.getElementById('liste-rappels');
  const avecRappel = taches.filter(t => t.echeance && t.heure && !t.faite);
  container.innerHTML = '';
  if (avecRappel.length === 0) {
    container.innerHTML = '<div class="empty">Aucun rappel défini.<br>Ajoutez une tâche avec date + heure.</div>';
    return;
  }
  avecRappel.sort((a, b) => new Date(`${a.echeance}T${a.heure}`) - new Date(`${b.echeance}T${b.heure}`));
  avecRappel.forEach(t => {
    const dateRappel = new Date(`${t.echeance}T${t.heure}`);
    const passe = dateRappel < now;
    const card = document.createElement('div');
    card.className = 'rappel-card';
    card.innerHTML = `
      <div>
        <div class="rappel-info">${t.texte}</div>
        <div class="rappel-time">📅 ${formatDate(t.echeance)} à ${t.heure}</div>
      </div>
      <span class="rappel-badge ${passe ? 'passe' : ''}">${passe ? '✅ Passé' : '⏳ À venir'}</span>
    `;
    container.appendChild(card);
  });
}

// THEME
function toggleTheme() {
  document.body.classList.toggle('dark');
  theme = document.body.classList.contains('dark') ? 'dark' : 'light';
  localStorage.setItem('theme', theme);
  updateThemeBtn();
  majDashboard();
}

function updateThemeBtn() {
  const btn = document.getElementById('theme-btn');
  if (btn) btn.textContent = theme === 'dark' ? '☀️ Thème clair' : '🌙 Thème sombre';
}

function formatDate(s) {
  if (!s) return '';
  const [y, m, d] = s.split('-');
  return `${d}/${m}/${y}`;
}

// INIT
majDashboard();
majBellBadge();
afficher();
taches.forEach(t => { if (t.echeance && t.heure && !t.faite) demanderNotif(t.texte, t.echeance, t.heure); });

document.getElementById('new-task').addEventListener('keydown', e => {
  if (e.key === 'Enter') ajouterTache();
});