// ============================================================
// TRADUCTIONS
// ============================================================
const LANGS = {
  fr: {
    nav_dashboard:'📊 Tableau de bord', nav_tasks:'📋 Mes tâches', nav_week:'📅 Semaine',
    nav_categories:'🗂️ Catégories', nav_recurring:'🔁 Répétitions', nav_pomodoro:'🍅 Pomodoro',
    nav_reminders:'🔔 Rappels', nav_share:'🤝 Partage',
    stat_total:'Total', stat_done:'Terminées', stat_active:'En cours', stat_late:'En retard',
    progress_label:'Progression globale',
    chart_split:'Répartition', chart_priority:'Par priorité', chart_activity:'Activité — 7 jours',
    task_placeholder:'Nouvelle tâche...', note_placeholder:'📝 Ajouter une note...',
    hint_start:'Heure de début', hint_end:'Heure de fin (active le timer)',
    btn_add:'+ Ajouter', btn_create:'+ Créer', btn_clear_done:'🗑️ Vider les faites',
    btn_pause:'⏸ Pause', btn_stop:'⏹ Stop', btn_lap:'🏁 Tour',
    recurring_label:'Répétition', prio_normal:'🟢 Normale', prio_high:'🔴 Urgente', prio_low:'🔵 Basse',
    rt_daily:'Chaque jour', rt_weekly:'Certains jours', rt_monthly:'Chaque mois', rt_custom:'Perso',
    recur_nb_hint:'Combien de jours par semaine ?', recur_days_unit:'jours',
    recur_days_hint:'Choisissez les jours :',
    day_mon:'Lun', day_tue:'Mar', day_wed:'Mer', day_thu:'Jeu', day_fri:'Ven', day_sat:'Sam', day_sun:'Dim',
    filter_all:'Toutes', filter_active:'En cours', filter_done:'✅ Faites', filter_urgent:'🔴 Urgentes', filter_late:'⚠️ En retard',
    search_placeholder:'🔍 Rechercher...', cat_placeholder:'Nom de la catégorie...',
    week_prev:'← Préc.', week_next:'Suiv. →',
    recur_info:'Ces tâches se répètent automatiquement selon votre planning.',
    pomo_start:'▶ Démarrer', pomo_pause:'⏸ Pause', pomo_stop:'⏹ Stop',
    pomo_settings:'Réglages', pomo_work:'🍅 Travail (min)', pomo_short:'☕ Pause courte',
    pomo_long:'🌴 Pause longue', pomo_sessions:'🔄 Sessions avant longue',
    pomo_linked_task:'Tâche en cours', pomo_history:'Historique', pomo_sessions_today:'Sessions aujourd\'hui :',
    reminders_hint:'Vous recevrez une notification à l\'heure exacte de chaque rappel.',
    btn_notif_enable:'🔔 Activer les notifications',
    share_title:'Partage & Sauvegarde', share_subtitle:'Exportez vos tâches ou importez depuis un autre appareil.',
    export_title:'📤 Exporter', export_json:'Télécharger (JSON)', export_code:'📋 Copier le code',
    import_title:'📥 Importer', import_placeholder:'Collez le code ici...', import_code_btn:'Importer le code', import_file_btn:'📁 Charger un fichier',
    modal_note:'Note', modal_subtasks:'Étapes', modal_timer:'Timer (début → fin)', modal_start_timer:'▶ Lancer',
    modal_reschedule:'Reporter à', modal_reschedule_btn:'Reporter', modal_save:'💾 Enregistrer', modal_cancel:'Annuler',
    chrono_title:'⏱ Chronomètre',
    pomo_work_label:'🍅 Travail', pomo_short_label:'☕ Pause courte', pomo_long_label:'🌴 Pause longue',
    pomo_done_work:'Session terminée !', pomo_done_pause:'Pause terminée !',
    everything_done:'✅ Tout est fait !', tasks_left:'restante(s)',
    day_names:['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'],
    day_full:['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
    freq_daily:'Chaque jour', freq_weekly:'Certains jours', freq_monthly:'Chaque mois',
    cat_count_task:'tâche', cat_count_tasks:'tâches', cat_done_pct:'fait',
    confirm_delete_done:'Supprimer toutes les tâches terminées ?',
    confirm_delete_cat:'Supprimer cette catégorie ?',
    toast_added:'✅ Ajoutée', toast_updated:'💾 Mis à jour',
    toast_reported:'📅 Reportée au', toast_notif_on:'🔔 Notifications activées !',
    notif_active:'✅ Notifications actives',
    timer_started:'⏱ Timer démarré',
    timer_done:'⏱ Session terminée !',
    chrono_started:'⏱ Chrono lancé',
    pomo_ready:'Préparez-vous !',
    pomo_go:"C'est parti !",
    col_more:'autres...',
  },
  en: {
    nav_dashboard:'📊 Dashboard', nav_tasks:'📋 My Tasks', nav_week:'📅 Week',
    nav_categories:'🗂️ Categories', nav_recurring:'🔁 Repeating', nav_pomodoro:'🍅 Pomodoro',
    nav_reminders:'🔔 Reminders', nav_share:'🤝 Share',
    stat_total:'Total', stat_done:'Done', stat_active:'Active', stat_late:'Overdue',
    progress_label:'Overall progress',
    chart_split:'Breakdown', chart_priority:'By priority', chart_activity:'Activity — 7 days',
    task_placeholder:'New task...', note_placeholder:'📝 Add a note...',
    hint_start:'Start time', hint_end:'End time (enables timer)',
    btn_add:'+ Add', btn_create:'+ Create', btn_clear_done:'🗑️ Clear done',
    btn_pause:'⏸ Pause', btn_stop:'⏹ Stop', btn_lap:'🏁 Lap',
    recurring_label:'Repeat', prio_normal:'🟢 Normal', prio_high:'🔴 Urgent', prio_low:'🔵 Low',
    rt_daily:'Every day', rt_weekly:'Some days', rt_monthly:'Every month', rt_custom:'Custom',
    recur_nb_hint:'How many days per week?', recur_days_unit:'days',
    recur_days_hint:'Choose the days:',
    day_mon:'Mon', day_tue:'Tue', day_wed:'Wed', day_thu:'Thu', day_fri:'Fri', day_sat:'Sat', day_sun:'Sun',
    filter_all:'All', filter_active:'Active', filter_done:'✅ Done', filter_urgent:'🔴 Urgent', filter_late:'⚠️ Overdue',
    search_placeholder:'🔍 Search...', cat_placeholder:'Category name...',
    week_prev:'← Prev', week_next:'Next →',
    recur_info:'These tasks repeat automatically according to your schedule.',
    pomo_start:'▶ Start', pomo_pause:'⏸ Pause', pomo_stop:'⏹ Stop',
    pomo_settings:'Settings', pomo_work:'🍅 Work (min)', pomo_short:'☕ Short break',
    pomo_long:'🌴 Long break', pomo_sessions:'🔄 Sessions before long break',
    pomo_linked_task:'Current task', pomo_history:'History', pomo_sessions_today:'Sessions today:',
    reminders_hint:'You will receive a notification at the exact time of each reminder.',
    btn_notif_enable:'🔔 Enable notifications',
    share_title:'Share & Backup', share_subtitle:'Export your tasks or import from another device.',
    export_title:'📤 Export', export_json:'Download (JSON)', export_code:'📋 Copy code',
    import_title:'📥 Import', import_placeholder:'Paste the code here...', import_code_btn:'Import code', import_file_btn:'📁 Load a file',
    modal_note:'Note', modal_subtasks:'Steps', modal_timer:'Timer (start → end)', modal_start_timer:'▶ Start',
    modal_reschedule:'Reschedule to', modal_reschedule_btn:'Reschedule', modal_save:'💾 Save', modal_cancel:'Cancel',
    chrono_title:'⏱ Stopwatch',
    pomo_work_label:'🍅 Work', pomo_short_label:'☕ Short break', pomo_long_label:'🌴 Long break',
    pomo_done_work:'Session done!', pomo_done_pause:'Break over!',
    everything_done:'✅ All done!', tasks_left:'left',
    day_names:['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
    day_full:['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
    freq_daily:'Every day', freq_weekly:'Some days', freq_monthly:'Every month',
    cat_count_task:'task', cat_count_tasks:'tasks', cat_done_pct:'done',
    confirm_delete_done:'Delete all completed tasks?',
    confirm_delete_cat:'Delete this category?',
    toast_added:'✅ Added', toast_updated:'💾 Updated',
    toast_reported:'📅 Rescheduled to', toast_notif_on:'🔔 Notifications enabled!',
    notif_active:'✅ Notifications active',
    timer_started:'⏱ Timer started',
    timer_done:'⏱ Session over!',
    chrono_started:'⏱ Stopwatch started',
    pomo_ready:'Get ready!',
    pomo_go:"Let's go!",
    col_more:'more...',
  },
  es: {
    nav_dashboard:'📊 Panel', nav_tasks:'📋 Mis tareas', nav_week:'📅 Semana',
    nav_categories:'🗂️ Categorías', nav_recurring:'🔁 Repetición', nav_pomodoro:'🍅 Pomodoro',
    nav_reminders:'🔔 Recordatorios', nav_share:'🤝 Compartir',
    stat_total:'Total', stat_done:'Hechas', stat_active:'Activas', stat_late:'Atrasadas',
    progress_label:'Progreso general',
    chart_split:'Distribución', chart_priority:'Por prioridad', chart_activity:'Actividad — 7 días',
    task_placeholder:'Nueva tarea...', note_placeholder:'📝 Añadir una nota...',
    hint_start:'Hora de inicio', hint_end:'Hora de fin (activa el temporizador)',
    btn_add:'+ Añadir', btn_create:'+ Crear', btn_clear_done:'🗑️ Limpiar hechas',
    btn_pause:'⏸ Pausa', btn_stop:'⏹ Detener', btn_lap:'🏁 Vuelta',
    recurring_label:'Repetición', prio_normal:'🟢 Normal', prio_high:'🔴 Urgente', prio_low:'🔵 Baja',
    rt_daily:'Cada día', rt_weekly:'Algunos días', rt_monthly:'Cada mes', rt_custom:'Personaliz.',
    recur_nb_hint:'¿Cuántos días por semana?', recur_days_unit:'días',
    recur_days_hint:'Elige los días:',
    day_mon:'Lun', day_tue:'Mar', day_wed:'Mié', day_thu:'Jue', day_fri:'Vie', day_sat:'Sáb', day_sun:'Dom',
    filter_all:'Todas', filter_active:'Activas', filter_done:'✅ Hechas', filter_urgent:'🔴 Urgentes', filter_late:'⚠️ Atrasadas',
    search_placeholder:'🔍 Buscar...', cat_placeholder:'Nombre de la categoría...',
    week_prev:'← Ant.', week_next:'Sig. →',
    recur_info:'Estas tareas se repiten automáticamente según tu planificación.',
    pomo_start:'▶ Iniciar', pomo_pause:'⏸ Pausa', pomo_stop:'⏹ Detener',
    pomo_settings:'Ajustes', pomo_work:'🍅 Trabajo (min)', pomo_short:'☕ Pausa corta',
    pomo_long:'🌴 Pausa larga', pomo_sessions:'🔄 Sesiones antes de pausa larga',
    pomo_linked_task:'Tarea actual', pomo_history:'Historial', pomo_sessions_today:'Sesiones hoy:',
    reminders_hint:'Recibirás una notificación a la hora exacta de cada recordatorio.',
    btn_notif_enable:'🔔 Activar notificaciones',
    share_title:'Compartir y copia de seguridad', share_subtitle:'Exporta tus tareas o importa desde otro dispositivo.',
    export_title:'📤 Exportar', export_json:'Descargar (JSON)', export_code:'📋 Copiar código',
    import_title:'📥 Importar', import_placeholder:'Pega el código aquí...', import_code_btn:'Importar código', import_file_btn:'📁 Cargar archivo',
    modal_note:'Nota', modal_subtasks:'Pasos', modal_timer:'Temporizador (inicio → fin)', modal_start_timer:'▶ Iniciar',
    modal_reschedule:'Reprogramar para', modal_reschedule_btn:'Reprogramar', modal_save:'💾 Guardar', modal_cancel:'Cancelar',
    chrono_title:'⏱ Cronómetro',
    pomo_work_label:'🍅 Trabajo', pomo_short_label:'☕ Pausa corta', pomo_long_label:'🌴 Pausa larga',
    pomo_done_work:'¡Sesión terminada!', pomo_done_pause:'¡Pausa terminada!',
    everything_done:'✅ ¡Todo hecho!', tasks_left:'restante(s)',
    day_names:['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'],
    day_full:['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'],
    freq_daily:'Cada día', freq_weekly:'Algunos días', freq_monthly:'Cada mes',
    cat_count_task:'tarea', cat_count_tasks:'tareas', cat_done_pct:'hecho',
    confirm_delete_done:'¿Eliminar todas las tareas completadas?',
    confirm_delete_cat:'¿Eliminar esta categoría?',
    toast_added:'✅ Añadida', toast_updated:'💾 Actualizado',
    toast_reported:'📅 Reprogramada para', toast_notif_on:'🔔 ¡Notificaciones activadas!',
    notif_active:'✅ Notificaciones activas',
    timer_started:'⏱ Temporizador iniciado',
    timer_done:'⏱ ¡Sesión terminada!',
    chrono_started:'⏱ Cronómetro iniciado',
    pomo_ready:'¡Prepárate!',
    pomo_go:'¡Vamos!',
    col_more:'más...',
  }
};

let lang = localStorage.getItem('lang') || 'fr';
function t(key) { return LANGS[lang][key] || LANGS.fr[key] || key; }

function applyLang() {
  // Nav buttons
  document.querySelectorAll('[data-i18n-nav]').forEach(el => { el.textContent = t(el.dataset.i18nNav); });
  // Text content
  document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
  // Placeholders
  document.querySelectorAll('[data-i18n-ph]').forEach(el => { el.placeholder = t(el.dataset.i18nPh); });
  // Titles
  document.querySelectorAll('[data-i18n-title]').forEach(el => { el.title = t(el.dataset.i18nTitle); });
  // Select options
  document.querySelectorAll('select option[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
  // Refresh displayed text
  if (document.querySelector('.page.active')) {
    const pg = document.querySelector('.page.active').id.replace('page-','');
    const title = {dashboard:t('nav_dashboard'),taches:t('nav_tasks'),semaine:t('nav_week'),
      categories:t('nav_categories'),recurrentes:t('nav_recurring'),pomodoro:t('nav_pomodoro'),
      rappels:t('nav_reminders'),collab:t('nav_share')};
    document.getElementById('topbar-title').textContent = title[pg] || '';
  }
  pomoRenderDisplay();
}

function setLang(l, btn) {
  lang = l; localStorage.setItem('lang', l);
  document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('actif'));
  btn.classList.add('actif');
  applyLang();
  afficher(filtreActif());
}

// ============================================================
// DONNÉES
// ============================================================
let taches     = JSON.parse(localStorage.getItem('taches'))      || [];
let categories = JSON.parse(localStorage.getItem('categories'))  || [
  {id:'cat-1',nom:'Études',  icon:'📚',couleur:'#8b5cf6'},
  {id:'cat-2',nom:'Code',    icon:'💻',couleur:'#06b6d4'},
  {id:'cat-3',nom:'Maison',  icon:'🏠',couleur:'#10b981'},
  {id:'cat-4',nom:'Perso',   icon:'🌱',couleur:'#f59e0b'},
];
let pomoHistory    = JSON.parse(localStorage.getItem('pomo-history')) || [];
let theme          = localStorage.getItem('theme') || 'dark';
let charts         = {};
let modalTacheId   = null;
let semaineOffset  = 0;
let catFiltreActif = null;
let recurTypeActif = 'quotidien';

document.body.classList.toggle('dark', theme === 'dark');

// ============================================================
// INIT
// ============================================================
window.addEventListener('DOMContentLoaded', () => {
  // Activer le bon bouton de langue
  document.querySelectorAll('.lang-btn').forEach(b => {
    b.classList.toggle('actif', b.textContent.toLowerCase().includes(lang));
  });
  applyLang();
  updateThemeBtn();
  demanderPermissionNotifs();
  majCategoriesSelect();
  majDashboard();
  majBellBadge();
  afficher();
  genererRecurrentes();
  verifierRappels();
  setInterval(verifierRappels, 60000);
  taches.forEach(t => planifierNotif(t));
  pomoRenderDisplay();
  initRecurUI();

  document.getElementById('new-task').addEventListener('keydown',    e => { if(e.key==='Enter') ajouterTache(); });
  document.getElementById('new-subtask').addEventListener('keydown', e => { if(e.key==='Enter') ajouterSousTache(); });

  document.getElementById('is-recurrente').addEventListener('change', function() {
    document.getElementById('recur-bloc').style.display = this.checked ? 'block' : 'none';
  });

  document.querySelectorAll('.jour-btn').forEach(label => {
    label.addEventListener('click', e => {
      e.preventDefault();
      if (label.classList.contains('disabled')) return;
      const wasSelected = label.classList.contains('selected');
      const nbActif = document.querySelectorAll('.jour-btn.selected').length;
      const limit = recurTypeActif === 'personnalise'
        ? (parseInt(document.getElementById('recurrence-jours').value) || 2)
        : 7;
      if (!wasSelected && nbActif >= limit) return; // limite atteinte
      label.classList.toggle('selected');
    });
  });

  document.addEventListener('keydown', e => {
    if (e.key==='Escape') fermerModalBtn();
    if (e.key==='n' && !['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)) {
      showPage('taches', document.querySelector('[data-page="taches"]'));
      document.getElementById('new-task').focus();
    }
  });
});

function initRecurUI() {
  setRecurType('quotidien', document.querySelector('.rt-btn[data-type="quotidien"]'));
}

// ============================================================
// RÉCURRENCE UI
// ============================================================
function setRecurType(type, btn) {
  recurTypeActif = type;
  document.querySelectorAll('.rt-btn').forEach(b => b.classList.remove('actif'));
  if (btn) btn.classList.add('actif');
  const joursBloc = document.getElementById('recur-jours-bloc');
  const nbBloc    = document.getElementById('recur-nb-bloc');
  joursBloc.style.display = (type === 'hebdo' || type === 'personnalise') ? 'block' : 'none';
  nbBloc.style.display    = type === 'personnalise' ? 'block' : 'none';
  // Reset sélection jours
  document.querySelectorAll('.jour-btn').forEach(l => {l.classList.remove('selected','disabled');});
  if (type === 'personnalise') majJoursCases();
}

function majJoursCases() {
  if (recurTypeActif !== 'personnalise') return;
  const nb = Math.min(7, Math.max(1, parseInt(document.getElementById('recurrence-jours').value) || 2));
  const selected = document.querySelectorAll('.jour-btn.selected').length;
  // Désélectionner l'excédent si on réduit le nb
  if (selected > nb) {
    let toRemove = selected - nb;
    document.querySelectorAll('.jour-btn.selected').forEach(l => {
      if (toRemove > 0) { l.classList.remove('selected'); toRemove--; }
    });
  }
  // Mettre à jour le hint
  const hint = document.getElementById('recur-jours-hint');
  if (hint) hint.textContent = t('recur_days_hint') + ' (' + nb + ' max)';
}

function getJoursCoches() {
  return Array.from(document.querySelectorAll('.jour-btn.selected'))
    .map(el => parseInt(el.querySelector('input').value));
}

// ============================================================
// SONS
// ============================================================
let audioCtx = null;
function getAudio() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return audioCtx;
}
function playSound(type) {
  try {
    const ctx = getAudio();
    const configs = {
      add:   [[520,0],[780,.15]], done:  [[440,0],[660,.1],[880,.2]],
      del:   [[300,0],[100,.2]],  notif: [[523,0],[659,.15],[784,.3]],
      pomo:  [[784,0],[659,.15],[523,.3],[392,.45]], beep: [[880,0]],
    };
    (configs[type]||configs.add).forEach(([freq,tt]) => {
      const o=ctx.createOscillator(), g=ctx.createGain();
      o.connect(g); g.connect(ctx.destination);
      o.frequency.setValueAtTime(freq, ctx.currentTime+tt);
      g.gain.setValueAtTime(.18, ctx.currentTime+tt);
      g.gain.exponentialRampToValueAtTime(.001, ctx.currentTime+tt+.18);
      o.start(ctx.currentTime+tt); o.stop(ctx.currentTime+tt+.18);
    });
  } catch(e) {}
}

// ============================================================
// NOTIFICATIONS
// ============================================================
function demanderPermissionNotifs() {
  if (!('Notification' in window)) return;
  if (Notification.permission==='default') {
    Notification.requestPermission().then(p => {
      if (p==='granted') { showToast(t('toast_notif_on')); majBtnNotifPerm(); }
    });
  }
  majBtnNotifPerm();
}
function majBtnNotifPerm() {
  const btn = document.getElementById('btn-notif-perm'); if (!btn) return;
  if (!('Notification' in window)) { btn.style.display='none'; return; }
  if (Notification.permission==='granted') { btn.textContent=t('notif_active'); }
  else { btn.textContent=t('btn_notif_enable'); }
}
function envoyerNotif(titre, corps) {
  showToast(titre+(corps?' — '+corps:''));
  playSound('notif');
  if ('Notification' in window && Notification.permission==='granted')
    new Notification(titre, {body:corps||''});
}
const notifTimers = {};
function planifierNotif(tache) {
  if (!tache.echeance||!tache.heure||tache.faite) return;
  const quand=new Date(`${tache.echeance}T${tache.heure}`);
  const delta=quand-new Date(); if (delta<=0) return;
  if (notifTimers[tache.id]) clearTimeout(notifTimers[tache.id]);
  notifTimers[tache.id]=setTimeout(()=>{ envoyerNotif('⏰ '+tache.texte,''); majBellBadge(); }, delta);
}
function verifierRappels() {
  const now=new Date(), todayStr=now.toISOString().split('T')[0], hhmm=now.toTimeString().slice(0,5);
  taches.filter(tt=>!tt.faite&&tt.echeance===todayStr&&tt.heure===hhmm).forEach(tt=>envoyerNotif('⏰ '+tt.texte,''));
  majBellBadge();
}
function majBellBadge() {
  const today=new Date().toISOString().split('T')[0];
  const n=taches.filter(tt=>tt.echeance&&tt.echeance<=today&&!tt.faite).length;
  const b=document.getElementById('bell-badge'); if(!b) return;
  b.style.display=n>0?'inline':'none'; b.textContent=n;
}

// ============================================================
// TOAST
// ============================================================
function showToast(msg) {
  const el=document.getElementById('notif-toast'); if(!el) return;
  el.textContent=msg; el.classList.add('show');
  clearTimeout(el._t); el._t=setTimeout(()=>el.classList.remove('show'),3500);
}

// ============================================================
// SAUVEGARDE
// ============================================================
function sauvegarder() {
  localStorage.setItem('taches',JSON.stringify(taches));
  localStorage.setItem('categories',JSON.stringify(categories));
  majDashboard(); majBellBadge();
}

// ============================================================
// NAVIGATION
// ============================================================
function showPage(page, btn) {
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b=>b.classList.remove('actif'));
  document.getElementById('page-'+page).classList.add('active');
  if (btn) btn.classList.add('actif');
  else { const b=document.querySelector(`[data-page="${page}"]`); if(b) b.classList.add('actif'); }
  const map={dashboard:'nav_dashboard',taches:'nav_tasks',semaine:'nav_week',
    categories:'nav_categories',recurrentes:'nav_recurring',pomodoro:'nav_pomodoro',
    rappels:'nav_reminders',collab:'nav_share'};
  document.getElementById('topbar-title').textContent = t(map[page]||'');
  if (page==='dashboard')   majDashboard();
  if (page==='semaine')     renderSemaine();
  if (page==='categories')  renderCategories();
  if (page==='recurrentes') renderRecurrentes();
  if (page==='pomodoro')    renderPomoHistory();
  if (page==='rappels')     afficherRappels();
  if (window.innerWidth<=700) {
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('overlay').classList.remove('show');
  }
}
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('overlay').classList.toggle('show');
}

// ============================================================
// CATEGORIES SELECT
// ============================================================
function majCategoriesSelect() {
  const sel=document.getElementById('categorie-select');
  if (sel) {
    sel.innerHTML='<option value="">📁 ...</option>';
    categories.forEach(c=>{sel.innerHTML+=`<option value="${c.id}">${c.icon} ${c.nom}</option>`;});
  }
  const bar=document.getElementById('cat-filtre-bar');
  if (bar) {
    bar.innerHTML=`<button class="cat-filtre-btn actif" onclick="setCatFiltre(null,this)">${t('filter_all')}</button>`;
    categories.forEach(c=>{
      bar.innerHTML+=`<button class="cat-filtre-btn" onclick="setCatFiltre('${c.id}',this)" style="border-color:${c.couleur}33;color:${c.couleur}">${c.icon} ${c.nom}</button>`;
    });
  }
  const sel2=document.getElementById('pomo-tache-select');
  if (sel2) {
    sel2.innerHTML=`<option value="">— ${t('pomo_linked_task')} —</option>`;
    taches.filter(tt=>!tt.faite).forEach(tt=>{sel2.innerHTML+=`<option value="${tt.id}">${tt.texte}</option>`;});
  }
}
function setCatFiltre(catId, btn) {
  catFiltreActif=catId;
  document.querySelectorAll('.cat-filtre-btn').forEach(b=>b.classList.remove('actif'));
  btn.classList.add('actif'); afficher(filtreActif());
}

// ============================================================
// AJOUTER TÂCHE
// ============================================================
function ajouterTache() {
  const input=document.getElementById('new-task');
  const texte=input.value.trim(); if (!texte) return;
  const priorite   =document.getElementById('priorite').value;
  const catId      =document.getElementById('categorie-select').value;
  const echeance   =document.getElementById('echeance').value;
  const heure      =document.getElementById('heure-rappel').value;
  const heureFin   =document.getElementById('heure-fin').value;
  const note       =document.getElementById('new-note').value.trim();
  const isRecur    =document.getElementById('is-recurrente').checked;
  const recurJours =parseInt(document.getElementById('recurrence-jours').value)||null;
  const joursCoches=getJoursCoches();

  let dureeMinutes=null;
  if (heure&&heureFin) {
    const [h1,m1]=heure.split(':').map(Number), [h2,m2]=heureFin.split(':').map(Number);
    dureeMinutes=(h2*60+m2)-(h1*60+m1);
    if (dureeMinutes<=0){showToast('⚠️ Heure de fin invalide'); return;}
  }
  const tache={
    id:Date.now(), texte, faite:false, priorite,
    catId:catId||null, echeance:echeance||null,
    heure:heure||null, heureFin:heureFin||null, dureeMinutes,
    note:note||'', sousTaches:[], creee:new Date().toISOString(),
    recurrente:isRecur,
    recurType:isRecur?recurTypeActif:null,
    recurJoursSemaine:(isRecur&&(recurTypeActif==='hebdo'||recurTypeActif==='personnalise')&&joursCoches.length>0)?joursCoches:null,
    recurJours:(isRecur&&recurTypeActif==='personnalise')?recurJours:null,
    derniereGen:isRecur?new Date().toISOString().split('T')[0]:null,
  };
  taches.unshift(tache);
  sauvegarder(); afficher(filtreActif()); planifierNotif(tache);
  playSound('add'); showToast(t('toast_added'));
  // Reset
  input.value='';
  ['echeance','heure-rappel','heure-fin','new-note','recurrence-jours'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});
  document.getElementById('is-recurrente').checked=false;
  document.getElementById('recur-bloc').style.display='none';
  document.querySelectorAll('.jour-btn').forEach(l=>l.classList.remove('selected'));
  setRecurType('quotidien',document.querySelector('.rt-btn[data-type="quotidien"]'));
  majCategoriesSelect(); input.focus();
}

