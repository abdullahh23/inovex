/**
 * Extraction prompt - concise to minimize token usage.
 * Returns structured JSON from trucking rate confirmations.
 */
export const EXTRACTION_PROMPT = `Extract these fields from the trucking rate confirmation document. Return ONLY valid JSON, no markdown.

Fields:
- loadNumber: Load/Reference/Confirmation/Order number
- brokerName: Broker company name (not carrier)
- pickupDate: Pickup date as YYYY-MM-DD
- grossAmount: Total carrier pay (rate + fuel surcharge) as a number
- originCity: Pickup city
- originState: 2-letter state code uppercase
- destinationCity: Delivery city  
- destinationState: 2-letter state code uppercase

Return JSON object with exactly these 8 fields.`;

export const EXTRACTION_JSON_SCHEMA = {
  type: 'object' as const,
  properties: {
    loadNumber: { type: 'string', description: 'Load or reference number' },
    brokerName: { type: 'string', description: 'Broker company name' },
    pickupDate: { type: 'string', description: 'Pickup date YYYY-MM-DD' },
    grossAmount: { type: 'number', description: 'Total gross pay' },
    originCity: { type: 'string', description: 'Origin city' },
    originState: { type: 'string', description: '2-letter origin state' },
    destinationCity: { type: 'string', description: 'Destination city' },
    destinationState: { type: 'string', description: '2-letter destination state' },
  },
  required: [
    'loadNumber', 'brokerName', 'pickupDate', 'grossAmount',
    'originCity', 'originState', 'destinationCity', 'destinationState',
  ],
};
