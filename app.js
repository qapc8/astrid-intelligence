/* ========================================
   STRATEGIC INTELLIGENCE PLATFORM
   Core Application Logic
   ======================================== */

// ============ DATA MODELS ============

const DOMAINS = ['Technology', 'Geopolitics', 'Economy', 'Environment', 'Society'];

const SIGNALS_DATA = [
    { id: 1, name: 'Sovereign AI initiatives accelerating', domain: 'Technology', scores: { adoption: 4, spread: 4, investment: 5, narrative: 4, impact: 5, evidence: 4, acceleration: 5 }, trendLink: 'AI Sovereignty Race', status: 'monitoring', cynefin: 'complicated' },
    { id: 2, name: 'Critical mineral supply chain reshoring', domain: 'Geopolitics', scores: { adoption: 3, spread: 4, investment: 4, narrative: 4, impact: 5, evidence: 4, acceleration: 3 }, trendLink: 'Supply Chain Regionalization', status: 'escalated', cynefin: 'complex' },
    { id: 3, name: 'Central bank digital currency pilots expanding', domain: 'Economy', scores: { adoption: 3, spread: 4, investment: 4, narrative: 3, impact: 4, evidence: 3, acceleration: 3 }, trendLink: 'Digital Currency Adoption', status: 'monitoring', cynefin: 'complicated' },
    { id: 4, name: 'Lab-grown protein achieving price parity', domain: 'Technology', scores: { adoption: 2, spread: 2, investment: 3, narrative: 3, impact: 4, evidence: 2, acceleration: 3 }, trendLink: 'Food System Transformation', status: 'new', cynefin: 'complex' },
    { id: 5, name: 'Extreme weather insurance market collapse', domain: 'Environment', scores: { adoption: 3, spread: 3, investment: 2, narrative: 4, impact: 5, evidence: 4, acceleration: 4 }, trendLink: 'Climate Adaptation Finance', status: 'critical', cynefin: 'chaotic' },
    { id: 6, name: 'Quantum computing breaking current encryption', domain: 'Technology', scores: { adoption: 2, spread: 2, investment: 4, narrative: 3, impact: 5, evidence: 3, acceleration: 2 }, trendLink: 'Post-Quantum Security', status: 'monitoring', cynefin: 'complex' },
    { id: 7, name: 'Regional trade bloc formation accelerating', domain: 'Geopolitics', scores: { adoption: 4, spread: 4, investment: 3, narrative: 4, impact: 4, evidence: 5, acceleration: 4 }, trendLink: 'Geo-economic Fragmentation', status: 'escalated', cynefin: 'complicated' },
    { id: 8, name: 'Youth unemployment driving political instability', domain: 'Society', scores: { adoption: 3, spread: 4, investment: 2, narrative: 3, impact: 4, evidence: 4, acceleration: 2 }, trendLink: 'Social Contract Erosion', status: 'monitoring', cynefin: 'complex' },
    { id: 9, name: 'Autonomous weapons deployment in conflict zones', domain: 'Geopolitics', scores: { adoption: 3, spread: 3, investment: 4, narrative: 4, impact: 5, evidence: 3, acceleration: 4 }, trendLink: 'Defense Autonomy', status: 'critical', cynefin: 'chaotic' },
    { id: 10, name: 'Decentralized energy grids gaining traction', domain: 'Environment', scores: { adoption: 3, spread: 3, investment: 4, narrative: 3, impact: 4, evidence: 3, acceleration: 3 }, trendLink: 'Energy Decentralization', status: 'monitoring', cynefin: 'complicated' },
    { id: 11, name: 'AI-generated disinformation at scale', domain: 'Technology', scores: { adoption: 4, spread: 5, investment: 3, narrative: 5, impact: 5, evidence: 5, acceleration: 5 }, trendLink: 'Information Integrity Crisis', status: 'critical', cynefin: 'chaotic' },
    { id: 12, name: 'Space-based internet infrastructure expansion', domain: 'Technology', scores: { adoption: 3, spread: 3, investment: 5, narrative: 3, impact: 4, evidence: 3, acceleration: 3 }, trendLink: 'Space Economy', status: 'monitoring', cynefin: 'complicated' },
    { id: 13, name: 'Longevity biotech crossing clinical thresholds', domain: 'Technology', scores: { adoption: 2, spread: 2, investment: 4, narrative: 3, impact: 4, evidence: 2, acceleration: 3 }, trendLink: 'Healthspan Revolution', status: 'new', cynefin: 'complex' },
    { id: 14, name: 'Water scarcity triggering cross-border tensions', domain: 'Environment', scores: { adoption: 3, spread: 3, investment: 2, narrative: 3, impact: 5, evidence: 4, acceleration: 3 }, trendLink: 'Resource Conflict', status: 'escalated', cynefin: 'complex' },
    { id: 15, name: 'Platform economy regulation tightening globally', domain: 'Economy', scores: { adoption: 4, spread: 4, investment: 3, narrative: 4, impact: 3, evidence: 4, acceleration: 3 }, trendLink: 'Digital Regulation Wave', status: 'monitoring', cynefin: 'complicated' },
    { id: 16, name: 'Nuclear energy renaissance in emerging markets', domain: 'Environment', scores: { adoption: 3, spread: 3, investment: 4, narrative: 3, impact: 4, evidence: 3, acceleration: 4 }, trendLink: 'Nuclear Resurgence', status: 'new', cynefin: 'complicated' },
    { id: 17, name: 'Mass migration driven by climate events', domain: 'Society', scores: { adoption: 3, spread: 4, investment: 2, narrative: 4, impact: 5, evidence: 4, acceleration: 4 }, trendLink: 'Climate Migration', status: 'critical', cynefin: 'chaotic' },
    { id: 18, name: 'Neuromorphic computing prototypes emerging', domain: 'Technology', scores: { adoption: 1, spread: 1, investment: 3, narrative: 2, impact: 4, evidence: 1, acceleration: 2 }, trendLink: null, status: 'new', cynefin: 'disorder' },
    { id: 19, name: 'Private military companies in cyber operations', domain: 'Geopolitics', scores: { adoption: 2, spread: 3, investment: 3, narrative: 3, impact: 4, evidence: 2, acceleration: 3 }, trendLink: 'Cyber Mercenary Economy', status: 'monitoring', cynefin: 'complex' },
    { id: 20, name: 'Generative AI displacing white-collar work', domain: 'Economy', scores: { adoption: 4, spread: 5, investment: 5, narrative: 5, impact: 5, evidence: 5, acceleration: 5 }, trendLink: 'AI Labor Disruption', status: 'escalated', cynefin: 'complex' },
];

