export const DURATION_LABELS = {
  'under-5': 'Under 5 min',
  '5-15': '5–15 min',
  '15-30': '15–30 min',
  '30-60': '30–60 min',
  'over-60': 'Over 1 hour',
}

export const INTEREST_LABELS = { low: 'Low', medium: 'Medium', high: 'High' }

export const FIELD_DEFS = [
  { key: 'name', label: 'Name' },
  { key: 'phone', label: 'Phone' },
  { key: 'date', label: 'Date' },
  { key: 'time', label: 'Arrival Time', render: (v) => v },
  { key: 'duration', label: 'Time Stayed', render: (v) => DURATION_LABELS[v] || v },
  { key: 'interest', label: 'Interest Level', render: (v) => INTEREST_LABELS[v] || v },
  { key: 'whatDoYouThink', label: '“What do you think?”' },
  { key: 'comments', label: 'Notes' },
]