// ============================================================
// AFFICHER TÂCHES
// ============================================================
function afficher(filtre='toutes') {
  const liste=document.getElementById('liste-taches');
  const recherche=document.getElementById('recherche').value.toLowerCase();
  const today=new Date().toISOString().split('T')[0];
  liste.innerHTML='';
  let vis=taches.filter(tt=>{
    if (filtre==='actives')   return !tt.faite;
    if (filtre==='terminees') return tt.faite;
    if (filtre==='haute')     return tt.priorite==='haute'&&!tt.faite;
    if (filtre==='retard')    return tt.echeance&&tt.echeance<today&&!tt.faite;
    return true;
  });
  if (catFiltreActif) vis=vis.filter(tt=>tt.catId===catFiltreActif);
  if (recherche)      vis=vis.filter(tt=>tt.texte.toLowerCase().includes(recherche)||(tt.note&&tt.note.toLowerCase().includes(recherche)));
  if (!vis.length){liste.innerHTML=`<div class="empty">${t('filter_all')} 🎉</div>`; majCompteur(); return;}

  vis.forEach(tt=>{
    const cat=categories.find(c=>c.id===tt.catId);
    const enRetard=tt.echeance&&tt.echeance<today&&!tt.faite;
    const sousFaites=(tt.sousTaches||[]).filter(s=>s.faite).length;
    const sousTotal=(tt.sousTaches||[]).length;

    const li=document.createElement('li');
    if (tt.faite) li.classList.add('done-item');

    const cb=document.createElement('input'); cb.type='checkbox'; cb.checked=tt.faite;
    cb.onchange=()=>{tt.faite=cb.checked; if(tt.faite)playSound('done'); sauvegarder(); afficher(filtreActif());};

    const body=document.createElement('div'); body.className='task-body';
    body.onclick=()=>ouvrirModal(tt.id);

    const sp=document.createElement('span');
    sp.className='task-text'+(tt.faite?' done':''); sp.textContent=tt.texte;

    const meta=document.createElement('div'); meta.className='task-meta';

    // Priorité
    const bp=document.createElement('span');
    bp.className='badge '+(tt.priorite==='haute'?'b-haute':tt.priorite==='basse'?'b-basse':'b-normale');
    bp.textContent={haute:t('prio_high'),normale:t('prio_normal'),basse:t('prio_low')}[tt.priorite];
    meta.appendChild(bp);
    // Catégorie
    if (cat){
      const bc=document.createElement('span'); bc.className='badge';
      bc.style.cssText=`background:${cat.couleur}18;color:${cat.couleur};border:.5px solid ${cat.couleur}35`;
      bc.textContent=cat.icon+' '+cat.nom; meta.appendChild(bc);
    }
    // Date
    if (tt.echeance){
      const bd=document.createElement('span'); bd.className='badge b-date'+(enRetard?' b-retard':'');
      bd.textContent=(enRetard?'⚠️ ':'📅 ')+formatDate(tt.echeance)+(tt.heure?' '+tt.heure+(tt.heureFin?'→'+tt.heureFin:''):'');
      meta.appendChild(bd);
    }
    // Récurrence
    if (tt.recurrente){
      const br=document.createElement('span'); br.className='badge b-recur';
      br.textContent='🔁 '+labelRecur(tt); meta.appendChild(br);
    }
    // Note
    if (tt.note){const bn=document.createElement('span'); bn.className='badge b-note'; bn.textContent='📝'; meta.appendChild(bn);}
    // Sous-tâches
    if (sousTotal>0){const bs=document.createElement('span'); bs.className='badge b-sub'; bs.textContent=`✅ ${sousFaites}/${sousTotal}`; meta.appendChild(bs);}
    // Timer
    if (tt.dureeMinutes){
      const bt=document.createElement('span');
      bt.className='badge b-timer'+(timerData.tacheId===tt.id?' running':'');
      bt.textContent=(timerData.tacheId===tt.id?'▶ ':'⏱ ')+tt.dureeMinutes+'min';
      bt.onclick=e=>{e.stopPropagation(); demarrerTimer(tt.id);}; meta.appendChild(bt);
    }
    // Chrono
    const bch=document.createElement('span'); bch.className='badge b-chrono';
    bch.textContent=(chronoData.tacheId===tt.id&&chronoData.running?'⏱ …':'⏱');
    bch.onclick=e=>{e.stopPropagation(); demarrerChrono(tt.id,tt.texte);}; meta.appendChild(bch);

    body.appendChild(sp); body.appendChild(meta);

    const acts=document.createElement('div'); acts.className='task-actions';
    const o=document.createElement('button'); o.className='t-btn open'; o.textContent='📂';
    o.onclick=e=>{e.stopPropagation(); ouvrirModal(tt.id);};
    const e2=document.createElement('button'); e2.className='t-btn edit'; e2.textContent='✏️';
    e2.onclick=e=>{e.stopPropagation(); const n=prompt(tt.texte); if(n&&n.trim()){tt.texte=n.trim();sauvegarder();afficher(filtreActif());}};
    const d=document.createElement('button'); d.className='t-btn del'; d.textContent='🗑️';
    d.onclick=e=>{e.stopPropagation(); playSound('del'); taches=taches.filter(x=>x.id!==tt.id); sauvegarder(); afficher(filtreActif());};
    acts.appendChild(o); acts.appendChild(e2); acts.appendChild(d);
    li.appendChild(cb); li.appendChild(body); li.appendChild(acts);
    liste.appendChild(li);
  });
  majCompteur();
}

