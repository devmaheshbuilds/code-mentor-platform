import { useMemo, useState } from 'react'
import { LESSON_DATA } from '../carousel/lessonData'
import { runPlaygroundCode } from '../api/playground'
import { CodeEditor } from '../components/editor/CodeEditor'
import { getSubtopicExercise } from '../data/subtopicContent'
import { codesMatch, outputsMatch } from '../utils/codeCompare'
import { useUserStats } from '../hooks/useUserStats'
import {
  getLessonProgress,
  isSubtopicComplete,
  markSubtopicComplete,
} from '../utils/lessonProgress'
import { clipboardBlockProps } from '../utils/blockClipboard'
import './SubtopicSession.css'

type SubtopicSessionProps = {
  lessonId: string
  lessonTitle: string
  subtopic: string
  onBack: () => void
  onSubtopicSelect?: (subtopic: string) => void
}

function lessonShortTitle(title: string) {
  return title
    .replace(/^Introduction to /i, '')
    .replace(/ & /g, ' ')
}

export function SubtopicSession({
  lessonId,
  lessonTitle,
  subtopic,
  onBack,
  onSubtopicSelect,
}: SubtopicSessionProps) {
  const lesson = LESSON_DATA.find((l) => l.id === lessonId)
  const lessonIndex = LESSON_DATA.findIndex((l) => l.id === lessonId)
  const subtopicIndex = lesson?.subtopics.indexOf(subtopic) ?? 0

  const exercise = useMemo(
    () => getSubtopicExercise(lessonId, lessonTitle, subtopic),
    [lessonId, lessonTitle, subtopic],
  )

  const stats = useUserStats()

  const progress = useMemo(
    () => getLessonProgress(lessonId, lesson?.subtopics.length ?? 0),
    [lessonId, lesson?.subtopics.length, stats.topicsCompleted],
  )

  const [code, setCode] = useState(exercise.starterCode)
  const [hintsUsed, setHintsUsed] = useState(0)
  const [revealedHints, setRevealedHints] = useState<string[]>([])
  const [expandedHint, setExpandedHint] = useState<number | null>(null)
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [running, setRunning] = useState(false)
  const [success, setSuccess] = useState(false)
  const [exampleOutput, setExampleOutput] = useState('')
  const [exampleRunning, setExampleRunning] = useState(false)
  const [codingUnlocked, setCodingUnlocked] = useState(false)

  const lessonLabel = `${lessonIndex + 1}.${subtopicIndex + 1}`

  async function handleRunExample() {
    setExampleRunning(true)
    setExampleOutput('')
    try {
      const result = await runPlaygroundCode(exercise.exampleCode)
      setExampleOutput(result.error || result.output || '(no output)')
    } catch (err) {
      setExampleOutput(
        err instanceof Error ? err.message : 'Could not run example.',
      )
    } finally {
      setExampleRunning(false)
    }
  }

  async function handleRun() {
    setRunning(true)
    setError('')
    setOutput('')
    try {
      const result = await runPlaygroundCode(code)
      setOutput(result.error || result.output || '(no output)')
      if (result.error) setError(result.error)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Run failed.')
    } finally {
      setRunning(false)
    }
  }

  async function handleCheck() {
    setError('')
    setSuccess(false)
    if (!code.trim()) {
      setError('Write your code first — you learn by typing it yourself!')
      return
    }
    if (codesMatch(code, exercise.solution)) {
      setSuccess(true)
      markSubtopicComplete(lessonId, subtopic)
      return
    }
    try {
      const result = await runPlaygroundCode(code)
      const out = (result.output || '').trim()
      if (!result.error && outputsMatch(out, exercise.expectedOutput)) {
        setSuccess(true)
        markSubtopicComplete(lessonId, subtopic)
        setOutput(out)
        return
      }
      setOutput(result.error || result.output || '')
      setError(
        'Not quite right yet. Compare your output with the challenge, or use a hint.',
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not check your code.')
    }
  }

  function revealHint() {
    if (hintsUsed >= 4) return
    const next = hintsUsed + 1
    setHintsUsed(next)
    const text =
      next <= 3
        ? exercise.hints[next - 1]
        : `Answer:\n${exercise.solution}`
    setRevealedHints((prev) => [...prev, text])
    setExpandedHint(next - 1)
  }

  function handleResetCode() {
    setCode(exercise.starterCode)
    setOutput('')
    setError('')
    setSuccess(false)
  }

  function goToNextSubtopic() {
    if (!lesson) return
    const next = lesson.subtopics[subtopicIndex + 1]
    if (next && onSubtopicSelect) {
      onSubtopicSelect(next)
    } else {
      onBack()
    }
  }

  const nextSubtopic = lesson?.subtopics[subtopicIndex + 1]

  return (
    <div className="lc-session" {...clipboardBlockProps}>
      <header className="lc-session__header">
        <button type="button" className="lc-back" onClick={onBack}>
          ← Back to topics
        </button>
        <div className="lc-session__course-badge">
          <span className="lc-session__course-icon">🐍</span>
          {lessonShortTitle(lessonTitle)}
        </div>
        <div className="lc-session__streak">
          <span>🔥</span>
          <span>{stats.streak} day streak</span>
        </div>
      </header>

      <div className="lc-session__layout">
        {/* Left — topic outline */}
        <aside className="lc-sidebar">
          <p className="lc-sidebar__title">Topics</p>
          <nav className="lc-sidebar__nav">
            {lesson?.subtopics.map((topic, i) => {
              const done = isSubtopicComplete(lessonId, topic)
              const active = topic === subtopic
              return (
                <button
                  key={topic}
                  type="button"
                  className={`lc-sidebar__item ${active ? 'is-active' : ''} ${done ? 'is-done' : ''}`}
                  onClick={() => onSubtopicSelect?.(topic)}
                >
                  <span className="lc-sidebar__num">
                    {done ? '✓' : i + 1}
                  </span>
                  <span className="lc-sidebar__label">{topic}</span>
                  {active ? <span className="lc-sidebar__arrow">›</span> : null}
                </button>
              )
            })}
          </nav>
          <div className="lc-sidebar__motivation">
            <span>🌱</span>
            <p>Keep going! Small steps make big progress.</p>
          </div>
        </aside>

        {/* Center — learning content */}
        <main className="lc-main">
          <div className="lc-main__hero">
            <h1>
              {lessonLabel} {subtopic}
            </h1>
            <p>{exercise.concept}</p>
            <div className="lc-flow-diagram" aria-hidden>
              <div className="lc-flow-node lc-flow-node--start">Learn</div>
              <div className="lc-flow-line" />
              <div className="lc-flow-node lc-flow-node--mid">Try</div>
              <div className="lc-flow-line lc-flow-line--branch" />
              <div className="lc-flow-branches">
                <div className="lc-flow-node lc-flow-node--yes">✓ Pass</div>
                <div className="lc-flow-node lc-flow-node--no">↻ Retry</div>
              </div>
            </div>
          </div>

          {/* Section 1 */}
          <section className="lc-panel lc-panel--sky">
            <div className="lc-panel__head">
              <span className="lc-panel__icon">💡</span>
              <div>
                <h2>1 — Understand the Concept</h2>
                <p>Read these steps before you write any code.</p>
              </div>
            </div>
            <ol className="lc-steps">
              {exercise.steps.map((step, i) => (
                <li key={step}>
                  <span>{i + 1}</span>
                  {step}
                </li>
              ))}
            </ol>
          </section>

          {/* Section 2 */}
          <section className="lc-panel lc-panel--lavender">
            <div className="lc-panel__head">
              <span className="lc-panel__icon">📖</span>
              <div>
                <h2>2 — See a Simple Example</h2>
                <p>Study the pattern — you will write fresh code later.</p>
              </div>
            </div>
            <div className="lc-code-block">
              <div className="lc-code-block__bar">
                <span>example.py</span>
                <button
                  type="button"
                  className="lc-btn lc-btn--run"
                  onClick={handleRunExample}
                  disabled={exampleRunning}
                >
                  {exampleRunning ? 'Running…' : '▶ Run'}
                </button>
              </div>
              <pre>{exercise.exampleCode}</pre>
              {exampleOutput ? (
                <div className="lc-code-block__output">
                  <span>Output</span>
                  <pre>{exampleOutput}</pre>
                </div>
              ) : null}
            </div>
          </section>

          {/* Challenge banner */}
          <section className="lc-panel lc-panel--peach">
            <div className="lc-panel__head">
              <span className="lc-panel__icon">🎯</span>
              <div>
                <h2>Your Challenge</h2>
                <p className="lc-challenge-text">{exercise.challenge}</p>
              </div>
            </div>
            {!codingUnlocked ? (
              <button
                type="button"
                className="lc-btn lc-btn--primary lc-btn--wide"
                onClick={() => setCodingUnlocked(true)}
              >
                I&apos;m ready to code myself →
              </button>
            ) : null}
          </section>

          {/* Section 3 */}
          <section
            className={`lc-panel lc-panel--mint ${codingUnlocked ? 'is-unlocked' : 'is-locked'}`}
          >
            <div className="lc-panel__head">
              <span className="lc-panel__icon">⌨️</span>
              <div>
                <h2>3 — Try It Yourself</h2>
                <p>
                  {codingUnlocked
                    ? 'Write your solution in the editor below.'
                    : 'Unlock the editor after reading the challenge.'}
                </p>
              </div>
            </div>

            {codingUnlocked ? (
              <>
                <div className="lc-editor-wrap">
                  <div className="lc-code-block__bar">
                    <span>main.py</span>
                    <div className="lc-editor-actions">
                      <button
                        type="button"
                        className="lc-btn lc-btn--ghost"
                        onClick={handleResetCode}
                      >
                        Reset
                      </button>
                      <button
                        type="button"
                        className="lc-btn lc-btn--run"
                        onClick={handleRun}
                        disabled={running}
                      >
                        {running ? 'Running…' : '▶ Run'}
                      </button>
                      <button
                        type="button"
                        className="lc-btn lc-btn--check"
                        onClick={handleCheck}
                        disabled={running}
                      >
                        Check ✓
                      </button>
                    </div>
                  </div>
                  <CodeEditor
                    value={code}
                    onChange={setCode}
                    language="python"
                    height="280px"
                    blockClipboard
                  />
                </div>

                {output ? (
                  <div className="lc-output">
                    <span>Output</span>
                    <pre>{output}</pre>
                  </div>
                ) : (
                  <div className="lc-output lc-output--hint">
                    Ready for your first run! Write code and click Run to see
                    output.
                  </div>
                )}

                {error ? <div className="lc-error">{error}</div> : null}

                {success ? (
                  <div className="lc-success">
                    <span className="lc-success__icon">🏆</span>
                    <div>
                      <strong>Excellent work!</strong>
                      <p>
                        You learned the concept and wrote the solution yourself.
                      </p>
                    </div>
                  </div>
                ) : null}
              </>
            ) : (
              <div className="lc-locked-overlay">
                <span>🔒</span>
                <p>Complete the challenge reading above to unlock the editor.</p>
              </div>
            )}
          </section>

          {/* Section 4 */}
          <section className="lc-panel lc-panel--white">
            <div className="lc-panel__head">
              <span className="lc-panel__icon">✨</span>
              <div>
                <h2>4 — Why It Works</h2>
                <p>{exercise.exampleNote}</p>
              </div>
            </div>
            <div className="lc-next-row">
              {success ? (
                <button
                  type="button"
                  className="lc-btn lc-btn--primary lc-btn--wide"
                  onClick={goToNextSubtopic}
                >
                  {nextSubtopic
                    ? `Next: ${nextSubtopic} →`
                    : 'Back to all topics →'}
                </button>
              ) : (
                <p className="lc-next-hint">
                  Pass the challenge to unlock the next topic.
                </p>
              )}
            </div>
          </section>
        </main>

        {/* Right — progress & hints */}
        <aside className="lc-rail">
          <div className="lc-rail-card lc-rail-card--progress">
            <h3>Your Progress</h3>
            <div className="lc-progress-ring">
              <svg viewBox="0 0 36 36">
                <path
                  className="lc-progress-ring__bg"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="lc-progress-ring__fill"
                  strokeDasharray={`${progress.percent}, 100`}
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="lc-progress-ring__text">{progress.percent}%</span>
            </div>
            <p className="lc-progress-label">
              {progress.completed} / {progress.total} topics
            </p>
            <div className="lc-progress-bar">
              <div
                className="lc-progress-bar__fill"
                style={{ width: `${progress.percent}%` }}
              />
            </div>
          </div>

          <div className="lc-rail-card lc-rail-card--hints">
            <h3>💡 Hints</h3>
            <p className="lc-rail-sub">
              Try on your own first. Hint 4 is the full answer.
            </p>
            <div className="lc-hint-list">
              {[0, 1, 2, 3].map((i) => {
                const revealed = revealedHints[i]
                const isOpen = expandedHint === i
                const label =
                  i === 3 ? 'Hint 4 — Answer' : `Hint ${i + 1}`
                return (
                  <div
                    key={i}
                    className={`lc-hint-item ${revealed ? 'is-revealed' : ''} ${i === 3 ? 'is-answer' : ''}`}
                  >
                    <button
                      type="button"
                      className="lc-hint-item__head"
                      onClick={() =>
                        revealed
                          ? setExpandedHint(isOpen ? null : i)
                          : undefined
                      }
                      disabled={!revealed}
                    >
                      <span>{i + 1}</span>
                      {label}
                      {revealed ? (
                        <span className="lc-hint-item__chev">
                          {isOpen ? '▾' : '▸'}
                        </span>
                      ) : (
                        <span className="lc-hint-item__lock">🔒</span>
                      )}
                    </button>
                    {revealed && isOpen ? (
                      <p className="lc-hint-item__body">{revealed}</p>
                    ) : null}
                  </div>
                )
              })}
            </div>
            <button
              type="button"
              className="lc-btn lc-btn--hint lc-btn--wide"
              onClick={revealHint}
              disabled={!codingUnlocked || hintsUsed >= 4}
            >
              {hintsUsed >= 4
                ? 'All hints used'
                : `Get hint ${hintsUsed + 1}`}
            </button>
          </div>

          <div className="lc-rail-card lc-rail-card--ref">
            <h3>📋 Quick Reference</h3>
            <pre className="lc-ref-code">{exercise.exampleCode.split('\n')[0]}</pre>
            <p>…see full example in section 2</p>
          </div>

          <div className="lc-rail-card lc-rail-card--cheer">
            <span>🏆</span>
            <strong>You&apos;re doing great!</strong>
            <p>Practice a little more and move to the next challenge.</p>
          </div>
        </aside>
      </div>
    </div>
  )
}
