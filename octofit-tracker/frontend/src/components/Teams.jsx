import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

// API endpoint: https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/

export default function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection('teams').then(setTeams).catch((reason) => setError(reason.message)) }, [])

  return <section><div className="section-heading"><div><p className="eyebrow">COMMUNITY</p><h1>Teams</h1><p>Find your pace with a crew.</p></div><span className="count-badge">{teams.length} teams</span></div>{error ? <div className="alert alert-warning">{error}</div> : <div className="team-grid">{teams.map((team) => <article className="team-item" key={team._id}><div className="team-swatch" style={{ backgroundColor: team.color }}></div><h2>{team.name}</h2><p>{team.motto}</p><span>{team.memberIds?.length || 0} members</span></article>)}</div>}</section>
}
