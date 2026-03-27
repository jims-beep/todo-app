let taches = JSON.parse(localStorage.getItem('taches')) || [];
let categories = JSON.parse(localStorage.getItem('categories')) || [
  { id:'cat-1', nom:'Études', icon:'📚', couleur:'#8b5cf6' },
  { id:'cat-2', nom:'Code', icon:'💻', couleur:'#06b6d4' },
  { id:'cat-3', nom:'Contenu', icon:'🎬', couleur:'#c9a84c' },
  { id:'cat-4', nom:'Ménage', icon:'🏠', couleur:'#10b981' },
  { id:'cat-5', nom:'Veille', icon:'👁️', couleur:'#f59e0b' },
];
let theme = localStorage.getItem('theme') || 'dark';
let charts = {};
let audioCtx = null;
let modalTacheId = null;
let semaineOffset = 0;
let catFiltreActif = null;

if (theme === 'dark') document.body.classList.add('dark');
updateThemeBtn();
if ('Notification' in window) Notification.requestPermission();

// SONS
function getAudio() { if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)(); return audioCtx; }
function playSound(type) {
  try {
    const ctx = getAudio();
    const configs = {
      add: [[520,0],[780,.15]], done: [[440,0],[660,.1],[880,.2]], delete: [[300,0],[100,.2]],
      notif: [[523,0],[659,.15],[784,.3]]
    };
    (configs[type] || configs.add).forEach(([freq, t]) => {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.connect(g); g.connect(ctx.destination);
      o.frequency.setValueAtTime(freq, ctx.currentTime + t);
      g.gain.setValueAtTime(0.2, ctx.currentTime + t);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + t + 0.15);
      o.start(ctx.currentTime + t); o.stop(ctx.currentTime + t + 0.15);
    });
  } catch(e) {}
}

// SAUVEGARDE
function sauvegarder() {
  localStorage.setItem('taches', JSON.stringify(taches));
  localStorage.setItem('categories', JSON.stringify(categories));
  majDashboard(); majBellBadge();
}

// TOAST
function showToast(msg) {
  const t = document.getElementById('notif-toast');
  t.textContent = msg; t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3500);
}

// NOTIFICATIONS
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

// NAVIGATION
function showPage(page, btn) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('actif'));
  document.getElementById('page-' + page).classList.add('active');
  if (btn) btn.classList.add('actif');
  else { const b = document.querySelector(`[data-page="${page}"]`); if (b) b.classList.add('actif'); }
  const titles = { dashboard:'Dashboard', taches:'Tâches', semaine:'Vue Semaine', categories:'Catégories', recurrentes:'Récurrentes', rappels:'Rappels', collab:'Partage' };
  document.getElementById('topbar-title').textContent = titles[page] || '';
  if (page === 'dashboard') majDashboard();
  if (page === 'semaine') renderSemaine();
  if (page === 'categories') renderCategories();
  if (page === 'recurrentes') renderRecurrentes();
  if (page === 'rappels') afficherRappels();
  if (window.innerWidth <= 700) { document.getElementById('sidebar').classList.remove('open'); document.getElementById('overlay').classList.remove('show'); }
}

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('overlay').classList.toggle('show');
}

// CATEGORIES SELECT
function majCategoriesSelect() {
  const sel = document.getElementById('categorie-select');
  sel.innerHTML = '<option value="">📁 Catégorie...</option>';
  categories.forEach(c => { sel.innerHTML += `<option value="${c.id}">${c.icon} ${c.nom}</option>`; });
  const bar = document.getElementById('cat-filtre-bar');
  bar.innerHTML = '<button class="cat-filtre-btn actif" onclick="setCatFiltre(null,this)">Toutes</button>';
  categories.forEach(c => {
    bar.innerHTML += `<button class="cat-filtre-btn" onclick="setCatFiltre('${c.id}',this)" style="border-color:${c.couleur}22;color:${c.couleur}">${c.icon} ${c.nom}</button>`;
  });
}