function labelRecur(tt) {
  if (!tt.recurType) return '';
  if (tt.recurType==='quotidien') return t('rt_daily');
  if (tt.recurType==='mensuel')   return t('rt_monthly');
  if (tt.recurJoursSemaine?.length) return tt.recurJoursSemaine.map(j=>t('day_names').split(',')[j]||t('day_names')[j]).join('/');
  if (tt.recurJours) return `/${tt.recurJours}j`;
  return t('rt_weekly');
}

function supprimerTerminees() {
  if (!taches.some(tt=>tt.faite)) return;
  if (confirm(t('confirm_delete_done'))) {
    playSound('del'); taches=taches.filter(tt=>!tt.faite); sauvegarder(); afficher(filtreActif());
  }
}
function majCompteur() {
  const total=taches.length, faites=taches.filter(tt=>tt.faite).length, r=total-faites;
  document.getElementById('compteur').textContent=total===0?'':r===0?t('everything_done'):`${r} ${t('tasks_left')} · ${faites}/${total}`;
}
function filtreActif(){const a=document.querySelector('.filtres-bar button.actif');return a?a.dataset.filtre:'toutes';}
function setFiltre(btn){
  document.querySelectorAll('.filtres-bar button').forEach(b=>b.classList.remove('actif'));
  btn.classList.add('actif'); afficher(btn.dataset.filtre);
}

