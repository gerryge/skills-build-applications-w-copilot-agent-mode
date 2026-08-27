import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

// API endpoint: https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/

export default function Leaderboard() {
  const [leaders, setLeaders] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection('leaderboard').then(setLeaders).catch((reason) => setError(reason.message)) }, [])

  return <section><div className="section-heading"><div><p className="eyebrow">THE RACE</p><h1>Leaderboard</h1><p>Celebrate this week's consistency.</p></div><span className="count-badge">{leaders.length} ranked</span></div>{error ? <div className="alert alert-warning">{error}</div> : <div className="leaderboard-list">{leaders.map((leader) => <div className="leader-row" key={leader._id}><strong>#{leader.rank}</strong><div><h2>{leader.userId?.name || 'Athlete'}</h2><p>{leader.teamId?.name || 'Independent'}</p></div><span>{leader.points} pts</span></div>)}</div>}</section>
}