const TRENDS_DATA = [
    { rank: 1, name: 'AI Labor Disruption', domain: 'Economy / Technology', direction: 'accelerating', score: 92, signals: 14 },
    { rank: 2, name: 'Geo-economic Fragmentation', domain: 'Geopolitics', direction: 'accelerating', score: 88, signals: 11 },
    { rank: 3, name: 'AI Sovereignty Race', domain: 'Technology / Geopolitics', direction: 'accelerating', score: 85, signals: 9 },
    { rank: 4, name: 'Climate Adaptation Finance', domain: 'Environment / Economy', direction: 'accelerating', score: 82, signals: 8 },
    { rank: 5, name: 'Supply Chain Regionalization', domain: 'Economy / Geopolitics', direction: 'stable', score: 79, signals: 12 },
    { rank: 6, name: 'Information Integrity Crisis', domain: 'Technology / Society', direction: 'accelerating', score: 78, signals: 7 },
    { rank: 7, name: 'Energy Decentralization', domain: 'Environment', direction: 'stable', score: 74, signals: 6 },
    { rank: 8, name: 'Digital Regulation Wave', domain: 'Economy / Technology', direction: 'stable', score: 71, signals: 8 },
    { rank: 9, name: 'Defense Autonomy', domain: 'Geopolitics / Technology', direction: 'accelerating', score: 69, signals: 5 },
    { rank: 10, name: 'Social Contract Erosion', domain: 'Society', direction: 'decelerating', score: 65, signals: 7 },
];

const DRIVERS_DATA = [
    { name: 'AI/Compute Advancement', type: 'Enabling', impact: 5, uncertainty: 2, scenarioRole: 'Background', linkedTrends: ['AI Labor Disruption', 'AI Sovereignty Race', 'Information Integrity Crisis'] },
    { name: 'Geopolitical Power Shift', type: 'Friction', impact: 5, uncertainty: 5, scenarioRole: 'Axis (X)', linkedTrends: ['Geo-economic Fragmentation', 'Supply Chain Regionalization', 'Defense Autonomy'] },
    { name: 'Policy Coherence & Governance', type: 'Enabling', impact: 5, uncertainty: 4, scenarioRole: 'Axis (Y)', linkedTrends: ['Digital Regulation Wave', 'Climate Adaptation Finance'] },
    { name: 'Climate System Disruption', type: 'Friction', impact: 5, uncertainty: 3, scenarioRole: 'Background', linkedTrends: ['Climate Adaptation Finance', 'Energy Decentralization'] },
    { name: 'Capital Cost Environment', type: 'Friction', impact: 4, uncertainty: 4, scenarioRole: 'Modifier', linkedTrends: ['AI Sovereignty Race', 'Energy Decentralization'] },
    { name: 'Demographic Transition', type: 'Friction', impact: 4, uncertainty: 2, scenarioRole: 'Background', linkedTrends: ['Social Contract Erosion', 'AI Labor Disruption'] },
    { name: 'Energy Transition Dynamics', type: 'Enabling', impact: 4, uncertainty: 3, scenarioRole: 'Modifier', linkedTrends: ['Energy Decentralization', 'Climate Adaptation Finance'] },
    { name: 'Institutional Trust Erosion', type: 'Friction', impact: 4, uncertainty: 3, scenarioRole: 'Modifier', linkedTrends: ['Information Integrity Crisis', 'Social Contract Erosion'] },
    { name: 'Productivity Growth Trajectory', type: 'Enabling', impact: 5, uncertainty: 4, scenarioRole: 'Axis (Y)', linkedTrends: ['AI Labor Disruption', 'Digital Regulation Wave'] },
    { name: 'Trade System Architecture', type: 'Enabling', impact: 4, uncertainty: 5, scenarioRole: 'Axis (X)', linkedTrends: ['Geo-economic Fragmentation', 'Supply Chain Regionalization'] },
    { name: 'Cyber Threat Escalation', type: 'Friction', impact: 4, uncertainty: 4, scenarioRole: 'Wild Card', linkedTrends: ['Defense Autonomy', 'Information Integrity Crisis'] },
    { name: 'Resource Scarcity Pressures', type: 'Friction', impact: 4, uncertainty: 3, scenarioRole: 'Modifier', linkedTrends: ['Climate Adaptation Finance', 'Supply Chain Regionalization'] },
    { name: 'Digital Infrastructure Ubiquity', type: 'Enabling', impact: 4, uncertainty: 2, scenarioRole: 'Background', linkedTrends: ['AI Labor Disruption', 'Digital Regulation Wave'] },
    { name: 'Social Mobility Decline', type: 'Friction', impact: 3, uncertainty: 3, scenarioRole: 'Modifier', linkedTrends: ['Social Contract Erosion'] },
    { name: 'Biotech & Health Innovation', type: 'Enabling', impact: 3, uncertainty: 3, scenarioRole: 'Modifier', linkedTrends: [] },
    { name: 'Space Commercialization', type: 'Enabling', impact: 3, uncertainty: 4, scenarioRole: 'Modifier', linkedTrends: [] },
];

