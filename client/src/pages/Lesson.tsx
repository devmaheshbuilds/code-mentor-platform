import { useState } from 'react'
import type {
  ExecutionResult,
  HintResponse,
  Lesson as LessonType,
} from '../types'
import { submitLessonCode } from '../api/execution'
import { requestHint } from '../api/hints'
import { CodeEditor } from '../components/editor/CodeEditor'
import { HintPanel } from '../components/hintpanel/HintPanel'
import './Lesson.css'

interface LessonProps {
  lesson: LessonType
  onBack?: () => void
}

export function Lesson({ lesson, onBack }: LessonProps) {
  const [code, setCode] = useState(lesson.starterCode)
  const [result, setResult] = useState<ExecutionResult | null>(null)
  const [running, setRunning] = useState(false)

  async function handleRun() {
    if (running) {
      return
    }

    setRunning(true)
    setResult(null)

    try {
      const executionResult = await submitLessonCode(
        lesson.id,
        code,
      )

      setResult(executionResult)
    } catch (requestError) {
      setResult({
        success: false,
        output: '',
        error:
          requestError instanceof Error
            ? requestError.message
            : 'Unable to run the code right now.',
      })
    } finally {
      setRunning(false)
    }
  }

  async function handleRequestHint(
    hintLevel: number,
  ): Promise<HintResponse | null> {
    return requestHint({
      code,
      lessonId: lesson.id,
      lessonTitle: lesson.title,
      lessonExplanation: lesson.explanation,
      hintLevel,
    })
  }

  return (
    <main className="lesson-page">
      <header className="lesson-page__header">
        <button
          type="button"
          className="btn btn--ghost lesson-page__back"
          onClick={onBack}
        >
          ← Back to Lessons
        </button>

        <span className="lesson-page__eyebrow">
          PYTHON LESSON
        </span>

        <h1>{lesson.title}</h1>

        <p>{lesson.description}</p>
      </header>

      <section className="lesson-page__explanation">
        <div className="lesson-page__section-label">
          CONCEPT
        </div>

        <h2>Understand the concept</h2>

        <p>{lesson.explanation}</p>
      </section>

      <section className="lesson-page__visual">
        <div className="lesson-page__visual-header">
          <div>
            <div className="lesson-page__section-label">
              VISUAL
            </div>

            <h2>{lesson.visual.title}</h2>

            <p>{lesson.visual.description}</p>
          </div>

          <span className="lesson-page__visual-type">
            {lesson.visual.type === 'diagram'
              ? 'Diagram'
              : 'Video'}
          </span>
        </div>

        {lesson.visual.type === 'diagram' ? (
          <div className="lesson-page__steps">
            {lesson.visual.steps.map((step, index) => (
              <div
                key={`${lesson.id}-step-${index}`}
                className="lesson-page__step"
              >
                <span>
                  {String(index + 1).padStart(2, '0')}
                </span>

                <p>{step}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="lesson-page__video-placeholder">
            <p>Video resource:</p>

            <a
              href={lesson.visual.url}
              target="_blank"
              rel="noreferrer"
            >
              Open lesson video
            </a>
          </div>
        )}
      </section>

      <div className="lesson-page__workspace">
        <section className="lesson-page__editor">
          <div className="lesson-page__editor-header">
            <div>
              <div className="lesson-page__section-label">
                PRACTICE
              </div>

              <h2>Try it yourself</h2>

              <p>
                Modify the code and run it when you are ready.
              </p>
            </div>

            <button
              type="button"
              className="btn btn--primary"
              onClick={handleRun}
              disabled={running}
            >
              {running ? 'Running...' : 'Run'}
            </button>
          </div>

          <div className="lesson-page__monaco">
            <CodeEditor
              value={code}
              onChange={setCode}
              language="python"
              height="430px"
            />
          </div>

          <section className="lesson-page__output">
            <div className="lesson-page__output-header">
              <h3>Output</h3>
            </div>

            <pre>
              {result
                ? result.error ||
                  result.output ||
                  'No output.'
                : 'Run your code to see the output here.'}
            </pre>
          </section>
        </section>

        <HintPanel
          onRequestHint={handleRequestHint}
          disabled={running}
        />
      </div>
    </main>
  )
}