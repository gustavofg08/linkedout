// Realtime Inter-Device WebRTC / Relay Sync
const DEFAULT_JOBS = [
    {
        id: 'job-101',
        title: 'Desenvolvedor Web Trainee / Júnior',
        company: 'SoftCatrina Tec',
        category: 'TI',
        location: 'Jaraguá do Sul - SC (Híbrido)',
        description: 'Vaga focada em egressos do Ensino Médio Técnico em Informática. Atuação em JavaScript, HTML, CSS e apoio a banco de dados.',
        recruiter: 'SoftCatrina Tec'
    },
    {
        id: 'job-102',
        title: 'Assistente Administrativo Júnior',
        company: 'Logística Jaraguá',
        category: 'ADM',
        location: 'Jaraguá do Sul - SC (Presencial)',
        description: 'Oportunidade para recém-formados em Técnico em Administração. Rotinas de recepção, preenchimento de planilhas de controle e atendimento.',
        recruiter: 'Logística Jaraguá'
    },
    {
        id: 'job-103',
        title: 'Técnico de Suporte TI - Nível 1',
        company: 'Conecta Redes',
        category: 'TI',
        location: 'Presencial',
        description: 'Atendimento a chamados de suporte técnico, manutenção preventiva de computadores e configuração de rede local.',
        recruiter: 'Conecta Redes'
    }
];

// Local Data Helpers
function getJobs() {
    const raw = localStorage.getItem('linkedout_jobs');
    return raw ? JSON.parse(raw) : DEFAULT_JOBS;
}

function saveJobsLocally(jobs) {
    localStorage.setItem('linkedout_jobs', JSON.stringify(jobs));
}

function getApplications() {
    const raw = localStorage.getItem('linkedout_applications');
    return raw ? JSON.parse(raw) : [];
}

function saveApplicationsLocally(apps) {
    localStorage.setItem('linkedout_applications', JSON.stringify(apps));
}

function getCurrentUser() {
    const raw = localStorage.getItem('linkedout_current_user');
    return raw ? JSON.parse(raw) : null;
}

function setCurrentUser(user) {
    localStorage.setItem('linkedout_current_user', JSON.stringify(user));
}

function getRoomCode() {
    return localStorage.getItem('linkedout_room_code') || 'SALA-123';
}

function setRoomCode(code) {
    localStorage.setItem('linkedout_room_code', code.toUpperCase().trim());
}

// Inter-Device Network via PeerJS (WebRTC Signaling)
let peer = null;
let roomConnections = [];
let onUpdateCallback = null;

function initNetwork(roomCode, onUpdate) {
    onUpdateCallback = onUpdate;
    const cleanRoom = roomCode.toUpperCase().trim();

    // Use PeerJS free cloud signaling
    const peerId = 'linkedout-' + cleanRoom + '-' + Math.floor(1000 + Math.random() * 9000);
    peer = new Peer(peerId);

    peer.on('open', (id) => {
        console.log('Peer registrado no servidor:', id);
        updateNetworkUI(true, cleanRoom);
        
        // Auto connect to the recruiter master peer
        if (!id.endsWith('RECRUITER')) {
            connectToPeer('linkedout-' + cleanRoom + '-RECRUITER');
        }
    });

    peer.on('connection', (conn) => {
        setupConn(conn);
    });

    peer.on('error', (err) => {
        console.warn('Network alert:', err);
    });
}

function setupConn(conn) {
    roomConnections.push(conn);

    conn.on('open', () => {
        updateNetworkUI(true, getRoomCode());
        // Send current local state on connection
        broadcastData();
    });

    conn.on('data', (data) => {
        if (data && data.type === 'SYNC_ALL') {
            if (data.jobs) saveJobsLocally(data.jobs);
            if (data.applications) saveApplicationsLocally(data.applications);
            if (onUpdateCallback) onUpdateCallback();
        }
    });

    conn.on('close', () => {
        roomConnections = roomConnections.filter(c => c !== conn);
        if (roomConnections.length === 0) {
            updateNetworkUI(false, getRoomCode());
        }
    });
}

function connectToPeer(targetPeerId) {
    if (!peer) return;
    const conn = peer.connect(targetPeerId);
    setupConn(conn);
}

function broadcastData() {
    const payload = {
        type: 'SYNC_ALL',
        jobs: getJobs(),
        applications: getApplications(),
        timestamp: Date.now()
    };

    roomConnections.forEach(conn => {
        if (conn.open) {
            conn.send(payload);
        }
    });
}

function saveAndBroadcastJobs(jobs) {
    saveJobsLocally(jobs);
    broadcastData();
    if (onUpdateCallback) onUpdateCallback();
}

function saveAndBroadcastApps(apps) {
    saveApplicationsLocally(apps);
    broadcastData();
    if (onUpdateCallback) onUpdateCallback();
}

function updateNetworkUI(isConnected, roomCode) {
    const statusEl = document.getElementById('network-status');
    const indicatorEl = document.getElementById('network-indicator');
    if (statusEl && indicatorEl) {
        if (isConnected) {
            indicatorEl.classList.add('connected');
            statusEl.innerText = `Sincronizado ao Vivo via Rede [Código da Sala: ${roomCode}]`;
        } else {
            indicatorEl.classList.remove('connected');
            statusEl.innerText = `Conectando à Sala [${roomCode}]... (Aguardando outros dispositivos)`;
        }
    }
}
