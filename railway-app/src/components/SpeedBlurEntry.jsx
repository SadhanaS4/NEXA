import { useEffect, useRef, useState } from 'react'

export default function SpeedBlurEntry({ children, delay = 0 }) {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateX(0) scaleX(1)' : 'translateX(-30px) scaleX(0.95)',
      filter: visible ? 'blur(0px)' : 'blur(4px)',
      transition: `opacity 0.4s ease ${delay}ms, transform 0.4s cubic-bezier(0.22,1,0.36,1) ${delay}ms, filter 0.3s ease ${delay}ms`,
    }}>
      {children}
    </div>
  )
}
