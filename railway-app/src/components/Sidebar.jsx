cat > /home/claude/railway-app/src/components/Sidebar.jsx << 'EOF'
const NAV = [
  { id: 'dashboard',     icon: '⊞', label: 'Dashboard' },
  { id: 'journey',       icon: '🛤', label: 'My Journey' },
  { id: 'card',          icon: '✦', label: 'Journey Card' },
  { id: 'notifications', icon: '◎', label: 'Notifications', badge: 2 },
]

export default function Sidebar({ page, setPage, onStaffLogin, isStaff, onLogout }) {
  return (
    <aside style={{
      position: 'fixed', left: 0, top: 0, bottom: 0, width: 240,
      background: 'rgba(10,15,30,0.95)',
      backdropFilter: 'blur(20px)',
      borderRight: '1px solid rgba(255,255,255,0.06)',
      display: 'flex', flexDirection: 'column',
      padding: '0', zIndex: 100,
    }}>
      {/* Logo */}
      <div style={{ padding: '24px 20px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'linear-gradient(135deg, #0f766e, #14b8a6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 17, boxShadow: '0 4px 16px rgba(20,184,166,0.3)',
          }}>🚄</div>
          <div>
            <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 16, color: '#f8fafc', letterSpacing: '-0.02em' }}>RailSmart</div>
            <div style={{ fontSize: 10, color: 'rgba(148,163,184,0.6)', marginTop: -1, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Smart Railway System</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {isStaff ? (
          <div style={{ padding: '10px 12px' }}>
            <div style={{ fontSize: 11, color: 'rgba(20,184,166,0.8)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Staff Portal</div>
          </div>
        ) : NAV.map(item => {
          const active = page === item.id
          return (
            <button key={item.id} onClick={() => setPage(item.id)} style={{
              width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '10px 12px', borderRadius: 10,
              border: 'none', cursor: 'pointer', textAlign: 'left',
              fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: active ? 600 : 400,
              background: active ? 'rgba(20,184,166,0.1)' : 'transparent',
              color: active ? '#2dd4bf' : '#94a3b8',
              transition: 'all .15s',
            }}
            onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; if (!active) e.currentTarget.style.color = '#f8fafc' }}
            onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; if (!active) e.currentTarget.style.color = '#94a3b8' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 15, opacity: active ? 1 : 0.6 }}>{item.icon}</span>
                {item.label}
              </div>
              {item.badge && (
                <span style={{ background: '#14b8a6', color: '#fff', fontSize: 10, fontWeight: 700, width: 18, height: 18, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {item.badge}
                </span>
              )}
            </button>
          )
        })}

        {/* Divider */}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '12px 0' }} />

        {isStaff ? (
          <button onClick={onLogout} className="btn btn-danger" style={{ width: '100%', justifyContent: 'center', marginTop: 'auto' }}>
            ← Exit Staff Mode
          </button>
        ) : (
          <button onClick={onStaffLogin} style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: 10,
            padding: '10px 12px', borderRadius: 10,
            border: 'none', cursor: 'pointer',
            background: 'transparent',
            color: '#475569',
            fontFamily: 'Inter, sans-serif', fontSize: 13,
            transition: 'all .15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = '#94a3b8' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#475569' }}
          >
            <span style={{ fontSize: 15 }}>🔐</span>
            Staff Login
          </button>
        )}
      </nav>

      {/* User */}
      <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: '50%',
            background: 'linear-gradient(135deg, #0f766e, #2dd4bf)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 12, fontWeight: 700, color: '#fff', flexShrink: 0,
          }}>PS</div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#f1f5f9' }}>Passenger</div>
            <div style={{ fontSize: 11, color: '#475569', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>PNR: 1234567890</div>
          </div>
        </div>
      </div>
    </aside>
  )
}
EOF
echo "✓ Sidebar"
Output

✓ Sidebar

Write premium Dashboard
bash

cat > /home/claude/railway-app/src/pages/Dashboard.jsx << 'JSEOF'
import { useState, useEffect, useRef } from 'react'
import SpeedBlurEntry from '../components/SpeedBlurEntry.jsx'

const STATIONS = [
  { code: 'MAS', name: 'Chennai Central', x: 0 },
  { code: 'KPD', name: 'Katpadi', x: 25 },
  { code: 'JTJ', name: 'Jolarpettai', x: 50 },
  { code: 'KJM', name: 'Krishnarajapuram', x: 75 },
  { code: 'SBC', name: 'KSR Bengaluru', x: 100 },
]
const CURRENT = 2

