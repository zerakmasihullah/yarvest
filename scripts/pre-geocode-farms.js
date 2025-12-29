/**
 * Script to pre-geocode farms and save to JSON file
 * Run with: node scripts/pre-geocode-farms.js
 * 
 * This will geocode all farms and save coordinates to public/farms-geocoded.json
 * This file can then be loaded once and cached for all users
 */

const fs = require('fs');
const path = require('path');

// Read CSV file
const csvPath = path.join(__dirname, '../farms_fixed.csv');
const csvContent = fs.readFileSync(csvPath, 'utf-8');

// Simple CSV parser
function parseCSV(csvText) {
  const lines = csvText.trim().split('\n');
  const farms = [];
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    const values = [];
    let current = '';
    let inQuotes = false;
    
    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      const nextChar = line[j + 1];
      
      if (char === '"') {
        if (inQuotes && nextChar === '"') {
          current += '"';
          j++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        values.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    values.push(current.trim());
    
    while (values.length < 12) {
      values.push('');
    }
    
    const farm = {
      name: values[0] || '',
      address: values[1] || '',
      city: values[2] || '',
      state: values[3] || '',
      zip: values[4] || '',
      full_address: values[5] || '',
      farm_type: values[6] || '',
      produce: values[7] || '',
    };
    
    if (farm.name && farm.name.trim() !== '') {
      farms.push(farm);
    }
  }
  
  return farms;
}

// Geocode a single farm
async function geocodeFarm(farm) {
  const address = farm.full_address || `${farm.address}, ${farm.city}, ${farm.state} ${farm.zip}`.trim();
  if (!address || address === ',' || address === '') return null;
  
  const key = `${farm.name}|${address}`;
  
  try {
    // Wait 1.2 seconds to respect rate limits
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1&addressdetails=1`;
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Yarvest Farms Pre-Geocoding Script',
        'Accept-Language': 'en-US,en;q=0.9',
      },
    });
    
    if (!response.ok) {
      console.warn(`Failed to geocode ${farm.name}: HTTP ${response.status}`);
      return null;
    }
    
    const data = await response.json();
    
    if (data && data.length > 0 && data[0].lat && data[0].lon) {
      const lat = parseFloat(data[0].lat);
      const lng = parseFloat(data[0].lon);
      
      if (!isNaN(lat) && !isNaN(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
        return { key, lat, lng };
      }
    }
  } catch (error) {
    console.warn(`Error geocoding ${farm.name}:`, error.message);
  }
  
  return null;
}

// Main function
async function main() {
  console.log('Parsing CSV...');
  const farms = parseCSV(csvContent);
  console.log(`Found ${farms.length} farms`);
  
  const geocoded = {};
  let successCount = 0;
  let failCount = 0;
  
  console.log('Starting geocoding (this will take a while due to rate limits)...');
  console.log('Processing farms sequentially with 1.2s delay between requests...\n');
  
  for (let i = 0; i < farms.length; i++) {
    const farm = farms[i];
    const progress = ((i + 1) / farms.length * 100).toFixed(1);
    
    process.stdout.write(`\r[${progress}%] Geocoding ${i + 1}/${farms.length}: ${farm.name.substring(0, 40)}...`);
    
    const result = await geocodeFarm(farm);
    
    if (result) {
      geocoded[result.key] = { lat: result.lat, lng: result.lng };
      successCount++;
    } else {
      failCount++;
    }
  }
  
  console.log('\n\nGeocoding complete!');
  console.log(`Success: ${successCount}`);
  console.log(`Failed: ${failCount}`);
  
  // Save to JSON file
  const outputPath = path.join(__dirname, '../public/farms-geocoded.json');
  const output = {
    version: '1.0',
    generated_at: new Date().toISOString(),
    total_farms: farms.length,
    geocoded_count: successCount,
    farms: geocoded,
  };
  
  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
  console.log(`\nSaved to: ${outputPath}`);
}

// Run if executed directly
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { parseCSV, geocodeFarm };

