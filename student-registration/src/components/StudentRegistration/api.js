// src/components/StudentRegistration/api.js

// Helper function to simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock data for countries
const mockCountries = [
  { name: 'India', code: 'IN' },
  { name: 'United States', code: 'US' },
  { name: 'United Kingdom', code: 'UK' },
  { name: 'Canada', code: 'CA' },
  { name: 'Australia', code: 'AU' }
];

// Mock data for states
const mockStates = {
  'IN': [
    { name: 'Maharashtra', code: 'MH' },
    { name: 'Karnataka', code: 'KA' },
    { name: 'Tamil Nadu', code: 'TN' },
    { name: 'Delhi', code: 'DL' }
  ],
  'US': [
    { name: 'California', code: 'CA' },
    { name: 'New York', code: 'NY' },
    { name: 'Texas', code: 'TX' },
    { name: 'Florida', code: 'FL' }
  ]
};

// Mock data for cities with postal codes
const mockCities = {
  'MH': [
    { name: 'Mumbai', postalCode: '400001' },
    { name: 'Pune', postalCode: '411001' },
    { name: 'Nagpur', postalCode: '440001' }
  ],
  'KA': [
    { name: 'Bangalore', postalCode: '560001' },
    { name: 'Mysore', postalCode: '570001' },
    { name: 'Hubli', postalCode: '580001' }
  ],
  'CA': [
    { name: 'Los Angeles', postalCode: '90001' },
    { name: 'San Francisco', postalCode: '94101' },
    { name: 'San Diego', postalCode: '92101' }
  ],
  'NY': [
    { name: 'New York City', postalCode: '10001' },
    { name: 'Buffalo', postalCode: '14201' },
    { name: 'Albany', postalCode: '12201' }
  ]
};

// API functions
export async function getCountries() {
  await delay(500); // Simulate network delay
  return mockCountries;
}

export async function getStates(countryCode) {
  await delay(500);
  return mockStates[countryCode] || [];
}

export async function getCities(stateCode) {
  await delay(500);
  return mockCities[stateCode] || [];
}

// You can replace these mock functions with real API calls later:
/*
export async function getCountries() {
  const response = await fetch('https://your-api-endpoint/countries');
  return response.json();
}

export async function getStates(countryCode) {
  const response = await fetch(`https://your-api-endpoint/states/${countryCode}`);
  return response.json();
}

export async function getCities(stateCode) {
  const response = await fetch(`https://your-api-endpoint/cities/${stateCode}`);
  return response.json();
}
*/