function setCatFiltre(catId, btn) {
  catFiltreActif = catId;
  document.querySelectorAll('.cat-filtre-btn').forEach(b => b.classList.remove('actif'));
  btn.classList.add('actif');
  afficher(filtreActif());
}

// TACHES
function ajouterTache() {
  const input = document.getElementById('new-task');
  const texte = input.value.trim();
  if (!texte) return;
  const priorite = document.getElementById('priorite').value;
  const catId = document.getElementById('categorie-select').value;
  const echeance = document.getElementById('echeance').value;
  const heure = document.getElementById('heure-rappel').value;
  const note = document.getElementById('new-note').value.trim();
  const isRecur = document.getElementById('is-recurrente').checked;
  const recurType = document.getElementById('recurrence-type').value;

  const t = {
    id: Date.now(), texte, faite: false, priorite,
    catId: catId || null, echeance: echeance || null,
    heure: heure || null, note: note || '',
    sousTaches: [], creee: new Date().toISOString(),
    recurrente: isRecur, recurType: isRecur ? recurType : null,
    derniereGen: isRecur ? new Date().toISOString().split('T')[0] : null
  };
  taches.unshift(t);
  sauvegarder(); afficher(filtreActif());
  demanderNotif(texte, echeance, heure);
  playSound('add');
  showToast('✅ Tâche ajoutée' + (isRecur ? ' (récurrente)' : ''));
  input.value = '';
  document.getElementById('echeance').value = '';
  document.getElementById('heure-rappel').value = '';
  document.getElementById('new-note').value = '';
  document.getElementById('is-recurrente').checked = false;
  document.getElementById('recurrence-type').style.display = 'none';
  input.focus();
}

document.getElementById('is-recurrente').addEventListener('change', function() {
  document.getElementById('recurrence-type').style.display = this.checked ? 'block' : 'none';
});

