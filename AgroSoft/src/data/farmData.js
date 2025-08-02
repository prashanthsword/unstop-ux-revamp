// Dummy farm and crop data for AgroSoft
export const regions = {
  'Telangana': {
    name: 'Telangana',
    climate: 'Semi-arid',
    soilTypes: ['Black Cotton Soil', 'Red Sandy Soil', 'Alluvial Soil'],
    recommendedCrops: ['paddy', 'cotton', 'maize', 'turmeric', 'chilli'],
    averageRainfall: 900, // mm
    temperature: { min: 15, max: 42 },
  },
  'Punjab': {
    name: 'Punjab',
    climate: 'Continental',
    soilTypes: ['Alluvial Soil', 'Sandy Loam', 'Clay Loam'],
    recommendedCrops: ['wheat', 'rice', 'sugarcane', 'cotton', 'mustard'],
    averageRainfall: 500,
    temperature: { min: 4, max: 47 },
  },
  'Karnataka': {
    name: 'Karnataka',
    climate: 'Tropical',
    soilTypes: ['Red Soil', 'Black Soil', 'Laterite Soil'],
    recommendedCrops: ['paddy', 'ragi', 'sugarcane', 'coffee', 'cotton'],
    averageRainfall: 1200,
    temperature: { min: 15, max: 35 },
  },
  'Maharashtra': {
    name: 'Maharashtra',
    climate: 'Tropical',
    soilTypes: ['Black Cotton Soil', 'Red Soil', 'Alluvial Soil'],
    recommendedCrops: ['cotton', 'sugarcane', 'soybean', 'wheat', 'jowar'],
    averageRainfall: 1100,
    temperature: { min: 10, max: 43 },
  },
  'Tamil Nadu': {
    name: 'Tamil Nadu',
    climate: 'Tropical',
    soilTypes: ['Red Soil', 'Black Soil', 'Alluvial Soil'],
    recommendedCrops: ['paddy', 'sugarcane', 'cotton', 'groundnut', 'maize'],
    averageRainfall: 900,
    temperature: { min: 19, max: 37 },
  },
};

export const crops = {
  paddy: {
    name: 'Paddy/Rice',
    season: 'Kharif',
    duration: '120-150 days',
    waterRequirement: 'High',
    soilPH: '5.5-7.0',
    pricePerKg: 25,
    yieldPerAcre: 2500, // kg
    regions: ['Telangana', 'Karnataka', 'Tamil Nadu', 'Punjab'],
  },
  wheat: {
    name: 'Wheat',
    season: 'Rabi',
    duration: '120-140 days',
    waterRequirement: 'Medium',
    soilPH: '6.0-7.5',
    pricePerKg: 22,
    yieldPerAcre: 2000,
    regions: ['Punjab', 'Maharashtra'],
  },
  cotton: {
    name: 'Cotton',
    season: 'Kharif',
    duration: '180-200 days',
    waterRequirement: 'Medium',
    soilPH: '5.8-8.0',
    pricePerKg: 55,
    yieldPerAcre: 500,
    regions: ['Telangana', 'Maharashtra', 'Karnataka', 'Punjab'],
  },
  sugarcane: {
    name: 'Sugarcane',
    season: 'Annual',
    duration: '12-18 months',
    waterRequirement: 'Very High',
    soilPH: '6.0-7.5',
    pricePerKg: 3.5,
    yieldPerAcre: 50000,
    regions: ['Karnataka', 'Maharashtra', 'Tamil Nadu', 'Punjab'],
  },
  maize: {
    name: 'Maize/Corn',
    season: 'Kharif',
    duration: '90-120 days',
    waterRequirement: 'Medium',
    soilPH: '6.0-7.5',
    pricePerKg: 20,
    yieldPerAcre: 3000,
    regions: ['Telangana', 'Karnataka', 'Tamil Nadu'],
  },
  mustard: {
    name: 'Mustard',
    season: 'Rabi',
    duration: '90-110 days',
    waterRequirement: 'Low',
    soilPH: '6.0-7.5',
    pricePerKg: 45,
    yieldPerAcre: 800,
    regions: ['Punjab'],
  },
};

export const farmerProfile = {
  id: 'AGS001',
  name: 'Ravi Kumar',
  phone: '+91 9876543210',
  region: 'Telangana',
  district: 'Warangal',
  village: 'Dharmasagar',
  farmSize: 5.5, // acres
  soilType: 'Black Cotton Soil',
  primaryCrops: ['paddy', 'cotton', 'maize'],
  farmCoordinates: {
    latitude: 17.9689,
    longitude: 79.5941,
  },
  landCode: 'TG-WGL-DHS-001',
  registrationDate: '2024-01-15',
  creditScore: 750,
  totalYield: {
    '2023': { paddy: 12500, cotton: 2200, maize: 8500 },
    '2022': { paddy: 11800, cotton: 2000, maize: 8000 },
    '2021': { paddy: 13000, cotton: 2400, maize: 9000 },
  },
  walletBalance: 15420,
  creditLimit: 85000,
  outstandingCredit: 25000,
};

