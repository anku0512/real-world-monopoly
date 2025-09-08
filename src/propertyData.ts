export type PropertyType = "land" | "industry" | "mine" | "port" | "airport" | "techpark" | "agriculture";

export interface Property {
    id: string; // unique id, e.g. state_code-property_name
    state: string; // state name
    name: string; // property name
    price: number;
    type: PropertyType;
    owner: string | null; // null means unowned
    description: string;
    incomePerTurn: number;
    upgradeLevel: number;
}

export const propertyData: Property[] = [
    // Andhra Pradesh
    { id: "AP-port", state: "Andhra Pradesh", name: "Visakhapatnam Port", price: 120000, type: "port", owner: null, description: "Major port in Andhra Pradesh.", incomePerTurn: 12000, upgradeLevel: 1 },
    { id: "AP-land", state: "Andhra Pradesh", name: "Amaravati Land", price: 90000, type: "land", owner: null, description: "Prime land in Amaravati.", incomePerTurn: 8000, upgradeLevel: 1 },
    // Maharashtra
    { id: "MH-airport", state: "Maharashtra", name: "Mumbai Airport", price: 220000, type: "airport", owner: null, description: "Major international airport.", incomePerTurn: 25000, upgradeLevel: 1 },
    { id: "MH-port", state: "Maharashtra", name: "Mumbai Port", price: 180000, type: "port", owner: null, description: "Major port in Mumbai.", incomePerTurn: 18000, upgradeLevel: 1 },
    { id: "MH-techpark", state: "Maharashtra", name: "Pune Tech Park", price: 150000, type: "techpark", owner: null, description: "IT hub in Pune.", incomePerTurn: 15000, upgradeLevel: 1 },
    // Karnataka
    { id: "KA-techpark", state: "Karnataka", name: "Bengaluru Tech Park", price: 170000, type: "techpark", owner: null, description: "IT hub of India.", incomePerTurn: 17000, upgradeLevel: 1 },
    { id: "KA-airport", state: "Karnataka", name: "Kempegowda Airport", price: 160000, type: "airport", owner: null, description: "Major airport in Bengaluru.", incomePerTurn: 16000, upgradeLevel: 1 },
    // Gujarat
    { id: "GJ-industry", state: "Gujarat", name: "Ahmedabad Textile Industry", price: 180000, type: "industry", owner: null, description: "Major textile industry.", incomePerTurn: 18000, upgradeLevel: 1 },
    { id: "GJ-port", state: "Gujarat", name: "Kandla Port", price: 140000, type: "port", owner: null, description: "Major port in Gujarat.", incomePerTurn: 14000, upgradeLevel: 1 },
    // Punjab
    { id: "PB-agriculture", state: "Punjab", name: "Ludhiana Wheat Farm", price: 150000, type: "agriculture", owner: null, description: "Large wheat farm.", incomePerTurn: 12000, upgradeLevel: 1 },
    // Add more properties for other states as needed
]; 