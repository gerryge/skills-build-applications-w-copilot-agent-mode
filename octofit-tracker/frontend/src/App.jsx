import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const navigation = [
  { label: 'Overview', path: '/activities' },
  { label: 'Leaderboard', path: '/leaderboard' },
  { label: 'Teams', path: '/teams' },
  { label: 'Athletes', path: '/users' },
  { label: 'Workouts', path: '/workouts' },
]

export default function App() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <img src="/octofitapp-small.png" alt="OctoFit" />
          <span>OCTOFIT<br /><b>TRACKER</b></span>
        </div>
        <p className="sidebar-label">Workspace</p>
        <nav>
          {navigation.map((item) => (
            <NavLink className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} to={item.path} key={item.path}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-foot"><span className="status-dot"></span> API connected</div>
      </aside>
      <main className="main-content">
        <header className="topbar"><span>Thursday, 27 August 2026</span><span className="live-label">LIVE BOARD</span></header>
        <Routes>
          <Route path="/" element={<Navigate to="/activities" replace />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  )
}
