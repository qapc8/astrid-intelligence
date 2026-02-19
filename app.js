/* ========================================
   ASTRID STRATEGIC INTELLIGENCE PLATFORM
   Core Application Logic
   ======================================== */

// ============ DATA MODELS ============

const DOMAINS = ['Technology', 'Geopolitics', 'Economy', 'Environment', 'Society'];

const SIGNALS_DATA = [
    { id: 1, name: 'Agentic AI enterprise adoption hits tipping point', domain: 'Technology', scores: { adoption: 5, spread: 5, investment: 5, narrative: 5, impact: 5, evidence: 5, acceleration: 5 }, trendLink: 'AI Labor Disruption', status: 'critical', cynefin: 'complex' },
    { id: 2, name: 'US-China AI chip export controls relaxed to case-by-case', domain: 'Geopolitics', scores: { adoption: 4, spread: 4, investment: 5, narrative: 5, impact: 5, evidence: 5, acceleration: 4 }, trendLink: 'Geo-economic Fragmentation', status: 'escalated', cynefin: 'complicated' },
    { id: 3, name: 'BRICS Pay reducing USD usage in intra-bloc trade', domain: 'Economy', scores: { adoption: 3, spread: 4, investment: 4, narrative: 4, impact: 5, evidence: 4, acceleration: 4 }, trendLink: 'De-dollarization & Currency Blocs', status: 'escalated', cynefin: 'complex' },
    { id: 4, name: 'GLP-1 drugs reshaping food industry demand patterns', domain: 'Society', scores: { adoption: 4, spread: 4, investment: 5, narrative: 5, impact: 4, evidence: 4, acceleration: 4 }, trendLink: 'Health-Economy Convergence', status: 'monitoring', cynefin: 'complicated' },
    { id: 5, name: 'UN declares era of global water bankruptcy', domain: 'Environment', scores: { adoption: 3, spread: 4, investment: 2, narrative: 5, impact: 5, evidence: 5, acceleration: 4 }, trendLink: 'Resource Scarcity Escalation', status: 'critical', cynefin: 'chaotic' },
    { id: 6, name: 'Quantum error correction crosses break-even threshold', domain: 'Technology', scores: { adoption: 2, spread: 3, investment: 5, narrative: 4, impact: 5, evidence: 4, acceleration: 4 }, trendLink: 'Quantum Advantage Race', status: 'escalated', cynefin: 'complex' },
    { id: 7, name: 'Russia-Ukraine Geneva talks end without breakthrough', domain: 'Geopolitics', scores: { adoption: 5, spread: 5, investment: 3, narrative: 5, impact: 5, evidence: 5, acceleration: 3 }, trendLink: 'Great Power Confrontation', status: 'critical', cynefin: 'chaotic' },
    { id: 8, name: 'Global fertility rates below replacement in two-thirds of nations', domain: 'Society', scores: { adoption: 4, spread: 5, investment: 2, narrative: 4, impact: 5, evidence: 5, acceleration: 3 }, trendLink: 'Demographic Cliff', status: 'escalated', cynefin: 'complex' },
    { id: 9, name: 'NEW START nuclear treaty expires with no successor', domain: 'Geopolitics', scores: { adoption: 5, spread: 4, investment: 4, narrative: 5, impact: 5, evidence: 5, acceleration: 4 }, trendLink: 'Arms Control Collapse', status: 'critical', cynefin: 'chaotic' },
    { id: 10, name: 'Nuclear SMR renaissance driven by AI data center demand', domain: 'Environment', scores: { adoption: 3, spread: 4, investment: 5, narrative: 5, impact: 5, evidence: 4, acceleration: 5 }, trendLink: 'Nuclear Energy Revival', status: 'escalated', cynefin: 'complicated' },
    { id: 11, name: 'Deepfakes now indistinguishable from real media in 68% of cases', domain: 'Technology', scores: { adoption: 5, spread: 5, investment: 3, narrative: 5, impact: 5, evidence: 5, acceleration: 5 }, trendLink: 'Information Integrity Crisis', status: 'critical', cynefin: 'chaotic' },
    { id: 12, name: 'Starlink crosses 9M subscribers with 9,400+ satellites', domain: 'Technology', scores: { adoption: 4, spread: 4, investment: 5, narrative: 3, impact: 4, evidence: 5, acceleration: 4 }, trendLink: 'Space Economy Expansion', status: 'monitoring', cynefin: 'complicated' },
    { id: 13, name: 'Humanoid robots entering commercial deployment at $20K', domain: 'Technology', scores: { adoption: 3, spread: 3, investment: 5, narrative: 5, impact: 5, evidence: 4, acceleration: 5 }, trendLink: 'Physical AI Revolution', status: 'escalated', cynefin: 'complex' },
    { id: 14, name: 'Sovereign AI strategies as nations build national GPU pools', domain: 'Technology', scores: { adoption: 4, spread: 4, investment: 5, narrative: 4, impact: 5, evidence: 4, acceleration: 5 }, trendLink: 'AI Sovereignty Race', status: 'escalated', cynefin: 'complicated' },
    { id: 15, name: 'US crypto regulation moves from drafts to enforcement', domain: 'Economy', scores: { adoption: 4, spread: 4, investment: 4, narrative: 4, impact: 4, evidence: 5, acceleration: 4 }, trendLink: 'Digital Asset Mainstreaming', status: 'monitoring', cynefin: 'complicated' },
    { id: 16, name: 'Smart glasses shipments jump 110% as Meta dominates', domain: 'Technology', scores: { adoption: 4, spread: 4, investment: 5, narrative: 4, impact: 3, evidence: 4, acceleration: 5 }, trendLink: 'Ambient Computing Shift', status: 'monitoring', cynefin: 'complicated' },
    { id: 17, name: 'Loneliness epidemic worsening as middle-age crisis deepens', domain: 'Society', scores: { adoption: 4, spread: 5, investment: 2, narrative: 4, impact: 4, evidence: 5, acceleration: 3 }, trendLink: 'Social Fabric Erosion', status: 'escalated', cynefin: 'complex' },
    { id: 18, name: 'US tariffs at century-high 16.8%, EU squeezed by China redirects', domain: 'Economy', scores: { adoption: 5, spread: 5, investment: 3, narrative: 5, impact: 5, evidence: 5, acceleration: 4 }, trendLink: 'Geo-economic Fragmentation', status: 'critical', cynefin: 'complex' },
    { id: 19, name: 'Global sovereign debt surpassing 100% of GDP on trajectory', domain: 'Economy', scores: { adoption: 4, spread: 5, investment: 2, narrative: 4, impact: 5, evidence: 5, acceleration: 3 }, trendLink: 'Fiscal Sustainability Crisis', status: 'escalated', cynefin: 'complex' },
    { id: 20, name: 'Gene editing enters expanded human trials for chronic disease', domain: 'Technology', scores: { adoption: 2, spread: 3, investment: 4, narrative: 4, impact: 5, evidence: 3, acceleration: 4 }, trendLink: 'Biotech Convergence', status: 'new', cynefin: 'complex' },
];

