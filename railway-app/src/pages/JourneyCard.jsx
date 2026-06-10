import { useState, useRef } from 'react'
import SpeedBlurEntry from '../components/SpeedBlurEntry.jsx'

const DEFAULT = {
  name: 'Passenger',
  pnr: '1234567890',
  from: 'Chennai Central',
  to: 'KSR Bengaluru',
  train: 'Shatabdi Express 12027',
  date: '17 June 2026',
  coach: 'B2',
  seat: '32',
  platform: '4',
}

export default function JourneyCard() {
  const [form, setForm] = useState(DEFAULT)
  const [card, setCard] = useState(null)
  const [loading, setLoading] = useState(false)
  const [dots, setDots] = useState(0)
  const dotsRef = useRef(null)

  async function generateCard() {
    setLoading(true)
    setCard(null)
    dotsRef.current = setInterval(() => setDots(d => (d + 1) % 4), 400)

    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [{
            role: 'user',
            content: `Generate a smart AI journey card summary for this train passenger. Be personalized, helpful and concise. Return ONLY a JSON object (no markdown, no backticks) with these fields:
- greeting: a warm personalized greeting using the passenger name
- tip1: a smart travel tip for this specific route
- tip2: another useful tip about the train or station  
- tip3: a crowd or timing tip
- funFact: an interesting fact about this railway route or one of the stations
- weatherNote: a brief weather note for the destination (Bengaluru is generally pleasant)
- badge: a one-word personality badge for this traveler (like "Explorer", "Commuter", "Adventurer")
- mood: an emoji that captures the journey vibe

Passenger data: Name: ${form.name}, From: ${form.from}, To: ${form.to}, Train: ${form.train}, Date: ${form.date}, Coach: ${form.coach}, Seat: ${form.seat}`
          }],
        }),
      })
      const data = await res.json()
      const text = data.content?.[0]?.text || '{}'
      const clean = text.replace(/```json|```/g, '').trim()
      setCard(JSON.parse(clean))
    } catch (e) {
      setCard({ greeting: `Happy travels, ${form.name}!`, tip1: 'Arrive 15 minutes early to find your coach.', tip2: 'Shatabdi Express has excellent onboard meals.', tip3: 'Platform 4 at KSR Bengaluru is less crowded at arrival.', funFact: 'The Chennai-Bengaluru Shatabdi is one of India\'s fastest trains on this corridor.', weatherNote: 'Bengaluru is pleasant, around 25°C. Light layers recommended.', badge: 'Traveler', mood: '🚄' })
    } finally {
      setLoading(false)
      clearInterval(dotsRef.current)
    }
  }

  return (
    <div style={{ padding: '32px', maxWidth: 700, margin: '0 auto' }}>

      <SpeedBlurEntry delay={0}>
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800 }}>
            ✦ AI Journey Card
          </h1>
          <p style={{ color: 'var(--text3)', fontSize: 14, marginTop: 4 }}>
            Fill in your journey details and get an AI-powered personalized travel card
          </p>
        </div>
      </SpeedBlurEntry>

      {/* Form */}
      <SpeedBlurEntry delay={80}>
        <div className="card" style={{ marginBottom: 24 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            {Object.entries(form).map(([key, val]) => (
              <div key={key}>
                <label style={{ fontSize: 11, color: 'var(--text3)', textTransform: 'capitalize', display: 'block', marginBottom: 5 }}>
                  {key.replace(/([A-Z])/g, ' $1')}
                </label>
                <input value={val} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                  style={{
                    width: '100%', padding: '9px 12px',
                    background: 'var(--surface2)', border: '1px solid var(--border)',
                    borderRadius: 8, color: 'var(--text)', fontFamily: 'var(--font-body)', fontSize: 13,
                    outline: 'none', transition: 'border-color 0.2s',
                  }}
                  onFocus={e => e.target.style.borderColor = 'var(--teal-500)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'}
                />
              </div>
            ))}
          </div>
          <button onClick={generateCard} disabled={loading} className="btn-primary" style={{ width: '100%', marginTop: 18, padding: '13px', fontSize: 15 }}>
            {loading ? `✦ Generating${'.'.repeat(dots)}` : '✦ Generate AI Journey Card'}
          </button>
        </div>
      </SpeedBlurEntry>

      {/* Generated card */}
      {card && (
        <SpeedBlurEntry delay={0}>
          <div style={{
            background: 'linear-gradient(135deg, var(--teal-900), var(--teal-800), var(--teal-700))',
            borderRadius: 24, padding: '32px', marginBottom: 24,
            border: '1px solid var(--teal-600)',
            position: 'relative', overflow: 'hidden',
            animation: 'fadeUp 0.5s ease',
          }}>
            {/* bg shapes */}
            <div style={{
              position: 'absolute', right: -60, top: -60, width: 240, height: 240,
              borderRadius: '50%', background: 'rgba(255,255,255,0.04)',
              animation: 'morph 8s ease-in-out infinite',
            }} />
            <div style={{
              position: 'absolute', left: -40, bottom: -40, width: 160, height: 160,
              borderRadius: '50%', background: 'rgba(255,255,255,0.03)',
            }} />

            {/* top row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
              <div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>AI JOURNEY CARD</div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, color: '#fff' }}>
                  {card.greeting}
                </h2>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 32 }}>{card.mood}</div>
                <div style={{ marginTop: 6, background: 'rgba(255,255,255,0.15)', padding: '3px 12px', borderRadius: 20, fontSize: 12, color: '#fff', fontWeight: 600 }}>
                  {card.badge}
                </div>
              </div>
            </div>

            {/* route */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, padding: '14px 16px', background: 'rgba(0,0,0,0.2)', borderRadius: 12 }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#fff', fontFamily: 'var(--font-display)' }}>{form.from.split(' ')[0]}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>{form.from}</div>
              </div>
              <div style={{ flex: 1, height: 2, background: 'rgba(255,255,255,0.2)', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: 16 }}>🚄</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#fff', fontFamily: 'var(--font-display)' }}>{form.to.split(' ')[0]}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>{form.to}</div>
              </div>
            </div>

            {/* details row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 20 }}>
              {[
                { l: 'Train',    v: form.train.split(' ').slice(-1)[0] },
                { l: 'Coach',    v: form.coach },
                { l: 'Seat',     v: form.seat },
                { l: 'Date',     v: form.date.split(' ').slice(0,2).join(' ') },
              ].map((d, i) => (
                <div key={i} style={{ textAlign: 'center', background: 'rgba(0,0,0,0.15)', borderRadius: 10, padding: '10px 8px' }}>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 3 }}>{d.l}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#fff', fontFamily: 'var(--font-display)' }}>{d.v}</div>
                </div>
              ))}
            </div>

            {/* AI tips */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[card.tip1, card.tip2, card.tip3].map((tip, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 14, marginTop: 1 }}>
                    {['💡', '🎯', '⏰'][i]}
                  </span>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', lineHeight: 1.5 }}>{tip}</div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 16, padding: '12px 14px', background: 'rgba(255,255,255,0.06)', borderRadius: 10, fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>
              🌤️ {card.weatherNote}
            </div>

            <div style={{ marginTop: 12, padding: '12px 14px', background: 'rgba(255,255,255,0.06)', borderRadius: 10, fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>
              🏛️ {card.funFact}
            </div>

            <div style={{ marginTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 14, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>Generated by RailSmart AI · PNR {form.pnr}</div>
              <button className="btn-ghost" style={{ fontSize: 12, padding: '6px 14px', color: 'rgba(255,255,255,0.7)', borderColor: 'rgba(255,255,255,0.2)' }}>
                ↓ Save Card
              </button>
            </div>
          </div>
        </SpeedBlurEntry>
      )}
    </div>
  )
}
