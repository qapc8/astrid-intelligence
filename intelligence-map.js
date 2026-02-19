/* ========================================
   3D INTELLIGENCE MAP ENGINE v2.0
   AI-Powered Topic Network + WEF Strategic Intelligence Taxonomy
   Based on WEF Transformation Maps (intelligence.weforum.org)
   ======================================== */

// ============ API CONFIGURATION ============
const AI_CONFIG = {
    baseUrl: 'https://api.hyperfusion.io/v1',
    apiKey: 'sk-Mg7KRnF5h33XyRMA7FveRg',
    model: 'qwen/qwen3-32b',
    maxTokens: 2000,
    temperature: 0.7
};

// ============ WEF CENTRES (CLUSTERS) ============
// Based on the 10 WEF Centres that curate Transformation Maps
const WEF_CLUSTERS = {
    'Fourth Industrial Revolution': { color: '#3B82F6', hex: 0x3B82F6, abbr: '4IR' },
    'Cybersecurity & Digital':      { color: '#8B5CF6', hex: 0x8B5CF6, abbr: 'CYB' },
    'Energy & Materials':           { color: '#F97316', hex: 0xF97316, abbr: 'ENM' },
    'Financial & Monetary':         { color: '#14B8A6', hex: 0x14B8A6, abbr: 'FIN' },
    'Health & Healthcare':          { color: '#EC4899', hex: 0xEC4899, abbr: 'HLT' },
    'Nature & Climate':             { color: '#10B981', hex: 0x10B981, abbr: 'NAT' },
    'Geopolitics & Trade':          { color: '#EF4444', hex: 0xEF4444, abbr: 'GEO' },
    'Economy & Society':            { color: '#F59E0B', hex: 0xF59E0B, abbr: 'SOC' },
    'Urban & Infrastructure':       { color: '#06B6D4', hex: 0x06B6D4, abbr: 'URB' },
    'Manufacturing & Supply Chains':{ color: '#A855F7', hex: 0xA855F7, abbr: 'MFG' },
    'Industries':                   { color: '#64748B', hex: 0x64748B, abbr: 'IND' },
};