function LiveTrack() {
  const canvasRef = useRef(null)
  const rafRef = useRef(null)
  const tRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const resize = () => { canvas.width = canvas.offsetWidth * devicePixelRatio; canvas.height = canvas.offsetHeight * devicePixelRatio }
    resize()
    window.addEventListener('resize', resize)
    const ctx = canvas.getContext('2d')
    const particles = []

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const W = canvas.width, H = canvas.height
      const dpr = devicePixelRatio
      const midY = H / 2
      const pad = 30 * dpr

      // track base
      ctx.strokeStyle = 'rgba(255,255,255,0.06)'
      ctx.lineWidth = 2 * dpr
      ctx.lineCap = 'round'
      ctx.beginPath(); ctx.moveTo(pad, midY); ctx.lineTo(W - pad, midY); ctx.stroke()

      // progress
      const prog = (CURRENT + 0.5) / (STATIONS.length - 1)
      const progX = pad + prog * (W - pad * 2)
      const grad = ctx.createLinearGradient(pad, 0, progX, 0)
      grad.addColorStop(0, 'rgba(20,184,166,0.3)')
      grad.addColorStop(1, 'rgba(20,184,166,0.8)')
      ctx.strokeStyle = grad
      ctx.lineWidth = 2.5 * dpr
      ctx.beginPath(); ctx.moveTo(pad, midY); ctx.lineTo(progX, midY); ctx.stroke()

      // station dots
      STATIONS.forEach((s, i) => {
        const sx = pad + (s.x / 100) * (W - pad * 2)
        const done = i <= CURRENT
        if (done) {
          ctx.beginPath(); ctx.arc(sx, midY, 10 * dpr, 0, Math.PI * 2)
          ctx.fillStyle = i === CURRENT ? 'rgba(20,184,166,0.15)' : 'rgba(20,184,166,0.08)'
          ctx.fill()
        }
        ctx.beginPath(); ctx.arc(sx, midY, (i === CURRENT ? 6 : 4) * dpr, 0, Math.PI * 2)
        ctx.fillStyle = done ? '#14b8a6' : 'rgba(255,255,255,0.15)'
        ctx.fill()
        if (i === CURRENT) {
          ctx.beginPath(); ctx.arc(sx, midY, 9 * dpr, 0, Math.PI * 2)
          ctx.strokeStyle = 'rgba(20,184,166,0.4)'; ctx.lineWidth = 1.5 * dpr; ctx.stroke()
        }
      })

      // train dot moving between KJM and next
      const trainPct = CURRENT / (STATIONS.length - 1) + 0.12 * Math.sin(tRef.current * 0.3) * 0 + 0.07
      const trainX = pad + Math.min(trainPct, 0.85) * (W - pad * 2)

      // trail particles
      if (Math.random() < 0.4) {
        particles.push({ x: trainX, y: midY + (Math.random() - .5) * 4 * dpr, life: 1, vx: -(Math.random() * 2 + 1) * dpr, vy: (Math.random() - .5) * dpr, r: (Math.random() * 2 + 1) * dpr })
      }
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.x += p.vx; p.y += p.vy; p.life -= 0.05
        if (p.life <= 0) { particles.splice(i, 1); continue }
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r * p.life, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(45,212,191,${p.life * 0.6})`; ctx.fill()
      }

      // train body
      const tw = 32 * dpr, th = 14 * dpr
      ctx.fillStyle = '#0f766e'
      ctx.beginPath()
      ctx.roundRect(trainX - tw / 2, midY - th / 2, tw, th, 4 * dpr)
      ctx.fill()
      ctx.fillStyle = 'rgba(45,212,191,0.3)'
      ctx.beginPath()
      ctx.roundRect(trainX - tw / 2 + 4 * dpr, midY - th / 2 + 3 * dpr, 8 * dpr, 5 * dpr, 2 * dpr)
      ctx.fill()
      ctx.beginPath()
      ctx.roundRect(trainX - tw / 2 + 14 * dpr, midY - th / 2 + 3 * dpr, 8 * dpr, 5 * dpr, 2 * dpr)
      ctx.fill()
      // glow
      const glow = ctx.createRadialGradient(trainX, midY, 0, trainX, midY, 24 * dpr)
      glow.addColorStop(0, 'rgba(20,184,166,0.25)'); glow.addColorStop(1, 'transparent')
      ctx.fillStyle = glow; ctx.fillRect(trainX - 30 * dpr, midY - 30 * dpr, 60 * dpr, 60 * dpr)

      tRef.current += 1
      rafRef.current = requestAnimationFrame(draw)
    }
    rafRef.current = requestAnimationFrame(draw)
    return () => { cancelAnimationFrame(rafRef.current); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <div>
      <canvas ref={canvasRef} style={{ width: '100%', height: 70, display: 'block' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 2px', marginTop: 6 }}>
        {STATIONS.map((s, i) => (
          <div key={s.code} style={{ textAlign: 'center', fontSize: 10, color: i <= CURRENT ? '#2dd4bf' : '#334155', fontWeight: i === CURRENT ? 700 : 400, minWidth: 0 }}>
            {s.code}
          </div>
        ))}
      </div>
    </div>
  )
}

const QUICK = [
  { icon: '🗺️', title: 'Station Nav', sub: 'Find your platform fast' },
  { icon: '🚶', title: 'Platform Guide', sub: 'Get walking directions' },
  { icon: '🔔', title: 'Live Updates', sub: 'Train alerts & delays' },
  { icon: '👥', title: 'Crowd Info', sub: 'Check crowd levels' },
]

export default function Dashboard({ setPage }) {
  const [time, setTime] = useState(new Date())
  useEffect(() => { const t = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(t) }, [])

  return (
    <div style={{ padding: '32px 36px', maxWidth: 880, position: 'relative', zIndex: 1 }}>

      {/* Hero */}
      <SpeedBlurEntry delay={0}>
        <div style={{
          background: 'linear-gradient(135deg, #0a2e2a 0%, #0d4a42 40%, #0f5e54 100%)',
          borderRadius: 20, padding: '28px 32px', marginBottom: 24,
          border: '1px solid rgba(20,184,166,0.2)',
          position: 'relative', overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)',
        }}>
          {/* bg blobs */}
          <div style={{ position:'absolute', right:-80, top:-80, width:260, height:260, borderRadius:'50%', background:'rgba(20,184,166,0.08)', animation:'morph 12s ease-in-out infinite', pointerEvents:'none' }} />
          <div style={{ position:'absolute', left:'40%', bottom:-40, width:140, height:140, borderRadius:'50%', background:'rgba(45,212,191,0.05)', pointerEvents:'none' }} />

          <div style={{ position:'relative', display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
            <div>
              <div style={{ fontSize:12, color:'rgba(255,255,255,0.45)', marginBottom:8, letterSpacing:'0.05em' }}>
                {time.toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'})} · {time.toLocaleDateString('en-IN',{weekday:'short',day:'numeric',month:'short'})}
              </div>
              <h1 style={{ fontFamily:'Outfit,sans-serif', fontSize:28, fontWeight:800, color:'#fff', marginBottom:10, letterSpacing:'-0.03em', lineHeight:1.2 }}>
                Hello, Passenger 👋
              </h1>
              <div style={{ color:'rgba(255,255,255,0.7)', fontSize:14, marginBottom:12 }}>Chennai Central → KSR Bengaluru</div>
              <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                <span style={{ background:'rgba(255,255,255,0.1)', backdropFilter:'blur(8px)', padding:'4px 12px', borderRadius:20, fontSize:12, color:'rgba(255,255,255,0.8)', border:'1px solid rgba(255,255,255,0.1)' }}>
                  12027 · Shatabdi Express
                </span>
                <span style={{ background:'rgba(20,184,166,0.2)', padding:'4px 12px', borderRadius:20, fontSize:12, color:'#5eead4', border:'1px solid rgba(20,184,166,0.3)', display:'flex', alignItems:'center', gap:5 }}>
                  <span style={{ width:6, height:6, background:'#2dd4bf', borderRadius:'50%', display:'inline-block' }} />
                  On Time
                </span>
              </div>
            </div>
            <div style={{ fontSize:56, animation:'float 4s ease-in-out infinite', marginLeft:16, marginTop:-4, flexShrink:0 }}>🚄</div>
          </div>
        </div>
      </SpeedBlurEntry>

      {/* Stats */}
      <SpeedBlurEntry delay={60}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:14, marginBottom:24 }}>
          {[
            { label:'Platform', val:'4',     sub:'Track B',  icon:'📍' },
            { label:'Coach',    val:'B2',    sub:'Seat 32',  icon:'🚃' },
            { label:'Crowd',    val:'~60%',  sub:'Medium',   icon:'👥' },
            { label:'Status',   val:'On Time',sub:'+0 min',  icon:'✅', teal:true },
          ].map((s,i) => (
            <div key={i} className="card card-glow shine" style={{ textAlign:'center', padding:'18px 12px', cursor:'default' }}>
              <div style={{ fontSize:20, marginBottom:8 }}>{s.icon}</div>
              <div style={{ fontFamily:'Outfit,sans-serif', fontSize:17, fontWeight:700, color: s.teal ? '#2dd4bf' : '#f1f5f9', letterSpacing:'-0.02em' }}>{s.val}</div>
              <div style={{ fontSize:11, color:'#475569', marginTop:3 }}>{s.label}</div>
              <div style={{ fontSize:11, color:'#334155', marginTop:1 }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </SpeedBlurEntry>

      {/* Tracker */}
      <SpeedBlurEntry delay={120}>
        <div className="card" style={{ marginBottom:24 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:18 }}>
            <div>
              <div style={{ fontFamily:'Outfit,sans-serif', fontWeight:700, fontSize:15 }}>Live Journey Tracker</div>
              <div style={{ fontSize:12, color:'#475569', marginTop:3 }}>Approaching Krishnarajapuram · ETA 14:35</div>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:11, fontWeight:600, color:'#2dd4bf', letterSpacing:'0.08em' }}>
              <span className="dot-live" /> LIVE
            </div>
          </div>
          <LiveTrack />
          <div style={{ display:'flex', justifyContent:'space-between', marginTop:16, paddingTop:14, borderTop:'1px solid rgba(255,255,255,0.06)' }}>
            {[{l:'Departed',v:'Chennai · 06:00'},{l:'Next Stop',v:'Krishnarajapuram · 14:35'},{l:'Arrives',v:'KSR Bengaluru · 15:10'}].map((d,i)=>(
              <div key={i} style={{ textAlign: i===1?'center':i===2?'right':'left' }}>
                <div style={{ fontSize:11, color:'#475569', marginBottom:2 }}>{d.l}</div>
                <div style={{ fontSize:13, fontWeight:600, color: i===1?'#2dd4bf':'#94a3b8' }}>{d.v}</div>
              </div>
            ))}
          </div>
        </div>
      </SpeedBlurEntry>

      {/* Quick actions */}
      <SpeedBlurEntry delay={180}>
        <div className="section-label">Journey Assistant</div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:24 }}>
          {QUICK.map((q,i) => (
            <button key={i} className="card card-glow shine" style={{
              display:'flex', alignItems:'center', gap:14,
              cursor:'pointer', textAlign:'left', border:'1px solid rgba(255,255,255,0.07)',
              background:'rgba(255,255,255,0.03)',
            }}>
              <div style={{ width:38, height:38, borderRadius:10, background:'rgba(20,184,166,0.1)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, flexShrink:0 }}>
                {q.icon}
              </div>
              <div>
                <div style={{ fontSize:13, fontWeight:600, color:'#f1f5f9' }}>{q.title}</div>
                <div style={{ fontSize:11, color:'#475569', marginTop:2 }}>{q.sub}</div>
              </div>
            </button>
          ))}
        </div>
      </SpeedBlurEntry>

      {/* CTA */}
      <SpeedBlurEntry delay={240}>
        <button onClick={() => setPage('card')} style={{
          width:'100%', padding:'15px', borderRadius:14,
          background:'rgba(20,184,166,0.06)', border:'1px dashed rgba(20,184,166,0.3)',
          cursor:'pointer', color:'#2dd4bf', fontFamily:'Inter,sans-serif',
          fontSize:13, fontWeight:600, transition:'all .2s', letterSpacing:'0.01em',
        }}
        onMouseEnter={e=>e.currentTarget.style.background='rgba(20,184,166,0.1)'}
        onMouseLeave={e=>e.currentTarget.style.background='rgba(20,184,166,0.06)'}
        >
          ✦ Generate your AI Journey Card →
        </button>
      </SpeedBlurEntry>
    </div>
  )
}
JSEOF
echo "✓ Dashboard"
