import { useEffect, useRef } from 'react'

const ZONES = [
  { name: 'Platform 1', level: 0.85, color: '#ef4444' },
  { name: 'Platform 2', level: 0.45, color: '#f59e0b' },
  { name: 'Platform 3', level: 0.30, color: '#1a9e75' },
  { name: 'Platform 4', level: 0.60, color: '#f59e0b' },
  { name: 'Concourse',  level: 0.72, color: '#ef4444' },
  { name: 'Exit Gate',  level: 0.20, color: '#1a9e75' },
]

export default function CrowdWave() {
  const canvasRef = useRef(null)
  const animRef = useRef(null)
  const timeRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    function resize() {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    function draw() {
      const w = canvas.width, h = canvas.height
      ctx.clearRect(0, 0, w, h)
      timeRef.current += 0.02

      const barW = w / ZONES.length
      ZONES.forEach((zone, i) => {
        const wave = 0.08 * Math.sin(timeRef.current * 1.5 + i * 0.8)
        const level = Math.min(0.95, Math.max(0.05, zone.level + wave))
        const barH = level * h * 0.85
        const x = i * barW + barW * 0.15
        const bw = barW * 0.7
        const y = h - barH

        // glow
        const grd = ctx.createLinearGradient(x, y, x, h)
        grd.addColorStop(0, zone.color + '00')
        grd.addColorStop(1, zone.color + '20')
        ctx.fillStyle = grd
        ctx.fillRect(x - 8, y, bw + 16, barH)

        // bar
        const barGrd = ctx.createLinearGradient(x, y, x, h)
        barGrd.addColorStop(0, zone.color)
        barGrd.addColorStop(1, zone.color + '80')
        ctx.fillStyle = barGrd
        ctx.beginPath()
        ctx.roundRect(x, y, bw, barH, [4, 4, 0, 0])
        ctx.fill()

        // top shine
        ctx.fillStyle = 'rgba(255,255,255,0.15)'
        ctx.beginPath()
        ctx.roundRect(x, y, bw, 8, [4, 4, 0, 0])
        ctx.fill()

        // percentage
        ctx.fillStyle = '#e8f5f0'
        ctx.font = `bold 11px Space Grotesk, sans-serif`
        ctx.textAlign = 'center'
        ctx.fillText(Math.round(level * 100) + '%', x + bw / 2, y - 6)
      })

      animRef.current = requestAnimationFrame(draw)
    }

    animRef.current = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div>
      <canvas ref={canvasRef} style={{ width: '100%', height: 120, display: 'block' }} />
      <div style={{ display: 'flex', gap: 0, marginTop: 8 }}>
        {ZONES.map(z => (
          <div key={z.name} style={{ flex: 1, textAlign: 'center', fontSize: 10, color: 'var(--text3)' }}>
            {z.name}
          </div>
        ))}
      </div>
    </div>
  )
}
