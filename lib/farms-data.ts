export interface Farm {
  name: string
  address: string
  city: string
  state: string
  zip: string
  full_address: string
  farm_type: string
  produce: string
  phone: string
  website: string
  distance: string
  hours: string
}

// Parse CSV data with proper handling of quoted fields
export function parseFarmsCSV(csvText: string): Farm[] {
  const lines = csvText.trim().split('\n')
  if (lines.length < 2) return []
  
  const farms: Farm[] = []
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim()
    if (!line) continue
    
    // Handle CSV parsing with quoted fields
    const values: string[] = []
    let current = ''
    let inQuotes = false
    
    for (let j = 0; j < line.length; j++) {
      const char = line[j]
      const nextChar = line[j + 1]
      
      if (char === '"') {
        if (inQuotes && nextChar === '"') {
          // Escaped quote
          current += '"'
          j++ // Skip next quote
        } else {
          // Toggle quote state
          inQuotes = !inQuotes
        }
      } else if (char === ',' && !inQuotes) {
        values.push(current.trim())
        current = ''
      } else {
        current += char
      }
    }
    // Push the last value
    values.push(current.trim())
    
    // Ensure we have at least 12 columns (pad with empty strings if needed)
    while (values.length < 12) {
      values.push('')
    }
    
    const farm: Farm = {
      name: values[0] || '',
      address: values[1] || '',
      city: values[2] || '',
      state: values[3] || '',
      zip: values[4] || '',
      full_address: values[5] || '',
      farm_type: values[6] || '',
      produce: values[7] || '',
      phone: values[8] || '',
      website: values[9] || '',
      distance: values[10] || '',
      hours: values[11] || '',
    }
    
    // Only add farms with at least a name
    if (farm.name && farm.name.trim() !== '') {
      farms.push(farm)
    }
  }
  
  return farms
}

// Get unique states from farms
export function getUniqueStates(farms: Farm[]): string[] {
  const states = farms
    .map(farm => farm.state)
    .filter(state => state && state.trim() !== '')
    .filter((value, index, self) => self.indexOf(value) === index)
    .sort()
  
  return states
}

// Get unique produce types
export function getUniqueProduceTypes(farms: Farm[]): string[] {
  const produceSet = new Set<string>()
  
  farms.forEach(farm => {
    if (farm.produce) {
      const produceList = farm.produce.split(',').map(p => p.trim())
      produceList.forEach(p => {
        if (p) produceSet.add(p)
      })
    }
  })
  
  return Array.from(produceSet).sort()
}

