import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

export default function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection('activities').then(setActivities).catch((reason) => setError(reason.message)) }, [])

  return <section><div className="section-heading"><div><p className="eyebrow">MOMENTUM</p><h1>Activity feed</h1><p>Recent work logged by your crew.</p></div><span className="count-badge">{activities.length} sessions</span></div>{error ? <div className="alert alert-warning">{error}</div> : <div className="activity-grid">{activities.map((activity) => <article className="activity-item" key={activity._id}><span className="activity-type">{activity.type}</span><h2>{activity.title}</h2><p>{activity.userId?.name || 'Team member'} · {activity.durationMinutes} min · {activity.calories} kcal</p><time>{activity.completedAt ? new Date(activity.completedAt).toLocaleDateString() : 'Recently'}</time></article>)}</div>}</section>
}