// ============================================================
// MODAL
// ============================================================
function ouvrirModal(id) {
  const tt=taches.find(x=>x.id===id); if(!tt) return;
  modalTacheId=id;
  document.getElementById('modal-titre').textContent =tt.texte;
  document.getElementById('modal-note').value        =tt.note||'';
  document.getElementById('report-date').value       =tt.echeance||'';
  document.getElementById('modal-heure-debut').value =tt.heure||'';
  document.getElementById('modal-heure-fin').value   =tt.heureFin||'';
  renderSousTaches(tt);
  document.getElementById('modal-tache').classList.add('open');
}
function fermerModal(e){if(e.target===document.getElementById('modal-tache'))fermerModalBtn();}
function fermerModalBtn(){document.getElementById('modal-tache').classList.remove('open');modalTacheId=null;}
function sauvegarderModal(){
  const tt=taches.find(x=>x.id===modalTacheId); if(!tt) return;
  tt.note=document.getElementById('modal-note').value.trim();
  sauvegarder(); afficher(filtreActif()); fermerModalBtn(); showToast(t('toast_updated'));
}
function renderSousTaches(tt){
  const c=document.getElementById('modal-subtasks'); c.innerHTML='';
  (tt.sousTaches||[]).forEach((s,i)=>{
    const div=document.createElement('div'); div.className='subtask-item';
    const cb=document.createElement('input'); cb.type='checkbox'; cb.checked=s.faite;
    cb.onchange=()=>{s.faite=cb.checked; sauvegarder();};
    const sp=document.createElement('span'); sp.className='subtask-text'+(s.faite?' done':''); sp.textContent=s.texte;
    const bd=document.createElement('button'); bd.className='subtask-del'; bd.textContent='✕';
    bd.onclick=()=>{tt.sousTaches.splice(i,1); sauvegarder(); renderSousTaches(tt);};
    div.appendChild(cb); div.appendChild(sp); div.appendChild(bd); c.appendChild(div);
  });
}
function ajouterSousTache(){
  const input=document.getElementById('new-subtask'); const texte=input.value.trim(); if(!texte) return;
  const tt=taches.find(x=>x.id===modalTacheId); if(!tt) return;
  if(!tt.sousTaches) tt.sousTaches=[];
  tt.sousTaches.push({texte,faite:false}); sauvegarder(); renderSousTaches(tt); input.value='';
}
function reporterTache(){
  const tt=taches.find(x=>x.id===modalTacheId); if(!tt) return;
  const date=document.getElementById('report-date').value; if(!date) return;
  tt.echeance=date; tt.faite=false; sauvegarder(); afficher(filtreActif());
  showToast(t('toast_reported')+' '+formatDate(date)); fermerModalBtn();
}
function demarrerTimerModal(){
  const debut=document.getElementById('modal-heure-debut').value;
  const fin  =document.getElementById('modal-heure-fin').value;
  const tt=taches.find(x=>x.id===modalTacheId); if(!tt) return;
  if(debut&&fin){
    const [h1,m1]=debut.split(':').map(Number),[h2,m2]=fin.split(':').map(Number);
    const duree=(h2*60+m2)-(h1*60+m1);
    if(duree<=0){showToast('⚠️'); return;}
    tt.heure=debut; tt.heureFin=fin; tt.dureeMinutes=duree; sauvegarder();
  }
  fermerModalBtn(); if(tt.dureeMinutes) demarrerTimer(tt.id);
}