// ============ WEF TOPIC TAXONOMY ============
// ~100 topics with Key Issues, mapped to WEF Centres
const WEF_TOPICS = [
    // ── Fourth Industrial Revolution ──
    { id: 'ai', name: 'Artificial Intelligence', cluster: 'Fourth Industrial Revolution', category: 'Global Issue', importance: 5,
      keyIssues: ['AI Governance and Ethics', 'Generative AI', 'AI in Decision-Making', 'Machine Learning Infrastructure', 'AI and Employment'] },
    { id: 'blockchain', name: 'Blockchain', cluster: 'Fourth Industrial Revolution', category: 'Global Issue', importance: 3,
      keyIssues: ['Decentralized Finance', 'Smart Contracts', 'Digital Assets', 'Blockchain Governance'] },
    { id: 'quantum', name: 'Quantum Computing', cluster: 'Fourth Industrial Revolution', category: 'Global Issue', importance: 3,
      keyIssues: ['Quantum Supremacy', 'Post-Quantum Cryptography', 'Quantum Sensing', 'Quantum Internet'] },
    { id: 'biotech', name: 'Biotechnology', cluster: 'Fourth Industrial Revolution', category: 'Global Issue', importance: 4,
      keyIssues: ['Gene Editing', 'Synthetic Biology', 'Biomanufacturing', 'Biosecurity'] },
    { id: 'iot', name: 'Internet of Things', cluster: 'Fourth Industrial Revolution', category: 'Global Issue', importance: 3,
      keyIssues: ['Industrial IoT', 'Edge Computing', 'Sensor Networks', 'IoT Security'] },
    { id: 'robotics', name: 'Robotics', cluster: 'Fourth Industrial Revolution', category: 'Global Issue', importance: 4,
      keyIssues: ['Humanoid Robots', 'Cobots', 'Autonomous Systems', 'Robotic Process Automation'] },
    { id: 'drones', name: 'Drones', cluster: 'Fourth Industrial Revolution', category: 'Global Issue', importance: 3,
      keyIssues: ['Drone Delivery', 'Military Drones', 'Drone Regulation', 'Urban Air Mobility'] },
    { id: 'space', name: 'Space', cluster: 'Fourth Industrial Revolution', category: 'Global Issue', importance: 3,
      keyIssues: ['Space Commercialization', 'Satellite Internet', 'Space Debris', 'Lunar Exploration'] },
    { id: 'digital_economy', name: 'Digital Economy & New Value Creation', cluster: 'Fourth Industrial Revolution', category: 'Global Issue', importance: 4,
      keyIssues: ['Platform Economy', 'Creator Economy', 'Digital Trade', 'Data as an Asset'] },
    { id: '3d_printing', name: '3D Printing', cluster: 'Fourth Industrial Revolution', category: 'Global Issue', importance: 2,
      keyIssues: ['Additive Manufacturing', 'Bioprinting', 'Construction 3D Printing'] },

    // ── Cybersecurity & Digital ──
    { id: 'cybersecurity', name: 'Cybersecurity', cluster: 'Cybersecurity & Digital', category: 'Global Issue', importance: 5,
      keyIssues: ['Ransomware', 'Critical Infrastructure Protection', 'Cyber Norms', 'Zero Trust Architecture', 'Supply Chain Security'] },
    { id: 'internet_gov', name: 'Internet Governance', cluster: 'Cybersecurity & Digital', category: 'Global Issue', importance: 4,
      keyIssues: ['Digital Sovereignty', 'Content Moderation', 'Platform Regulation', 'Digital Rights'] },
    { id: 'data_policy', name: 'Data Policy', cluster: 'Cybersecurity & Digital', category: 'Global Issue', importance: 4,
      keyIssues: ['Data Privacy', 'Cross-Border Data Flows', 'Data Localization', 'GDPR and Equivalents'] },
    { id: 'digital_identity', name: 'Digital Identity', cluster: 'Cybersecurity & Digital', category: 'Global Issue', importance: 3,
      keyIssues: ['Self-Sovereign Identity', 'Digital Credentials', 'Biometric Authentication'] },
    { id: 'disinformation', name: 'Disinformation', cluster: 'Cybersecurity & Digital', category: 'Global Issue', importance: 4,
      keyIssues: ['Deepfakes', 'Media Literacy', 'Information Warfare', 'Fact-Checking at Scale'] },

    // ── Energy & Materials ──
    { id: 'energy_transition', name: 'Energy Transition', cluster: 'Energy & Materials', category: 'Global Issue', importance: 5,
      keyIssues: ['Clean Energy Investment', 'Grid Modernization', 'Energy Access', 'Decarbonization Pathways'] },
    { id: 'oil_gas', name: 'Oil and Gas', cluster: 'Energy & Materials', category: 'Industry', importance: 4,
      keyIssues: ['Methane Emissions', 'Carbon Capture', 'Operational Efficiency', 'Energy Transition'] },
    { id: 'batteries', name: 'Batteries', cluster: 'Energy & Materials', category: 'Global Issue', importance: 4,
      keyIssues: ['Solid-State Batteries', 'Battery Recycling', 'Energy Density', 'Grid Storage'] },
    { id: 'hydrogen', name: 'Hydrogen', cluster: 'Energy & Materials', category: 'Global Issue', importance: 3,
      keyIssues: ['Green Hydrogen', 'Hydrogen Infrastructure', 'Industrial Use Cases'] },
    { id: 'nuclear', name: 'Nuclear Energy', cluster: 'Energy & Materials', category: 'Global Issue', importance: 4,
      keyIssues: ['Small Modular Reactors', 'Nuclear Fusion', 'Nuclear Safety', 'Waste Management'] },
    { id: 'mining', name: 'Mining and Metals', cluster: 'Energy & Materials', category: 'Industry', importance: 4,
      keyIssues: ['Critical Minerals', 'Responsible Mining', 'Mine Automation', 'Supply Chain Transparency'] },
    { id: 'chemicals', name: 'Chemicals and Advanced Materials', cluster: 'Energy & Materials', category: 'Industry', importance: 3,
      keyIssues: ['Green Chemistry', 'Materials Innovation', 'Circular Materials'] },

    // ── Financial & Monetary ──
    { id: 'financial_systems', name: 'Financial and Monetary Systems', cluster: 'Financial & Monetary', category: 'Global Issue', importance: 5,
      keyIssues: ['Systemic Risk', 'Financial Regulation', 'Monetary Policy', 'Financial Stability'] },
    { id: 'banking', name: 'Banking and Capital Markets', cluster: 'Financial & Monetary', category: 'Industry', importance: 4,
      keyIssues: ['Digital Banking', 'Open Finance', 'RegTech', 'Sustainable Finance', 'CBDCs'] },
    { id: 'insurance', name: 'Insurance and Asset Management', cluster: 'Financial & Monetary', category: 'Industry', importance: 3,
      keyIssues: ['InsurTech', 'Climate Risk Underwriting', 'Parametric Insurance', 'ESG Investing'] },
    { id: 'digital_currencies', name: 'Digital Currencies', cluster: 'Financial & Monetary', category: 'Global Issue', importance: 4,
      keyIssues: ['CBDCs', 'Stablecoins', 'Crypto Regulation', 'Digital Payment Systems'] },
    { id: 'dev_finance', name: 'Development Finance', cluster: 'Financial & Monetary', category: 'Global Issue', importance: 3,
      keyIssues: ['Blended Finance', 'Impact Investing', 'Debt Sustainability', 'Climate Finance'] },
    { id: 'fintech', name: 'FinTech', cluster: 'Financial & Monetary', category: 'Global Issue', importance: 3,
      keyIssues: ['Embedded Finance', 'Financial Inclusion', 'Neobanks', 'Payment Innovation'] },

    // ── Health & Healthcare ──
    { id: 'global_health', name: 'Global Health', cluster: 'Health & Healthcare', category: 'Global Issue', importance: 5,
      keyIssues: ['Pandemic Preparedness', 'Health Equity', 'Universal Health Coverage', 'Antimicrobial Resistance'] },
    { id: 'mental_health', name: 'Mental Health', cluster: 'Health & Healthcare', category: 'Global Issue', importance: 4,
      keyIssues: ['Workplace Mental Health', 'Digital Therapeutics', 'Youth Mental Health', 'Stigma Reduction'] },
    { id: 'healthcare', name: 'Healthcare and Life Sciences', cluster: 'Health & Healthcare', category: 'Industry', importance: 4,
      keyIssues: ['Digital Health', 'Drug Discovery', 'Precision Medicine', 'Health Data', 'Equitable Access'] },
    { id: 'longevity', name: 'Ageing and Longevity', cluster: 'Health & Healthcare', category: 'Global Issue', importance: 3,
      keyIssues: ['Healthy Ageing', 'Silver Economy', 'Age-Tech', 'Pension Systems'] },

    // ── Nature & Climate ──
    { id: 'climate', name: 'Climate Change', cluster: 'Nature & Climate', category: 'Global Issue', importance: 5,
      keyIssues: ['Net Zero Pathways', 'Carbon Markets', 'Climate Adaptation', 'Loss and Damage', 'Climate Finance'] },
    { id: 'biodiversity', name: 'Biodiversity', cluster: 'Nature & Climate', category: 'Global Issue', importance: 4,
      keyIssues: ['Nature-Based Solutions', 'Deforestation', 'Protected Areas', 'Biodiversity Credits'] },
    { id: 'ocean', name: 'Ocean', cluster: 'Nature & Climate', category: 'Global Issue', importance: 3,
      keyIssues: ['Ocean Pollution', 'Blue Economy', 'Marine Conservation', 'Deep-Sea Mining'] },
    { id: 'water', name: 'Water', cluster: 'Nature & Climate', category: 'Global Issue', importance: 4,
      keyIssues: ['Water Scarcity', 'Water Quality', 'Water Governance', 'WASH Infrastructure'] },
    { id: 'circular', name: 'Circular Economy', cluster: 'Nature & Climate', category: 'Global Issue', importance: 3,
      keyIssues: ['Product-as-a-Service', 'Extended Producer Responsibility', 'Waste-to-Value', 'Design for Circularity'] },
    { id: 'food_security', name: 'Food Security', cluster: 'Nature & Climate', category: 'Global Issue', importance: 4,
      keyIssues: ['Food Supply Chain Resilience', 'Nutrition', 'Food Waste', 'Agricultural Productivity'] },
    { id: 'forests', name: 'Forests', cluster: 'Nature & Climate', category: 'Global Issue', importance: 3,
      keyIssues: ['Deforestation', 'REDD+', 'Forest Restoration', 'Timber Trade'] },
    { id: 'agriculture', name: 'Agriculture, Food and Beverage', cluster: 'Nature & Climate', category: 'Industry', importance: 4,
      keyIssues: ['AgriTech', 'Sustainable Agriculture', 'Alternative Proteins', 'Precision Agriculture'] },

    // ── Geopolitics & Trade ──
    { id: 'geopolitics', name: 'Geopolitics', cluster: 'Geopolitics & Trade', category: 'Global Issue', importance: 5,
      keyIssues: ['Great Power Competition', 'Regional Conflicts', 'Geoeconomic Confrontation', 'Alliances', 'Geopolitical Risk'] },
    { id: 'trade', name: 'Trade and Investment', cluster: 'Geopolitics & Trade', category: 'Global Issue', importance: 5,
      keyIssues: ['Trade Wars', 'FDI Flows', 'WTO Reform', 'Nearshoring', 'Trade Agreements'] },
    { id: 'int_security', name: 'International Security', cluster: 'Geopolitics & Trade', category: 'Global Issue', importance: 5,
      keyIssues: ['Arms Control', 'Nuclear Proliferation', 'Conflict Prevention', 'Defence Policy'] },
    { id: 'global_gov', name: 'Global Governance', cluster: 'Geopolitics & Trade', category: 'Global Issue', importance: 4,
      keyIssues: ['Multilateral Reform', 'Rule of Law', 'International Cooperation', 'Institutional Trust'] },
    { id: 'global_risks', name: 'Global Risks', cluster: 'Geopolitics & Trade', category: 'Global Issue', importance: 4,
      keyIssues: ['Economic Risks', 'Environmental Risks', 'Geopolitical Risks', 'Societal Risks', 'Technological Risks'] },
    { id: 'geo_economics', name: 'Geo-economics', cluster: 'Geopolitics & Trade', category: 'Global Issue', importance: 4,
      keyIssues: ['Sanctions', 'Economic Statecraft', 'Supply Chain Weaponization', 'De-risking'] },
    { id: 'corruption', name: 'Corruption', cluster: 'Geopolitics & Trade', category: 'Global Issue', importance: 3,
      keyIssues: ['Anti-Corruption Frameworks', 'Transparency', 'Illicit Financial Flows'] },

    // ── Economy & Society ──
    { id: 'workforce', name: 'Workforce and Employment', cluster: 'Economy & Society', category: 'Global Issue', importance: 5,
      keyIssues: ['Future of Work', 'Gig Economy', 'Labour Rights', 'Remote Work', 'Labour Market Policies'] },
    { id: 'education', name: 'Education, Skills and Training', cluster: 'Economy & Society', category: 'Global Issue', importance: 4,
      keyIssues: ['Lifelong Learning', 'STEM Education', 'Digital Skills', 'EdTech', 'Education Equity'] },
    { id: 'gender', name: 'Gender Inequality', cluster: 'Economy & Society', category: 'Global Issue', importance: 3,
      keyIssues: ['Gender Pay Gap', 'Women in Leadership', 'Gender-Based Violence', 'Reproductive Rights'] },
    { id: 'inequality', name: 'Inequality', cluster: 'Economy & Society', category: 'Global Issue', importance: 4,
      keyIssues: ['Income Inequality', 'Wealth Concentration', 'Social Mobility', 'Tax Policy'] },
    { id: 'taxation', name: 'Taxation', cluster: 'Economy & Society', category: 'Global Issue', importance: 3,
      keyIssues: ['Global Minimum Tax', 'Digital Taxation', 'Tax Havens', 'Fiscal Policy'] },
    { id: 'migration', name: 'Migration', cluster: 'Economy & Society', category: 'Global Issue', importance: 4,
      keyIssues: ['Refugee Crises', 'Labour Migration', 'Integration Policies', 'Migration Governance'] },
    { id: 'human_rights', name: 'Human Rights', cluster: 'Economy & Society', category: 'Global Issue', importance: 3,
      keyIssues: ['Business and Human Rights', 'Digital Rights', 'Indigenous Peoples', 'Freedom of Expression'] },
    { id: 'demographics', name: 'Ageing and Demographics', cluster: 'Economy & Society', category: 'Global Issue', importance: 4,
      keyIssues: ['Population Decline', 'Youth Bulge', 'Dependency Ratios', 'Fertility Rates'] },
    { id: 'sdg_progress', name: 'Sustainable Development', cluster: 'Economy & Society', category: 'Global Issue', importance: 4,
      keyIssues: ['ESG Frameworks', 'Impact Measurement', 'Stakeholder Capitalism', 'Sustainability Reporting'] },
    { id: 'econ_progress', name: 'Future of Economic Progress', cluster: 'Economy & Society', category: 'Global Issue', importance: 3,
      keyIssues: ['New Economic Models', 'Inclusive Growth', 'Beyond GDP', 'Innovation Ecosystems'] },

    // ── Urban & Infrastructure ──
    { id: 'cities', name: 'Cities and Urbanization', cluster: 'Urban & Infrastructure', category: 'Global Issue', importance: 4,
      keyIssues: ['Smart Cities', 'Urban Resilience', 'Urban Mobility', 'Housing Affordability', 'Urban Governance'] },
    { id: 'infrastructure', name: 'Infrastructure', cluster: 'Urban & Infrastructure', category: 'Global Issue', importance: 4,
      keyIssues: ['Infrastructure Investment Gap', 'Sustainable Infrastructure', 'PPPs', 'Digital Infrastructure'] },
    { id: 'mobility', name: 'Future of Mobility', cluster: 'Urban & Infrastructure', category: 'Global Issue', importance: 3,
      keyIssues: ['Autonomous Vehicles', 'Electric Vehicles', 'Shared Mobility', 'Sustainable Transport'] },
    { id: 'real_estate', name: 'Real Estate', cluster: 'Urban & Infrastructure', category: 'Industry', importance: 3,
      keyIssues: ['Smart Buildings', 'PropTech', 'Net-Zero Real Estate', 'Hybrid Work Spaces'] },

    // ── Manufacturing & Supply Chains ──
    { id: 'manufacturing', name: 'Advanced Manufacturing', cluster: 'Manufacturing & Supply Chains', category: 'Industry', importance: 4,
      keyIssues: ['Industry 4.0', 'Smart Factories', 'Reshoring', 'Digital Twins', 'Additive Manufacturing'] },
    { id: 'supply_chains', name: 'Supply Chain and Transport', cluster: 'Manufacturing & Supply Chains', category: 'Industry', importance: 5,
      keyIssues: ['Logistics Digitization', 'Last-Mile Delivery', 'Autonomous Freight', 'Resilient Supply Chains'] },
    { id: 'semiconductors', name: 'Electronics & Semiconductors', cluster: 'Manufacturing & Supply Chains', category: 'Industry', importance: 5,
      keyIssues: ['Semiconductor Supply Chain', 'Chip Design', 'Electronics Recycling', 'Export Controls'] },

    // ── Industries ──
    { id: 'automotive', name: 'Automotive Industry', cluster: 'Industries', category: 'Industry', importance: 4,
      keyIssues: ['Electric Vehicles', 'Autonomous Driving', 'Connected Cars', 'Mobility-as-a-Service'] },
    { id: 'aviation', name: 'Aviation, Travel and Tourism', cluster: 'Industries', category: 'Industry', importance: 3,
      keyIssues: ['Sustainable Aviation', 'Tourism Recovery', 'Aviation Decarbonization'] },
    { id: 'consumer', name: 'Consumer Industries', cluster: 'Industries', category: 'Industry', importance: 3,
      keyIssues: ['Consumer Behaviour Shifts', 'Direct-to-Consumer', 'Sustainable Consumption'] },
    { id: 'telecom', name: 'Telecommunications', cluster: 'Industries', category: 'Industry', importance: 4,
      keyIssues: ['5G and Beyond', 'Digital Inclusion', 'Network Convergence', 'Spectrum Allocation'] },
    { id: 'media', name: 'Media, Entertainment and Sport', cluster: 'Industries', category: 'Industry', importance: 3,
      keyIssues: ['Streaming', 'Creator Economy', 'AI-Generated Content', 'Sports Innovation'] },
    { id: 'energy_util', name: 'Electricity & Utilities', cluster: 'Industries', category: 'Industry', importance: 4,
      keyIssues: ['Grid Modernization', 'Renewable Integration', 'Energy Storage', 'Distributed Energy'] },
    { id: 'professional', name: 'Professional Services', cluster: 'Industries', category: 'Industry', importance: 3,
      keyIssues: ['Future of Consulting', 'AI in Professional Services', 'Remote Service Delivery'] },
    { id: 'retail', name: 'Retail & Consumer Goods', cluster: 'Industries', category: 'Industry', importance: 3,
      keyIssues: ['Omnichannel Retail', 'Supply Chain Resilience', 'Sustainable Fashion'] },
];

