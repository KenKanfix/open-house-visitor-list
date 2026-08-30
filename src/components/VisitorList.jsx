import { useMemo, useState } from 'react'
import { DURATION_LABELS, INTEREST_LABELS, LEAD_LABELS, lastFollowUp } from '../lib/constants'

function orderByDate(records) {
  const order = {}
  records
    .map((r) => r.date)
    .filter(Boolean)
    .sort()
    .reverse()
    .forEach((d, i) => {
      order[d] = i
    })
  return order
}

function VisitorCard({ record, onSelect }) {
  const parts = []
  if (record.date) parts.push(record.date)
  if (record.property) parts.push(record.property)
  if (record.phone) parts.push(record.phone)
  if (record.email) parts.push(record.email)
  if (record.duration) parts.push(DURATION_LABELS[record.duration] || record.duration)

  const last = lastFollowUp(record)

  return (
    <li className="visitor-card" onClick={() => onSelect(record)}>
      <div className="name">
        {record.name || 'Unnamed'}
        {record.lead && (
          <span className={'badge lead ' + record.lead}>
            {LEAD_LABELS[record.lead] || record.lead}
          </span>
        )}
        {record.interest && (
          <span className={'badge ' + record.interest}>
            {INTEREST_LABELS[record.interest] || record.interest}
          </span>
        )}
      </div>
      {parts.length > 0 && <div className="meta">{parts.join(' · ')}</div>}
      {last && <div className="quote">Follow-up · {last.date}: “{last.note}”</div>}
      {record.whatDoYouThink && <div className="quote">“{record.whatDoYouThink}”</div>}
    </li>
  )
}

export default function VisitorList({ records, onSelect, onDelete, onEdit }) {
  const [term, setTerm] = useState('')

  const sorted = useMemo(() => {
    const order = orderByDate(records)
    const list = records.slice()
    list.sort((a, b) => (order[a.date] ?? 1e9) - (order[b.date] ?? 1e9))
    return list
  }, [records])

  const visible = useMemo(() => {
    const t = term.toLowerCase()
    if (!t) return sorted
    return sorted.filter(
      (r) =>
        (r.name || '').toLowerCase().includes(t) ||
        (r.phone || '').toLowerCase().includes(t) ||
        (r.email || '').toLowerCase().includes(t) ||
        (r.property || '').toLowerCase().includes(t)
    )
  }, [sorted, term])

  return (
    <>
      <div className="list-head">
        <h2>Registered Visitors</h2>
        <span className="count">
          {visible.length}
          {term ? ` of ${records.length}` : ''}
        </span>
      </div>
      <div className="list-toolbar">
        <input
          type="search"
          placeholder="Search name or phone…"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
      </div>
      {visible.length === 0 ? (
        <p className="empty">
          {term ? 'No matches found.' : 'No visitors yet. Add your first one!'}
        </p>
      ) : (
        <ul className="visitor-list">
          {visible.map((r) => (
            <VisitorCard key={r.id} record={r} onSelect={onSelect} />
          ))}
        </ul>
      )}
    </>
  )
}
