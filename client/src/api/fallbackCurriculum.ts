import type { Module } from '../types'
import { lessonVisuals } from '../data/lessonVisuals'

/** Offline curriculum when the Postgres API is unreachable. */
export function getFallbackModules(): Module[] {
  const lessons = Object.entries(lessonVisuals).map(([id, visual]) => ({
    id,
    moduleId: '1',
    title: visual.title,
    description: visual.description,
    explanation: visual.description,
    starterCode: `# ${visual.title}\nprint("Hello, Code Mentor!")\n`,
    visual,
  }))

  return [
    {
      id: '1',
      languageId: 1,
      title: 'Python Foundations',
      description: 'Learn the fundamentals of Python and write your first programs.',
      lessons,
    },
  ]
}