// ============ WEF RELATIONSHIP TYPES ============
const LINK_TYPES = {
    influences:  { color: '#3B82F6', hex: 0x3B82F6, label: 'Influences' },
    accelerates: { color: '#22C55E', hex: 0x22C55E, label: 'Accelerates' },
    constrains:  { color: '#EF4444', hex: 0xEF4444, label: 'Constrains' },
    depends_on:  { color: '#F59E0B', hex: 0xF59E0B, label: 'Depends On' },
    disrupts:    { color: '#EC4899', hex: 0xEC4899, label: 'Disrupts' },
    enables:     { color: '#14B8A6', hex: 0x14B8A6, label: 'Enables' },
};

// ============ INITIAL LINKS (Transformation Map connections) ============
let topicLinks = [
    // AI connections
    { from: 'ai', to: 'workforce', type: 'disrupts', strength: 5 },
    { from: 'ai', to: 'cybersecurity', type: 'accelerates', strength: 4 },
    { from: 'ai', to: 'disinformation', type: 'accelerates', strength: 5 },
    { from: 'ai', to: 'semiconductors', type: 'depends_on', strength: 5 },
    { from: 'ai', to: 'healthcare', type: 'enables', strength: 4 },
    { from: 'ai', to: 'education', type: 'disrupts', strength: 4 },
    { from: 'ai', to: 'digital_economy', type: 'accelerates', strength: 5 },
    { from: 'ai', to: 'robotics', type: 'enables', strength: 4 },

    // Geopolitics connections
    { from: 'geopolitics', to: 'semiconductors', type: 'influences', strength: 5 },
    { from: 'geopolitics', to: 'trade', type: 'constrains', strength: 5 },
    { from: 'geopolitics', to: 'supply_chains', type: 'disrupts', strength: 4 },
    { from: 'geopolitics', to: 'int_security', type: 'influences', strength: 5 },
    { from: 'geopolitics', to: 'geo_economics', type: 'accelerates', strength: 5 },
    { from: 'geopolitics', to: 'energy_transition', type: 'influences', strength: 4 },

    // Climate connections
    { from: 'climate', to: 'energy_transition', type: 'accelerates', strength: 5 },
    { from: 'climate', to: 'migration', type: 'accelerates', strength: 4 },
    { from: 'climate', to: 'food_security', type: 'disrupts', strength: 4 },
    { from: 'climate', to: 'water', type: 'constrains', strength: 5 },
    { from: 'climate', to: 'biodiversity', type: 'disrupts', strength: 5 },
    { from: 'climate', to: 'insurance', type: 'influences', strength: 4 },
    { from: 'climate', to: 'cities', type: 'constrains', strength: 3 },
    { from: 'climate', to: 'ocean', type: 'disrupts', strength: 4 },

    // Energy connections
    { from: 'energy_transition', to: 'batteries', type: 'depends_on', strength: 5 },
    { from: 'energy_transition', to: 'oil_gas', type: 'disrupts', strength: 5 },
    { from: 'energy_transition', to: 'mining', type: 'accelerates', strength: 4 },
    { from: 'energy_transition', to: 'hydrogen', type: 'accelerates', strength: 3 },
    { from: 'energy_transition', to: 'nuclear', type: 'accelerates', strength: 3 },
    { from: 'energy_transition', to: 'energy_util', type: 'disrupts', strength: 4 },

    // Financial connections
    { from: 'financial_systems', to: 'digital_currencies', type: 'influences', strength: 4 },
    { from: 'financial_systems', to: 'inequality', type: 'influences', strength: 3 },
    { from: 'digital_currencies', to: 'banking', type: 'disrupts', strength: 4 },
    { from: 'digital_currencies', to: 'fintech', type: 'enables', strength: 4 },
    { from: 'dev_finance', to: 'climate', type: 'enables', strength: 3 },
    { from: 'sdg_progress', to: 'dev_finance', type: 'depends_on', strength: 3 },

    // Tech connections
    { from: 'cybersecurity', to: 'int_security', type: 'influences', strength: 5 },
    { from: 'cybersecurity', to: 'digital_identity', type: 'enables', strength: 4 },
    { from: 'quantum', to: 'cybersecurity', type: 'disrupts', strength: 4 },
    { from: 'biotech', to: 'healthcare', type: 'enables', strength: 5 },
    { from: 'biotech', to: 'longevity', type: 'accelerates', strength: 4 },
    { from: 'biotech', to: 'agriculture', type: 'enables', strength: 3 },
    { from: 'robotics', to: 'manufacturing', type: 'accelerates', strength: 5 },
    { from: 'robotics', to: 'workforce', type: 'disrupts', strength: 4 },
    { from: 'iot', to: 'cities', type: 'enables', strength: 3 },
    { from: 'iot', to: 'manufacturing', type: 'accelerates', strength: 3 },

    // Society connections
    { from: 'demographics', to: 'workforce', type: 'constrains', strength: 4 },
    { from: 'demographics', to: 'healthcare', type: 'constrains', strength: 4 },
    { from: 'demographics', to: 'migration', type: 'influences', strength: 3 },
    { from: 'inequality', to: 'migration', type: 'accelerates', strength: 3 },
    { from: 'education', to: 'workforce', type: 'enables', strength: 4 },
    { from: 'education', to: 'inequality', type: 'constrains', strength: 3 },

    // Supply chain connections
    { from: 'supply_chains', to: 'manufacturing', type: 'influences', strength: 5 },
    { from: 'supply_chains', to: 'mining', type: 'depends_on', strength: 4 },
    { from: 'supply_chains', to: 'semiconductors', type: 'depends_on', strength: 5 },
    { from: 'geo_economics', to: 'supply_chains', type: 'disrupts', strength: 4 },
    { from: 'geo_economics', to: 'trade', type: 'constrains', strength: 4 },

    // Urban/Infrastructure connections
    { from: 'cities', to: 'infrastructure', type: 'depends_on', strength: 4 },
    { from: 'cities', to: 'real_estate', type: 'influences', strength: 3 },
    { from: 'mobility', to: 'automotive', type: 'disrupts', strength: 4 },
    { from: 'mobility', to: 'cities', type: 'enables', strength: 3 },
    { from: 'infrastructure', to: 'telecom', type: 'enables', strength: 3 },

    // Industry connections
    { from: 'automotive', to: 'batteries', type: 'depends_on', strength: 5 },
    { from: 'automotive', to: 'semiconductors', type: 'depends_on', strength: 4 },
    { from: 'data_policy', to: 'ai', type: 'constrains', strength: 4 },
    { from: 'data_policy', to: 'digital_economy', type: 'constrains', strength: 3 },
    { from: 'internet_gov', to: 'disinformation', type: 'constrains', strength: 3 },
    { from: 'global_risks', to: 'insurance', type: 'influences', strength: 4 },
    { from: 'global_risks', to: 'geopolitics', type: 'influences', strength: 4 },

    // Cross-cutting
    { from: 'circular', to: 'manufacturing', type: 'influences', strength: 3 },
    { from: 'circular', to: 'chemicals', type: 'influences', strength: 3 },
    { from: 'food_security', to: 'agriculture', type: 'depends_on', strength: 5 },
    { from: 'water', to: 'agriculture', type: 'constrains', strength: 4 },
    { from: 'forests', to: 'biodiversity', type: 'enables', strength: 4 },
    { from: 'forests', to: 'climate', type: 'constrains', strength: 3 },
    { from: 'oil_gas', to: 'geopolitics', type: 'influences', strength: 4 },
];

