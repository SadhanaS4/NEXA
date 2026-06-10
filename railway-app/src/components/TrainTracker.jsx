import { useEffect, useRef, useState } from 'react'

const STATIONS = [
  { id: 'MAS', name: 'Chennai Central', x: 8 },
  { id: 'KPD', name: 'Katpadi', x: 28 },
  { id: 'JTJ', name: 'Jolarpettai', x: 52 },
  { id: 'KJM', name: 'Krishnarajapuram', x: 74 },
  { id: 'SBC', name: 'KSR Bengaluru', x: 95 },
]

export default function TrainTracker({ currentStation = 2 }) {
  const canvasRef = useRef(null)
  const [trainPos, setTrainPos] = useState(STATIONS[currentStation].x)
  const [particles, setParticles] = useState([])
  const animRef = useRef(null)
  const posRef = useRef(STATIONS[currentStation].x)
  const particlesRef = useRef([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    let frame = 0

    function spawnParticle() {
      const x = (posRef.current / 100) * canvas.width
      particlesRef.current.push({
        x, y: canvas.height / 2,
        vx: -(Math.random() * 2 + 1),
        vy: (Math.random() - 0.5) * 1.5,
        life: 1, size: Math.random() * 3 + 1,
        color: `hsl(${160 + Math.random() * 20}, 70%, ${50 + Math.random() * 20}%)`,
      })
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const w = canvas.width, h = canvas.height
      const midY = h / 2

      // track
      ctx.beginPath()
      ctx.moveTo(30, midY)
      ctx.lineTo(w - 30, midY)
      ctx.strokeStyle = 'rgba(26,158,117,0.2)'
      ctx.lineWidth = 3
      ctx.stroke()

      // progress track
      const trainX = (posRef.current / 100) * (w - 60) + 30
      ctx.beginPath()
      ctx.moveTo(30, midY)
      ctx.lineTo(trainX, midY)
      ctx.strokeStyle = 'rgba(26,158,117,0.7)'
      ctx.lineWidth = 3
      ctx.stroke()

      // station dots
      STATIONS.forEach((s, i) => {
        const sx = (s.x / 100) * (w - 60) + 30
        const passed = i <= currentStation
        ctx.beginPath()
        ctx.arc(sx, midY, passed ? 6 : 4, 0, Math.PI * 2)
        ctx.fillStyle = passed ? '#1a9e75' : 'rgba(26,158,117,0.3)'
        ctx.fill()
        if (passed) {
          ctx.beginPath()
          ctx.arc(sx, midY, 10, 0, Math.PI * 2)
          ctx.fillStyle = 'rgba(26,158,117,0.15)'
          ctx.fill()
        }
      })

      // particles
      spawnParticle()
      particlesRef.current = particlesRef.current.filter(p => p.life > 0)
      particlesRef.current.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        p.life -= 0.04
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.life * 0.8
        ctx.fill()
        ctx.globalAlpha = 1
      })

      // train body
      const tx = trainX - 22
      const ty = midY - 10
      ctx.fillStyle = '#0d8a63'
      roundRect(ctx, tx, ty, 44, 20, 5)
      ctx.fill()

      // train window
      ctx.fillStyle = 'rgba(255,255,255,0.15)'
      roundRect(ctx, tx + 6, ty + 4, 10, 8, 2)
      ctx.fill()
      roundRect(ctx, tx + 20, ty + 4, 10, 8, 2)
      ctx.fill()

      // glow
      const grd = ctx.createRadialGradient(trainX, midY, 0, trainX, midY, 30)
      grd.addColorStop(0, 'rgba(26,158,117,0.3)')
      grd.addColorStop(1, 'transparent')
      ctx.fillStyle = grd
      ctx.fillRect(trainX - 30, midY - 30, 60, 60)

      frame++
      animRef.current = requestAnimationFrame(draw)
    }

    animRef.current = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(animRef.current)
  }, [currentStation])

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <canvas ref={canvasRef} style={{ width: '100%', height: 80, display: 'block' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, padding: '0 6px' }}>
        {STATIONS.map((s, i) => (
          <div key={s.id} style={{ textAlign: 'center', fontSize: 10, color: i <= currentStation ? 'var(--teal-200)' : 'var(--text3)', fontWeight: i === currentStation ? 700 : 400 }}>
            <div>{s.id}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.quadraticCurveTo(x + w, y, x + w, y + r)
  ctx.lineTo(x + w, y + h - r)
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
  ctx.lineTo(x + r, y + h)
  ctx.quadraticCurveTo(x, y + h, x, y + h - r)
  ctx.lineTo(x, y + r)
  ctx.quadraticCurveTo(x, y, x + r, y)
  ctx.closePath()
}
