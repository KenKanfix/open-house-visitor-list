import { useState } from 'react'
import { FIELD_DEFS } from '../lib/constants'

function todayISO() {
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export default function VisitorDetail({ record, onClose, onEdit, onDelete, onAddFollowUp }) {
  const [note, setNote] = useState('')
  const [msg, setMsg] = useState('')
  const [msgType, setMsgType] = useState('')

  function handleDelete() {
    if (window.confirm('Delete this visitor record?')) onDelete(record.id)
  }

  function handleAdd() {
    if (!note.trim()) {
      setMsg('Please enter a note for this follow-up.')
      setMsgType('err')
      return
    }
    onAddFollowUp(record.id, { date: todayISO(), note: note.trim() })
    setNote('')
    setMsg('Follow-up added.')
    setMsgType('ok')
  }

  const rows = FIELD_DEFS.filter(({ key, render }) => {
    const v = record[key]
    const shown = render ? render(v) : v
    return shown
  })

  const ups = (record.followUps || []).slice().sort((a, b) => (a.date < b.date ? 1 : -1))

  return (
    <div className="modal" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-content">
        <div className="modal-head">
          <h2>{record.name || 'Visitor'}</h2>
          <button className="modal-close" aria-label="Close" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="detail-grid">
          {rows.map(({ key, label, render }) => {
            const v = record[key]
            const shown = render ? render(v) : v
            return (
              <div className="detail-field" key={key}>
                <div className="k">{label}</div>
                <div className="v">{shown}</div>
              </div>
            )
          })}
        </div>

        <div className="followups">
          <div className="k">Follow-Ups</div>
          {ups.length === 0 ? (
            <p className="empty-sm">No follow-ups recorded yet.</p>
          ) : (
            <ul className="followup-list">
              {ups.map((u, i) => (
                <li key={i}>
                  <span className="fu-date">{u.date}</span>
                  <span className="fu-note">{u.note}</span>
                </li>
              ))}
            </ul>
          )}
          <div className="ruf-form">
            <input
              type="text"
              placeholder="What follow-up did you just do?"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
            <button className="btn btn-primary" onClick={handleAdd}>
              Add follow-up
            </button>
          </div>
          {msg && <p className={'form-msg ' + msgType}>{msg}</p>}
        </div>

        <div className="modal-actions">
          <button className="btn btn-ghost" onClick={() => onEdit(record)}>
            Edit
          </button>
          <button className="btn btn-danger" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