const TRENDS_DATA = [
    { rank: 1, name: 'AI Labor Disruption', domain: 'Economy / Technology', direction: 'accelerating', score: 95, signals: 16 },
    { rank: 2, name: 'Geo-economic Fragmentation', domain: 'Geopolitics / Economy', direction: 'accelerating', score: 91, signals: 13 },
    { rank: 3, name: 'AI Sovereignty Race', domain: 'Technology / Geopolitics', direction: 'accelerating', score: 88, signals: 10 },
    { rank: 4, name: 'Information Integrity Crisis', domain: 'Technology / Society', direction: 'accelerating', score: 85, signals: 9 },
    { rank: 5, name: 'Nuclear Energy Revival', domain: 'Environment / Technology', direction: 'accelerating', score: 82, signals: 8 },
    { rank: 6, name: 'Great Power Confrontation', domain: 'Geopolitics', direction: 'stable', score: 79, signals: 11 },
    { rank: 7, name: 'Demographic Cliff', domain: 'Society / Economy', direction: 'accelerating', score: 76, signals: 7 },
    { rank: 8, name: 'Resource Scarcity Escalation', domain: 'Environment', direction: 'accelerating', score: 74, signals: 8 },
    { rank: 9, name: 'Digital Asset Mainstreaming', domain: 'Economy / Technology', direction: 'accelerating', score: 71, signals: 6 },
    { rank: 10, name: 'Physical AI Revolution', domain: 'Technology', direction: 'accelerating', score: 68, signals: 5 },
];

