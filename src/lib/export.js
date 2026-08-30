import { DURATION_LABELS, INTEREST_LABELS, LEAD_LABELS } from './constants'

const HEADERS = [
  'Name',
  'Property Address',
  'Phone',
  'Email',
  'Date',
  'Arrival Time',
  'Duration',
  'Interest',
  'Lead Status',
  'WhatDoYouThink',
  'Notes',
  'FollowUps',
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
        r.property,
        r.phone,
        r.email,
        r.date,
        r.time,
        r.duration ? DURATION_LABELS[r.duration] || r.duration : '',
        r.interest ? INTEREST_LABELS[r.interest] || r.interest : '',
        r.lead ? LEAD_LABELS[r.lead] || r.lead : '',
        r.whatDoYouThink,
        r.comments,
        (r.followUps || []).map((u) => `${u.date}: ${u.note}`).join(' | '),
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
