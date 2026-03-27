let taches = JSON.parse(localStorage.getItem('taches')) || [];
let theme = localStorage.getItem('theme') || 'dark';

// INITIALISATION
function init() {
    document.body.className = theme;
    updateThemeBtn();
    afficher('toutes');
    majDashboard();
}

// NAVIGATION
function showPage(pageId, btn) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('actif'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('actif'));
    document.getElementById(`page-${pageId}`).classList.add('actif');
    btn.classList.add('actif');
    if(pageId === 'dashboard') majDashboard();
}

// GESTION DES TACHES
function ajouterTache() {
    const input = document.getElementById('new-task');
    const texte = input.value.trim();
    if (!texte) return;

    const nouvelleTache = {
        id: Date.now(),
        texte: texte,
        priorite: document.getElementById('priorite').value,
        echeance: document.getElementById('echeance').value,
        heureDebut: document.getElementById('heure-debut').value,
        heureFin: document.getElementById('heure-fin').value,
        faite: false,
        creee: new Date().toISOString()
    };

    taches.unshift(nouvelleTache);
    sauvegarder();
    afficher(filtreActif());
    input.value = '';
    showToast("Tâche ajoutée ! 🚀");
}

function supprimerTache(id) {
    taches = taches.filter(t => t.id !== id);
    sauvegarder();
    afficher(filtreActif());
}

function toggleTache(id) {
    const t = taches.find(t => t.id === id);
    if (t) t.faite = !t.faite;
    sauvegarder();
    afficher(filtreActif());
}

function afficher(filtre = 'toutes') {
    const liste = document.getElementById('liste-taches');
    const recherche = document.getElementById('recherche').value.toLowerCase();
    liste.innerHTML = '';

    let filtrées = taches.filter(t => {
        const matchRecherche = t.texte.toLowerCase().includes(recherche);
        if (filtre === 'actives') return !t.faite && matchRecherche;
        if (filtre === 'terminees') return t.faite && matchRecherche;
        return matchRecherche;
    });

    filtrées.forEach(t => {
        const li = document.createElement('li');
        li.className = `tache-item ${t.faite ? 'faite' : ''}`;
        
        // Construction du badge de temps
        let timerHTML = '';
        if (t.heureDebut || t.heureFin) {
            timerHTML = `<span class="timer-badge">⏱️ ${t.heureDebut || '--:--'} - ${t.heureFin || '--:--'}</span>`;
        }

        li.innerHTML = `
            <div class="tache-left">
                <input type="checkbox" ${t.faite ? 'checked' : ''} onclick="toggleTache(${t.id})">
                <div>
                    <div class="tache-text" style="${t.faite ? 'text-decoration:line-through;color:var(--text-muted)' : ''}">${t.texte}</div>
                    <div class="tache-meta">
                        <span>${formatDate(t.echeance)}</span>
                        ${timerHTML}
                        <span style="color:var(--${t.priorite === 'haute' ? 'red' : t.priorite === 'moyenne' ? 'green' : 'blue'})">• ${t.priorite}</span>
                    </div>
                </div>
            </div>
            <button onclick="supprimerTache(${t.id})" style="background:none;color:var(--red);font-size:18px">🗑️</button>
        `;
        liste.appendChild(li);
    });

    document.getElementById('compteur').textContent = `${filtrées.length} tâche(s)`;
}

// UTILITAIRES
function sauvegarder() {
    localStorage.setItem('taches', JSON.stringify(taches));
    majDashboard();
}

function setFiltre(btn) {
    document.querySelectorAll('.filtres-bar button').forEach(b => b.classList.remove('actif'));
    btn.classList.add('actif');
    afficher(btn.dataset.filtre);
}

function filtreActif() {
    return document.querySelector('.filtres-bar button.actif').dataset.filtre;
}

function formatDate(s) {
    if(!s) return '';
    const [y, m, d] = s.split('-');
    return `📅 ${d}/${m}`;
}

function toggleTheme() {
    theme = theme === 'dark' ? 'light' : 'dark';
    document.body.className = theme;
    localStorage.setItem('theme', theme);
    updateThemeBtn();
    majDashboard();
}

function updateThemeBtn() {
    document.getElementById('theme-btn').textContent = theme === 'dark' ? '☀️ Thème clair' : '🌙 Thème sombre';
}

function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3000);
}

// DASHBOARD & CHARTS
let chartDoughnut, chartLine;

function majDashboard() {
    const total = taches.length;
    const faites = taches.filter(t => t.faite).length;
    const actives = total - faites;
    const retard = taches.filter(t => !t.faite && t.echeance && new Date(t.echeance) < new Date().setHours(0,0,0,0)).length;

    document.getElementById('s-total').textContent = total;
    document.getElementById('s-faites').textContent = faites;
    document.getElementById('s-actives').textContent = actives;
    document.getElementById('s-retard').textContent = retard;

    initCharts(faites, actives);
}

function initCharts(faites, actives) {
    const ctxD = document.getElementById('chart-doughnut').getContext('2d');
    if (chartDoughnut) chartDoughnut.destroy();
    
    chartDoughnut = new Chart(ctxD, {
        type: 'doughnut',
        data: {
            labels: ['Faites', 'Actives'],
            datasets: [{
                data: [faites, actives],
                backgroundColor: ['#10b981', '#3b82f6'],
                borderWidth: 0
            }]
        },
        options: { cutout: '70%', plugins: { legend: { position: 'bottom', labels: { color: theme === 'dark' ? '#fff' : '#000' } } } }
    });
}

// EXECUTION
init();