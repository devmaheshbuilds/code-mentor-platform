import { useEffect, useMemo, useState } from 'react'
import { getModules } from '../api/curriculum'
import type { Lesson as LessonType, Module } from '../types'
import { DiagonalCarousel } from '../carousel/DiagonalCarousel'
import type { CarouselItem } from '../carousel/items'
import { Lesson } from './Lesson'
import './Lessons.css'

const MODULE_COLORS = [
  '#00A99D',
  '#2563EB',
  '#7C3AED',
  '#E11D48',
  '#EA580C',
]

function getModuleLevel(module: Module) {
  return module.id === '4' || module.id === '5'
    ? 'Intermediate'
    : 'Beginner'
}

function createCarouselItems(modules: Module[]): CarouselItem[] {
  return modules.map((module, index) => ({
    id: module.id,
    label: module.title,
    chapter: String(index + 1).padStart(2, '0'),
    description: module.description,
    level: getModuleLevel(module),
    exercises: module.lessons.length,
    progress: 0,
    color:
      MODULE_COLORS[index % MODULE_COLORS.length],
  }))
}

export function Lessons() {
  const [modules, setModules] = useState<Module[]>([])
  const [selectedModuleId, setSelectedModuleId] =
    useState('')
  const [selectedLesson, setSelectedLesson] =
    useState<LessonType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

    async function loadCurriculum() {
      setLoading(true)
      setError('')

      try {
        const loadedModules = await getModules()

        if (cancelled) {
          return
        }

        setModules(loadedModules)

        if (loadedModules.length > 0) {
          setSelectedModuleId(
            loadedModules[0].id,
          )
        }
      } catch (requestError) {
        if (cancelled) {
          return
        }

        setError(
          requestError instanceof Error
            ? requestError.message
            : 'Unable to load lessons right now.',
        )
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadCurriculum()

    return () => {
      cancelled = true
    }
  }, [])

  const carouselItems = useMemo(
    () => createCarouselItems(modules),
    [modules],
  )

  const selectedModule =
    modules.find(
      (module) => module.id === selectedModuleId,
    ) ?? null

  function handleModuleStart(moduleId: string) {
    setSelectedModuleId(moduleId)
    setSelectedLesson(null)

    window.setTimeout(() => {
      document
        .getElementById('module-lessons')
        ?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
    }, 50)
  }

  function handleCenterChange(
    item: CarouselItem,
  ) {
    setSelectedModuleId(item.id)
  }

  if (selectedLesson) {
    return (
      <Lesson
        lesson={selectedLesson}
        onBack={() => setSelectedLesson(null)}
      />
    )
  }

  if (loading) {
    return (
      <main className="lessons-page">
        <section className="lessons-page__state">
          <h1>Loading lessons...</h1>
          <p>
            Getting the Python curriculum from Code
            Mentor.
          </p>
        </section>
      </main>
    )
  }

  if (error) {
    return (
      <main className="lessons-page">
        <section className="lessons-page__state lessons-page__state--error">
          <h1>Unable to load lessons</h1>

          <p>{error}</p>

          <button
            type="button"
            className="btn btn--primary"
            onClick={() =>
              window.location.reload()
            }
          >
            Try again
          </button>
        </section>
      </main>
    )
  }

  return (
    <main className="lessons-page">
      <header className="lessons-page__header">
        <span className="lessons-page__eyebrow">
          LEARNING PATH
        </span>

        <h1>Learn Python</h1>

        <p>
          Choose a module, explore its lessons,
          understand the concept, and practice it
          yourself in the coding editor.
        </p>
      </header>

      {modules.length > 0 ? (
        <>
          <section className="lessons-page__carousel-section">
            <div className="lessons-page__carousel-heading">
              <div>
                <span className="lessons-page__section-label">
                  PYTHON CURRICULUM
                </span>

                <h2>Choose a module</h2>

                <p>
                  Scroll or swipe through the learning
                  path and start a module when you're
                  ready.
                </p>
              </div>
            </div>

            <div className="lessons-page__carousel">
              <DiagonalCarousel
                items={carouselItems}
                onCenterChange={handleCenterChange}
                onLessonStart={handleModuleStart}
              />
            </div>
          </section>

          <section
            id="module-lessons"
            className="lessons-page__module-content"
          >
            {selectedModule ? (
              <>
                <div className="lessons-page__module-heading">
                  <div>
                    <span className="lessons-page__section-label">
                      MODULE {selectedModule.id}
                    </span>

                    <h2>
                      {selectedModule.title}
                    </h2>

                    <p>
                      {selectedModule.description}{' '}
                      ·{' '}
                      {selectedModule.lessons.length}{' '}
                      {selectedModule.lessons.length ===
                      1
                        ? 'lesson'
                        : 'lessons'}
                    </p>
                  </div>
                </div>

                <div className="lessons-page__lesson-list">
                  {selectedModule.lessons.map(
                    (lesson, index) => (
                      <article
                        key={lesson.id}
                        className="lessons-page__lesson-card"
                      >
                        <div className="lessons-page__lesson-number">
                          {String(
                            index + 1,
                          ).padStart(2, '0')}
                        </div>

                        <div className="lessons-page__lesson-content">
                          <span className="lessons-page__lesson-label">
                            LESSON
                          </span>

                          <h3>{lesson.title}</h3>

                          <p>
                            {lesson.description}
                          </p>
                        </div>

                        <button
                          type="button"
                          className="btn btn--primary"
                          onClick={() =>
                            setSelectedLesson(
                              lesson,
                            )
                          }
                        >
                          Start Lesson
                        </button>
                      </article>
                    ),
                  )}
                </div>
              </>
            ) : (
              <div className="lessons-page__state">
                <h2>
                  No module selected
                </h2>

                <p>
                  Choose a module from the
                  carousel to see its lessons.
                </p>
              </div>
            )}
          </section>
        </>
      ) : (
        <section className="lessons-page__state">
          <h2>No modules available</h2>

          <p>
            The Python curriculum does not contain
            any modules yet.
          </p>
        </section>
      )}
    </main>
  )
}