const SCENARIOS_DATA = {
    1: {
        title: 'Fortress World',
        subtitle: 'Fragmented + Stagnant',
        color: '#DC2626',
        description: 'High capital costs combined with geopolitical fragmentation lead to defensive positioning, protectionism, and domestic survival economics. Global cooperation breaks down, supply chains are nationalized, and innovation concentrates in defense and domestic security.',
        geoWinners: ['United States (tech + defense ecosystem)', 'China (large internal market + industrial policy)', 'India (strategic balancing + domestic scale)', 'Japan & South Korea (aligned tech bloc positioning)', 'EU if cohesive (strategic autonomy push)'],
        geoLosers: ['Mid-size export-led countries', 'Highly open financial hubs depending on global neutrality'],
        industryWinners: ['Defense & domestic security', 'Localized agriculture', 'Basic commodities', 'Essential utilities'],
        industryLosers: ['Global tech platforms', 'Cross-border logistics', 'High-end discretionary consumption'],
    },
    2: {
        title: 'Regionalized Resilience',
        subtitle: 'Fragmented + Productive',
        color: '#D97706',
        description: 'Productivity is strong, but scale is regionalized. Duplication of supply chains raises costs but boosts strategic sectors. Regional blocs compete through industrial policy and innovation while maintaining internal economic vitality.',
        geoWinners: ['United States (tech + defense ecosystem)', 'China (industrial policy champion)', 'India (strategic balancing)', 'Japan & South Korea (tech bloc leaders)'],
        geoLosers: ['Commodity-dependent fragile states', 'Economies with weak institutions and low human capital'],
        industryWinners: ['Defense & Aerospace', 'Cybersecurity', 'Energy Security', 'Regional Infrastructure'],
        industryLosers: ['Multinational consumer brands', 'Export-dependent mid-sized economies'],
    },
    3: {
        title: 'Global Renaissance',
        subtitle: 'Integrated + Productive',
        color: '#059669',
        description: 'Scale plus open trade plus strong productivity unlocks global champions and capital-intensive innovation. This is the most optimistic scenario: AI-driven productivity gains combine with cooperative trade architecture and strong governance.',
        geoWinners: ['United States (AI leadership, deep capital markets)', 'EU core (advanced industry + green tech)', 'India (services exports + digital scale)', 'Southeast Asia (manufacturing integration)'],
        geoLosers: ['Commodity-dependent fragile states', 'Economies with weak institutions'],
        industryWinners: ['Semiconductors', 'AI Platforms', 'Green Technology', 'Global Logistics', 'Capital Goods & Automation'],
        industryLosers: ['Fossil Fuels', 'Low-productivity domestic services', 'Protected Legacy Manufacturing'],
    },
    4: {
        title: 'Open but Adrift',
        subtitle: 'Integrated + Stagnant',
        color: '#6366F1',
        description: 'An open system but with weak growth. Investors favor stability and dividends over innovation. The global system remains interconnected, but low productivity growth and governance gaps mean limited dynamism.',
        geoWinners: ['Large diversified economies', 'Gulf energy exporters (with diversification)'],
        geoLosers: ['Technology SaaS economies', 'Fossil fuel dependent states', 'Low-productivity domestic services'],
        industryWinners: ['Consumer staples', 'Healthcare services', 'Utilities', 'Low-cost digital services'],
        industryLosers: ['Venture-backed tech', 'Capital-intensive frontier innovation', 'Luxury goods', 'High-growth emerging tech'],
    }
};

const WILDCARDS = [
    { title: 'Major Cyber Attack on Financial Infrastructure', severity: 'high', desc: 'State-sponsored or criminal attack takes down SWIFT or major clearing systems for >72 hours', impact: 'Would accelerate fragmentation, boost cyber defense sectors, trigger emergency currency controls' },
    { title: 'AI Achieving AGI Threshold', severity: 'high', desc: 'An AI system demonstrates general reasoning capabilities that match or exceed human experts across domains', impact: 'Would fundamentally reshape all scenarios, accelerating both opportunity and existential risk timelines' },
    { title: 'Taiwan Strait Escalation', severity: 'medium', desc: 'Military confrontation or blockade disrupting global semiconductor supply chains', impact: 'Would collapse Scenario 3, accelerate S1/S2, trigger emergency supply chain decoupling' },
    { title: 'Climate Tipping Point Triggered', severity: 'medium', desc: 'Amazon dieback, AMOC slowdown, or Antarctic ice sheet collapse confirmed as irreversible', impact: 'Would override all scenarios with emergency climate response, massive capital reallocation to adaptation' },
    { title: 'Pandemic 2.0 (Engineered Pathogen)', severity: 'low', desc: 'Bioengineered pathogen release (accidental or intentional) with higher lethality than COVID-19', impact: 'Would trigger border closures, accelerate biotech investment, reshape health security architecture globally' },
];

const STRESS_TEST_DATA = [
    { strategy: 'Invest heavily in AI infrastructure', s1: '+', s2: '+', s3: '++', s4: '~', robustness: 75 },
    { strategy: 'Diversify supply chain across 3+ regions', s1: '++', s2: '++', s3: '~', s4: '+', robustness: 85 },
    { strategy: 'Bet on open global trade expansion', s1: '--', s2: '-', s3: '++', s4: '+', robustness: 35 },
    { strategy: 'Build domestic self-sufficiency', s1: '++', s2: '+', s3: '-', s4: '~', robustness: 55 },
    { strategy: 'Invest in cybersecurity & defense', s1: '++', s2: '++', s3: '+', s4: '+', robustness: 90 },
    { strategy: 'Pursue green energy transition', s1: '~', s2: '+', s3: '++', s4: '+', robustness: 70 },
    { strategy: 'Focus on healthcare & resilience', s1: '+', s2: '+', s3: '+', s4: '++', robustness: 85 },
    { strategy: 'Expand into frontier markets', s1: '--', s2: '-', s3: '++', s4: '~', robustness: 30 },
];

