import { useEffect, useState } from 'react'

const initial = {
  name: '',
  phone: '',
  email: '',
  date: '',
  time: '',
  duration: '',
  interest: '',
  lead: '',
  whatDoYouThink: '',
  comments: '',
}

function todayISO() {
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export default function VisitorForm({ onSave, editing, onCancelEdit }) {
  const [form, setForm] = useState({ ...initial, date: todayISO() })
  const [msg, setMsg] = useState('')
  const [msgType, setMsgType] = useState('')

  useEffect(() => {
    if (editing) {
      setForm({ ...initial, ...editing })
    } else {
      setForm({ ...initial, date: todayISO() })
      setMsg('')
      setMsgType('')
    }
  }, [editing])

  function set(key, value) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.name.trim()) {
      setMsg('Please enter the visitor\u2019s name.')
      setMsgType('err')
      return
    }
    if (!form.date) {
      setMsg('Please pick a date.')
      setMsgType('err')
      return
    }
    const clean = {}
    Object.entries(form).forEach(([k, v]) => {
      clean[k] = typeof v === 'string' ? v.trim() : v
    })
    await onSave(clean)
    setMsg(editing ? 'Visitor updated.' : 'Visitor saved.')
    setMsgType('ok')
    setForm({ ...initial, date: todayISO() })
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editing ? 'Edit Visitor' : 'Register a Visitor'}</h2>

      <label htmlFor="name">Name</label>
      <input id="name" value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="Full name" required />

      <label htmlFor="phone">Phone Number</label>
      <input id="phone" type="tel" value={form.phone} onChange={(e) => set('phone', e.target.value)} placeholder="(555) 123-4567" />

      <label htmlFor="email">Email Address</label>
      <input id="email" type="email" value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="name@example.com" />

      <div className="row">
        <div className="col">
          <label htmlFor="date">Date</label>
          <input id="date" type="date" value={form.date} onChange={(e) => set('date', e.target.value)} required />
        </div>
        <div className="col">
          <label htmlFor="time">Arrival Time</label>
          <input id="time" type="time" value={form.time} onChange={(e) => set('time', e.target.value)} />
        </div>
      </div>

      <div className="row">
        <div className="col">
          <label htmlFor="duration">Time Stayed</label>
          <select id="duration" value={form.duration} onChange={(e) => set('duration', e.target.value)}>
            <option value="">Select…</option>
            <option value="under-5">Under 5 min</option>
            <option value="5-15">5–15 min</option>
            <option value="15-30">15–30 min</option>
            <option value="30-60">30–60 min</option>
            <option value="over-60">Over 1 hour</option>
          </select>
        </div>
        <div className="col">
          <label htmlFor="interest">Interest Level</label>
          <select id="interest" value={form.interest} onChange={(e) => set('interest', e.target.value)}>
            <option value="">Select…</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="col">
          <label htmlFor="lead">Lead Status</label>
          <select id="lead" value={form.lead} onChange={(e) => set('lead', e.target.value)}>
            <option value="">Select…</option>
            <option value="cold">Cold</option>
            <option value="warming">Warming up</option>
            <option value="hot">Hot</option>
          </select>
        </div>
      </div>

      <label htmlFor="whatDoYouThink">“What do you think?” — their response</label>
      <textarea id="whatDoYouThink" rows="3" value={form.whatDoYouThink} onChange={(e) => set('whatDoYouThink', e.target.value)} placeholder="What they said when I asked “what do you think?”" />

      <label htmlFor="comments">My Notes / Observations</label>
      <textarea id="comments" rows="3" value={form.comments} onChange={(e) => set('comments', e.target.value)} placeholder="Anything notable — objections, questions, follow-ups…" />

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {editing ? 'Update Visitor' : 'Save Visitor'}
        </button>
        {editing && (
          <button type="button" className="btn btn-ghost" onClick={onCancelEdit}>
            Cancel
          </button>
        )}
        <button type="button" className="btn btn-ghost" onClick={() => setForm({ ...initial, date: todayISO() })}>
          Clear
        </button>
      </div>
      <p className={'form-msg ' + msgType}>{msg}</p>
    </form>
  )
}