// ============ 3D MAP STATE ============
let scene, camera, renderer, controls;
let nodeObjects = {};
let ringObjects = {};
let linkObjects = [];
let labelSprites = {};
let raycaster, mouse;
let selectedNode = null;
let linkFromNode = null;
let linkToNode = null;
let showLabels = true;
let showLinks = true;
let mapInitialized = false;
let activeFilter = 'all'; // all | global | industry

// ============ AI API HELPER ============
async function callAI(systemPrompt, userPrompt, opts = {}) {
    const maxTokens = opts.maxTokens || AI_CONFIG.maxTokens;
    const response = await fetch(`${AI_CONFIG.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${AI_CONFIG.apiKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: AI_CONFIG.model,
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userPrompt }
            ],
            max_tokens: maxTokens,
            temperature: opts.temperature || AI_CONFIG.temperature
        })
    });
    if (!response.ok) {
        throw new Error(`API returned ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();
    const msg = data.choices?.[0]?.message;
    // qwen3 may put content in 'content' or only in 'reasoning_content'
    let text = msg?.content || '';
    // Strip <think> tags if present in content
    text = text.replace(/^[\s\n]*<think>[\s\S]*?<\/think>[\s\n]*/i, '').trim();
    if (!text && msg?.reasoning_content) {
        text = '[AI used all tokens on reasoning — try again]';
    }
    return text;
}

// Call AI with full messages array (for chat)
async function callAIChat(messages, opts = {}) {
    const maxTokens = opts.maxTokens || AI_CONFIG.maxTokens;
    const response = await fetch(`${AI_CONFIG.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${AI_CONFIG.apiKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: AI_CONFIG.model,
            messages: messages,
            max_tokens: maxTokens,
            temperature: opts.temperature || AI_CONFIG.temperature
        })
    });
    if (!response.ok) {
        throw new Error(`API returned ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();
    const msg = data.choices?.[0]?.message;
    let text = msg?.content || '';
    text = text.replace(/^[\s\n]*<think>[\s\S]*?<\/think>[\s\n]*/i, '').trim();
    if (!text && msg?.reasoning_content) {
        text = 'Let me try to give a more concise response. Could you rephrase your question?';
    }
    return text;
}

function showAIStatus(text) {
    const bar = document.getElementById('aiStatusBar');
    const txt = document.getElementById('aiStatusText');
    const fill = document.getElementById('aiProgressFill');
    bar.style.display = 'flex';
    txt.textContent = text;
    fill.style.width = '30%';
    setTimeout(() => fill.style.width = '70%', 500);
}

function hideAIStatus() {
    const bar = document.getElementById('aiStatusBar');
    const fill = document.getElementById('aiProgressFill');
    fill.style.width = '100%';
    setTimeout(() => { bar.style.display = 'none'; fill.style.width = '0%'; }, 800);
}

// ============ TOPIC FILTERING ============
function getFilteredTopics() {
    if (activeFilter === 'all') return WEF_TOPICS;
    if (activeFilter === 'global') return WEF_TOPICS.filter(t => t.category === 'Global Issue');
    if (activeFilter === 'industry') return WEF_TOPICS.filter(t => t.category === 'Industry');
    return WEF_TOPICS;
}

function setTopicFilter(filter) {
    activeFilter = filter;
    // Update filter button states
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === filter);
    });
    // Update node visibility
    WEF_TOPICS.forEach(t => {
        const visible = activeFilter === 'all' ||
            (activeFilter === 'global' && t.category === 'Global Issue') ||
            (activeFilter === 'industry' && t.category === 'Industry');
        if (nodeObjects[t.id]) {
            nodeObjects[t.id].visible = visible;
        }
        if (ringObjects[t.id]) {
            ringObjects[t.id].visible = visible;
        }
        if (labelSprites[t.id]) {
            labelSprites[t.id].visible = visible && showLabels;
        }
    });
    // Update link visibility
    linkObjects.forEach(line => {
        const link = line.userData.link;
        const fromVisible = !nodeObjects[link.from] || nodeObjects[link.from].visible;
        const toVisible = !nodeObjects[link.to] || nodeObjects[link.to].visible;
        line.visible = showLinks && fromVisible && toVisible;
    });
    buildTopicList();
}

// ============ 3D MAP INITIALIZATION ============
function init3DMap() {
    const container = document.getElementById('map3dContainer');
    if (!container || mapInitialized) return;

    const width = container.clientWidth;
    const height = container.clientHeight;
    if (width === 0 || height === 0) return;

    // Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x060E1A);
    scene.fog = new THREE.FogExp2(0x060E1A, 0.0006);

    // Camera
    camera = new THREE.PerspectiveCamera(60, width / height, 1, 5000);
    camera.position.set(0, 300, 800);

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxDistance = 2000;
    controls.minDistance = 100;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x334466, 0.6);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x4A90D9, 1.2, 3000);
    pointLight.position.set(300, 400, 300);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0x8B5CF6, 0.6, 3000);
    pointLight2.position.set(-300, -150, -300);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0x22C55E, 0.4, 3000);
    pointLight3.position.set(0, -200, 400);
    scene.add(pointLight3);

    // Grid helper (subtle)
    const gridHelper = new THREE.GridHelper(3000, 50, 0x111827, 0x111827);
    gridHelper.position.y = -250;
    scene.add(gridHelper);

    // Raycaster for picking
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    // Create visual elements
    createNodes();
    createLinks();
    buildLegend();
    buildTopicList();

    // Events
    renderer.domElement.addEventListener('click', onMapClick, false);
    window.addEventListener('resize', onMapResize, false);

    mapInitialized = true;
    animate();
}

function createNodes() {
    const clusterKeys = Object.keys(WEF_CLUSTERS);
    const clusterPositions = {};

    // Arrange clusters in a circle with more space for more topics
    clusterKeys.forEach((key, i) => {
        const angle = (i / clusterKeys.length) * Math.PI * 2 - Math.PI / 2;
        const radius = 450;
        clusterPositions[key] = {
            x: Math.cos(angle) * radius,
            z: Math.sin(angle) * radius
        };
    });

    // Seed random for consistent layout
    let seed = 42;
    function seededRandom() {
        seed = (seed * 16807) % 2147483647;
        return (seed - 1) / 2147483646;
    }

    WEF_TOPICS.forEach((topic) => {
        const cluster = WEF_CLUSTERS[topic.cluster];
        const clusterPos = clusterPositions[topic.cluster];
        if (!cluster || !clusterPos) return;

        // Scatter within cluster
        const topicsInCluster = WEF_TOPICS.filter(t => t.cluster === topic.cluster);
        const indexInCluster = topicsInCluster.indexOf(topic);
        const subAngle = (indexInCluster / topicsInCluster.length) * Math.PI * 2;
        const subRadius = 30 + seededRandom() * 100;

        const x = clusterPos.x + Math.cos(subAngle) * subRadius;
        const y = (seededRandom() - 0.5) * 150;
        const z = clusterPos.z + Math.sin(subAngle) * subRadius;

        // Node sphere - size based on importance
        const size = 3 + topic.importance * 2;
        const geometry = new THREE.SphereGeometry(size, 16, 16);
        const material = new THREE.MeshPhongMaterial({
            color: cluster.hex,
            emissive: cluster.hex,
            emissiveIntensity: 0.3,
            shininess: 80,
            transparent: true,
            opacity: 0.9,
        });
        const sphere = new THREE.Mesh(geometry, material);
        sphere.position.set(x, y, z);
        sphere.userData = { topicId: topic.id, topic: topic };
        scene.add(sphere);
        nodeObjects[topic.id] = sphere;

        // Glow ring
        const ringGeo = new THREE.RingGeometry(size + 2, size + 3.5, 32);
        const ringMat = new THREE.MeshBasicMaterial({
            color: cluster.hex,
            transparent: true,
            opacity: 0.12,
            side: THREE.DoubleSide
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.position.copy(sphere.position);
        ring.lookAt(camera.position);
        scene.add(ring);
        ringObjects[topic.id] = ring;

        // Label
        const label = createTextSprite(topic.name, cluster.color);
        label.position.set(x, y + size + 10, z);
        label.visible = showLabels;
        scene.add(label);
        labelSprites[topic.id] = label;
    });
}

function createTextSprite(text, color) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 512;
    canvas.height = 64;
    ctx.font = 'bold 22px Inter, sans-serif';
    ctx.fillStyle = color || '#FFFFFF';
    ctx.textAlign = 'center';
    // Truncate long names
    const maxLen = 35;
    const displayText = text.length > maxLen ? text.substring(0, maxLen - 1) + '...' : text;
    ctx.fillText(displayText, 256, 40);

    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    const spriteMat = new THREE.SpriteMaterial({ map: texture, transparent: true, opacity: 0.75 });
    const sprite = new THREE.Sprite(spriteMat);
    sprite.scale.set(110, 14, 1);
    return sprite;
}

function createLinks() {
    // Remove existing link objects
    linkObjects.forEach(obj => scene.remove(obj));
    linkObjects = [];

    topicLinks.forEach(link => {
        const fromNode = nodeObjects[link.from];
        const toNode = nodeObjects[link.to];
        if (!fromNode || !toNode) return;

        const points = [fromNode.position.clone(), toNode.position.clone()];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);

        const linkType = LINK_TYPES[link.type];
        const material = new THREE.LineBasicMaterial({
            color: linkType ? linkType.hex : 0x3B82F6,
            transparent: true,
            opacity: 0.2 + (link.strength / 5) * 0.25,
            linewidth: 1,
        });

        const line = new THREE.Line(geometry, material);
        line.visible = showLinks;
        line.userData = { link };
        scene.add(line);
        linkObjects.push(line);
    });
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();

    // Labels face camera
    Object.values(labelSprites).forEach(sprite => {
        sprite.quaternion.copy(camera.quaternion);
    });

    // Pulse selected node
    if (selectedNode && nodeObjects[selectedNode]) {
        const node = nodeObjects[selectedNode];
        const scale = 1 + Math.sin(Date.now() * 0.005) * 0.15;
        node.scale.set(scale, scale, scale);
    }

    renderer.render(scene, camera);
}