const MONITORING_INDICATORS = [
    { scenario: 'S1', scenarioClass: 'ms1', indicator: 'Trade bloc tariff escalation', detail: 'Watch for >25% tariff impositions between major economies', status: 'warning' },
    { scenario: 'S1', scenarioClass: 'ms1', indicator: 'Foreign direct investment decline', detail: 'Cross-border FDI dropping >20% year-over-year', status: 'stable' },
    { scenario: 'S2', scenarioClass: 'ms2', indicator: 'Regional industrial policy spending', detail: 'Government tech investment >2% GDP in multiple regions', status: 'trending' },
    { scenario: 'S2', scenarioClass: 'ms2', indicator: 'Supply chain duplication costs', detail: 'Manufacturing redundancy costs rising >15% annually', status: 'warning' },
    { scenario: 'S3', scenarioClass: 'ms3', indicator: 'WTO reform progress', detail: 'Multilateral trade agreement negotiations advancing', status: 'stable' },
    { scenario: 'S3', scenarioClass: 'ms3', indicator: 'AI productivity metrics', detail: 'Measured productivity gains >3% annually in AI-adopting sectors', status: 'trending' },
    { scenario: 'S4', scenarioClass: 'ms4', indicator: 'Global growth stagnation', detail: 'World GDP growth below 2% for consecutive quarters', status: 'stable' },
    { scenario: 'S4', scenarioClass: 'ms4', indicator: 'Innovation funding retreat', detail: 'Global VC investment declining >30% from peak', status: 'warning' },
];

// ============ UTILITY FUNCTIONS ============

function getSignalScore(signal) {
    const s = signal.scores;
    // Weighted 7-dimension scoring: core 5 @ 0.15 each, evidence @ 0.10, acceleration @ 0.15
    const weighted = (s.adoption * 0.15) + (s.spread * 0.15) + (s.investment * 0.15) +
                     (s.narrative * 0.15) + (s.impact * 0.15) + (s.evidence * 0.10) + (s.acceleration * 0.15);
    return Math.round(weighted * 7); // Scale to ~5-35 range, displayed as /35
}

function getSignalScoreMax() { return 35; }

function getStrengthClass(score) {
    if (score >= 25) return 'strong';
    if (score >= 15) return 'strengthening';
    return 'weak';
}

function getStrengthLabel(score) {
    if (score >= 25) return 'Strong';
    if (score >= 15) return 'Strengthening';
    return 'Weak';
}

function getHeatColor(value, max) {
    const ratio = value / max;
    if (ratio >= 0.75) return '#0B2545';
    if (ratio >= 0.5) return '#1E40AF';
    if (ratio >= 0.3) return '#3B82F6';
    if (ratio >= 0.15) return '#93C5FD';
    return '#DBEAFE';
}

function getStatusEmoji(status) {
    switch(status) {
        case 'warning': return '⚠️';
        case 'trending': return '📈';
        case 'stable': return '➖';
        default: return '➖';
    }
}

function getDirectionArrow(direction) {
    switch(direction) {
        case 'accelerating': return '↗️';
        case 'stable': return '→';
        case 'decelerating': return '↘️';
        case 'reversing': return '↩️';
        default: return '→';
    }
}

// ============ NAVIGATION ============

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const page = link.dataset.page;

        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        document.getElementById(`page-${page}`).classList.add('active');

        window.scrollTo(0, 0);
    });
});

// ============ DASHBOARD ============

function initDashboard() {
    initSignalDistChart();
    initTrendMomentumChart();
    initSignalHeatmap();
    initTopSignalsList();
    initDashScenarioMatrix();
}

function initSignalDistChart() {
    const ctx = document.getElementById('signalDistChart');
    if (!ctx) return;

    const weakCount = SIGNALS_DATA.filter(s => getSignalScore(s) <= 10).length;
    const midCount = SIGNALS_DATA.filter(s => { const sc = getSignalScore(s); return sc >= 11 && sc <= 17; }).length;
    const strongCount = SIGNALS_DATA.filter(s => getSignalScore(s) >= 18).length;

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Weak (5-10)', 'Strengthening (11-17)', 'Strong (18-25)'],
            datasets: [{
                data: [weakCount, midCount, strongCount],
                backgroundColor: ['#93C5FD', '#3B82F6', '#0B2545'],
                borderWidth: 0,
                hoverOffset: 8,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '65%',
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        font: { family: 'Inter', size: 11, weight: '500' },
                        color: '#6B7280',
                        padding: 16,
                        usePointStyle: true,
                        pointStyleWidth: 8,
                    }
                }
            }
        }
    });
}

function initTrendMomentumChart() {
    const ctx = document.getElementById('trendMomentumChart');
    if (!ctx) return;

    const months = ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'];

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: months,
            datasets: [
                {
                    label: 'AI Labor Disruption',
                    data: [45, 52, 58, 63, 68, 72, 76, 80, 84, 88, 90, 92],
                    borderColor: '#0B2545',
                    borderWidth: 2,
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 4,
                },
                {
                    label: 'Geo-economic Fragmentation',
                    data: [40, 48, 52, 58, 62, 66, 72, 76, 80, 83, 86, 88],
                    borderColor: '#1E40AF',
                    borderWidth: 2,
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 4,
                },
                {
                    label: 'Climate Adaptation',
                    data: [30, 35, 42, 48, 52, 56, 60, 64, 70, 74, 78, 82],
                    borderColor: '#3B82F6',
                    borderWidth: 2,
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 4,
                },
                {
                    label: 'Social Contract Erosion',
                    data: [50, 55, 58, 62, 64, 66, 67, 68, 67, 66, 65, 65],
                    borderColor: '#93C5FD',
                    borderWidth: 2,
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 4,
                    borderDash: [5, 5],
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: { intersect: false, mode: 'index' },
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        font: { family: 'Inter', size: 11, weight: '500' },
                        color: '#6B7280',
                        padding: 12,
                        usePointStyle: true,
                    }
                }
            },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: { font: { family: 'Inter', size: 11 }, color: '#9CA3AF' }
                },
                y: {
                    min: 0, max: 100,
                    grid: { color: '#F3F4F6' },
                    ticks: {
                        font: { family: 'Inter', size: 11 },
                        color: '#9CA3AF',
                        callback: v => v + '%'
                    }
                }
            }
        }
    });
}