// ============================================================
// TIMER SESSION
// ============================================================
let timerInterval=null;
let timerData={debut:null,dureeMs:null,tacheId:null,pause:false,tempsEcoule:0};
function demarrerTimer(tacheId){
  const tt=taches.find(x=>x.id===tacheId); if(!tt||!tt.dureeMinutes){showToast('⚠️'); return;}
  if(timerInterval) stopTimer();
  timerData={debut:Date.now(),dureeMs:tt.dureeMinutes*60000,tacheId,pause:false,tempsEcoule:0};
  document.getElementById('timer-ftitle').textContent   ='⏱ '+tt.texte;
  document.getElementById('timer-floating').style.display='block';
  document.getElementById('timer-pause-btn').textContent=t('btn_pause');
  timerInterval=setInterval(tickTimer,1000);
  playSound('add'); showToast(t('timer_started')+' — '+tt.dureeMinutes+'min');
  afficher(filtreActif());
}
function tickTimer(){
  if(timerData.pause) return;
  timerData.tempsEcoule+=1000;
  const restant=Math.max(0,timerData.dureeMs-timerData.tempsEcoule);
  const pct=Math.min(100,Math.round(timerData.tempsEcoule/timerData.dureeMs*100));
  document.getElementById('timer-ftime').textContent=msToHMS(restant);
  document.getElementById('timer-fbar').style.width =pct+'%';
  document.getElementById('timer-fsub').textContent =restant>0?Math.round(restant/60000)+'min':'✅';
  if(restant<=0){
    clearInterval(timerInterval); timerInterval=null;
    envoyerNotif(t('timer_done'), taches.find(x=>x.id===timerData.tacheId)?.texte||'');
    document.getElementById('timer-fbar').style.background='var(--green)';
  }
}
function pauseTimer(){
  timerData.pause=!timerData.pause;
  document.getElementById('timer-pause-btn').textContent=timerData.pause?'▶':t('btn_pause');
}
function stopTimer(){
  clearInterval(timerInterval); timerInterval=null;
  document.getElementById('timer-floating').style.display='none';
  timerData={debut:null,dureeMs:null,tacheId:null,pause:false,tempsEcoule:0};
  afficher(filtreActif());
}