const DRIVERS_DATA = [
    { name: 'AI/Compute Acceleration', type: 'Enabling', impact: 5, uncertainty: 2, scenarioRole: 'Background', linkedTrends: ['AI Labor Disruption', 'AI Sovereignty Race', 'Information Integrity Crisis', 'Physical AI Revolution'] },
    { name: 'Geopolitical Bloc Formation', type: 'Friction', impact: 5, uncertainty: 5, scenarioRole: 'Axis (X)', linkedTrends: ['Geo-economic Fragmentation', 'Great Power Confrontation', 'Resource Scarcity Escalation'] },
    { name: 'Global Governance Capacity', type: 'Enabling', impact: 5, uncertainty: 4, scenarioRole: 'Axis (Y)', linkedTrends: ['Digital Asset Mainstreaming', 'Nuclear Energy Revival', 'Information Integrity Crisis'] },
    { name: 'Climate System Destabilization', type: 'Friction', impact: 5, uncertainty: 3, scenarioRole: 'Background', linkedTrends: ['Resource Scarcity Escalation', 'Nuclear Energy Revival', 'Demographic Cliff'] },
    { name: 'US Tariff & Trade Policy', type: 'Friction', impact: 5, uncertainty: 4, scenarioRole: 'Modifier', linkedTrends: ['Geo-economic Fragmentation', 'AI Sovereignty Race'] },
    { name: 'Demographic Decline', type: 'Friction', impact: 4, uncertainty: 2, scenarioRole: 'Background', linkedTrends: ['Demographic Cliff', 'AI Labor Disruption', 'Physical AI Revolution'] },
    { name: 'Energy Demand from AI Infrastructure', type: 'Enabling', impact: 4, uncertainty: 3, scenarioRole: 'Modifier', linkedTrends: ['Nuclear Energy Revival', 'AI Sovereignty Race'] },
    { name: 'Institutional Trust Collapse', type: 'Friction', impact: 4, uncertainty: 3, scenarioRole: 'Modifier', linkedTrends: ['Information Integrity Crisis', 'Demographic Cliff'] },
    { name: 'AI Productivity Gains Realization', type: 'Enabling', impact: 5, uncertainty: 4, scenarioRole: 'Axis (Y)', linkedTrends: ['AI Labor Disruption', 'Physical AI Revolution', 'Digital Asset Mainstreaming'] },
    { name: 'Trade System Fragmentation', type: 'Friction', impact: 4, uncertainty: 5, scenarioRole: 'Axis (X)', linkedTrends: ['Geo-economic Fragmentation', 'Great Power Confrontation'] },
    { name: 'Nuclear Proliferation Risk', type: 'Friction', impact: 5, uncertainty: 4, scenarioRole: 'Wild Card', linkedTrends: ['Great Power Confrontation', 'Geo-economic Fragmentation'] },
    { name: 'Water & Food System Stress', type: 'Friction', impact: 4, uncertainty: 3, scenarioRole: 'Modifier', linkedTrends: ['Resource Scarcity Escalation', 'Demographic Cliff'] },
    { name: 'Digital Infrastructure Ubiquity', type: 'Enabling', impact: 4, uncertainty: 2, scenarioRole: 'Background', linkedTrends: ['AI Labor Disruption', 'Information Integrity Crisis', 'Digital Asset Mainstreaming'] },
    { name: 'Sovereign Debt Overhang', type: 'Friction', impact: 4, uncertainty: 3, scenarioRole: 'Modifier', linkedTrends: ['Geo-economic Fragmentation', 'Demographic Cliff'] },
    { name: 'Biotech & Longevity Convergence', type: 'Enabling', impact: 3, uncertainty: 3, scenarioRole: 'Modifier', linkedTrends: ['Demographic Cliff', 'AI Labor Disruption'] },
    { name: 'Space Commercialization', type: 'Enabling', impact: 3, uncertainty: 4, scenarioRole: 'Modifier', linkedTrends: ['AI Sovereignty Race'] },
];

