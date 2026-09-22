import { useMemo, useState } from 'react'
import { LESSON_DATA } from '../carousel/lessonData'
import {
  getCompletedSubtopics,
  getLessonProgress,
  isSubtopicComplete,
} from '../utils/lessonProgress'
import { SubtopicSession } from './SubtopicSession'

type LessonPageProps = {
  lessonId: string
  onBack: () => void
}

export function LessonPage({ lessonId, onBack }: LessonPageProps) {
  const [activeSubtopic, setActiveSubtopic] = useState<string | null>(null)
  const [progressTick, setProgressTick] = useState(0)

  const lesson = LESSON_DATA.find((item) => item.id === lessonId)

  const progress = useMemo(() => {
    void progressTick
    if (!lesson) return { completed: 0, total: 0, percent: 0 }
    return getLessonProgress(lesson.id, lesson.subtopics.length)
  }, [lesson, progressTick])

  const completedSet = useMemo(() => {
    void progressTick
    return new Set(getCompletedSubtopics(lessonId))
  }, [lessonId, progressTick])

  if (!lesson) {
    return (
      <div className="lesson-page">
        <h1>Lesson not found</h1>
        <button className="back-button" type="button" onClick={onBack}>
          ← Back to Lessons
        </button>
      </div>
    )
  }

  if (activeSubtopic) {
    return (
      <SubtopicSession
        key={activeSubtopic}
        lessonId={lesson.id}
        lessonTitle={lesson.title}
        subtopic={activeSubtopic}
        onBack={() => {
          setActiveSubtopic(null)
          setProgressTick((n) => n + 1)
        }}
        onSubtopicSelect={(topic) => {
          setActiveSubtopic(topic)
          setProgressTick((n) => n + 1)
        }}
      />
    )
  }

  return (
    <div className="lesson-page">
      <div className="lesson-page__glow" aria-hidden />

      <button className="back-button" type="button" onClick={onBack}>
        ← Back to Lessons
      </button>

      <div className="lesson-page-header">
        <span>PYTHON LESSON</span>
        <h1>{lesson.title}</h1>
        <p>
          Learn each topic step by step, then write the code yourself with
          guided hints.
        </p>

        <div className="lesson-progress">
          <div className="lesson-progress__labels">
            <span>Your progress</span>
            <span>
              {progress.completed}/{progress.total} topics
            </span>
          </div>
          <div className="lesson-progress__track">
            <div
              className="lesson-progress__fill"
              style={{ width: `${progress.percent}%` }}
            />
          </div>
        </div>
      </div>

      <div className="subtopics-container">
        <h2>Lesson Topics</h2>
        <p className="subtopics-flow-hint">
          Each topic: <strong>Learn</strong> → <strong>Challenge</strong> →{' '}
          <strong>Code it yourself</strong> (hints 1–3 guide you, hint 4 is the
          answer)
        </p>

        <div className="subtopics-list">
          {lesson.subtopics.map((topic, index) => {
            const done = completedSet.has(topic) || isSubtopicComplete(lesson.id, topic)

            return (
              <button
                className={`subtopic-card ${done ? 'is-complete' : ''}`}
                key={topic}
                type="button"
                onClick={() => setActiveSubtopic(topic)}
              >
                <div className="subtopic-number">
                  {done ? '✓' : String(index + 1).padStart(2, '0')}
                </div>

                <div className="subtopic-content">
                  <h3>{topic}</h3>
                  <p>
                    {done
                      ? 'Completed — revisit anytime'
                      : 'Learn → Challenge → Code it yourself'}
                  </p>
                </div>

                <span className="subtopic-arrow">{done ? '★' : '→'}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
