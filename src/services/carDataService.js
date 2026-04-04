import { RELIABILITY_DATABASE, MANUFACTURERS } from './reliabilityData';
const NHTSA_BASE_URL = 'https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin';

// Universal search parser
export const parseSearchQuery = (query) => {
    const queryUpper = query.toUpperCase();

    // 1. Extract Year (1990-2025)
    const yearMatch = query.match(/\b(199|20[0-2])\d\b/);
    const year = yearMatch ? parseInt(yearMatch[0]) : 2020;

    // 2. Extract Make from our 50+ manufacturer list
    let make = "Unknown";
    for (const brand of MANUFACTURERS) {
        if (queryUpper.includes(brand.toUpperCase())) {
            make = brand;
            break;
        }
    }

    // 3. Extract Model
    let model = queryUpper
        .replace(year.toString(), "")
        .replace(make.toUpperCase(), "")
        .trim();

    if (model.length > 0) {
        model = model.charAt(0) + model.slice(1).toLowerCase();
    }

    return { make, model, year };
};

// Logic to determine vehicle segment for better fallbacks
const getSegment = (make, model) => {
    const modelUpper = model.toUpperCase();
    if (modelUpper.match(/X[1-7]|Q[1-8]|XC[4-9]0|RAV4|CRV|F150|RANGER|WRANGLER|DEFENDER/)) return "G_SUV";
    if (modelUpper.match(/S-CLASS|7-SERIES|A8|PANAMERA|LS500|FLYING SPUR/)) return "G_LUXURY";
    return "G_SEDAN";
};

// --- REAL-TIME MARKET API INTEGRATION DEMO --- //
// In production, this would hit MarketCheck or VinAudit:
// fetch(`https://marketcheck-prod.apigee.net/v2/search/car/active?api_key=${API_KEY}&year=${year}&make=${make}&model=${model}`)

export const fetchLiveMarketData = async (make, model, year) => {
    // Simulate network delay for API call
    await new Promise(resolve => setTimeout(resolve, 800));

    // Base mock calculation for demonstration since no API key is provided
    const age = new Date().getFullYear() - year;
    const segment = getSegment(make, model);

    let basePrice = 30000;
    if (segment === "G_SUV") basePrice = 45000;
    if (segment === "G_LUXURY" || ["Porsche", "Ferrari", "Bentley", "Tesla"].includes(make)) basePrice = 90000;
    if (["Toyota", "Honda", "Ford"].includes(make) && segment === "G_SEDAN") basePrice = 25000;

    let val = basePrice;
    for (let i = 0; i < age; i++) {
        val *= (i < 3 ? 0.82 : 0.90);
    }
    const avgPrice = Math.max(1500, Math.round(val / 100) * 100);

    // Provide a real-world response structure similar to MarketCheck
    return {
        avgPrice: avgPrice,
        priceRange: {
            low: Math.round(avgPrice * 0.92),
            high: Math.round(avgPrice * 1.08)
        },
        listingCount: Math.floor(Math.random() * 50) + 12, // Fake listing count based on "live" data
        lastUpdated: new Date().toISOString()
    };
};

export const decodeVIN = async (vin) => {
    try {
        const response = await fetch(`${NHTSA_BASE_URL}/${vin}?format=json`);
        const data = await response.json();
        const results = data.Results;
        const findValue = (label) => results.find(r => r.Variable === label)?.Value;

        if (!findValue('Make')) return null;

        return {
            make: findValue('Make'),
            model: findValue('Model'),
            year: parseInt(findValue('Model Year')),
            trim: findValue('Trim'),
            vin: vin
        };
    } catch (error) {
        return null;
    }
};

// Now asynchronous to handle the live market fetch
export const getMarketData = async (make, model, year) => {
    const searchKey = (make + model).toUpperCase().replace(/\s/g, '');
    const segmentKey = getSegment(make, model);

    // 1. Get Static Reliability Data
    const baseData = RELIABILITY_DATABASE[searchKey] || RELIABILITY_DATABASE[segmentKey];

    // 2. Fetch Live Market Pricing 
    const livePricing = await fetchLiveMarketData(make, model, year);

    const commonFaults = baseData?.commonFaults || [];
    const hasHighRisk = commonFaults.some(f => f.risk === "High" || f.risk === "Critical");

    return {
        ...baseData,
        make,
        model: model || baseData?.model || "Model",
        year,
        livePricing, // Attach the new API structure
        commonFaults,
        maintenance: baseData?.maintenance || [],
        specifications: baseData?.specifications || { equipment_levels: ["Standard"] },
        history: [
            { date: "2023-08", value: Math.round(livePricing.avgPrice * 1.1) },
            { date: "2023-11", value: Math.round(livePricing.avgPrice * 1.05) },
            { date: "2024-02", value: livePricing.avgPrice }
        ],
        recommendation: livePricing.avgPrice < 5000 ? "Hold for utility value. Major depreciation occurred." :
            hasHighRisk ? `Consider selling. Reliability risks for ${make} ${model} are higher at this stage.` :
                "Market is stable. Good timing to hold or buy."
    };
};