function onMapResize() {
    const container = document.getElementById('map3dContainer');
    if (!container || !camera || !renderer) return;
    const w = container.clientWidth;
    const h = container.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
}

function onMapClick(event) {
    const container = document.getElementById('map3dContainer');
    const rect = container.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const visibleMeshes = Object.values(nodeObjects).filter(n => n.visible);
    const intersects = raycaster.intersectObjects(visibleMeshes);

    if (intersects.length > 0) {
        const hit = intersects[0].object;
        const topicId = hit.userData.topicId;
        selectTopic(topicId);
    }
}

function selectTopic(topicId) {
    // Reset previous selection
    if (selectedNode && nodeObjects[selectedNode]) {
        nodeObjects[selectedNode].scale.set(1, 1, 1);
    }

    selectedNode = topicId;
    const topic = WEF_TOPICS.find(t => t.id === topicId);
    if (!topic) return;

    // Handle link creator
    if (linkFromNode === null) {
        linkFromNode = topicId;
        document.getElementById('linkFromName').textContent = topic.name;
        document.getElementById('linkFrom').classList.add('filled');
    } else if (linkToNode === null && topicId !== linkFromNode) {
        linkToNode = topicId;
        document.getElementById('linkToName').textContent = topic.name;
        document.getElementById('linkTo').classList.add('filled');
    } else {
        linkFromNode = topicId;
        linkToNode = null;
        document.getElementById('linkFromName').textContent = topic.name;
        document.getElementById('linkFrom').classList.add('filled');
        document.getElementById('linkToName').textContent = 'Click another topic...';
        document.getElementById('linkTo').classList.remove('filled');
    }

    // Show topic detail
    showTopicDetail(topic);

    // Highlight in list
    document.querySelectorAll('.topic-list-item').forEach(el => el.classList.remove('selected'));
    const listItem = document.querySelector(`.topic-list-item[data-id="${topicId}"]`);
    if (listItem) {
        listItem.classList.add('selected');
        listItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Highlight connections
    highlightConnections(topicId);

    // Focus camera gently toward the node
    if (nodeObjects[topicId]) {
        const pos = nodeObjects[topicId].position;
        controls.target.lerp(new THREE.Vector3(pos.x, pos.y, pos.z), 0.3);
    }
}

function showTopicDetail(topic) {
    const panel = document.getElementById('topicDetail');
    panel.style.display = 'block';

    document.getElementById('topicDetailTitle').textContent = topic.name;

    const connections = topicLinks.filter(l => l.from === topic.id || l.to === topic.id);
    const meta = document.getElementById('topicDetailMeta');
    const categoryBadge = topic.category === 'Industry'
        ? '<span class="cat-badge cat-industry">Industry</span>'
        : '<span class="cat-badge cat-global">Global Issue</span>';

    meta.innerHTML = `
        <div class="topic-meta-row"><span class="topic-meta-label">Category</span><span class="topic-meta-value">${categoryBadge}</span></div>
        <div class="topic-meta-row"><span class="topic-meta-label">WEF Centre</span><span class="topic-meta-value">${topic.cluster}</span></div>
        <div class="topic-meta-row"><span class="topic-meta-label">Importance</span><span class="topic-meta-value">${'█'.repeat(topic.importance)}${'░'.repeat(5 - topic.importance)} ${topic.importance}/5</span></div>
        <div class="topic-meta-row"><span class="topic-meta-label">Connections</span><span class="topic-meta-value">${connections.length} links</span></div>
    `;

    // Key Issues section
    const keyIssuesDiv = document.getElementById('topicKeyIssues');
    if (topic.keyIssues && topic.keyIssues.length > 0) {
        keyIssuesDiv.innerHTML = `
            <div class="topic-ki-title">Key Issues</div>
            <div class="topic-ki-list">${topic.keyIssues.map(ki => `<span class="ki-tag">${ki}</span>`).join('')}</div>
        `;
        keyIssuesDiv.style.display = 'block';
    } else {
        keyIssuesDiv.style.display = 'none';
    }

    // Connections list
    const connDiv = document.getElementById('topicDetailConnections');
    if (connections.length > 0) {
        const connHtml = connections.map(c => {
            const otherTopicId = c.from === topic.id ? c.to : c.from;
            const otherTopic = WEF_TOPICS.find(t => t.id === otherTopicId);
            const direction = c.from === topic.id ? '→' : '←';
            const typeInfo = LINK_TYPES[c.type];
            return `<div class="topic-conn-item" onclick="selectTopic('${otherTopicId}')">
                ${direction} <strong style="color:${typeInfo?.color || '#3B82F6'}">${c.type}</strong> ${otherTopic?.name || otherTopicId}
                <span class="conn-strength">${'●'.repeat(c.strength)}${'○'.repeat(5 - c.strength)}</span>
            </div>`;
        }).join('');
        connDiv.innerHTML = `<div class="topic-conn-title">Connections (${connections.length})</div>${connHtml}`;
    } else {
        connDiv.innerHTML = '<div class="topic-conn-title">No connections yet</div>';
    }

    // Hide previous AI result
    document.getElementById('topicAIResult').style.display = 'none';
}

function highlightConnections(topicId) {
    // Dim all nodes
    Object.values(nodeObjects).forEach(node => {
        if (node.visible) {
            node.material.opacity = 0.2;
            node.material.emissiveIntensity = 0.08;
        }
    });

    // Highlight selected node
    if (nodeObjects[topicId]) {
        nodeObjects[topicId].material.opacity = 1;
        nodeObjects[topicId].material.emissiveIntensity = 0.7;
    }

    // Find and highlight connected nodes
    const connected = new Set();
    topicLinks.forEach(l => {
        if (l.from === topicId) connected.add(l.to);
        if (l.to === topicId) connected.add(l.from);
    });

    connected.forEach(id => {
        if (nodeObjects[id] && nodeObjects[id].visible) {
            nodeObjects[id].material.opacity = 0.85;
            nodeObjects[id].material.emissiveIntensity = 0.45;
        }
    });

    // Highlight connected links
    linkObjects.forEach(line => {
        const link = line.userData.link;
        if (link.from === topicId || link.to === topicId) {
            line.material.opacity = 0.85;
        } else {
            line.material.opacity = 0.04;
        }
    });
}

function closeTopicDetail() {
    document.getElementById('topicDetail').style.display = 'none';
    selectedNode = null;
    // Reset all opacities
    Object.values(nodeObjects).forEach(node => {
        node.material.opacity = 0.9;
        node.material.emissiveIntensity = 0.3;
        node.scale.set(1, 1, 1);
    });
    linkObjects.forEach(line => {
        line.material.opacity = 0.2 + (line.userData.link.strength / 5) * 0.25;
    });
}

// ============ MAP CONTROLS ============
function toggleLabels() {
    showLabels = !showLabels;
    Object.entries(labelSprites).forEach(([id, sprite]) => {
        const topic = WEF_TOPICS.find(t => t.id === id);
        const visible = activeFilter === 'all' ||
            (activeFilter === 'global' && topic?.category === 'Global Issue') ||
            (activeFilter === 'industry' && topic?.category === 'Industry');
        sprite.visible = showLabels && visible;
    });
}

function toggleLinks() {
    showLinks = !showLinks;
    linkObjects.forEach(l => {
        const link = l.userData.link;
        const fromVisible = !nodeObjects[link.from] || nodeObjects[link.from].visible;
        const toVisible = !nodeObjects[link.to] || nodeObjects[link.to].visible;
        l.visible = showLinks && fromVisible && toVisible;
    });
}

function focusSelected() {
    if (selectedNode && nodeObjects[selectedNode]) {
        const pos = nodeObjects[selectedNode].position;
        controls.target.set(pos.x, pos.y, pos.z);
        camera.position.set(pos.x + 200, pos.y + 100, pos.z + 200);
    }
}

function resetMapView() {
    controls.target.set(0, 0, 0);
    camera.position.set(0, 300, 800);
    closeTopicDetail();
}

// ============ LEGEND & TOPIC LIST ============
function buildLegend() {
    const container = document.getElementById('mapLegend');
    if (!container) return;

    // Link type legend
    const linkLegend = Object.entries(LINK_TYPES).map(([key, data]) =>
        `<div class="legend-item legend-link-type"><div class="legend-line" style="background:${data.color}"></div>${data.label}</div>`
    ).join('');

    // Cluster legend
    const clusterLegend = Object.entries(WEF_CLUSTERS).map(([name, data]) =>
        `<div class="legend-item" onclick="focusCluster('${name}')"><div class="legend-dot" style="background:${data.color}"></div>${data.abbr}</div>`
    ).join('');

    container.innerHTML = `
        <div class="legend-section">${clusterLegend}</div>
        <div class="legend-divider"></div>
        <div class="legend-section">${linkLegend}</div>
    `;
}

function focusCluster(clusterName) {
    const topics = WEF_TOPICS.filter(t => t.cluster === clusterName);
    if (topics.length === 0) return;

    // Average position
    let cx = 0, cy = 0, cz = 0;
    topics.forEach(t => {
        if (nodeObjects[t.id]) {
            cx += nodeObjects[t.id].position.x;
            cy += nodeObjects[t.id].position.y;
            cz += nodeObjects[t.id].position.z;
        }
    });
    cx /= topics.length;
    cy /= topics.length;
    cz /= topics.length;

    controls.target.set(cx, cy, cz);
    camera.position.set(cx + 200, cy + 120, cz + 200);
}

function buildTopicList() {
    const container = document.getElementById('topicsList');
    const countEl = document.getElementById('topicCount');
    if (!container) return;

    const filtered = getFilteredTopics();
    countEl.textContent = filtered.length;

    const sorted = [...filtered].sort((a, b) => a.cluster.localeCompare(b.cluster) || b.importance - a.importance);
    container.innerHTML = sorted.map(t => {
        const cluster = WEF_CLUSTERS[t.cluster];
        const connCount = topicLinks.filter(l => l.from === t.id || l.to === t.id).length;
        const catIcon = t.category === 'Industry' ? '◆' : '●';
        return `<div class="topic-list-item" data-id="${t.id}" onclick="selectTopic('${t.id}')">
            <div class="topic-list-dot" style="background:${cluster?.color || '#666'}">${catIcon}</div>
            <span class="topic-list-name">${t.name}</span>
            <span class="topic-list-count">${connCount || ''}</span>
        </div>`;
    }).join('');
}

function filterTopicList() {
    const query = document.getElementById('topicSearchInput').value.toLowerCase();
    document.querySelectorAll('.topic-list-item').forEach(el => {
        const name = el.textContent.toLowerCase();
        el.style.display = name.includes(query) ? 'flex' : 'none';
    });
}

// ============ AI: SCAN NEWS ============
async function scanNewsWithAI() {
    const btn = document.getElementById('scanBtnText');
    btn.textContent = 'Scanning...';
    showAIStatus('AI is scanning global news and mapping to WEF topics...');

    const topicNames = WEF_TOPICS.map(t => t.name).join(', ');

    try {
        const result = await callAI(
            `You are a strategic intelligence analyst for the Astrid Strategic Intelligence Platform, aligned with the World Economic Forum taxonomy. You analyze current global news and map them to WEF Transformation Map topics. Always return valid JSON only, no markdown.`,
            `Analyze the most important current global news and developments as of February 2026. For each, identify:
1. The news topic/headline
2. The most relevant WEF Strategic Intelligence category
3. A brief 1-sentence summary
4. Which specific WEF topics it connects to (from this list: ${topicNames})
5. The signal strength (1-5)
6. Recommended new links between existing WEF topics this news suggests

Return EXACTLY this JSON format, no markdown, no explanation:
[{"headline":"...","wef_category":"...","summary":"...","connected_topics":["topic name 1","topic name 2"],"signal_strength":4,"suggested_links":[{"from":"topic name","to":"topic name","type":"influences|accelerates|disrupts|constrains|enables|depends_on","reason":"..."}]}]

Return 8-10 news items.

/no_think`,
            { maxTokens: 4096 }
        );

        let newsItems;
        try {
            const cleaned = result.replace(/^[\s\n]*<think>[\s\S]*?<\/think>[\s\n]*/i, '');
            const jsonMatch = cleaned.match(/\[[\s\S]*\]/);
            newsItems = JSON.parse(jsonMatch ? jsonMatch[0] : cleaned);
        } catch (e) {
            newsItems = [{ headline: 'AI Response', wef_category: 'General', summary: result.replace(/^[\s\n]*<think>[\s\S]*?<\/think>[\s\n]*/i, '').substring(0, 300), connected_topics: [], signal_strength: 3, suggested_links: [] }];
        }

        displayNewsScan(newsItems);
    } catch (err) {
        console.error('AI scan error:', err);
        document.getElementById('newsScanContent').innerHTML = `<div style="color:#EF4444;font-size:12px">Error: ${err.message}</div>`;
        document.getElementById('newsScanResults').style.display = 'block';
    }

    btn.textContent = 'Scan Global News';
    hideAIStatus();
}

function displayNewsScan(items) {
    const container = document.getElementById('newsScanContent');
    const panel = document.getElementById('newsScanResults');
    panel.style.display = 'block';

    container.innerHTML = items.map((item, i) => {
        const connectedStr = (item.connected_topics || []).slice(0, 3).join(', ');
        const sugLinksHtml = (item.suggested_links || []).map((sl, j) =>
            `<button class="news-action-btn" onclick="acceptSuggestedLink(${i}, ${j})">+ ${sl.from} → ${sl.to}</button>`
        ).join('');

        return `<div class="news-item" data-index="${i}">
            <div class="news-category">${item.wef_category || 'Global'}</div>
            <div class="news-topic">${item.headline || item.topic || 'News Item'}</div>
            <div class="news-summary">${item.summary || ''}</div>
            <div style="margin-top:4px;font-size:10px;color:#6B7280">
                <strong>Connects:</strong> ${connectedStr || 'N/A'} | <strong>Strength:</strong> ${'●'.repeat(item.signal_strength || 3)}${'○'.repeat(5 - (item.signal_strength || 3))}
            </div>
            <div class="news-actions">
                <button class="news-action-btn" onclick="highlightNewsTopics(${i})">Show on Map</button>
                ${sugLinksHtml}
            </div>
        </div>`;
    }).join('');

    window._newsItems = items;
}

function highlightNewsTopics(index) {
    const item = window._newsItems?.[index];
    if (!item) return;

    closeTopicDetail();

    const matched = [];
    (item.connected_topics || []).forEach(name => {
        const topic = WEF_TOPICS.find(t =>
            t.name.toLowerCase().includes(name.toLowerCase()) ||
            name.toLowerCase().includes(t.name.toLowerCase())
        );
        if (topic) matched.push(topic.id);
    });

    Object.values(nodeObjects).forEach(node => {
        node.material.opacity = 0.1;
        node.material.emissiveIntensity = 0.03;
    });

    matched.forEach(id => {
        if (nodeObjects[id]) {
            nodeObjects[id].material.opacity = 1;
            nodeObjects[id].material.emissiveIntensity = 0.8;
        }
    });

    if (matched.length > 0 && nodeObjects[matched[0]]) {
        const pos = nodeObjects[matched[0]].position;
        controls.target.lerp(pos, 0.5);
    }
}

function acceptSuggestedLink(newsIdx, linkIdx) {
    const item = window._newsItems?.[newsIdx];
    if (!item || !item.suggested_links?.[linkIdx]) return;

    const sl = item.suggested_links[linkIdx];
    const fromTopic = WEF_TOPICS.find(t => t.name.toLowerCase().includes(sl.from.toLowerCase()) || sl.from.toLowerCase().includes(t.name.toLowerCase()));
    const toTopic = WEF_TOPICS.find(t => t.name.toLowerCase().includes(sl.to.toLowerCase()) || sl.to.toLowerCase().includes(t.name.toLowerCase()));

    if (fromTopic && toTopic) {
        addLink(fromTopic.id, toTopic.id, sl.type || 'influences', 3);
        const btn = event.target;
        btn.textContent = 'Added!';
        btn.style.background = '#22C55E';
        btn.disabled = true;
    }
}

// ============ AI: RECOMMEND LINKS ============
async function recommendLinksWithAI() {
    const btn = document.getElementById('linkBtnText');
    btn.textContent = 'Analyzing...';
    showAIStatus('AI is analyzing topic relationships and recommending new causality links...');

    const existingLinks = topicLinks.slice(0, 40).map(l => {
        const from = WEF_TOPICS.find(t => t.id === l.from)?.name;
        const to = WEF_TOPICS.find(t => t.id === l.to)?.name;
        return `${from} --${l.type}--> ${to}`;
    }).join('\n');

    try {
        const result = await callAI(
            `You are a systems thinking expert and strategic intelligence analyst specializing in WEF Transformation Maps. You identify causal relationships, feedback loops, and hidden dependencies between global topics.`,
            `Given these existing topic relationships:
${existingLinks}

And these WEF Strategic Intelligence topics: ${WEF_TOPICS.map(t => t.name).join(', ')}

Identify 6-8 NEW important causal links that are MISSING. Focus on:
1. Cross-cluster connections (links between different WEF Centre domains)
2. Second-order effects (indirect causation chains)
3. Feedback loops (A affects B which affects A)
4. Emerging relationships driven by 2025-2026 developments

Return EXACTLY this JSON, no markdown, no explanation:
[{"from":"exact topic name","to":"exact topic name","type":"influences|accelerates|constrains|depends_on|disrupts|enables","strength":4,"reason":"brief explanation of the causal mechanism"}]

/no_think`,
            { maxTokens: 4096 }
        );

        let recommendations;
        try {
            const cleaned = result.replace(/^[\s\n]*<think>[\s\S]*?<\/think>[\s\n]*/i, '');
            const jsonMatch = cleaned.match(/\[[\s\S]*\]/);
            recommendations = JSON.parse(jsonMatch ? jsonMatch[0] : cleaned);
        } catch (e) {
            recommendations = [];
        }

        displayLinkRecommendations(recommendations);
    } catch (err) {
        console.error('AI link error:', err);
    }

    btn.textContent = 'AI: Recommend Links';
    hideAIStatus();
}

function displayLinkRecommendations(recs) {
    const container = document.getElementById('linkRecommContent');
    const panel = document.getElementById('linkRecommendations');
    panel.style.display = 'block';

    container.innerHTML = recs.map((rec, i) => {
        const typeInfo = LINK_TYPES[rec.type];
        return `<div class="link-rec-item">
            <div class="link-rec-path">
                ${rec.from} <span class="link-rec-arrow" style="color:${typeInfo?.color || '#3B82F6'}">→ ${rec.type} →</span> ${rec.to}
            </div>
            <div class="link-rec-type">Strength: ${'●'.repeat(rec.strength || 3)}${'○'.repeat(5 - (rec.strength || 3))}</div>
            <div class="link-rec-reason">${rec.reason || ''}</div>
            <button class="link-rec-accept" onclick="acceptRecommendedLink(${i})">Accept & Add to Map</button>
        </div>`;
    }).join('');

    window._linkRecs = recs;
}

function acceptRecommendedLink(index) {
    const rec = window._linkRecs?.[index];
    if (!rec) return;

    const fromTopic = WEF_TOPICS.find(t =>
        t.name.toLowerCase() === rec.from.toLowerCase() ||
        t.name.toLowerCase().includes(rec.from.toLowerCase()) ||
        rec.from.toLowerCase().includes(t.name.toLowerCase())
    );
    const toTopic = WEF_TOPICS.find(t =>
        t.name.toLowerCase() === rec.to.toLowerCase() ||
        t.name.toLowerCase().includes(rec.to.toLowerCase()) ||
        rec.to.toLowerCase().includes(t.name.toLowerCase())
    );

    if (fromTopic && toTopic) {
        addLink(fromTopic.id, toTopic.id, rec.type || 'influences', rec.strength || 3);
        const btn = event.target;
        btn.textContent = 'Added!';
        btn.style.background = '#22C55E';
        btn.disabled = true;
    }
}

// ============ AI: ANALYZE TOPIC CAUSALITY ============
async function aiAnalyzeTopic() {
    if (!selectedNode) return;
    const topic = WEF_TOPICS.find(t => t.id === selectedNode);
    if (!topic) return;

    const resultBox = document.getElementById('topicAIResult');
    const resultContent = document.getElementById('topicAIResultContent');
    resultBox.style.display = 'block';
    resultContent.textContent = 'Analyzing causality...';
    showAIStatus(`AI is analyzing causal chains for "${topic.name}"...`);

    const connections = topicLinks.filter(l => l.from === topic.id || l.to === topic.id);
    const connDesc = connections.map(c => {
        const other = WEF_TOPICS.find(t => t.id === (c.from === topic.id ? c.to : c.from));
        return `${c.from === topic.id ? 'causes' : 'caused by'}: ${other?.name} (${c.type})`;
    }).join(', ');

    try {
        const result = await callAI(
            `You are a systems thinking expert working with WEF Strategic Intelligence Transformation Maps. Provide concise, structured causal analysis.`,
            `Analyze the causal relationships of "${topic.name}" in the global system as of February 2026.

Known Key Issues: ${(topic.keyIssues || []).join(', ')}
Current known connections: ${connDesc || 'none yet'}

Provide:
1. KEY CAUSAL DRIVERS: What are the 3 most important forces driving changes in this topic?
2. DOWNSTREAM EFFECTS: What 3 topics are most affected BY this topic?
3. FEEDBACK LOOPS: Identify 1-2 feedback loops (reinforcing or balancing) involving this topic.
4. EMERGING DYNAMICS: What new causal relationship is forming in 2025-2026?

Keep each section to 2-3 sentences. Be specific and analytical.

/no_think`,
            { maxTokens: 3000 }
        );

        resultContent.textContent = result;
    } catch (err) {
        resultContent.textContent = `Error: ${err.message}`;
    }

    hideAIStatus();
}

// ============ AI: COMPOUND OUTCOMES ============
async function aiCompoundOutcome() {
    if (!selectedNode) return;
    const topic = WEF_TOPICS.find(t => t.id === selectedNode);
    if (!topic) return;

    const resultBox = document.getElementById('topicAIResult');
    const resultContent = document.getElementById('topicAIResultContent');
    resultBox.style.display = 'block';
    resultContent.textContent = 'Computing compound outcomes...';
    showAIStatus(`AI is computing compound outcomes from "${topic.name}"...`);

    // Trace all connections up to 3 levels deep
    const level1 = topicLinks.filter(l => l.from === topic.id).map(l => l.to);
    const level2 = topicLinks.filter(l => level1.includes(l.from)).map(l => l.to);
    const level3 = topicLinks.filter(l => level2.includes(l.from)).map(l => l.to);

    const allAffected = [...new Set([...level1, ...level2, ...level3])].map(id => WEF_TOPICS.find(t => t.id === id)?.name).filter(Boolean);

    try {
        const result = await callAI(
            `You are a strategic foresight analyst specializing in second and third-order effects using WEF Transformation Maps. Think like a McKinsey partner presenting to the WEF.`,
            `Starting from "${topic.name}" (Key Issues: ${(topic.keyIssues || []).join(', ')}), trace the compounding cascade of effects through the global system.

Known direct effects reach: ${allAffected.join(', ') || 'limited connections mapped so far'}

Provide a COMPOUND OUTCOME ANALYSIS:

1. FIRST-ORDER EFFECTS (direct, 0-6 months): What happens immediately?
2. SECOND-ORDER EFFECTS (indirect, 6-18 months): What does the first-order trigger?
3. THIRD-ORDER EFFECTS (systemic, 18-36 months): What structural shifts emerge?
4. WILD CARD COMPOUND: What is the most surprising but plausible compound outcome?
5. STRATEGIC IMPLICATION: One sentence on what leaders should do now.

Be specific with sector and geographic examples. McKinsey quality.

/no_think`,
            { maxTokens: 3000 }
        );

        resultContent.textContent = result;
    } catch (err) {
        resultContent.textContent = 'Error: ' + err.message;
    }

    hideAIStatus();
}

// ============ AI: SUGGEST LINK TYPE ============
async function aiSuggestLinkType() {
    if (!linkFromNode || !linkToNode) return;

    const fromTopic = WEF_TOPICS.find(t => t.id === linkFromNode);
    const toTopic = WEF_TOPICS.find(t => t.id === linkToNode);
    if (!fromTopic || !toTopic) return;

    showAIStatus(`AI suggesting link type between "${fromTopic.name}" and "${toTopic.name}"...`);

    try {
        const result = await callAI(
            `You classify causal relationships between global topics in the WEF Strategic Intelligence framework. Return ONLY a JSON object, no markdown.`,
            `What is the causal relationship between "${fromTopic.name}" and "${toTopic.name}" as of 2026?

Return ONLY this JSON: {"type":"influences|accelerates|constrains|depends_on|disrupts|enables","strength":1-5,"explanation":"one sentence"}

/no_think`,
            { maxTokens: 500 }
        );

        const jsonMatch = result.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            const suggestion = JSON.parse(jsonMatch[0]);
            document.getElementById('linkType').value = suggestion.type;

            const resultBox = document.getElementById('topicAIResult');
            const resultContent = document.getElementById('topicAIResultContent');
            resultBox.style.display = 'block';
            resultContent.textContent = `Suggested: ${fromTopic.name} ${suggestion.type} ${toTopic.name} (strength: ${suggestion.strength}/5)\n\n${suggestion.explanation}`;
        }
    } catch (err) {
        console.error(err);
    }

    hideAIStatus();
}