function initSignalHeatmap() {
    const container = document.getElementById('signalHeatmap');
    if (!container) return;

    const dimensions = ['Adoption', 'Spread', 'Investment', 'Narrative', 'Impact', 'Evidence', 'Accel.'];
    const dimKeys = ['adoption', 'spread', 'investment', 'narrative', 'impact', 'evidence', 'acceleration'];

    // Header row
    container.innerHTML = '<div class="heatmap-row-label"></div>';
    dimensions.forEach(dim => {
        container.innerHTML += `<div class="heatmap-col-label">${dim}</div>`;
    });

    // Data rows per domain
    DOMAINS.forEach(domain => {
        const domainSignals = SIGNALS_DATA.filter(s => s.domain === domain);
        container.innerHTML += `<div class="heatmap-row-label">${domain}</div>`;

        dimKeys.forEach(key => {
            const avg = domainSignals.length > 0
                ? domainSignals.reduce((sum, s) => sum + s.scores[key], 0) / domainSignals.length
                : 0;
            const color = getHeatColor(avg, 5);
            container.innerHTML += `<div class="heatmap-cell" style="background:${color}" title="${domain} - ${key}: ${avg.toFixed(1)}">${avg.toFixed(1)}</div>`;
        });
    });
}

function initTopSignalsList() {
    const container = document.getElementById('topSignalsList');
    if (!container) return;

    const sorted = [...SIGNALS_DATA].sort((a, b) => getSignalScore(b) - getSignalScore(a)).slice(0, 8);

    sorted.forEach(signal => {
        const score = getSignalScore(signal);
        const strength = getStrengthClass(score);
        const statusClass = `status-${signal.status}`;

        const colors = {
            strong: '#0B2545',
            strengthening: '#3B82F6',
            weak: '#93C5FD'
        };

        const bgColors = {
            strong: '#0B2545',
            strengthening: '#DBEAFE',
            weak: '#E0F2FE'
        };

        const textColors = {
            strong: '#FFFFFF',
            strengthening: '#1D4ED8',
            weak: '#0369A1'
        };

        container.innerHTML += `
            <div class="signal-item">
                <div class="signal-strength-dot" style="background:${colors[strength]}"></div>
                <div class="signal-name">${signal.name}</div>
                <div class="signal-score-badge" style="background:${bgColors[strength]};color:${textColors[strength]}">${score}</div>
                <div class="signal-domain-tag">${signal.domain}</div>
            </div>
        `;
    });
}

function initDashScenarioMatrix() {
    const container = document.getElementById('dashScenarioMatrix');
    if (!container) return;

    Object.entries(SCENARIOS_DATA).forEach(([id, scenario]) => {
        container.innerHTML += `
            <div class="scenario-mini s${id}" onclick="navigateToScenario(${id})">
                <h4>S${id}: ${scenario.title}</h4>
                <p>${scenario.description.substring(0, 120)}...</p>
            </div>
        `;
    });
}

// ============ SIGNALS PAGE ============

function initSignalsPage() {
    initSignalClusterMap();
    initSignalTable();
    initScorer();
}

function initSignalClusterMap() {
    const container = document.getElementById('signalClusterMap');
    if (!container) return;

    const clusters = {};
    SIGNALS_DATA.forEach(s => {
        if (!clusters[s.domain]) clusters[s.domain] = [];
        clusters[s.domain].push(s);
    });

    const colors = {
        'Technology': { bg: '#DBEAFE', text: '#1E40AF' },
        'Geopolitics': { bg: '#FEE2E2', text: '#991B1B' },
        'Economy': { bg: '#D1FAE5', text: '#166534' },
        'Environment': { bg: '#FEF3C7', text: '#92400E' },
        'Society': { bg: '#EDE9FE', text: '#5B21B6' }
    };

    Object.entries(clusters).forEach(([domain, signals]) => {
        const size = 80 + signals.length * 18;
        const c = colors[domain];
        container.innerHTML += `
            <div class="cluster-bubble" style="width:${size}px;height:${size}px;background:${c.bg};color:${c.text};font-size:${Math.max(10, 13 - signals.length)}px">
                ${domain}<br><strong>${signals.length}</strong>
            </div>
        `;
    });
}

function initSignalTable() {
    renderSignalTable(SIGNALS_DATA);
}

function renderSignalTable(signals) {
    const tbody = document.getElementById('signalTableBody');
    if (!tbody) return;

    tbody.innerHTML = '';
    const sorted = [...signals].sort((a, b) => getSignalScore(b) - getSignalScore(a));

    sorted.forEach(signal => {
        const score = getSignalScore(signal);
        const strengthClass = `strength-${getStrengthClass(score) === 'strengthening' ? 'mid' : getStrengthClass(score)}`;
        const statusClass = `status-${signal.status}`;
        const statusLabel = signal.status.charAt(0).toUpperCase() + signal.status.slice(1);
        const cynefinColors = { clear: '#22C55E', complicated: '#3B82F6', complex: '#F59E0B', chaotic: '#EF4444', disorder: '#9CA3AF' };
        const cynefinLabel = signal.cynefin ? signal.cynefin.charAt(0).toUpperCase() + signal.cynefin.slice(1) : '—';

        tbody.innerHTML += `
            <tr>
                <td style="font-weight:600;color:#111827">${signal.name}</td>
                <td><span class="signal-domain-tag">${signal.domain}</span></td>
                <td><span class="strength-badge ${strengthClass}">${getStrengthLabel(score)}</span></td>
                <td style="font-weight:700">${score}/${getSignalScoreMax()}</td>
                <td>${signal.trendLink || '<span style="color:#9CA3AF">—</span>'}</td>
                <td><span style="font-size:10px;font-weight:700;padding:2px 8px;border-radius:4px;background:${cynefinColors[signal.cynefin] || '#ccc'}20;color:${cynefinColors[signal.cynefin] || '#999'}">${cynefinLabel}</span></td>
                <td><span class="status-badge ${statusClass}">${statusLabel}</span></td>
            </tr>
        `;
    });
}