// ============================================================
// CHRONO
// ============================================================
let chronoInterval=null;
let chronoData={debut:null,elapsed:0,tacheId:null,running:false,pause:false,laps:[]};
function demarrerChrono(tacheId,nom){
  if(chronoInterval){if(chronoData.tacheId===tacheId){chronoStop();return;}chronoStop();}
  chronoData={debut:Date.now(),elapsed:0,tacheId,running:true,pause:false,laps:[],nom};
  document.getElementById('chrono-floating').style.display='block';
  document.getElementById('chrono-pause-btn').textContent=t('btn_pause');
  document.getElementById('chrono-laps').innerHTML='';
  chronoInterval=setInterval(tickChrono,1000);
  playSound('add'); showToast(t('chrono_started')+': '+nom); afficher(filtreActif());
}
function tickChrono(){
  if(chronoData.pause) return;
  chronoData.elapsed+=1000;
  document.getElementById('chrono-time').textContent=msToHMS(chronoData.elapsed);
}
function chronoPause(){
  chronoData.pause=!chronoData.pause;
  document.getElementById('chrono-pause-btn').textContent=chronoData.pause?'▶':t('btn_pause');
}
function chronoLap(){
  const lapTime=msToHMS(chronoData.elapsed),lapN=chronoData.laps.length+1;
  chronoData.laps.push(lapTime);
  const el=document.createElement('div'); el.className='chrono-lap';
  el.innerHTML=`<span>${t('btn_lap').replace('🏁 ','')} ${lapN}</span><span>${lapTime}</span>`;
  document.getElementById('chrono-laps').prepend(el);
}
function chronoStop(){
  clearInterval(chronoInterval); chronoInterval=null;
  document.getElementById('chrono-floating').style.display='none';
  chronoData={debut:null,elapsed:0,tacheId:null,running:false,pause:false,laps:[]};
  afficher(filtreActif());
}

// ============================================================
// POMODORO
// ============================================================
const CIRC=2*Math.PI*88;
let pomoState={running:false,counting:false,paused:false,mode:'work',sessionsDone:0,timeLeft:25*60,totalTime:25*60,interval:null,countInterval:null};

function pomoGetSettings(){
  return{work:parseInt(document.getElementById('pomo-work').value)||25,short:parseInt(document.getElementById('pomo-short').value)||5,long:parseInt(document.getElementById('pomo-long').value)||15,sessions:parseInt(document.getElementById('pomo-sessions').value)||4};
}
function pomoUpdateSettings(){
  if(!pomoState.running&&!pomoState.counting){
    const s=pomoGetSettings(); pomoState.mode='work'; pomoState.timeLeft=s.work*60; pomoState.totalTime=s.work*60; pomoRenderDisplay();
  }
}
function pomoDemarrer(){
  if(pomoState.running||pomoState.counting) return;
  const s=pomoGetSettings();
  if(pomoState.paused){
    pomoState.paused=false; pomoState.running=true;
    document.getElementById('pomo-start-btn').style.display='none';
    document.getElementById('pomo-pause-btn').style.display='inline-flex';
    pomoState.interval=setInterval(pomoTick,1000); return;
  }
  const duree=pomoState.mode==='work'?s.work*60:pomoState.mode==='short'?s.short*60:s.long*60;
  pomoState.timeLeft=duree; pomoState.totalTime=duree; pomoState.counting=true;
  document.getElementById('pomo-start-btn').style.display='none';
  document.getElementById('pomo-pause-btn').style.display='none';
  document.getElementById('pomo-mini').style.display='flex';
  let countdown=3;
  document.getElementById('pomo-time').textContent='3';
  document.getElementById('pomo-label').textContent=t('pomo_ready');
  document.getElementById('pomo-circle').style.stroke='var(--border2)';
  document.getElementById('pomo-circle').style.strokeDashoffset=String(CIRC);
  playSound('beep');
  pomoState.countInterval=setInterval(()=>{
    countdown--;
    if(countdown>0){document.getElementById('pomo-time').textContent=String(countdown); playSound('beep');}
    else{
      clearInterval(pomoState.countInterval); pomoState.countInterval=null;
      pomoState.counting=false; pomoState.running=true; pomoState.paused=false;
      document.getElementById('pomo-pause-btn').style.display='inline-flex';
      pomoRenderDisplay(); playSound('notif'); showToast(t('pomo_go'));
      pomoState.interval=setInterval(pomoTick,1000);
    }
  },1000);
}
function pomoPause(){
  if(!pomoState.running) return;
  clearInterval(pomoState.interval); pomoState.interval=null; pomoState.running=false; pomoState.paused=true;
  document.getElementById('pomo-start-btn').textContent=t('pomo_start');
  document.getElementById('pomo-start-btn').style.display='inline-flex';
  document.getElementById('pomo-pause-btn').style.display='none';
}
function pomoStop(){
  clearInterval(pomoState.interval); clearInterval(pomoState.countInterval);
  pomoState.interval=null; pomoState.countInterval=null; pomoState.running=false; pomoState.counting=false; pomoState.paused=false; pomoState.mode='work';
  const s=pomoGetSettings(); pomoState.timeLeft=s.work*60; pomoState.totalTime=s.work*60;
  document.getElementById('pomo-start-btn').textContent=t('pomo_start');
  document.getElementById('pomo-start-btn').style.display='inline-flex';
  document.getElementById('pomo-pause-btn').style.display='none';
  document.getElementById('pomo-mini').style.display='none';
  pomoRenderDisplay();
}
function pomoTick(){
  if(!pomoState.running) return;
  pomoState.timeLeft--; pomoRenderDisplay();
  if(pomoState.timeLeft<=0){
    clearInterval(pomoState.interval); pomoState.interval=null; pomoState.running=false; pomoSessionFinie();
  }
}
function pomoSessionFinie(){
  const s=pomoGetSettings();
  const tacheEl=document.getElementById('pomo-tache-select');
  const tacheId=tacheEl?parseInt(tacheEl.value):null;
  const tacheNom=tacheId?(taches.find(tt=>tt.id===tacheId)?.texte||null):null;
  playSound('pomo');
  if(pomoState.mode==='work'){
    pomoState.sessionsDone++;
    document.getElementById('pomo-count').textContent=pomoState.sessionsDone;
    pomoHistory.unshift({type:'work',heure:new Date().toLocaleTimeString(),tache:tacheNom});
    localStorage.setItem('pomo-history',JSON.stringify(pomoHistory.slice(0,50)));
    renderPomoHistory();
    envoyerNotif('🍅 '+t('pomo_done_work'),tacheNom||'');
    const longue=pomoState.sessionsDone%s.sessions===0;
    pomoState.mode=longue?'long':'short'; pomoState.timeLeft=(longue?s.long:s.short)*60; pomoState.totalTime=pomoState.timeLeft;
  } else {
    pomoHistory.unshift({type:pomoState.mode,heure:new Date().toLocaleTimeString(),tache:null});
    localStorage.setItem('pomo-history',JSON.stringify(pomoHistory.slice(0,50)));
    renderPomoHistory();
    envoyerNotif('☕ '+t('pomo_done_pause'),'');
    pomoState.mode='work'; pomoState.timeLeft=s.work*60; pomoState.totalTime=s.work*60;
  }
  document.getElementById('pomo-start-btn').textContent=t('pomo_start');
  document.getElementById('pomo-start-btn').style.display='inline-flex';
  document.getElementById('pomo-pause-btn').style.display='none';
  pomoRenderDisplay();
}
function pomoRenderDisplay(){
  const mm=String(Math.floor(pomoState.timeLeft/60)).padStart(2,'0');
  const ss=String(pomoState.timeLeft%60).padStart(2,'0');
  const str=`${mm}:${ss}`;
  document.getElementById('pomo-time').textContent     =str;
  document.getElementById('pomo-mini-time').textContent=str;
  const pct=pomoState.totalTime>0?pomoState.timeLeft/pomoState.totalTime:1;
  document.getElementById('pomo-circle').style.strokeDashoffset=CIRC*(1-pct);
  const colors={work:'#6c63ff',short:'#10b981',long:'#f59e0b'};
  const labels={work:t('pomo_work_label'),short:t('pomo_short_label'),long:t('pomo_long_label')};
  document.getElementById('pomo-circle').style.stroke=colors[pomoState.mode];
  document.getElementById('pomo-label').textContent        =labels[pomoState.mode]||'';
  document.getElementById('pomo-session-label').textContent=labels[pomoState.mode]||'';
}
function renderPomoHistory(){
  const c=document.getElementById('pomo-history-list'); if(!c) return;
  if(!pomoHistory.length){c.innerHTML=`<div style="color:var(--text-muted);font-size:13px;padding:8px 0">—</div>`;return;}
  const icons={work:'🍅',short:'☕',long:'🌴'};
  const names={work:t('pomo_work_label'),short:t('pomo_short_label'),long:t('pomo_long_label')};
  c.innerHTML=pomoHistory.slice(0,8).map(h=>
    `<div class="pomo-hist-item"><span class="phi-icon">${icons[h.type]||'🍅'}</span><span class="phi-info">${names[h.type]||''}${h.tache?' — '+h.tache:''}</span><span class="phi-time">${h.heure}</span></div>`
  ).join('');
}

