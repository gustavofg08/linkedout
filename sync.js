// Shared Storage and Realtime Data Sync Script
const DEFAULT_JOBS = [
    {
        id: 'job-101',
        title: 'Desenvolvedor Web Trainee / Júnior',
        company: 'SoftCatrina Tec',
        category: 'TI',
        location: 'Jaraguá do Sul - SC (Híbrido)',
        description: 'Vaga focada em egressos do Ensino Médio Técnico em Informática. Atuação na manutenção de sistemas web, auxílio em JavaScript, HTML, CSS e suporte a banco de dados.',
        recruiter: 'SoftCatrina Tec',
        createdAt: '2026-10-20'
    },
    {
        id: 'job-102',
        title: 'Assistente Administrativo Júnior',
        company: 'Logística Jaraguá',
        category: 'ADM',
        location: 'Jaraguá do Sul - SC (Presencial)',
        description: 'Oportunidade para recém-formados em Técnico em Administração. Rotinas de recepção, preenchimento de planilhas de controle, atendimento telefônico e envio de documentações.',
        recruiter: 'Logística Jaraguá',
        createdAt: '2026-10-22'
    },
    {
        id: 'job-103',
        title: 'Técnico de Suporte TI - Nível 1',
        company: 'Conecta Redes',
        category: 'TI',
        location: 'Presencial',
        description: 'Atendimento a chamados de suporte técnico, montagem e manutenção preventiva de computadores e configuração de rede local.',
        recruiter: 'Conecta Redes',
        createdAt: '2026-10-25'
    }
];

// Read from LocalStorage or initialize
function getJobs() {
    const raw = localStorage.getItem('linkedout_jobs');
    return raw ? JSON.parse(raw) : DEFAULT_JOBS;
}

function saveJobs(jobs) {
    localStorage.setItem('linkedout_jobs', JSON.stringify(jobs));
    notifyDataChanged();
}

function getApplications() {
    const raw = localStorage.getItem('linkedout_applications');
    return raw ? JSON.parse(raw) : [];
}

function saveApplications(apps) {
    localStorage.setItem('linkedout_applications', JSON.stringify(apps));
    notifyDataChanged();
}

function getCurrentUser() {
    const raw = localStorage.getItem('linkedout_current_user');
    return raw ? JSON.parse(raw) : null;
}

function setCurrentUser(user) {
    localStorage.setItem('linkedout_current_user', JSON.stringify(user));
}

// Inter-device Broadcast Channel
const channel = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel('linkedout_realtime_channel') : null;

function notifyDataChanged() {
    if (channel) {
        channel.postMessage({ type: 'DATA_UPDATED', timestamp: Date.now() });
    }
}

// Register sync listener
function onRealtimeUpdate(callback) {
    if (channel) {
        channel.onmessage = (event) => {
            if (event.data && event.data.type === 'DATA_UPDATED') {
                callback();
            }
        };
    }
    // Storage event for fallback
    window.addEventListener('storage', (e) => {
        if (e.key === 'linkedout_jobs' || e.key === 'linkedout_applications') {
            callback();
        }
    });
}