function filterSignals() {
    const domain = document.getElementById('signalDomainFilter').value;
    const strength = document.getElementById('signalStrengthFilter').value;

    let filtered = [...SIGNALS_DATA];

    if (domain !== 'all') {
        filtered = filtered.filter(s => s.domain.toLowerCase() === domain);
    }

    if (strength !== 'all') {
        filtered = filtered.filter(s => {
            const score = getSignalScore(s);
            if (strength === 'weak') return score <= 14;
            if (strength === 'strengthening') return score >= 15 && score <= 24;
            if (strength === 'strong') return score >= 25;
        });
    }

    renderSignalTable(filtered);
}

function initScorer() {
    document.querySelectorAll('.score-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const dim = btn.closest('.scorer-dimension');
            dim.querySelectorAll('.score-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            updateScorerResult();
        });
    });
}

function updateScorerResult() {
    let total = 0;
    let filled = 0;
    const maxScore = 35;

    document.querySelectorAll('.scorer-dimension').forEach(dim => {
        const selected = dim.querySelector('.score-btn.selected');
        if (selected) {
            total += parseInt(selected.dataset.score);
            filled++;
        }
    });

    document.getElementById('totalScore').textContent = total;
    const pct = (total / maxScore) * 100;
    document.getElementById('scoreBar').style.width = pct + '%';

    let classification = 'Select all 7 dimensions';
    let barColor = '#0B2545';

    if (filled === 7) {
        if (total <= 14) { classification = 'Weak Signal — Monitor'; barColor = '#93C5FD'; }
        else if (total <= 24) { classification = 'Strengthening Signal — Track'; barColor = '#3B82F6'; }
        else { classification = 'Strong Signal — Act'; barColor = '#0B2545'; }
    }

    document.getElementById('scoreClassification').textContent = classification;
    document.getElementById('scoreBar').style.background = barColor;
}

function resetScorer() {
    document.querySelectorAll('.score-btn').forEach(b => b.classList.remove('selected'));
    document.getElementById('totalScore').textContent = '0';
    document.getElementById('scoreBar').style.width = '0%';
    document.getElementById('scoreClassification').textContent = 'Select scores above';
}

// ============ TRENDS PAGE ============

function initTrendsPage() {
    initTrendDirectionChart();
    initTrendMaturityChart();
    initTopTrendsGrid();
    initTrendSignalMap();
}

function initTrendDirectionChart() {
    const ctx = document.getElementById('trendDirectionChart');
    if (!ctx) return;

    const accel = TRENDS_DATA.filter(t => t.direction === 'accelerating').length;
    const stable = TRENDS_DATA.filter(t => t.direction === 'stable').length;
    const decel = TRENDS_DATA.filter(t => t.direction === 'decelerating').length;

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Accelerating', 'Stable', 'Decelerating'],
            datasets: [{
                data: [accel, stable, decel],
                backgroundColor: ['#0B2545', '#3B82F6', '#93C5FD'],
                borderRadius: 8,
                barPercentage: 0.5,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: { font: { family: 'Inter', size: 12, weight: '600' }, color: '#374151' }
                },
                y: {
                    grid: { color: '#F3F4F6' },
                    ticks: { font: { family: 'Inter', size: 11 }, color: '#9CA3AF', stepSize: 1 }
                }
            }
        }
    });
}

