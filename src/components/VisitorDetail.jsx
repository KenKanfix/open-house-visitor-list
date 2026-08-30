import { FIELD_DEFS } from '../lib/constants'

export default function VisitorDetail({ record, onClose, onEdit, onDelete }) {
  function handleDelete() {
    if (window.confirm('Delete this visitor record?')) onDelete(record.id)
  }

  const rows = FIELD_DEFS.filter(({ key, render }) => {
    const v = record[key]
    const shown = render ? render(v) : v
    return shown
  })

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