// ============ MANUAL LINK CREATION ============
function createManualLink() {
    if (!linkFromNode || !linkToNode) return;

    const type = document.getElementById('linkType').value;
    addLink(linkFromNode, linkToNode, type, 3);

    // Reset
    linkFromNode = null;
    linkToNode = null;
    document.getElementById('linkFromName').textContent = 'Click a topic...';
    document.getElementById('linkToName').textContent = 'Click another topic...';
    document.getElementById('linkFrom').classList.remove('filled');
    document.getElementById('linkTo').classList.remove('filled');
}

function addLink(fromId, toId, type, strength) {
    const exists = topicLinks.some(l => l.from === fromId && l.to === toId);
    if (exists) return;

    topicLinks.push({ from: fromId, to: toId, type, strength });
    createLinks();
    buildTopicList();
}

// ============ SCENARIO GENERATION + STRESS TEST CHAT ============
let currentScenarios = null;
let currentScenarioTopic = null;
let chatHistory = [];

async function generateTopicScenarios() {
    if (!selectedNode) {
        alert('Select a topic on the map first.');
        return;
    }
    const topic = WEF_TOPICS.find(t => t.id === selectedNode);
    if (!topic) return;

    currentScenarioTopic = topic;

    // Show overlay + loading
    const overlay = document.getElementById('scenarioOverlay');
    overlay.style.display = 'flex';
    document.getElementById('scenarioTopicTitle').textContent = `Scenario Analysis: ${topic.name}`;
    document.getElementById('scenarioSubtitle').textContent = 'AI-generated 2x2 uncertainty matrix';
    document.getElementById('scenarioLoading').style.display = 'flex';
    document.getElementById('scenarioContent').style.display = 'none';
    document.getElementById('scenarioLoadingText').textContent = 'AI is identifying the top 2 critical uncertainties...';

    // Get connected topics for context
    const connections = topicLinks.filter(l => l.from === topic.id || l.to === topic.id);
    const connNames = connections.map(c => {
        const otherId = c.from === topic.id ? c.to : c.from;
        return WEF_TOPICS.find(t => t.id === otherId)?.name;
    }).filter(Boolean).join(', ');

    try {
        document.getElementById('scenarioLoadingText').textContent = 'AI is building the 2x2 scenario matrix...';

        const result = await callAI(
            'You are a strategic foresight analyst. Return ONLY valid JSON. No markdown, no code fences, no explanation.',

            `Build a 2x2 scenario matrix for "${topic.name}" (2026). Key Issues: ${(topic.keyIssues || []).join(', ')}. Connected: ${connNames || 'various'}. Centre: ${topic.cluster}.

Identify the top 2 critical uncertainty dimensions. Create 4 scenarios.

Return this JSON:
{"axis_x":{"name":"3-5 word axis name","description":"one sentence","low":"what low means","high":"what high means"},"axis_y":{"name":"3-5 word axis name","description":"one sentence","low":"what low means","high":"what high means"},"scenarios":[{"quadrant":"Q1: High Y / Low X","name":"memorable name","description":"2-3 sentence narrative","winners":["w1","w2"],"losers":["l1","l2"],"probability":"25%","signals":"early warning signals"},{"quadrant":"Q2: High Y / High X","name":"...","description":"...","winners":["..."],"losers":["..."],"probability":"...","signals":"..."},{"quadrant":"Q3: Low Y / Low X","name":"...","description":"...","winners":["..."],"losers":["..."],"probability":"...","signals":"..."},{"quadrant":"Q4: Low Y / High X","name":"...","description":"...","winners":["..."],"losers":["..."],"probability":"...","signals":"..."}]}

/no_think`,
            { maxTokens: 4096, temperature: 0.7 }
        );

        console.log('AI scenario response length:', result.length);

        // Parse AI response
        const jsonMatch = result.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            console.error('Raw AI response:', result);
            throw new Error('AI did not return valid JSON. Response: ' + result.substring(0, 100));
        }

        currentScenarios = JSON.parse(jsonMatch[0]);

        // Validate structure
        if (!currentScenarios.axis_x || !currentScenarios.axis_y || !currentScenarios.scenarios || currentScenarios.scenarios.length < 4) {
            throw new Error('AI returned incomplete scenario data');
        }

        renderScenarioMatrix(currentScenarios);

        // Reset chat with scenario context
        chatHistory = [
            { role: 'system', content: buildScenarioChatContext(topic, currentScenarios) }
        ];
        resetChat();

        // Hide loading, show content
        document.getElementById('scenarioLoading').style.display = 'none';
        document.getElementById('scenarioContent').style.display = 'flex';

    } catch (err) {
        console.error('Scenario generation error:', err);
        document.getElementById('scenarioLoadingText').textContent = 'Error: ' + err.message + '. Click X to close and try again.';
        document.getElementById('scenarioLoading').querySelector('.scenario-loading-spinner').style.display = 'none';
    }
}