// ============================================================
// VUE SEMAINE
// ============================================================
function renderSemaine(){
  const dn=t('day_names').split?t('day_names'):['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'];
  // day_names is array in LANGS
  const dayNames=LANGS[lang].day_names||['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'];
  const today=new Date(), lundi=new Date(today);
  lundi.setDate(today.getDate()-((today.getDay()+6)%7)+semaineOffset*7);
  document.getElementById('semaine-label').textContent=`${lundi.getDate()}/${lundi.getMonth()+1}/${lundi.getFullYear()}`;
  let html='';
  for(let i=0;i<7;i++){
    const d=new Date(lundi); d.setDate(lundi.getDate()+i);
    const dateStr=d.toISOString().split('T')[0];
    const isToday=dateStr===today.toISOString().split('T')[0];
    const tJour=taches.filter(tt=>tt.echeance===dateStr);
    const jourIdx=(i+1)%7; // 1=lun → index 1 dans dayNames
    const jourLabel=dayNames[(i+1)%7];
    html+=`<div class="jour-col ${isToday?'today':''}">
      <div class="jour-col-hdr">${jourLabel}</div>
      <div class="jour-col-date">${d.getDate()}/${d.getMonth()+1}</div>`;
    tJour.forEach(tt=>{
      const cat=categories.find(c=>c.id===tt.catId);
      html+=`<div class="jour-task ${tt.faite?'done':''}" onclick="ouvrirModal(${tt.id})" style="${cat?`border-color:${cat.couleur}44`:''}">${cat?cat.icon+' ':''}${tt.texte}</div>`;
    });
    html+=`<button class="jour-add" onclick="ajouterTacheJour('${dateStr}')">+</button></div>`;
  }
  document.getElementById('semaine-grid').innerHTML=html;
}
function changerSemaine(dir){semaineOffset+=dir; renderSemaine();}
function ajouterTacheJour(dateStr){
  const texte=prompt(formatDate(dateStr)+' :'); if(!texte||!texte.trim()) return;
  const tt={id:Date.now(),texte:texte.trim(),faite:false,priorite:'normale',catId:null,echeance:dateStr,heure:null,heureFin:null,dureeMinutes:null,note:'',sousTaches:[],creee:new Date().toISOString(),recurrente:false};
  taches.unshift(tt); sauvegarder(); renderSemaine(); playSound('add');
}

// ============================================================
// CATÉGORIES
// ============================================================
function ajouterCategorie(){
  const nom=document.getElementById('new-cat-nom').value.trim(); if(!nom) return;
  const icon=document.getElementById('new-cat-icon').value;
  const couleur=document.getElementById('new-cat-couleur').value;
  categories.push({id:'cat-'+Date.now(),nom,icon,couleur});
  sauvegarder(); majCategoriesSelect(); renderCategories();
  document.getElementById('new-cat-nom').value='';
}
function renderCategories(){
  const c=document.getElementById('categories-list'); c.innerHTML='';
  if(!categories.length){c.innerHTML=`<div class="empty">—</div>`;return;}
  categories.forEach(cat=>{
    const tCat=taches.filter(tt=>tt.catId===cat.id);
    const faites=tCat.filter(tt=>tt.faite).length;
    const pct=tCat.length>0?Math.round(faites/tCat.length*100):0;
    const countTxt=`${tCat.length} ${tCat.length===1?t('cat_count_task'):t('cat_count_tasks')} · ${pct}% ${t('cat_done_pct')}`;
    const div=document.createElement('div'); div.className='cat-card';
    div.innerHTML=`
      <div class="cat-card-top">
        <div class="cat-left">
          <div class="cat-dot" style="background:${cat.couleur}"></div>
          <div><div class="cat-name">${cat.icon} ${cat.nom}</div><div class="cat-count">${countTxt}</div></div>
        </div>
        <div class="cat-acts">
          <button class="t-btn open" onclick="filtrerParCat('${cat.id}')" style="color:${cat.couleur}">→</button>
          <button class="t-btn del"  onclick="supprimerCategorie('${cat.id}')">🗑️</button>
        </div>
      </div>
      <div class="cat-bar"><div class="cat-bar-fill" style="width:${pct}%;background:${cat.couleur}"></div></div>
      <div class="cat-tasks-preview">
        ${tCat.slice(0,3).map(tt=>`<div class="cat-task-row ${tt.faite?'done':''}"><span>${tt.faite?'✅':'○'}</span>${tt.texte}</div>`).join('')}
        ${tCat.length>3?`<div style="font-size:11px;color:var(--text-muted);padding:3px 0">+${tCat.length-3} ${t('col_more')}</div>`:''}
      </div>`;
    c.appendChild(div);
  });
}
function supprimerCategorie(id){
  if(!confirm(t('confirm_delete_cat'))) return;
  categories=categories.filter(c=>c.id!==id);
  taches.forEach(tt=>{if(tt.catId===id)tt.catId=null;});
  sauvegarder(); majCategoriesSelect(); renderCategories();
}
function filtrerParCat(catId){
  catFiltreActif=catId;
  showPage('taches',document.querySelector('[data-page="taches"]'));
  setTimeout(()=>{
    document.querySelectorAll('.cat-filtre-btn').forEach(b=>b.classList.toggle('actif',b.getAttribute('onclick')?.includes(catId)));
    afficher(filtreActif());
  },50);
}

// ============================================================
// RÉCURRENTES — GÉNÉRATION
// ============================================================
function genererRecurrentes(){
  const today=new Date(), todayStr=today.toISOString().split('T')[0], todayDow=today.getDay();
  taches.filter(tt=>tt.recurrente).forEach(tt=>{
    if(!tt.derniereGen){tt.derniereGen=todayStr;return;}
    const derniere=new Date(tt.derniereGen);
    let doGen=false;
    if(tt.recurType==='quotidien') doGen=Math.floor((today-derniere)/86400000)>=1;
    else if(tt.recurType==='mensuel') doGen=Math.floor((today-derniere)/86400000)>=30;
    else if(tt.recurType==='hebdo'||tt.recurType==='personnalise'){
      if(tt.recurJoursSemaine?.length) doGen=tt.recurJoursSemaine.includes(todayDow)&&tt.derniereGen!==todayStr;
      else if(tt.recurJours) doGen=Math.floor((today-derniere)/86400000)>=tt.recurJours;
      else doGen=Math.floor((today-derniere)/86400000)>=7;
    }
    if(doGen){
      taches.unshift({...tt,id:Date.now()+Math.random(),faite:false,creee:new Date().toISOString(),derniereGen:todayStr,recurrente:false});
      tt.derniereGen=todayStr;
    }
  });
  sauvegarder();
}
function renderRecurrentes(){
  const c=document.getElementById('recurrentes-list');
  const recur=taches.filter(tt=>tt.recurrente);
  if(!recur.length){c.innerHTML=`<div class="empty">—</div>`;return;}
  const dayNames=LANGS[lang].day_names||['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'];
  c.innerHTML=recur.map(tt=>{
    const cat=categories.find(c=>c.id===tt.catId);
    const freq=tt.recurType==='quotidien'?t('freq_daily'):tt.recurType==='mensuel'?t('freq_monthly'):t('freq_weekly');
    const dayTags=tt.recurJoursSemaine?.length?`<div class="recur-days-row">${tt.recurJoursSemaine.map(j=>`<span class="recur-day-tag">${dayNames[j]}</span>`).join('')}</div>`:'';
    return`<div class="recur-card">
      <div class="recur-icon">${cat?cat.icon:'🔁'}</div>
      <div class="recur-body"><div class="recur-name">${tt.texte}</div><div class="recur-freq">${freq}${cat?' · '+cat.nom:''}</div>${dayTags}</div>
      <span class="rb-badge">${labelRecur(tt)}</span>
      <button class="t-btn del" onclick="supprimerRecurrente(${tt.id})">🗑️</button>
    </div>`;
  }).join('');
}
function supprimerRecurrente(id){taches=taches.filter(tt=>tt.id!==id);sauvegarder();renderRecurrentes();}