function genererRecurrentes() {
  const today = new Date().toISOString().split('T')[0];
  taches.filter(t => t.recurrente && !t.faite).forEach(t => {
    if (!t.derniereGen || t.derniereGen < today) {
      const clone = { ...t, id: Date.now() + Math.random(), faite: false, creee: new Date().toISOString(), derniereGen: today, recurrente: false };
      taches.unshift(clone);
      t.derniereGen = today;
    }
  });
  sauvegarder();
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
  if (catFiltreActif) visibles = visibles.filter(t => t.catId === catFiltreActif);
  if (recherche) visibles = visibles.filter(t => t.texte.toLowerCase().includes(recherche) || (t.note && t.note.toLowerCase().includes(recherche)));
  if (visibles.length === 0) { liste.innerHTML = '<div class="empty">Aucune tâche ici 🎉</div>'; majCompteur(); return; }

  visibles.forEach(t => {
    const cat = categories.find(c => c.id === t.catId);
    const enRetard = t.echeance && t.echeance < today && !t.faite;
    const sousFaites = (t.sousTaches || []).filter(s => s.faite).length;
    const sousTotal = (t.sousTaches || []).length;
    const li = document.createElement('li');
    if (t.faite) li.classList.add('done-item');

    const cb = document.createElement('input'); cb.type = 'checkbox'; cb.checked = t.faite;
    cb.onchange = () => { t.faite = cb.checked; if (t.faite) playSound('done'); sauvegarder(); afficher(filtreActif()); };

    const body = document.createElement('div'); body.className = 'task-body';
    body.onclick = () => ouvrirModal(t.id);

    const span = document.createElement('span');
    span.className = 'task-text' + (t.faite ? ' done' : '');
    span.textContent = t.texte;

    const meta = document.createElement('div'); meta.className = 'task-meta';

    const bp = document.createElement('span');
    bp.className = `badge-prio prio-${t.priorite}`;
    bp.textContent = { haute:'🔴 Haute', normale:'🟢 Normale', basse:'🔵 Basse' }[t.priorite];
    meta.appendChild(bp);

    if (cat) {
      const bc = document.createElement('span'); bc.className = 'badge-cat';
      bc.style.cssText = `background:${cat.couleur}22;color:${cat.couleur};border:.5px solid ${cat.couleur}44`;
      bc.textContent = cat.icon + ' ' + cat.nom; meta.appendChild(bc);
    }
    if (t.echeance) {
      const bd = document.createElement('span'); bd.className = 'badge-date' + (enRetard ? ' retard' : '');
      bd.textContent = (enRetard ? '⚠️ ' : '📅 ') + formatDate(t.echeance) + (t.heure ? ' à ' + t.heure : ''); meta.appendChild(bd);
    }
    if (t.recurrente) { const br = document.createElement('span'); br.className = 'badge-recur'; br.textContent = '🔁 ' + (t.recurType || ''); meta.appendChild(br); }
    if (t.note) { const bn = document.createElement('span'); bn.className = 'badge-note'; bn.textContent = '📝 Note'; meta.appendChild(bn); }
    if (sousTotal > 0) { const bs = document.createElement('span'); bs.className = 'subtask-progress'; bs.textContent = `✅ ${sousFaites}/${sousTotal}`; meta.appendChild(bs); }

    body.appendChild(span); body.appendChild(meta);

    const actions = document.createElement('div'); actions.className = 'task-actions';
    const btnO = document.createElement('button'); btnO.className = 'btn-open'; btnO.textContent = '📂'; btnO.title = 'Ouvrir'; btnO.onclick = (e) => { e.stopPropagation(); ouvrirModal(t.id); };
    const btnE = document.createElement('button'); btnE.className = 'btn-edit'; btnE.textContent = '✏️'; btnE.onclick = (e) => { e.stopPropagation(); const n = prompt('Modifier :', t.texte); if (n && n.trim()) { t.texte = n.trim(); sauvegarder(); afficher(filtreActif()); } };
    const btnD = document.createElement('button'); btnD.className = 'btn-del'; btnD.textContent = '🗑️'; btnD.onclick = (e) => { e.stopPropagation(); playSound('delete'); taches = taches.filter(x => x.id !== t.id); sauvegarder(); afficher(filtreActif()); };
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
  document.getElementById('compteur').textContent = total === 0 ? '' : r === 0 ? '✅ Tout est fait !' : `${r} restante${r > 1 ? 's' : ''} · ${faites}/${total} faites`;
}

function filtreActif() { const a = document.querySelector('.filtres-bar button.actif'); return a ? a.dataset.filtre : 'toutes'; }

function setFiltre(btn) {
  document.querySelectorAll('.filtres-bar button').forEach(b => b.classList.remove('actif'));
  btn.classList.add('actif'); afficher(btn.dataset.filtre);
}

// MODAL
function ouvrirModal(id) {
  const t = taches.find(x => x.id === id); if (!t) return;
  modalTacheId = id;
  document.getElementById('modal-titre').textContent = t.texte;
  document.getElementById('modal-note').value = t.note || '';
  document.getElementById('report-date').value = t.echeance || '';
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
  const container = document.getElementById('modal-subtasks');
  container.innerHTML = '';
  (t.sousTaches || []).forEach((s, i) => {
    const div = document.createElement('div'); div.className = 'subtask-item';
    const cb = document.createElement('input'); cb.type = 'checkbox'; cb.checked = s.faite;
    cb.onchange = () => { s.faite = cb.checked; sauvegarder(); renderSousTaches(t); };
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
  showToast('📅 Tâche reportée au ' + formatDate(date)); fermerModalBtn();
}

// VUE SEMAINE
function renderSemaine() {
  const jours = ['Lun','Mar','Mer','Jeu','Ven','Sam','Dim'];
  const today = new Date();
  const lundi = new Date(today);
  const dayOfWeek = (today.getDay() + 6) % 7;
  lundi.setDate(today.getDate() - dayOfWeek + semaineOffset * 7);
  const label = `Semaine du ${lundi.getDate()}/${lundi.getMonth()+1}/${lundi.getFullYear()}`;
  document.getElementById('semaine-label').textContent = label;
  let html = '';
  for (let i = 0; i < 7; i++) {
    const d = new Date(lundi); d.setDate(lundi.getDate() + i);
    const dateStr = d.toISOString().split('T')[0];
    const todayStr = today.toISOString().split('T')[0];
    const isToday = dateStr === todayStr;
    const tachesDuJour = taches.filter(t => t.echeance === dateStr);
    html += `<div class="jour-col ${isToday ? "aujourd-hui" : ""}">
      <div class="jour-col-header">${jours[i]}</div>
      <div class="jour-col-date">${d.getDate()}/${d.getMonth()+1}</div>`;
    tachesDuJour.forEach(t => {
      const cat = categories.find(c => c.id === t.catId);
      html += `<div class="jour-task-item ${t.faite ? 'done' : ''}" onclick="ouvrirModal(${t.id})" style="${cat ? `border-color:${cat.couleur}44` : ''}">${cat ? cat.icon + ' ' : ''}${t.texte}</div>`;
    });
    html += `<button class="jour-add-btn" onclick="ajouterTacheJour('${dateStr}')">+ Ajouter</button></div>`;
  }
  document.getElementById('semaine-grid').innerHTML = html;
}

function changerSemaine(dir) { semaineOffset += dir; renderSemaine(); }

function ajouterTacheJour(dateStr) {
  const texte = prompt('Nouvelle tâche pour le ' + formatDate(dateStr) + ' :');
  if (!texte || !texte.trim()) return;
  taches.unshift({ id: Date.now(), texte: texte.trim(), faite: false, priorite: 'normale', catId: null, echeance: dateStr, heure: null, note: '', sousTaches: [], creee: new Date().toISOString(), recurrente: false });
  sauvegarder(); renderSemaine(); playSound('add');
}

// CATEGORIES
function ajouterCategorie() {
  const nom = document.getElementById('new-cat-nom').value.trim();
  if (!nom) return;
  const icon = document.getElementById('new-cat-icon').value;
  const couleur = document.getElementById('new-cat-couleur').value;
  categories.push({ id: 'cat-' + Date.now(), nom, icon, couleur });
  sauvegarder(); majCategoriesSelect(); renderCategories();
  document.getElementById('new-cat-nom').value = '';
  showToast('🗂️ Catégorie créée !');
}

function renderCategories() {
  const container = document.getElementById('categories-list');
  container.innerHTML = '';
  categories.forEach(cat => {
    const tachesCat = taches.filter(t => t.catId === cat.id);
    const faites = tachesCat.filter(t => t.faite).length;
    const pct = tachesCat.length > 0 ? Math.round(faites / tachesCat.length * 100) : 0;
    const div = document.createElement('div'); div.className = 'cat-card';
    div.innerHTML = `
      <div class="cat-card-header">
        <div class="cat-card-left">
          <div class="cat-dot" style="background:${cat.couleur}"></div>
          <div><div class="cat-name">${cat.icon} ${cat.nom}</div><div class="cat-count">${tachesCat.length} tâche${tachesCat.length > 1 ? 's' : ''} · ${pct}% fait</div></div>
        </div>
        <div class="cat-actions">
          <button class="btn-edit" onclick="filtrerParCat('${cat.id}')" style="font-size:13px;padding:4px 10px;background:${cat.couleur}22;border-color:${cat.couleur}44;color:${cat.couleur}">Voir</button>
          <button class="btn-del" onclick="supprimerCategorie('${cat.id}')">🗑️</button>
        </div>
      </div>
      <div class="cat-bar"><div class="cat-bar-fill" style="width:${pct}%;background:${cat.couleur}"></div></div>
      <div class="cat-task-list" style="margin-top:10px">
        ${tachesCat.slice(0,3).map(t => `<div class="cat-task-mini ${t.faite ? 'done' : ''}"><span>${t.faite ? '✅' : '○'}</span>${t.texte}</div>`).join('')}
        ${tachesCat.length > 3 ? `<div style="font-size:11px;color:var(--text-muted);padding:4px 0">+${tachesCat.length - 3} autres...</div>` : ''}
      </div>`;
    container.appendChild(div);
  });
  if (categories.length === 0) container.innerHTML = '<div class="empty">Aucune catégorie. Créez-en une ci-dessus.</div>';
}

function supprimerCategorie(id) {
  if (!confirm('Supprimer cette catégorie ? Les tâches associées restent.')) return;
  categories = categories.filter(c => c.id !== id);
  taches.forEach(t => { if (t.catId === id) t.catId = null; });
  sauvegarder(); majCategoriesSelect(); renderCategories();
}

function filtrerParCat(catId) {
  catFiltreActif = catId;
  showPage('taches', document.querySelector('[data-page="taches"]'));
  document.querySelectorAll('.cat-filtre-btn').forEach(b => {
    b.classList.toggle('actif', b.getAttribute('onclick')?.includes(catId));
  });
  afficher(filtreActif());
}

// RECURRENTES
function renderRecurrentes() {
  const container = document.getElementById('recurrentes-list');
  const recur = taches.filter(t => t.recurrente);
  if (recur.length === 0) { container.innerHTML = '<div class="empty">Aucune tâche récurrente.<br>Cochez "Récurrente" lors de la création.</div>'; return; }
  container.innerHTML = recur.map(t => {
    const cat = categories.find(c => c.id === t.catId);
    const freqLabel = { quotidien:'Chaque jour', hebdo:'Chaque semaine', mensuel:'Chaque mois' }[t.recurType] || '';
    return `<div class="recur-card">
      <div class="recur-icon">${cat ? cat.icon : '🔁'}</div>
      <div class="recur-info"><div class="recur-name">${t.texte}</div><div class="recur-freq">${freqLabel}${cat ? ' · ' + cat.nom : ''}</div></div>
      <span class="recur-badge">${t.recurType || ''}</span>
      <button class="btn-del" onclick="supprimerRecurrente(${t.id})">🗑️</button>
    </div>`;
  }).join('');
}

function supprimerRecurrente(id) {
  taches = taches.filter(t => t.id !== id); sauvegarder(); renderRecurrentes();
}

// RAPPELS
function afficherRappels() {
  const now = new Date(), container = document.getElementById('liste-rappels');
  const avecRappel = taches.filter(t => t.echeance && t.heure && !t.faite);
  container.innerHTML = '';
  if (avecRappel.length === 0) { container.innerHTML = '<div class="empty">Aucun rappel défini.</div>'; return; }
  avecRappel.sort((a,b) => new Date(`${a.echeance}T${a.heure}`) - new Date(`${b.echeance}T${b.heure}`));
  avecRappel.forEach(t => {
    const passe = new Date(`${t.echeance}T${t.heure}`) < now;
    const div = document.createElement('div'); div.className = 'rappel-card';
    div.innerHTML = `<div><div class="rappel-info">${t.texte}</div><div class="rappel-time">📅 ${formatDate(t.echeance)} à ${t.heure}</div></div><span class="rappel-badge ${passe ? 'passe' : ''}">${passe ? '✅ Passé' : '⏳ À venir'}</span>`;
    container.appendChild(div);
  });
}

// DASHBOARD
function majDashboard() {
  const today = new Date().toISOString().split('T')[0];
  const total = taches.length, faites = taches.filter(t => t.faite).length;
  const actives = total - faites, retard = taches.filter(t => t.echeance && t.echeance < today && !t.faite).length;
  const pct = total === 0 ? 0 : Math.round(faites / total * 100);
  document.getElementById('s-total').textContent = total;
  document.getElementById('s-faites').textContent = faites;
  document.getElementById('s-actives').textContent = actives;
  document.getElementById('s-retard').textContent = retard;
  document.getElementById('progress-fill').style.width = pct + '%';
  document.getElementById('progress-pct').textContent = pct + '%';
  majChartDoughnut(faites, actives, retard);
  majChartBar(); majChartLine();
}

function gc() { return { text:'#a0aec0', grid:'rgba(255,255,255,0.05)' }; }

function majChartDoughnut(f, a, r) {
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
  const labels = [], data = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(); d.setDate(d.getDate() - i);
    const str = d.toISOString().split('T')[0];
    labels.push(formatDate(str));
    data.push(taches.filter(t => t.creee && t.creee.startsWith(str)).length);
  }
  if (charts.line) charts.line.destroy();
  charts.line = new Chart(ctx, { type:'line', data:{ labels, datasets:[{ label:'Créées', data, borderColor:'#c9a84c', backgroundColor:'rgba(201,168,76,0.1)', fill:true, tension:0.4, pointBackgroundColor:'#c9a84c', pointRadius:4 }] }, options:{ plugins:{ legend:{ display:false } }, scales:{ y:{ ticks:{ color:c.text, stepSize:1 }, grid:{ color:c.grid } }, x:{ ticks:{ color:c.text, font:{ size:11 } }, grid:{ display:false } } } } });
}

// COLLAB
function exporterTaches() {
  const data = JSON.stringify({ taches, categories }, null, 2);
  const blob = new Blob([data], { type:'application/json' });
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
  a.download = 'todo-backup-' + new Date().toISOString().split('T')[0] + '.json';
  a.click(); showToast('📤 Export téléchargé !');
}

function copierCode() {
  const code = btoa(JSON.stringify({ taches, categories }));
  navigator.clipboard.writeText(code).then(() => showToast('📋 Code copié dans le presse-papier !'));
}

function importerCode() {
  const code = document.getElementById('import-code').value.trim();
  if (!code) return;
  try {
    const data = JSON.parse(atob(code));
    if (data.taches) { taches = [...taches, ...data.taches.filter(n => !taches.find(e => e.id === n.id))]; }
    if (data.categories) { categories = [...categories, ...data.categories.filter(n => !categories.find(e => e.id === n.id))]; }
    sauvegarder(); majCategoriesSelect();
    document.getElementById('collab-status').textContent = `✅ ${data.taches?.length || 0} tâches importées !`;
    showToast('📥 Import réussi !');
  } catch(e) { showToast('⚠️ Code invalide'); }
}

function importerFichier() {
  const file = document.getElementById('import-file').files[0]; if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    try {
      const data = JSON.parse(e.target.result);
      if (data.taches) { taches = [...taches, ...data.taches.filter(n => !taches.find(ex => ex.id === n.id))]; }
      if (data.categories) { categories = [...categories, ...data.categories.filter(n => !categories.find(ex => ex.id === n.id))]; }
      sauvegarder(); majCategoriesSelect();
      document.getElementById('collab-status').textContent = `✅ ${data.taches?.length || 0} tâches importées depuis le fichier !`;
      showToast('📥 Fichier importé !');
    } catch(err) { showToast('⚠️ Fichier invalide'); }
  };
  reader.readAsText(file);
}

// THEME
function toggleTheme() {
  document.body.classList.toggle('dark');
  theme = document.body.classList.contains('dark') ? 'dark' : 'light';
  localStorage.setItem('theme', theme); updateThemeBtn(); majDashboard();
}
function updateThemeBtn() {
  const btn = document.getElementById('theme-btn');
  if (btn) btn.textContent = theme === 'dark' ? '☀️ Thème clair' : '🌙 Thème sombre';
}

function formatDate(s) { if (!s) return ''; const [y,m,d] = s.split('-'); return `${d}/${m}/${y}`; }

// INIT
majCategoriesSelect(); majDashboard(); majBellBadge(); afficher();
genererRecurrentes();
taches.forEach(t => { if (t.echeance && t.heure && !t.faite) demanderNotif(t.texte, t.echeance, t.heure); });
document.getElementById('new-task').addEventListener('keydown', e => { if (e.key === 'Enter') ajouterTache(); });
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') fermerModalBtn();
  if (e.key === 'n' && !e.ctrlKey && document.activeElement.tagName !== 'INPUT') { showPage('taches', document.querySelector('[data-page="taches"]')); document.getElementById('new-task').focus(); }
});