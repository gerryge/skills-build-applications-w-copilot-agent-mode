import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

// API endpoint: https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/

export default function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection('users').then(setUsers).catch((reason) => setError(reason.message))
  }, [])

  return <CollectionTable title="Athletes" subtitle="The people moving the team forward." columns={['Name', 'Email', 'Points']} rows={users.map((user) => [user.name, user.email, user.points])} error={error} />
}

function CollectionTable({ title, subtitle, columns, rows, error }) {
  return <section><div className="section-heading"><div><p className="eyebrow">PEOPLE</p><h1>{title}</h1><p>{subtitle}</p></div><span className="count-badge">{rows.length} total</span></div>{error ? <div className="alert alert-warning">{error}</div> : <div className="table-responsive tracker-table"><table className="table align-middle"><thead><tr>{columns.map((column) => <th key={column}>{column}</th>)}</tr></thead><tbody>{rows.map((row, index) => <tr key={index}>{row.map((cell, cellIndex) => <td key={cellIndex}>{cell ?? '-'}</td>)}</tr>)}</tbody></table></div>}</section>
}