// ============================================================
// RAPPELS
// ============================================================
function afficherRappels(){
  majBtnNotifPerm();
  const now=new Date(), c=document.getElementById('liste-rappels');
  const avecRappel=taches.filter(tt=>tt.echeance&&tt.heure&&!tt.faite);
  c.innerHTML='';
  if(!avecRappel.length){c.innerHTML=`<div class="empty">—</div>`;return;}
  avecRappel.sort((a,b)=>new Date(`${a.echeance}T${a.heure}`)-new Date(`${b.echeance}T${b.heure}`));
  avecRappel.forEach(tt=>{
    const passe=new Date(`${tt.echeance}T${tt.heure}`)<now;
    const div=document.createElement('div'); div.className='rappel-card';
    div.innerHTML=`<div><div class="rappel-name">${tt.texte}</div><div class="rappel-time">📅 ${formatDate(tt.echeance)} ${tt.heure}${tt.heureFin?' → '+tt.heureFin:''}</div></div>
      <span class="rappel-status ${passe?'rs-past':'rs-coming'}">${passe?'✅':'⏳'}</span>`;
    c.appendChild(div);
  });
}

// ============================================================
// DASHBOARD
// ============================================================
function majDashboard(){
  const today=new Date().toISOString().split('T')[0];
  const total=taches.length, faites=taches.filter(tt=>tt.faite).length;
  const pct=total===0?0:Math.round(faites/total*100);
  document.getElementById('s-total').textContent  =total;
  document.getElementById('s-faites').textContent =faites;
  document.getElementById('s-actives').textContent=total-faites;
  document.getElementById('s-retard').textContent =taches.filter(tt=>tt.echeance&&tt.echeance<today&&!tt.faite).length;
  document.getElementById('progress-fill').style.width=pct+'%';
  document.getElementById('progress-pct').textContent=pct+'%';
  majCharts(faites,total-faites,taches.filter(tt=>tt.echeance&&tt.echeance<today&&!tt.faite).length);
}
function gc(){const dark=theme==='dark';return{text:dark?'#9494b8':'#666688',grid:dark?'rgba(255,255,255,0.05)':'rgba(0,0,0,0.06)'};}
function majCharts(f,a,r){
  const c=gc();
  // Doughnut
  const ctx1=document.getElementById('chart-doughnut').getContext('2d');
  if(charts.d)charts.d.destroy();
  charts.d=new Chart(ctx1,{type:'doughnut',data:{labels:[t('stat_done'),t('stat_active'),t('stat_late')],datasets:[{data:[f,a,r],backgroundColor:['#10b981','#f59e0b','#ef4444'],borderWidth:0}]},options:{plugins:{legend:{labels:{color:c.text,font:{size:11},boxWidth:12}}},cutout:'65%'}});
  // Bar
  const ctx2=document.getElementById('chart-bar').getContext('2d');
  if(charts.b)charts.b.destroy();
  const h=taches.filter(tt=>tt.priorite==='haute').length,n=taches.filter(tt=>tt.priorite==='normale').length,b=taches.filter(tt=>tt.priorite==='basse').length;
  charts.b=new Chart(ctx2,{type:'bar',data:{labels:[t('prio_high'),t('prio_normal'),t('prio_low')],datasets:[{data:[h,n,b],backgroundColor:['#ef4444','#10b981','#6366f1'],borderRadius:6,borderWidth:0}]},options:{plugins:{legend:{display:false}},scales:{y:{ticks:{color:c.text,stepSize:1},grid:{color:c.grid}},x:{ticks:{color:c.text},grid:{display:false}}}}});
  // Line
  const ctx3=document.getElementById('chart-line').getContext('2d');
  if(charts.l)charts.l.destroy();
  const labels=[],data=[];
  for(let i=6;i>=0;i--){const d=new Date();d.setDate(d.getDate()-i);const s=d.toISOString().split('T')[0];labels.push(formatDate(s));data.push(taches.filter(tt=>tt.creee&&tt.creee.startsWith(s)).length);}
  charts.l=new Chart(ctx3,{type:'line',data:{labels,datasets:[{data,borderColor:'#6c63ff',backgroundColor:'rgba(108,99,255,.1)',fill:true,tension:.4,pointBackgroundColor:'#6c63ff',pointRadius:4}]},options:{plugins:{legend:{display:false}},scales:{y:{ticks:{color:c.text,stepSize:1},grid:{color:c.grid}},x:{ticks:{color:c.text,font:{size:11}},grid:{display:false}}}}});
}

// ============================================================
// COLLAB
// ============================================================
function exporterTaches(){
  const blob=new Blob([JSON.stringify({taches,categories},null,2)],{type:'application/json'});
  const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='todo-'+new Date().toISOString().split('T')[0]+'.json';a.click();
}
function copierCode(){navigator.clipboard.writeText(btoa(JSON.stringify({taches,categories}))).then(()=>showToast('📋'));}
function importerCode(){
  const code=document.getElementById('import-code').value.trim();if(!code)return;
  try{const data=JSON.parse(atob(code));
    if(data.taches)taches=[...taches,...data.taches.filter(n=>!taches.find(e=>e.id===n.id))];
    if(data.categories)categories=[...categories,...data.categories.filter(n=>!categories.find(e=>e.id===n.id))];
    sauvegarder();majCategoriesSelect();document.getElementById('collab-status').textContent=`✅ ${data.taches?.length||0}`;showToast('📥');
  }catch(e){showToast('⚠️');}
}
function importerFichier(){
  const file=document.getElementById('import-file').files[0];if(!file)return;
  const reader=new FileReader();reader.onload=e=>{try{const data=JSON.parse(e.target.result);
    if(data.taches)taches=[...taches,...data.taches.filter(n=>!taches.find(ex=>ex.id===n.id))];
    if(data.categories)categories=[...categories,...data.categories.filter(n=>!categories.find(ex=>ex.id===n.id))];
    sauvegarder();majCategoriesSelect();document.getElementById('collab-status').textContent=`✅ ${data.taches?.length||0}`;showToast('📥');
  }catch(err){showToast('⚠️');}};reader.readAsText(file);
}

// ============================================================
// THÈME
// ============================================================
function toggleTheme(){
  theme=theme==='dark'?'light':'dark';
  document.body.classList.toggle('dark',theme==='dark');
  localStorage.setItem('theme',theme); updateThemeBtn();
  setTimeout(()=>{if(document.getElementById('page-dashboard').classList.contains('active'))majDashboard();},50);
}
function updateThemeBtn(){const btn=document.getElementById('theme-btn');if(btn)btn.textContent=theme==='dark'?'☀️':'🌙';}

// ============================================================
// UTILITAIRES
// ============================================================
function formatDate(s){if(!s)return'';const[y,m,d]=s.split('-');return`${d}/${m}/${y}`;}
function msToHMS(ms){const h=Math.floor(ms/3600000),m=Math.floor((ms%3600000)/60000),s=Math.floor((ms%60000)/1000);return`${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;}