const SCENARIOS_DATA = {
    1: {
        title: 'Fortress World',
        subtitle: 'Fragmented + Stagnant',
        color: '#DC2626',
        description: 'US tariffs remain at century-high levels, the Russia-Ukraine war grinds on without resolution, NEW START expires with no successor, and BRICS accelerates de-dollarization. AI productivity gains fail to materialize broadly as sovereign AI silos fragment the compute ecosystem. Global cooperation collapses; supply chains are nationalized; innovation concentrates in defense.',
        geoWinners: ['United States (defense-tech ecosystem + energy independence)', 'China (vast internal market + industrial policy)', 'India (strategic non-alignment + domestic scale)', 'Gulf States (energy leverage + sovereign wealth)'],
        geoLosers: ['Export-dependent EU economies (squeezed between US tariffs and Chinese dumping)', 'Small open economies (Singapore, Netherlands)', 'Sub-Saharan Africa (debt distress + water bankruptcy)'],
        industryWinners: ['Defense & cybersecurity', 'Domestic agriculture & food security', 'Nuclear energy (SMRs)', 'Critical minerals mining'],
        industryLosers: ['Global tech platforms', 'Cross-border logistics & shipping', 'Luxury goods & discretionary consumption', 'Multinational consumer brands'],
    },
    2: {
        title: 'Bloc Dynamism',
        subtitle: 'Fragmented + Productive',
        color: '#D97706',
        description: 'Regional blocs harden but internal productivity surges. Agentic AI transforms enterprise operations within each bloc. The US-aligned and China-aligned tech stacks diverge fully. Nuclear SMRs power data centers regionally. Humanoid robots offset demographic decline in aging economies. BRICS Pay handles intra-bloc trade while the dollar dominates the Western sphere.',
        geoWinners: ['United States (AI + nuclear + defense)', 'China (manufacturing + domestic AI stack)', 'India (tech services + demographic dividend)', 'Japan & South Korea (robotics + semiconductor fabrication)'],
        geoLosers: ['Commodity-dependent fragile states without bloc membership', 'Nations with weak institutions and low digital infrastructure', 'EU periphery (caught between blocs)'],
        industryWinners: ['Defense & aerospace', 'Regional semiconductor fabs', 'Nuclear energy & SMRs', 'Humanoid robotics', 'Cybersecurity'],
        industryLosers: ['Global logistics networks', 'Cross-border financial services', 'Export-dependent mid-sized manufacturers'],
    },
    3: {
        title: 'Cooperative Surge',
        subtitle: 'Integrated + Productive',
        color: '#059669',
        description: 'The Geneva talks yield a Ukraine ceasefire framework, tariff tensions de-escalate via bilateral deals, and the AI Impact Summit in New Delhi produces binding governance norms. AI productivity gains materialize at 3%+ annually. Energy transition investment exceeds $2.5T. Quantum computing reaches verified advantage. Global crypto regulation provides clarity, unlocking institutional capital flows.',
        geoWinners: ['United States (AI leadership + deep capital markets)', 'EU core (green tech + advanced manufacturing)', 'India (digital services exports + AI talent)', 'Southeast Asia (manufacturing integration + demographic growth)'],
        geoLosers: ['Commodity-only economies without diversification', 'Authoritarian regimes resisting transparency norms'],
        industryWinners: ['AI platforms & agentic AI infrastructure', 'Semiconductors', 'Green technology & renewable energy', 'Quantum computing', 'Global logistics & digital trade'],
        industryLosers: ['Fossil fuels', 'Legacy manufacturing without automation', 'Low-productivity domestic services', 'Cash-only financial services'],
    },
    4: {
        title: 'Open but Adrift',
        subtitle: 'Integrated + Stagnant',
        color: '#6366F1',
        description: 'Trade remains open but sovereign debt overhang suppresses investment. Central banks hold rates above pre-COVID levels as inflation stays structurally elevated. AI adoption stalls amid regulation paralysis and deepfake-driven trust collapse. Climate events accelerate but governance fails to keep pace. Water bankruptcy affects agriculture globally but no coordinated response emerges.',
        geoWinners: ['Large diversified economies with natural resources', 'Gulf energy exporters (with sovereign wealth buffers)', 'Switzerland & Singapore (safe haven capital flows)'],
        geoLosers: ['Highly indebted advanced economies (Japan, France, US at risk)', 'Water-stressed agricultural economies', 'Technology-dependent small states'],
        industryWinners: ['Consumer staples', 'Healthcare & GLP-1 pharmaceuticals', 'Utilities & water infrastructure', 'Low-cost digital services'],
        industryLosers: ['Venture-backed frontier tech', 'Capital-intensive innovation (quantum, fusion)', 'Luxury goods', 'Commercial real estate'],
    }
};

