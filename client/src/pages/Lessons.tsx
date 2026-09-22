import { useEffect, useState } from 'react'
import { DiagonalCarousel } from '../carousel/DiagonalCarousel'
import type { CarouselItem } from '../carousel/items'
import { goTo } from '../utils/navigation'
import {
  buildCarouselItems,
  STATS_UPDATED_EVENT,
} from '../utils/lessonProgress'
import { LessonPage } from './LessonPage'
import './LessonPage.css'

export function Lessons() {
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null)
  const [carouselItems, setCarouselItems] = useState<CarouselItem[]>(() =>
    buildCarouselItems(),
  )

  useEffect(() => {
    function refresh() {
      setCarouselItems(buildCarouselItems())
    }

    window.addEventListener(STATS_UPDATED_EVENT, refresh)
    return () => window.removeEventListener(STATS_UPDATED_EVENT, refresh)
  }, [])

  if (selectedLesson) {
    return (
      <LessonPage
        lessonId={selectedLesson}
        onBack={() => {
          setSelectedLesson(null)
          setCarouselItems(buildCarouselItems())
        }}
      />
    )
  }

  return (
    <div className="lessons-carousel-shell">
      <button
        type="button"
        className="lessons-home-link"
        onClick={() => goTo('/')}
      >
        ← Dashboard
      </button>

      <div className="lessons-carousel-viewport">
        <DiagonalCarousel
          items={carouselItems}
          onLessonStart={(lessonId) => setSelectedLesson(lessonId)}
        />
      </div>
    </div>
  )
}