function buildScenarioChatContext(topic, scenarios) {
    const scenarioText = scenarios.scenarios.map((s, i) =>
        `${s.quadrant} - "${s.name}": ${s.description} Winners: ${(s.winners || []).join(', ')}. Losers: ${(s.losers || []).join(', ')}. Probability: ${s.probability}. Early signals: ${s.signals}`
    ).join('\n\n');

    return `You are a strategic foresight analyst conducting a scenario stress-test session for the WEF Strategic Intelligence topic "${topic.name}".

KEY CONTEXT:
- Topic: ${topic.name}
- WEF Centre: ${topic.cluster}
- Key Issues: ${(topic.keyIssues || []).join(', ')}
- Uncertainty Axis X: ${scenarios.axis_x.name} — ${scenarios.axis_x.description}
- Uncertainty Axis Y: ${scenarios.axis_y.name} — ${scenarios.axis_y.description}

THE 4 SCENARIOS:
${scenarioText}

INSTRUCTIONS:
- Answer all user questions in the context of these 4 scenarios
- When asked about implications, analyze across all 4 futures
- Be specific with sectors, geographies, and timelines
- Identify which scenario each point applies to (reference Q1-Q4 by name)
- Think like a McKinsey partner advising WEF delegates
- Be concise but insightful — aim for 150-250 words per response
- Use bullet points and structure for clarity`;
}

