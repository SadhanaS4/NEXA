import { useState, useEffect } from 'react'
import CrowdWave from '../components/CrowdWave.jsx'
import SpeedBlurEntry from '../components/SpeedBlurEntry.jsx'

const ZONES = [
  { id: 'P1', name: 'Platform 1', level: 85, trend: 'up',   train: '12027 Shatabdi',     status: 'critical' },
  { id: 'P2', name: 'Platform 2', level: 45, trend: 'down', train: '16526 KCG Express',   status: 'moderate' },
  { id: 'P3', name: 'Platform 3', level: 30, trend: 'down', train: 'Empty',               status: 'low' },
  { id: 'P4', name: 'Platform 4', level: 60, trend: 'up',   train: '12657 Bangalore Mail', status: 'moderate' },
  { id: 'CC', name: 'Concourse',  level: 72, trend: 'up',   train: 'General',             status: 'high' },
  { id: 'EG', name: 'Exit Gate',  level: 20, trend: 'down', train: 'General',             status: 'low' },
]

const ALERTS = [
  { id: 1, type: 'critical', msg: 'Platform 1 reaching capacity — divert passengers via Gate 3', time: '2m ago' },
  { id: 2, type: 'warning',  msg: 'Concourse crowd rising — deploy extra staff to Gate 2', time: '8m ago' },
  { id: 3, type: 'info',     msg: 'Train 12027 arriving Platform 1 in 12 minutes', time: '10m ago' },
]

function statusColor(s) {
  return { critical: 'var(--red)', high: 'var(--amber)', moderate: '#f59e0b', low: 'var(--teal-400)' }[s] || 'var(--text3)'
}
function levelBg(level) {
  if (level >= 75) return 'rgba(239,68,68,0.12)'
  if (level >= 55) return 'rgba(245,158,11,0.12)'
  return 'rgba(26,158,117,0.08)'
}

export default function StaffDashboard() {
  const [levels, setLevels] = useState(ZONES.map(z => z.level))
  const [time, setTime] = useState(new Date())
  const [alertSent, setAlertSent] = useState(false)

  useEffect(() => {
    const tick = setInterval(() => {
      setTime(new Date())
      setLevels(l => l.map(v => Math.min(95, Math.max(5, v + (Math.random() - 0.5) * 3))))
    }, 2000)
    return () => clearInterval(tick)
  }, [])

  return (
    <div style={{ padding: '32px', maxWidth: 1000 }}>

      {/* Header */}
      <SpeedBlurEntry delay={0}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800 }}>Staff Dashboard</h1>
            <div style={{ color: 'var(--text3)', fontSize: 14, marginTop: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="live-dot" />
              Live · KSR Bengaluru · {time.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </div>
          </div>
          <button onClick={() => setAlertSent(true)} className="btn-primary" style={{ background: alertSent ? 'var(--teal-600)' : 'var(--red)', transition: 'background 0.3s' }}>
            {alertSent ? '✓ Alert Sent' : '⚠ Broadcast Alert'}
          </button>
        </div>
      </SpeedBlurEntry>

      {/* KPI row */}
      <SpeedBlurEntry delay={80}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 24 }}>
          {[
            { label: 'Total Passengers', value: '2,847', change: '+12%', up: true },
            { label: 'Avg Crowd Level',  value: `${Math.round(levels.reduce((a,b)=>a+b,0)/levels.length)}%`, change: 'Live', up: null },
            { label: 'Active Trains',    value: '7',     change: '2 delayed', up: false },
            { label: 'Staff On Duty',    value: '34',    change: 'All zones', up: true },
          ].map((k, i) => (
            <div key={i} className="card" style={{ padding: '16px 18px' }}>
              <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 6 }}>{k.label}</div>
              <div style={{ fontSize: 24, fontWeight: 800, fontFamily: 'var(--font-display)', color: 'var(--text)' }}>{k.value}</div>
              <div style={{ fontSize: 12, marginTop: 4, color: k.up === true ? 'var(--teal-400)' : k.up === false ? 'var(--red)' : 'var(--text3)' }}>
                {k.change}
              </div>
            </div>
          ))}
        </div>
      </SpeedBlurEntry>

      {/* Crowd wave chart */}
      <SpeedBlurEntry delay={160}>
        <div className="card" style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700 }}>Live Crowd Monitor</h2>
            <div style={{ fontSize: 12, color: 'var(--text3)', display: 'flex', gap: 14 }}>
              <span style={{ color: 'var(--teal-400)' }}>● Low</span>
              <span style={{ color: 'var(--amber)' }}>● Medium</span>
              <span style={{ color: 'var(--red)' }}>● High</span>
            </div>
          </div>
          <CrowdWave />
        </div>
      </SpeedBlurEntry>

      {/* Zone grid */}
      <SpeedBlurEntry delay={240}>
        <div style={{ marginBottom: 24 }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, marginBottom: 14 }}>Zone Status</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
            {ZONES.map((z, i) => (
              <div key={z.id} className="card" style={{ background: levelBg(levels[i]), border: `1px solid ${statusColor(z.status)}30` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{z.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 2 }}>{z.train}</div>
                  </div>
                  <span className="badge" style={{
                    background: `${statusColor(z.status)}20`,
                    color: statusColor(z.status),
                    fontSize: 11,
                  }}>
                    {z.status}
                  </span>
                </div>
                {/* bar */}
                <div style={{ height: 6, background: 'var(--surface2)', borderRadius: 3, overflow: 'hidden', marginBottom: 8 }}>
                  <div style={{
                    height: '100%', borderRadius: 3,
                    width: `${levels[i]}%`,
                    background: statusColor(z.status),
                    transition: 'width 1s ease',
                  }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                  <span style={{ color: statusColor(z.status), fontWeight: 700 }}>{Math.round(levels[i])}% capacity</span>
                  <span style={{ color: 'var(--text3)' }}>{z.trend === 'up' ? '↑ rising' : '↓ falling'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SpeedBlurEntry>

      {/* Alerts */}
      <SpeedBlurEntry delay={320}>
        <div className="card">
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, marginBottom: 14 }}>Recent Alerts</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {ALERTS.map(a => (
              <div key={a.id} style={{
                display: 'flex', gap: 12, alignItems: 'flex-start',
                padding: '12px 14px', borderRadius: 10,
                background: a.type === 'critical' ? 'rgba(239,68,68,0.08)' : a.type === 'warning' ? 'rgba(245,158,11,0.08)' : 'rgba(59,130,246,0.08)',
                border: `1px solid ${a.type === 'critical' ? 'rgba(239,68,68,0.2)' : a.type === 'warning' ? 'rgba(245,158,11,0.2)' : 'rgba(59,130,246,0.2)'}`,
              }}>
                <span style={{ fontSize: 16 }}>{a.type === 'critical' ? '🔴' : a.type === 'warning' ? '🟡' : '🔵'}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.5 }}>{a.msg}</div>
                  <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 3 }}>{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SpeedBlurEntry>
    </div>
  )
}