const WILDCARDS = [
    { title: 'Nuclear Escalation Post-NEW START Collapse', severity: 'high', desc: 'With NEW START expired Feb 2026 and no successor treaty, a miscalculation or provocation leads to tactical nuclear weapon use or deployment beyond stockpile limits, triggering a global security crisis', impact: 'Would override all scenarios, trigger emergency NATO/BRICS responses, massive defense spending surge, potential market collapse, and immediate arms control emergency summit' },
    { title: 'AI Frontier Model Achieves Recursive Self-Improvement', severity: 'high', desc: 'A frontier AI lab demonstrates a model that can meaningfully improve its own training process, crossing the threshold from narrow to proto-general intelligence ahead of governance frameworks', impact: 'Would fundamentally reshape all scenarios within months, trigger emergency regulation, accelerate both existential risk timelines and economic opportunity, bifurcate nations into AI-capable and AI-dependent' },
    { title: 'Taiwan Strait Semiconductor Blockade', severity: 'medium', desc: 'China imposes a naval quarantine or exercises that disrupt TSMC production, cutting off 60%+ of advanced chip supply for weeks', impact: 'Would collapse Scenario 3, lock in S1/S2 dynamics, trigger emergency semiconductor stockpiling, and accelerate US-Japan-EU fab construction timelines by years' },
    { title: 'Cascading Climate Tipping Points Confirmed', severity: 'medium', desc: 'Simultaneous confirmation of irreversible AMOC slowdown and West Antarctic ice sheet destabilization, with 2026 tracking as another 1.5C+ year', impact: 'Would force emergency climate adaptation spending globally, trigger sovereign debt crises in vulnerable nations, massively accelerate nuclear and renewable investment, and reshape insurance markets' },
    { title: 'Coordinated Deepfake Attack on Financial Markets', severity: 'low', desc: 'AI-generated deepfakes of multiple world leaders and central bank governors trigger simultaneous market panics across exchanges before detection, exploiting the 68% indistinguishability rate', impact: 'Would accelerate digital provenance regulation, crash confidence in open information systems, boost cybersecurity and verification tech sectors, and potentially trigger circuit breakers across global exchanges' },
];

