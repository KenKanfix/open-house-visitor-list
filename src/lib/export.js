import { DURATION_LABELS, INTEREST_LABELS } from './constants'

const HEADERS = [
  'Name',
  'Phone',
  'Date',
  'Arrival Time',
  'Duration',
  'Interest',
  'WhatDoYouThink',
  'Notes',
]

function esc(v) {
  let s = String(v == null ? '' : v).replace(/"/g, '""')
  return /[",\n]/.test(s) ? `"${s}"` : s
}

export function exportCSV(records) {
  const lines = [HEADERS.join(',')]
  records.forEach((r) => {
    lines.push(
      [
        r.name,
        r.phone,
        r.date,
        r.time,
        r.duration ? DURATION_LABELS[r.duration] || r.duration : '',
        r.interest ? INTEREST_LABELS[r.interest] || r.interest : '',
        r.whatDoYouThink,
        r.comments,
      ]
        .map(esc)
        .join(',')
    )
  })

  const blob = new Blob(['\uFEFF' + lines.join('\n')], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'open-house-visitors.csv'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
