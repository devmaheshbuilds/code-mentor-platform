import { useEffect, useState } from 'react'
import './SplashScreen.css'

type SplashPhase = 'enter' | 'hold' | 'exit' | 'done'

type SplashScreenProps = {
  onComplete: () => void
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [phase, setPhase] = useState<SplashPhase>('enter')

  useEffect(() => {
    const holdTimer = window.setTimeout(() => setPhase('hold'), 900)
    const exitTimer = window.setTimeout(() => setPhase('exit'), 2800)
    const doneTimer = window.setTimeout(() => {
      setPhase('done')
      onComplete()
    }, 5200)

    return () => {
      window.clearTimeout(holdTimer)
      window.clearTimeout(exitTimer)
      window.clearTimeout(doneTimer)
    }
  }, [onComplete])

  if (phase === 'done') return null

  return (
    <div
      className={`splash ${phase === 'exit' ? 'splash--exit' : ''} ${phase === 'hold' ? 'splash--hold' : ''}`}
      aria-hidden={phase === 'exit'}
    >
      <div className="splash__vignette" />
      <div className="splash__grain" />

      <div className="splash__rays" aria-hidden>
        <span />
        <span />
        <span />
      </div>

      <div className="splash__orb splash__orb--left" aria-hidden />
      <div className="splash__orb splash__orb--right" aria-hidden />

      <div className="splash__content">
        <div className="splash__logo-wrap">
          <div className="splash__logo-glow" aria-hidden />
          <div className="splash__logo-shine" aria-hidden />
          <img
            className="splash__logo"
            src="/code-mentor-logo.jpg"
            alt="Code Mentor"
            draggable={false}
          />
        </div>

        <p className="splash__tagline">
          <span>Learn</span>
          <span className="splash__dot" aria-hidden>
            •
          </span>
          <span>Practice</span>
          <span className="splash__dot" aria-hidden>
            •
          </span>
          <span>Grow</span>
        </p>

        <p className="splash__subtitle">From Scratch to Success</p>
      </div>

      <div className="splash__loader" aria-hidden>
        <span />
      </div>
    </div>
  )
}
