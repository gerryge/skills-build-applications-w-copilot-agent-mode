import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

export default function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection('workouts').then(setWorkouts).catch((reason) => setError(reason.message)) }, [])

  return <section><div className="section-heading"><div><p className="eyebrow">YOUR NEXT MOVE</p><h1>Workouts</h1><p>Sessions picked for how you want to feel.</p></div><span className="count-badge">{workouts.length} plans</span></div>{error ? <div className="alert alert-warning">{error}</div> : <div className="workout-grid">{workouts.map((workout) => <article className="workout-item" key={workout._id}><div className="workout-meta"><span>{workout.focus}</span><span>{workout.difficulty}</span></div><h2>{workout.title}</h2><p>{workout.description}</p><footer>{workout.durationMinutes} min <span>{workout.exercises?.length || 0} exercises</span></footer></article>)}</div>}</section>
}
