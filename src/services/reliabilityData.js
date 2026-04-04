export const RELIABILITY_DATABASE = {
    // Audi
    "AUDIA3": { make: "Audi", model: "A3", commonFaults: [{ component: "DSG Mechatronic Unit", description: "Shifting issues in 7-speed dry-clutch models.", risk: "High" }, { component: "Water Pump", description: "Leaking around thermostat housing.", risk: "Medium" }], maintenance: [{ item: "DSG Service", icon: "⚙️", nextDue: "60k km", severity: "Normal" }] },
    "AUDIA4": { make: "Audi", model: "A4", commonFaults: [{ component: "Oil Consumption", description: "High oil usage in 2.0 TFSI engines (pre-2016).", risk: "High" }], maintenance: [{ item: "PCV Valve", icon: "💨", nextDue: "80k km", severity: "Normal" }] },

    // BMW
    "BMW420D": { make: "BMW", model: "420d", commonFaults: [{ component: "Timing Chain", description: "Premature wear leading to engine failure.", risk: "High" }, { component: "EGR Cooler", description: "Internal leaks; fire risk recall.", risk: "Critical" }], maintenance: [{ item: "Oil Change", icon: "🛢️", nextDue: "15k km", severity: "Normal" }] },
    "BMW330I": { make: "BMW", model: "330i", commonFaults: [{ component: "Coolant Hoses", description: "Brittle plastic connectors causing leaks.", risk: "Medium" }], maintenance: [{ item: "Coolant Flush", icon: "❄️", nextDue: "4 years", severity: "Normal" }] },

    // Tesla
    "TESLAMODEL3": { make: "Tesla", model: "Model 3", commonFaults: [{ component: "Control Arms", description: "Squeaking or failure in early production units.", risk: "Medium" }], maintenance: [{ item: "Cabin Filter", icon: "🧹", nextDue: "2 years", severity: "Normal" }, { item: "Brake Lube", icon: "🧂", nextDue: "Cold climates", severity: "Normal" }] },

    // Toyota
    "TOYOTACOROLLA": { make: "Toyota", model: "Corolla", commonFaults: [{ component: "CVT Fluid", description: "Fluid degradation under heavy load.", risk: "Low" }], maintenance: [{ item: "Hybrid Filter", icon: "🔋", nextDue: "Check monthly", severity: "Normal" }] },
    "TOYOTARAV4": { make: "Toyota", model: "RAV4", commonFaults: [{ component: "Roof Rail Leaks", description: "Water ingress through roof mounting points.", risk: "Medium" }], maintenance: [{ item: "AWD Service", icon: "🏎️", nextDue: "60k km", severity: "Normal" }] },

    // Porsche
    "PORSCHE911": { make: "Porsche", model: "911", commonFaults: [{ component: "Bore Scoring", description: "Internal cylinder wear in 996/997.1 models.", risk: "High" }], maintenance: [{ item: "Spark Plugs", icon: "⚡", nextDue: "4 years", severity: "Normal" }] },

    // Volvo
    "VOLVXC60": { make: "Volvo", model: "XC60", commonFaults: [{ component: "Oil Consumption", description: "Piston ring issues in Drive-E engines.", risk: "High" }], maintenance: [{ item: "Timing Belt", icon: "🧵", nextDue: "10 years", severity: "Normal" }] },

    // Mercedes
    "MERCC-CLASS": { make: "Mercedes", model: "C-Class", commonFaults: [{ component: "Subframe Corrosion", description: "Rear subframe rust issues (recall items).", risk: "Critical" }], maintenance: [{ item: "B Service", icon: "🛠️", nextDue: "2 years", severity: "Normal" }] },

    // Segment fallbacks (Generic data)
    "G_SEDAN": { commonFaults: [{ component: "Suspension Bushings", description: "Wear over time causing noise.", risk: "Low" }], maintenance: [{ item: "General Service", icon: "🔧", nextDue: "10k km", severity: "Normal" }] },
    "G_SUV": { commonFaults: [{ component: "Brake Wear", description: "Faster wear due to vehicle weight.", risk: "Medium" }], maintenance: [{ item: "Tire Rotation", icon: "🔄", nextDue: "10k km", severity: "Normal" }] },
    "G_LUXURY": { commonFaults: [{ component: "Electronics", description: "Complex sensors may fail with age.", risk: "Medium" }], maintenance: [{ item: "System Scan", icon: "💻", nextDue: "Yearly", severity: "Normal" }] }
};

export const MANUFACTURERS = [
    "Toyota", "Volkswagen", "Ford", "Honda", "Nissan", "Hyundai", "Kia", "Chevrolet", "Mercedes", "BMW",
    "Audi", "Tesla", "Lexus", "Subaru", "Mazda", "Volvo", "Porsche", "Land Rover", "Jaguar", "Alpha Romeo",
    "Fiat", "Peugeot", "Renault", "Citroen", "Suzuki", "Mitsubishi", "Mini", "Skoda", "Seat", "Jeep",
    "Chrysler", "Dodge", "Ram", "Cadillac", "Buick", "Lincoln", "Infiniti", "Acura", "Genesis", "Rivian",
    "Lucid", "Polestar", "Smart", "Ferrari", "Lamborghini", "Maserati", "Bentley", "Aston Martin", "Rolls-Royce"
];