export const machineryPricing = {
  tractor: {
    name: 'Tractor',
    pricePerHour: 800,
    pricePerAcre: 1200,
    availability: 'High',
    operators: ['Suresh', 'Mahesh', 'Ganesh'],
  },
  jcb: {
    name: 'JCB/Excavator',
    pricePerHour: 1200,
    pricePerAcre: 2000,
    availability: 'Medium',
    operators: ['Ramesh', 'Naresh'],
  },
  harvester: {
    name: 'Harvester',
    pricePerHour: 1500,
    pricePerAcre: 2500,
    availability: 'Medium',
    operators: ['Rajesh', 'Dinesh'],
  },
  borewellRig: {
    name: 'Borewell Rig',
    pricePerHour: 2000,
    pricePerFeet: 150,
    availability: 'Low',
    operators: ['Prakash', 'Anil'],
  },
};

export const soilTestData = {
  sampleId: 'ST-001',
  farmerId: 'AGS001',
  testDate: '2024-01-20',
  location: { lat: 17.9689, lng: 79.5941 },
  results: {
    pH: 7.2,
    nitrogen: 280, // kg/ha
    phosphorus: 22, // kg/ha
    potassium: 145, // kg/ha
    organicCarbon: 0.58, // %
    electricalConductivity: 0.35, // dS/m
    moisture: 18, // %
    temperature: 28, // °C
  },
  recommendations: {
    fertilizer: 'Apply 120 kg/ha Urea, 60 kg/ha DAP',
    crops: ['paddy', 'cotton', 'maize'],
    irrigation: 'Moderate water requirement',
    amendments: 'Add organic matter to improve soil health',
  },
  aiInsights: {
    soilHealth: 78, // percentage
    fertility: 'Good',
    deficiencies: ['Organic Matter'],
    strengths: ['Good pH balance', 'Adequate NPK levels'],
  },
};

export const droneServices = {
  spraying: {
    name: 'Drone Spraying',
    pricePerAcre: 500,
    duration: '30 mins per acre',
    chemicals: ['Pesticide', 'Fungicide', 'Fertilizer'],
    coverage: '95%+ accuracy',
  },
  imaging: {
    name: 'Crop Health Imaging',
    pricePerAcre: 300,
    duration: '15 mins per acre',
    features: ['NDVI Analysis', 'Disease Detection', 'Pest Identification'],
    reportTime: '2-4 hours',
  },
};

export const workerCategories = {
  ploughing: {
    name: 'Ploughing Workers',
    pricePerDay: 400,
    pricePerAcre: 600,
    availability: 'High',
    workers: ['Lakshman', 'Krishna', 'Venkat'],
  },
  sowing: {
    name: 'Sowing Workers',
    pricePerDay: 350,
    pricePerAcre: 500,
    availability: 'High',
    workers: ['Radha', 'Sita', 'Gita'],
  },
  harvest: {
    name: 'Harvest Workers',
    pricePerDay: 450,
    pricePerAcre: 700,
    availability: 'Medium',
    workers: ['Ramu', 'Somu', 'Gopal'],
  },
  weeding: {
    name: 'Weeding Workers',
    pricePerDay: 300,
    pricePerAcre: 400,
    availability: 'High',
    workers: ['Kamala', 'Sunita', 'Priya'],
  },
};

export const marketplaceData = {
  crops: [
    {
      id: 'MP001',
      farmerId: 'AGS001',
      farmerName: 'Ravi Kumar',
      crop: 'paddy',
      quantity: 2500, // kg
      pricePerKg: 25,
      quality: 'Grade A',
      harvestDate: '2024-01-10',
      location: 'Warangal, Telangana',
      status: 'Available',
    },
    {
      id: 'MP002',
      farmerId: 'AGS002',
      farmerName: 'Suresh Reddy',
      crop: 'cotton',
      quantity: 500,
      pricePerKg: 55,
      quality: 'Premium',
      harvestDate: '2024-01-15',
      location: 'Adilabad, Telangana',
      status: 'Available',
    },
  ],
  dairy: [
    {
      id: 'DP001',
      farmerId: 'AGS001',
      farmerName: 'Ravi Kumar',
      product: 'Fresh Milk',
      quantity: 50, // liters
      pricePerLiter: 35,
      quality: 'A1',
      productionDate: '2024-01-22',
      location: 'Warangal, Telangana',
      status: 'Available',
    },
  ],
};