function renderScenarioMatrix(data) {
    // Axes
    document.getElementById('axisYLabel').textContent = data.axis_y.name;
    document.getElementById('axisXLabel').textContent = data.axis_x.name;

    const axes = document.getElementById('matrixAxes');
    axes.querySelector('.axis-y-high').textContent = data.axis_y.high;
    axes.querySelector('.axis-y-low').textContent = data.axis_y.low;
    axes.querySelector('.axis-x-low').textContent = data.axis_x.low;
    axes.querySelector('.axis-x-high').textContent = data.axis_x.high;

    // Scenarios into quadrants
    const cells = ['Q1', 'Q2', 'Q3', 'Q4'];
    data.scenarios.forEach((s, i) => {
        const prefix = cells[i];
        document.getElementById(`scenario${prefix}Name`).textContent = s.name;
        document.getElementById(`scenario${prefix}Desc`).textContent = s.description;
    });

    // Clear selection
    document.querySelectorAll('.matrix-cell').forEach(c => c.classList.remove('active'));
    document.getElementById('scenarioDetailBox').style.display = 'none';

    // Update subtitle with axes info
    document.getElementById('scenarioSubtitle').textContent =
        `${data.axis_x.name} × ${data.axis_y.name}`;
}

function selectScenario(index) {
    if (!currentScenarios || !currentScenarios.scenarios[index]) return;

    const s = currentScenarios.scenarios[index];

    // Highlight cell
    document.querySelectorAll('.matrix-cell').forEach(c => c.classList.remove('active'));
    const cells = document.querySelectorAll('.matrix-cell');
    if (cells[index]) cells[index].classList.add('active');

    // Show detail
    const box = document.getElementById('scenarioDetailBox');
    box.style.display = 'block';
    document.getElementById('scenarioDetailName').textContent = `${s.quadrant} — ${s.name}`;
    document.getElementById('scenarioDetailBody').textContent =
        `${s.description}\n\nWinners: ${(s.winners || []).join(', ')}\nLosers: ${(s.losers || []).join(', ')}\nProbability: ${s.probability}\n\nEarly Warning Signals:\n${s.signals}`;
}

function closeScenarioOverlay() {
    document.getElementById('scenarioOverlay').style.display = 'none';
    currentScenarios = null;
    currentScenarioTopic = null;
    chatHistory = [];
}

// ============ STRESS TEST CHAT ============
function resetChat() {
    const container = document.getElementById('chatMessages');
    container.innerHTML = `
        <div class="chat-msg chat-ai">
            <div class="chat-avatar">AI</div>
            <div class="chat-bubble">Scenarios generated for <strong>${currentScenarioTopic?.name || 'topic'}</strong>. Ask me anything to stress-test them — for example:<br><br>
                <em>"What happens to supply chains in each scenario?"</em><br>
                <em>"Which scenario is most likely by 2030?"</em><br>
                <em>"What are the early warning signals for Q1?"</em><br>
                <em>"How should a CEO prepare across all four?"</em>
            </div>
        </div>`;
}

async function sendChatMessage() {
    const input = document.getElementById('chatInput');
    const text = input.value.trim();
    if (!text || !currentScenarios) return;

    input.value = '';
    input.disabled = true;

    // Add user message to UI
    appendChatMessage('user', text);

    // Add to history (append /no_think to reduce token waste)
    chatHistory.push({ role: 'user', content: text + '\n/no_think' });

    // Show typing indicator
    const typingId = appendTypingIndicator();

    try {
        const aiText = await callAIChat(chatHistory, { maxTokens: 2048 });

        // Add to history
        chatHistory.push({ role: 'assistant', content: aiText });

        // Remove typing, add AI message
        removeTypingIndicator(typingId);
        appendChatMessage('ai', aiText);

    } catch (err) {
        removeTypingIndicator(typingId);
        appendChatMessage('ai', 'Error: ' + err.message);
    }

    input.disabled = false;
    input.focus();
}

function sendQuickPrompt(text) {
    document.getElementById('chatInput').value = text;
    sendChatMessage();
}

function appendChatMessage(role, text) {
    const container = document.getElementById('chatMessages');
    const div = document.createElement('div');
    div.className = `chat-msg chat-${role}`;

    const avatar = document.createElement('div');
    avatar.className = 'chat-avatar';
    avatar.textContent = role === 'ai' ? 'AI' : 'You';

    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble';
    bubble.textContent = text;

    div.appendChild(avatar);
    div.appendChild(bubble);
    container.appendChild(div);

    // Scroll to bottom
    container.scrollTop = container.scrollHeight;
}

function appendTypingIndicator() {
    const container = document.getElementById('chatMessages');
    const id = 'typing-' + Date.now();
    const div = document.createElement('div');
    div.className = 'chat-msg chat-ai';
    div.id = id;
    div.innerHTML = `
        <div class="chat-avatar">AI</div>
        <div class="chat-bubble">
            <div class="chat-typing"><span></span><span></span><span></span></div>
        </div>`;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
    return id;
}

function removeTypingIndicator(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
}

// ============ OBSERVER FOR MAP INIT ============
const mapObserver = new MutationObserver(() => {
    const mapPage = document.getElementById('page-intelligence-map');
    if (mapPage && mapPage.classList.contains('active') && !mapInitialized) {
        setTimeout(init3DMap, 100);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.getElementById('mainContent');
    if (mainContent) {
        mapObserver.observe(mainContent, { attributes: true, subtree: true, attributeFilter: ['class'] });
    }

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (link.dataset.page === 'intelligence-map') {
                setTimeout(() => {
                    if (!mapInitialized) init3DMap();
                    else onMapResize();
                }, 150);
            }
        });
    });
});
