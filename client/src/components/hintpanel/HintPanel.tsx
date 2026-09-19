// Mentor chat + the buttons that drive explain / practice.
import { useEffect, useRef, useState } from 'react'
import { useMentor } from '../../context/MentorContext'
import './HintPanel.css'

export function HintPanel() {
  const {
    messages,
    phase,
    partIndex,
    partCount,
    hintUsed,
    startExplain,
    sayNothing,
    askDetail,
    sayGotThis,
    sayUnderstoodAll,
    askPracticeHint,
    checkPracticeLine,
    sendInOwnWords,
    resetLesson,
    currentPart,
  } = useMentor()
  const endRef = useRef<HTMLDivElement>(null)
  const [ownWords, setOwnWords] = useState('')

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const submitWords = () => {
    sendInOwnWords(ownWords)
    setOwnWords('')
  }

  return (
    <section className="panel hint-panel">
      <header className="panel__header">
        <div>
          <h2>Mentor</h2>
          {partCount > 0 ? (
            <p className="hint-panel__status">
              {phase === 'practice'
                ? `Practice line ${partIndex + 1} of ${partCount} · Hint ${hintUsed}/5`
                : phase === 'explain'
                  ? `Explaining part ${partIndex + 1} of ${partCount}`
                  : phase === 'done'
                    ? 'Practice finished'
                    : 'Ready'}
            </p>
          ) : null}
        </div>
        <button type="button" className="btn btn--ghost" onClick={resetLesson}>
          Start over
        </button>
      </header>

      {phase === 'explain' && currentPart ? (
        <p className="hint-panel__focus">
          Now explaining: <code>{currentPart.line}</code>
        </p>
      ) : null}

      <div className="hint-panel__thread" role="log" aria-live="polite">
        {messages.map((message) => (
          <article key={message.id} className={`hint-bubble hint-bubble--${message.kind}`}>
            {message.title ? <h3>{message.title}</h3> : null}
            <p>{message.body}</p>
          </article>
        ))}
        <div ref={endRef} />
      </div>

      {phase === 'ready' || phase === 'done' ? (
        <div className="hint-panel__actions">
          <button type="button" className="btn btn--primary" onClick={startExplain}>
            Explain my code
          </button>
        </div>
      ) : null}

      {phase === 'explain' ? (
        <div className="hint-panel__interact">
          <p className="hint-panel__prompt">What did you understand?</p>
          <div className="hint-panel__actions">
            <button type="button" className="btn" onClick={sayNothing}>
              I understood nothing
            </button>
            <button type="button" className="btn" onClick={askDetail}>
              Explain in detail
            </button>
            <button type="button" className="btn btn--primary" onClick={sayGotThis}>
              I got this part
            </button>
            <button type="button" className="btn" onClick={sayUnderstoodAll}>
              I understood everything
            </button>
          </div>
          <div className="hint-panel__own">
            <label className="sr-only" htmlFor="own-words">
              Say it in your words
            </label>
            <input
              id="own-words"
              value={ownWords}
              onChange={(event) => setOwnWords(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') submitWords()
              }}
              placeholder="Or type it in your words..."
            />
            <button type="button" className="btn" onClick={submitWords}>
              Send
            </button>
          </div>
        </div>
      ) : null}

      {phase === 'practice' ? (
        <div className="hint-panel__actions">
          <button type="button" className="btn" onClick={askPracticeHint} disabled={hintUsed >= 5}>
            {hintUsed >= 5 ? 'Line already shown' : `Give hint ${hintUsed + 1}`}
          </button>
          <button type="button" className="btn btn--primary" onClick={checkPracticeLine}>
            Check my line
          </button>
        </div>
      ) : null}
    </section>
  )
}
