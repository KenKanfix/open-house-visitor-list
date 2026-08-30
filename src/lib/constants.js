export const DURATION_LABELS = {
  'under-5': 'Under 5 min',
  '5-15': '5–15 min',
  '15-30': '15–30 min',
  '30-60': '30–60 min',
  'over-60': 'Over 1 hour',
}

export const INTEREST_LABELS = { low: 'Low', medium: 'Medium', high: 'High' }

export const LEAD_LABELS = { cold: 'Cold', warming: 'Warming', hot: 'Hot' }

export const FIELD_DEFS = [
  { key: 'name', label: 'Name' },
  { key: 'property', label: 'Property Address' },
  { key: 'phone', label: 'Phone' },
  { key: 'email', label: 'Email' },
  { key: 'date', label: 'Date' },
  { key: 'time', label: 'Arrival Time', render: (v) => v },
  { key: 'duration', label: 'Time Stayed', render: (v) => DURATION_LABELS[v] || v },
  { key: 'interest', label: 'Interest Level', render: (v) => INTEREST_LABELS[v] || v },
  { key: 'lead', label: 'Lead Status', render: (v) => LEAD_LABELS[v] || v },
  { key: 'whatDoYouThink', label: '“What do you think?”' },
  { key: 'comments', label: 'Notes' },
]

export function lastFollowUp(record) {
  const ups = record.followUps || []
  if (ups.length === 0) return null
  return ups.slice().sort((a, b) => (a.date < b.date ? -1 : 1))[ups.length - 1]
}
