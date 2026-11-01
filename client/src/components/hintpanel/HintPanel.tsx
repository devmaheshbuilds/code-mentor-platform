import { useState } from 'react'
import type { HintResponse } from '../../types'
import './HintPanel.css'

interface HintPanelProps {
  onRequestHint?: (hintLevel: number) => Promise<HintResponse | null>
  disabled?: boolean
}

export function HintPanel({
  onRequestHint,
  disabled = false,
}: HintPanelProps) {
  const [hintLevel, setHintLevel] = useState(0)
  const [hints, setHints] = useState<HintResponse[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleHint() {
    if (!onRequestHint || loading) {
      return
    }

    const nextLevel = hintLevel + 1

    if (nextLevel > 5) {
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await onRequestHint(nextLevel)

      if (response) {
        setHints((current) => [...current, response])
        setHintLevel(nextLevel)
      }
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : 'Unable to get a hint right now.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="panel hint-panel">
      <header className="panel__header">
        <div>
          <h2>AI Mentor</h2>
          <p className="hint-panel__subtitle">
            Need help? Ask for a hint without getting the full answer.
          </p>
        </div>

        <span className="hint-panel__counter">
          {hintLevel}/5
        </span>
      </header>

      <div className="hint-panel__body">
        {hints.length === 0 ? (
          <div className="hint-panel__empty">
            <strong>Stuck on your code?</strong>
            <p>
              The mentor can guide you step by step. Each new hint gives you
              a little more help.
            </p>
          </div>
        ) : (
          <div className="hint-panel__messages">
            {hints.map((hint) => (
              <article
                key={hint.hintLevel}
                className="hint-panel__message"
              >
                <span>Hint {hint.hintLevel}</span>
                <p>{hint.hint}</p>
              </article>
            ))}
          </div>
        )}

        {error ? (
          <p className="hint-panel__error">
            {error}
          </p>
        ) : null}
      </div>

      <button
        type="button"
        className="btn btn--primary hint-panel__button"
        onClick={handleHint}
        disabled={disabled || loading || hintLevel >= 5}
      >
        {loading
          ? 'Thinking...'
          : hintLevel >= 5
            ? 'All hints used'
            : `Give me hint ${hintLevel + 1}`}
      </button>
    </section>
  )
}