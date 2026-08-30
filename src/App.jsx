import { useEffect, useState } from 'react'
import { getAllVisitors, saveVisitor, deleteVisitor } from './lib/db'
import { exportCSV } from './lib/export'
import VisitorForm from './components/VisitorForm'
import VisitorList from './components/VisitorList'
import VisitorDetail from './components/VisitorDetail'

export default function App() {
  const [records, setRecords] = useState([])
  const [view, setView] = useState('form')
  const [editing, setEditing] = useState(null)
  const [selected, setSelected] = useState(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    getAllVisitors()
      .then((r) => {
        setRecords(r)
        setLoaded(true)
      })
      .catch(() => setLoaded(true))
  }, [])

  async function handleSave(data) {
    if (editing) data.id = editing.id
    await saveVisitor(data)
    setRecords(await getAllVisitors())
    setEditing(null)
  }

  async function handleDelete(id) {
    await deleteVisitor(id)
    setRecords(await getAllVisitors())
  }

  async function handleAddFollowUp(id, entry) {
    const record = records.find((r) => r.id === id)
    if (!record) return
    const updated = { ...record, followUps: [...(record.followUps || []), entry] }
    await saveVisitor(updated)
    const all = await getAllVisitors()
    setRecords(all)
    setSelected(all.find((r) => r.id === id) || null)
  }

  async function requestEdit(record) {
    setSelected(null)
    setEditing(record)
    setView('form')
  }

  return (
    <>
      <header className="app-header">
        <h1>Open House Visitors</h1>
        <button
          className="btn btn-ghost export-btn"
          onClick={() => exportCSV(records)}
          disabled={records.length === 0}
          title="Export all records"
        >
          Export Data
        </button>
      </header>

      <main className="app-main">
        {!loaded ? (
          <p className="loading">Loading…</p>
        ) : view === 'form' ? (
          <VisitorForm onSave={handleSave} editing={editing} onCancelEdit={() => setEditing(null)} />
        ) : (
          <VisitorList
            records={records}
            onSelect={(r) => setSelected(r)}
            onDelete={handleDelete}
            onEdit={requestEdit}
          />
        )}
      </main>

      <nav className="tab-bar">
        <button className={'tab-btn' + (view === 'form' ? ' active' : '')} onClick={() => setView('form')}>
          + Add
        </button>
        <button className={'tab-btn' + (view === 'list' ? ' active' : '')} onClick={() => setView('list')}>
          List
        </button>
      </nav>

      {selected && (
        <VisitorDetail
          record={selected}
          onClose={() => setSelected(null)}
          onEdit={requestEdit}
          onDelete={(id) => {
            handleDelete(id)
            setSelected(null)
          }}
          onAddFollowUp={handleAddFollowUp}
        />
      )}
    </>
  )
}