function initTrendMaturityChart() {
    const ctx = document.getElementById('trendMaturityChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Trends',
                data: TRENDS_DATA.map((t, i) => ({
                    x: t.signals,
                    y: t.score,
                    label: t.name
                })),
                backgroundColor: TRENDS_DATA.map(t =>
                    t.direction === 'accelerating' ? '#0B2545' :
                    t.direction === 'stable' ? '#3B82F6' : '#93C5FD'
                ),
                pointRadius: 8,
                pointHoverRadius: 12,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${TRENDS_DATA[context.dataIndex].name}: Score ${context.parsed.y}, ${context.parsed.x} signals`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    title: { display: true, text: 'Supporting Signals', font: { family: 'Inter', size: 11, weight: '600' }, color: '#6B7280' },
                    grid: { color: '#F3F4F6' },
                    ticks: { font: { family: 'Inter', size: 11 }, color: '#9CA3AF' }
                },
                y: {
                    title: { display: true, text: 'Trend Score', font: { family: 'Inter', size: 11, weight: '600' }, color: '#6B7280' },
                    min: 50, max: 100,
                    grid: { color: '#F3F4F6' },
                    ticks: { font: { family: 'Inter', size: 11 }, color: '#9CA3AF' }
                }
            }
        }
    });
}

function initTopTrendsGrid() {
    const container = document.getElementById('topTrendsGrid');
    if (!container) return;

    TRENDS_DATA.forEach(trend => {
        container.innerHTML += `
            <div class="trend-card">
                <div class="trend-rank">${trend.rank}</div>
                <div class="trend-info">
                    <div class="trend-name">${trend.name}</div>
                    <div class="trend-domain">${trend.domain}</div>
                </div>
                <div class="trend-direction">${getDirectionArrow(trend.direction)}</div>
                <div class="trend-score-bar">
                    <div class="trend-score-fill" style="width:${trend.score}%;background:${trend.score >= 80 ? '#0B2545' : trend.score >= 60 ? '#3B82F6' : '#93C5FD'}"></div>
                </div>
            </div>
        `;
    });
}

function initTrendSignalMap() {
    const container = document.getElementById('trendSignalMap');
    if (!container) return;

    container.style.height = '350px';
    container.style.position = 'relative';

    const trends = TRENDS_DATA.slice(0, 5);
    const centerX = container.offsetWidth / 2 || 400;
    const centerY = 175;

    trends.forEach((trend, i) => {
        const angle = (i / trends.length) * Math.PI * 2 - Math.PI / 2;
        const radius = 120;
        const x = centerX + Math.cos(angle) * radius - 60;
        const y = centerY + Math.sin(angle) * radius - 16;

        container.innerHTML += `<div class="rel-node trend-node" style="left:${x}px;top:${y}px">${trend.name}</div>`;

        // Add connected signals
        const connectedSignals = SIGNALS_DATA.filter(s => s.trendLink === trend.name).slice(0, 3);
        connectedSignals.forEach((signal, j) => {
            const sAngle = angle + (j - 1) * 0.3;
            const sRadius = 220;
            const sx = centerX + Math.cos(sAngle) * sRadius - 50;
            const sy = centerY + Math.sin(sAngle) * sRadius - 12;

            container.innerHTML += `<div class="rel-node signal-node" style="left:${Math.max(0, sx)}px;top:${Math.max(0, Math.min(310, sy))}px">${signal.name.substring(0, 30)}...</div>`;
        });
    });
}

// ============ DRIVERS PAGE ============

function initDriversPage() {
    initImpactUncertaintyChart();
    initDriverClassification();
    initDriverTable();
    initForceNetwork();
}

function initImpactUncertaintyChart() {
    const container = document.getElementById('impactUncertaintyChart');
    if (!container) return;

    container.innerHTML = `
        <div class="iu-axis-x"></div>
        <div class="iu-axis-y"></div>
        <div class="iu-quadrant tl">Monitor</div>
        <div class="iu-quadrant tr">Scenario Axis</div>
        <div class="iu-quadrant bl">Background</div>
        <div class="iu-quadrant br">Contingent</div>
        <div class="iu-label iu-x-label">← Low Uncertainty    High Uncertainty →</div>
        <div class="iu-label iu-y-label">← Low Impact    High Impact →</div>
    `;

    DRIVERS_DATA.forEach(driver => {
        const x = (driver.uncertainty / 5) * 85 + 5;
        const y = 95 - (driver.impact / 5) * 85;
        const size = 10 + driver.linkedTrends.length * 3;
        const color = driver.type === 'Enabling' ? '#22C55E' : '#EF4444';

        container.innerHTML += `
            <div class="iu-dot" style="left:${x}%;top:${y}%;width:${size}px;height:${size}px;background:${color}" title="${driver.name}\nImpact: ${driver.impact}/5\nUncertainty: ${driver.uncertainty}/5\nRole: ${driver.scenarioRole}"></div>
        `;
    });
}

function initDriverClassification() {
    const enablingList = document.getElementById('enablingDriversList');
    const frictionList = document.getElementById('frictionDriversList');
    if (!enablingList || !frictionList) return;

    DRIVERS_DATA.filter(d => d.type === 'Enabling').forEach(d => {
        enablingList.innerHTML += `<li>${d.name} (Impact: ${d.impact}/5)</li>`;
    });

    DRIVERS_DATA.filter(d => d.type === 'Friction').forEach(d => {
        frictionList.innerHTML += `<li>${d.name} (Impact: ${d.impact}/5)</li>`;
    });
}

function initDriverTable() {
    const tbody = document.getElementById('driverTableBody');
    if (!tbody) return;

    const sorted = [...DRIVERS_DATA].sort((a, b) => (b.impact + b.uncertainty) - (a.impact + a.uncertainty));

    sorted.forEach(driver => {
        const typeColor = driver.type === 'Enabling' ? 'background:#DCFCE7;color:#166534' : 'background:#FEE2E2;color:#991B1B';
        const impactBars = '█'.repeat(driver.impact) + '░'.repeat(5 - driver.impact);
        const uncBars = '█'.repeat(driver.uncertainty) + '░'.repeat(5 - driver.uncertainty);

        tbody.innerHTML += `
            <tr>
                <td style="font-weight:600;color:#111827">${driver.name}</td>
                <td><span style="padding:3px 10px;border-radius:4px;font-size:11px;font-weight:600;${typeColor}">${driver.type}</span></td>
                <td style="font-family:monospace;font-size:12px;color:#0B2545">${impactBars} ${driver.impact}/5</td>
                <td style="font-family:monospace;font-size:12px;color:#6B7280">${uncBars} ${driver.uncertainty}/5</td>
                <td><span style="font-size:11px;font-weight:600;color:#374151">${driver.scenarioRole}</span></td>
                <td style="font-size:11px;color:#6B7280">${driver.linkedTrends.join(', ') || '—'}</td>
            </tr>
        `;
    });
}

function initForceNetwork() {
    const container = document.getElementById('forceNetwork');
    if (!container) return;

    DRIVERS_DATA.forEach(driver => {
        const isAxis = driver.scenarioRole.includes('Axis');
        const cls = 'driver-node';
        const size = isAxis ? 'font-size:14px;padding:12px 20px;' : '';
        container.innerHTML += `<div class="force-node ${cls}" style="${size}">${driver.name}</div>`;
    });
}

// ============ SCENARIOS PAGE ============

function initScenariosPage() {
    initWildcardGrid();
}

function showScenarioDetail(id) {
    const scenario = SCENARIOS_DATA[id];
    if (!scenario) return;

    const modal = document.getElementById('scenarioModal');
    const title = document.getElementById('modalTitle');
    const body = document.getElementById('modalBody');

    title.textContent = `S${id}: ${scenario.title}`;

    body.innerHTML = `
        <div class="modal-description" style="border-color:${scenario.color}">
            ${scenario.description}
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px">
            <div class="modal-section">
                <h4 style="color:${scenario.color}">🌍 Geographies that Gain</h4>
                <ul class="s${id}-list">
                    ${scenario.geoWinners.map(g => `<li>${g}</li>`).join('')}
                </ul>
            </div>
            <div class="modal-section">
                <h4 style="color:#991B1B">⚠ Geographies at Risk</h4>
                <ul class="s${id}-list">
                    ${scenario.geoLosers.map(g => `<li>${g}</li>`).join('')}
                </ul>
            </div>
            <div class="modal-section">
                <h4 style="color:${scenario.color}">📈 Industries that Win</h4>
                <ul class="s${id}-list">
                    ${scenario.industryWinners.map(i => `<li>${i}</li>`).join('')}
                </ul>
            </div>
            <div class="modal-section">
                <h4 style="color:#991B1B">📉 Industries at Risk</h4>
                <ul class="s${id}-list">
                    ${scenario.industryLosers.map(i => `<li>${i}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;

    modal.style.display = 'flex';
}

function closeModal() {
    document.getElementById('scenarioModal').style.display = 'none';
}

document.getElementById('scenarioModal')?.addEventListener('click', (e) => {
    if (e.target.id === 'scenarioModal') closeModal();
});

function initWildcardGrid() {
    const container = document.getElementById('wildcardGrid');
    if (!container) return;

    WILDCARDS.forEach(wc => {
        container.innerHTML += `
            <div class="wildcard-card">
                <div class="wildcard-header">
                    <div class="wildcard-title">${wc.title}</div>
                    <div class="wildcard-severity ${wc.severity}">${wc.severity}</div>
                </div>
                <div class="wildcard-desc">${wc.desc}</div>
                <div class="wildcard-impact"><strong>Impact:</strong> ${wc.impact}</div>
            </div>
        `;
    });
}

// ============ STRATEGY PAGE ============

function initStrategyPage() {
    initStressTestTable();
    initRoadmap();
    initMonitoringGrid();
}

function initStressTestTable() {
    const tbody = document.getElementById('stressTestBody');
    if (!tbody) return;

    STRESS_TEST_DATA.forEach(row => {
        const getClass = (val) => {
            if (val.includes('++')) return 'positive';
            if (val.includes('+')) return 'positive';
            if (val.includes('--')) return 'negative';
            if (val.includes('-')) return 'negative';
            return 'neutral';
        };

        const robColor = row.robustness >= 70 ? '#22C55E' : row.robustness >= 50 ? '#F59E0B' : '#EF4444';

        tbody.innerHTML += `
            <tr>
                <td style="font-weight:600;color:#111827">${row.strategy}</td>
                <td class="scenario-cell-val"><span class="stress-val ${getClass(row.s1)}">${row.s1}</span></td>
                <td class="scenario-cell-val"><span class="stress-val ${getClass(row.s2)}">${row.s2}</span></td>
                <td class="scenario-cell-val"><span class="stress-val ${getClass(row.s3)}">${row.s3}</span></td>
                <td class="scenario-cell-val"><span class="stress-val ${getClass(row.s4)}">${row.s4}</span></td>
                <td>
                    <div class="robustness-bar"><div class="robustness-fill" style="width:${row.robustness}%;background:${robColor}"></div></div>
                    <span style="font-size:12px;font-weight:700;color:${robColor}">${row.robustness}%</span>
                </td>
            </tr>
        `;
    });
}

function initRoadmap() {
    const container = document.getElementById('strategicRoadmap');
    if (!container) return;

    const phases = [
        {
            name: 'Phase 1: Sense (0-3 months)',
            class: 'phase-1',
            items: ['Deploy signal scanning across all 5 domains', 'Establish expert validation network', 'Build initial signal strength baseline', 'Map existing intelligence infrastructure']
        },
        {
            name: 'Phase 2: Analyze (3-6 months)',
            class: 'phase-2',
            items: ['Cluster signals into trend patterns', 'Score all drivers on impact-uncertainty', 'Identify dimensions of critical uncertainty', 'Conduct first scenario workshop']
        },
        {
            name: 'Phase 3: Strategize (6-9 months)',
            class: 'phase-3',
            items: ['Build scenario matrix and narratives', 'Stress-test strategic options', 'Develop strategic optionality framework', 'Establish monitoring indicators']
        },
        {
            name: 'Phase 4: Embed (9-12 months)',
            class: 'phase-4',
            items: ['Integrate into decision-making workflows', 'Launch continuous monitoring dashboard', 'Build collective intelligence infrastructure', 'Iterate feedback loops and recalibrate']
        }
    ];

    phases.forEach(phase => {
        container.innerHTML += `
            <div class="roadmap-phase">
                <div class="roadmap-phase-header ${phase.class}">${phase.name}</div>
                <div class="roadmap-items">
                    ${phase.items.map(item => `<div class="roadmap-item">${item}</div>`).join('')}
                </div>
            </div>
        `;
    });
}

function initMonitoringGrid() {
    const container = document.getElementById('monitoringGrid');
    if (!container) return;

    MONITORING_INDICATORS.forEach(ind => {
        container.innerHTML += `
            <div class="monitor-card">
                <div class="monitor-scenario ${ind.scenarioClass}">${ind.scenario}</div>
                <div class="monitor-info">
                    <div class="monitor-indicator">${ind.indicator}</div>
                    <div class="monitor-detail">${ind.detail}</div>
                </div>
                <div class="monitor-status">${getStatusEmoji(ind.status)}</div>
            </div>
        `;
    });
}

// ============ NAVIGATION HELPERS ============

function navigateToScenario(id) {
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    document.querySelector('[data-page="scenarios"]').classList.add('active');
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('page-scenarios').classList.add('active');
    window.scrollTo(0, 0);
    setTimeout(() => showScenarioDetail(id), 300);
}

function closeScenarioDetail() {
    document.getElementById('scenarioDetailCard').style.display = 'none';
}

// ============ INITIALIZATION ============

document.addEventListener('DOMContentLoaded', () => {
    initDashboard();
    initSignalsPage();
    initTrendsPage();
    initDriversPage();
    initScenariosPage();
    initStrategyPage();
});
