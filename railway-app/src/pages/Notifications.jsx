import SpeedBlurEntry from '../components/SpeedBlurEntry.jsx'

const NOTIFS = [
  { id: 1, type: 'success', icon: '✅', title: 'Train On Time',         body: 'Shatabdi Express 12027 is running on schedule. Expected arrival at KSR Bengaluru: 15:10.',           time: 'Just now',  unread: true },
  { id: 2, type: 'warning', icon: '⚠️', title: 'Platform Changed',      body: 'Your departure platform at Chennai has changed from 3 to 5. Please proceed to Platform 5.',         time: '5m ago',    unread: true },
  { id: 3, type: 'info',    icon: '👥', title: 'Crowd Alert: Platform 1', body: 'Platform 1 at KSR Bengaluru is moderately crowded. Consider using the Northern exit for faster egress.', time: '18m ago', unread: false },
  { id: 4, type: 'info',    icon: '🍽️', title: 'Meal Service Starting',  body: 'Onboard meal service has started in your coach B2. Vegetarian and non-veg options available.',    time: '32m ago',   unread: false },
  { id: 5, type: 'success', icon: '📍', title: 'Passing Jolarpettai',    body: 'Your train has passed Jolarpettai station. Next stop: Krishnarajapuram at 14:35.',                  time: '1h ago',    unread: false },
]

const typeColor = { success: 'var(--teal-400)', warning: 'var(--amber)', info: 'var(--blue)' }
const typeBg    = { success: 'rgba(26,158,117,0.08)', warning: 'rgba(245,158,11,0.08)', info: 'rgba(59,130,246,0.08)' }

export default function Notifications() {
  return (
    <div style={{ padding: '32px', maxWidth: 680, margin: '0 auto' }}>
      <SpeedBlurEntry delay={0}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800 }}>Notifications</h1>
            <div style={{ fontSize: 14, color: 'var(--text3)', marginTop: 4 }}>2 unread updates for your journey</div>
          </div>
          <button className="btn-ghost" style={{ fontSize: 13 }}>Mark all read</button>
        </div>
      </SpeedBlurEntry>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {NOTIFS.map((n, i) => (
          <SpeedBlurEntry key={n.id} delay={i * 60}>
            <div style={{
              padding: '16px 18px', borderRadius: 14,
              background: n.unread ? typeBg[n.type] : 'var(--surface)',
              border: `1px solid ${n.unread ? typeColor[n.type] + '30' : 'var(--border)'}`,
              display: 'flex', gap: 14, alignItems: 'flex-start',
            }}>
              <div style={{ fontSize: 22, marginTop: 2 }}>{n.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: 14, fontWeight: n.unread ? 700 : 500, color: 'var(--text)' }}>
                    {n.title}
                    {n.unread && <span style={{ marginLeft: 8, width: 7, height: 7, borderRadius: '50%', background: typeColor[n.type], display: 'inline-block', verticalAlign: 'middle' }} />}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text3)' }}>{n.time}</div>
                </div>
                <div style={{ fontSize: 13, color: 'var(--text2)', marginTop: 5, lineHeight: 1.6 }}>{n.body}</div>
              </div>
            </div>
          </SpeedBlurEntry>
        ))}
      </div>
    </div>
  )
}