const STRESS_TEST_DATA = [
    { strategy: 'Deploy agentic AI across enterprise operations', s1: '+', s2: '++', s3: '++', s4: '~', robustness: 80 },
    { strategy: 'Diversify supply chains across 3+ geopolitical blocs', s1: '++', s2: '++', s3: '+', s4: '+', robustness: 90 },
    { strategy: 'Bet on open global trade normalization', s1: '--', s2: '-', s3: '++', s4: '+', robustness: 30 },
    { strategy: 'Invest in nuclear SMR + sovereign energy capacity', s1: '++', s2: '++', s3: '+', s4: '+', robustness: 90 },
    { strategy: 'Build cybersecurity & digital provenance infrastructure', s1: '++', s2: '++', s3: '+', s4: '++', robustness: 95 },
    { strategy: 'Accelerate humanoid robotics for labor replacement', s1: '+', s2: '++', s3: '++', s4: '~', robustness: 75 },
    { strategy: 'Pursue water security & agricultural resilience', s1: '+', s2: '+', s3: '+', s4: '++', robustness: 85 },
    { strategy: 'Expand into BRICS+ frontier markets', s1: '--', s2: '-', s3: '++', s4: '~', robustness: 25 },
];

const MONITORING_INDICATORS = [
    { scenario: 'S1', scenarioClass: 'ms1', indicator: 'US effective tariff rate trajectory', detail: 'Currently at 16.8% -- watch for escalation above 20% or new sectoral tariffs beyond semiconductors/steel/EVs', status: 'warning' },
    { scenario: 'S1', scenarioClass: 'ms1', indicator: 'Nuclear arms deployments post-NEW START', detail: 'Monitor US/Russia deployed warhead counts; FAS projects 6,000+ if no treaty successor by 2030', status: 'warning' },
    { scenario: 'S2', scenarioClass: 'ms2', indicator: 'Sovereign AI GPU pool construction', detail: 'India building 38,000-GPU national pool; watch for EU, Japan, Saudi equivalents exceeding 50,000 GPUs', status: 'trending' },
    { scenario: 'S2', scenarioClass: 'ms2', indicator: 'BRICS Pay transaction volume growth', detail: 'USD usage in intra-BRICS trade already down ~66%; watch for expansion to non-member states', status: 'trending' },
    { scenario: 'S3', scenarioClass: 'ms3', indicator: 'AI Impact Summit governance outcomes', detail: 'New Delhi summit Feb 2026 -- watch for binding AI governance norms vs. non-binding declarations', status: 'stable' },
    { scenario: 'S3', scenarioClass: 'ms3', indicator: 'Enterprise AI productivity gains', detail: 'Agentic AI automating 31% of workflows; watch for 50%+ threshold crossing in Fortune 500', status: 'trending' },
    { scenario: 'S4', scenarioClass: 'ms4', indicator: 'Global sovereign debt-to-GDP trajectory', detail: 'IMF projects >100% of global GDP by end of decade; US interest costs approaching $1T annually from 2026', status: 'warning' },
    { scenario: 'S4', scenarioClass: 'ms4', indicator: 'Climate-driven agricultural disruption', detail: 'Global water bankruptcy declared by UN; watch for >15% staple crop yield declines in water-stressed regions', status: 'warning' },
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

    const months = ["Mar '25", "Apr '25", "May '25", "Jun '25", "Jul '25", "Aug '25", "Sep '25", "Oct '25", "Nov '25", "Dec '25", "Jan '26", "Feb '26"];

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: months,
            datasets: [
                {
                    label: 'AI Labor Disruption',
                    data: [48, 55, 61, 67, 72, 76, 80, 84, 88, 91, 93, 95],
                    borderColor: '#0B2545',
                    borderWidth: 2,
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 4,
                },
                {
                    label: 'Geo-economic Fragmentation',
                    data: [44, 50, 56, 62, 66, 70, 75, 79, 83, 87, 89, 91],
                    borderColor: '#1E40AF',
                    borderWidth: 2,
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 4,
                },
                {
                    label: 'Nuclear Energy Revival',
                    data: [28, 33, 38, 44, 50, 56, 61, 66, 72, 76, 80, 82],
                    borderColor: '#3B82F6',
                    borderWidth: 2,
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 4,
                },
                {
                    label: 'Demographic Cliff',
                    data: [52, 55, 58, 61, 63, 65, 67, 70, 72, 74, 75, 76],
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
