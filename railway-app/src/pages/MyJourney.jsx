import SpeedBlurEntry from '../components/SpeedBlurEntry.jsx'

const STOPS = [
  { id: 'MAS', name: 'Chennai Central',   time: '06:00', done: true,    platform: '5', note: 'Departed' },
  { id: 'KPD', name: 'Katpadi',           time: '08:45', done: true,    platform: '2', note: 'Passed' },
  { id: 'JTJ', name: 'Jolarpettai',       time: '10:20', done: true,    platform: '3', note: 'Passed' },
  { id: 'KJM', name: 'Krishnarajapuram',  time: '14:35', done: false,   platform: '1', note: 'Next stop', current: true },
  { id: 'SBC', name: 'KSR Bengaluru',     time: '15:10', done: false,   platform: '4', note: 'Destination' },
]

export default function MyJourney() {
  return (
    <div style={{ padding: '32px', maxWidth: 680, margin: '0 auto' }}>

      <SpeedBlurEntry delay={0}>
        <div style={{
          background: 'linear-gradient(135deg, var(--teal-700), var(--teal-500))',
          borderRadius: 20, padding: '28px 32px', marginBottom: 28,
          border: '1px solid var(--teal-600)',
        }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800, color: '#fff', marginBottom: 6 }}>My Upcoming Journey</h1>
          <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14 }}>
            Chennai Central → KSR Bengaluru · 17 June 2026
          </div>
          <div style={{ fontSize: 22, fontWeight: 800, color: '#fff', fontFamily: 'var(--font-display)', marginTop: 8 }}>
            Shatabdi Express · 12027
          </div>
        </div>
      </SpeedBlurEntry>

      {/* Journey details */}
      <SpeedBlurEntry delay={80}>
        <div className="card" style={{ marginBottom: 24 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
            {[
              { label: 'PNR No.', value: '1234567890' },
              { label: 'Coach',   value: 'B2' },
              { label: 'Seat',    value: '32' },
              { label: 'Platform',value: '4' },
            ].map((d, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 4 }}>{d.label}</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--teal-200)', fontFamily: 'var(--font-display)' }}>{d.value}</div>
              </div>
            ))}
          </div>
        </div>
      </SpeedBlurEntry>

      {/* Stop timeline */}
      <SpeedBlurEntry delay={160}>
        <div className="card">
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, marginBottom: 20 }}>Route Timeline</h2>
          <div style={{ position: 'relative', paddingLeft: 28 }}>
            {/* vertical line */}
            <div style={{
              position: 'absolute', left: 8, top: 8, bottom: 8,
              width: 2, background: 'var(--border)',
              borderRadius: 2,
            }} />
            {/* progress line */}
            <div style={{
              position: 'absolute', left: 8, top: 8,
              width: 2, height: '52%',
              background: 'linear-gradient(180deg, var(--teal-400), var(--teal-600))',
              borderRadius: 2,
            }} />

            {STOPS.map((stop, i) => (
              <div key={stop.id} style={{
                display: 'flex', alignItems: 'flex-start', gap: 16,
                marginBottom: i < STOPS.length - 1 ? 24 : 0,
                position: 'relative',
                animation: `fadeUp 0.4s ease ${i * 80}ms both`,
              }}>
                {/* dot */}
                <div style={{
                  position: 'absolute', left: -22,
                  width: stop.current ? 16 : 12,
                  height: stop.current ? 16 : 12,
                  borderRadius: '50%',
                  background: stop.done ? 'var(--teal-400)' : stop.current ? 'var(--teal-200)' : 'var(--surface2)',
                  border: stop.current ? '3px solid var(--teal-400)' : '2px solid var(--border)',
                  top: stop.current ? -2 : 0,
                  boxShadow: stop.current ? '0 0 0 4px rgba(26,158,117,0.2)' : 'none',
                }} />

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <span style={{
                        fontSize: 14, fontWeight: stop.current ? 700 : 500,
                        color: stop.done ? 'var(--text2)' : stop.current ? 'var(--teal-200)' : 'var(--text)',
                      }}>{stop.name}</span>
                      {stop.current && (
                        <span style={{ marginLeft: 8, fontSize: 11, background: 'rgba(26,158,117,0.15)', color: 'var(--teal-200)', padding: '2px 8px', borderRadius: 10, fontWeight: 600 }}>
                          ● Next Stop
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: stop.done ? 'var(--text3)' : 'var(--text)', fontFamily: 'var(--font-display)' }}>
                      {stop.time}
                    </div>
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 3 }}>
                    Platform {stop.platform} · {stop.note}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SpeedBlurEntry>

      {/* Journey assistant summary */}
      <SpeedBlurEntry delay={320}>
        <div className="card" style={{ marginTop: 24, background: 'rgba(26,158,117,0.06)', border: '1px solid rgba(26,158,117,0.2)' }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--teal-200)', marginBottom: 12 }}>Journey Assistant</h3>
          <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.8 }}>
            <div>🟢 <strong>Boarding:</strong> Chennai Central — Platform 5</div>
            <div>🔵 <strong>Current:</strong> Approaching Krishnarajapuram</div>
            <div>⏭️ <strong>Next Stop:</strong> Krishnarajapuram — 14:35</div>
            <div>🏁 <strong>Destination:</strong> KSR Bengaluru — Platform 4</div>
          </div>
        </div>
      </SpeedBlurEntry>
    </div>
  )
}
