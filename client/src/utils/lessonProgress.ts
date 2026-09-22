import { LESSON_DATA } from '../carousel/lessonData'
import { CAROUSEL_META, type CarouselItem } from '../carousel/items'

export const STATS_UPDATED_EVENT = 'codementor-stats-updated'

const LEGACY_KEY = 'codementor-lesson-progress'

type ProgressStore = {
  completed: Record<string, string[]>
  activityDates: string[]
}

let activeUserId: string | null = null

function storageKey(userId: string | null) {
  return userId ? `codementor-progress-${userId}` : LEGACY_KEY
}

function emptyStore(): ProgressStore {
  return { completed: {}, activityDates: [] }
}

function readStore(): ProgressStore {
  try {
    const raw = localStorage.getItem(storageKey(activeUserId))
    if (!raw) return emptyStore()
    const parsed = JSON.parse(raw) as ProgressStore
    return {
      completed: parsed.completed ?? {},
      activityDates: parsed.activityDates ?? [],
    }
  } catch {
    return emptyStore()
  }
}

function writeStore(store: ProgressStore) {
  localStorage.setItem(storageKey(activeUserId), JSON.stringify(store))
  window.dispatchEvent(new CustomEvent(STATS_UPDATED_EVENT))
}

function todayISO() {
  return new Date().toISOString().slice(0, 10)
}

function migrateLegacyProgress(userId: string | null) {
  if (!userId) return
  const userKey = storageKey(userId)
  if (localStorage.getItem(userKey)) return

  const legacy = localStorage.getItem(LEGACY_KEY)
  if (legacy) {
    localStorage.setItem(userKey, legacy)
  }
}

export function setProgressUserId(userId: string | null) {
  if (userId === activeUserId) return
  activeUserId = userId
  migrateLegacyProgress(userId)
  window.dispatchEvent(new CustomEvent(STATS_UPDATED_EVENT))
}

export function getTotalSubtopicCount() {
  return LESSON_DATA.reduce((sum, lesson) => sum + lesson.subtopics.length, 0)
}

export function getTotalCompletedSubtopics() {
  const store = readStore()
  return LESSON_DATA.reduce(
    (sum, lesson) => sum + (store.completed[lesson.id]?.length ?? 0),
    0,
  )
}

export function computeStreak(activityDates: string[]) {
  if (activityDates.length === 0) return 0

  const days = new Set(activityDates)
  const today = todayISO()
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const yesterdayISO = yesterday.toISOString().slice(0, 10)

  const mostRecent = [...days].sort().at(-1)
  if (mostRecent !== today && mostRecent !== yesterdayISO) {
    return 0
  }

  let streak = 0
  const cursor = new Date()
  if (!days.has(today)) {
    cursor.setDate(cursor.getDate() - 1)
  }

  while (days.has(cursor.toISOString().slice(0, 10))) {
    streak += 1
    cursor.setDate(cursor.getDate() - 1)
  }

  return streak
}

export function getCompletedLessonCount() {
  const store = readStore()
  return LESSON_DATA.filter(
    (lesson) =>
      (store.completed[lesson.id]?.length ?? 0) >= lesson.subtopics.length,
  ).length
}

export type AchievementDef = {
  id: string
  title: string
  description: string
  icon: string
  check: (ctx: AchievementContext) => boolean
}

type AchievementContext = {
  completedTopics: number
  totalTopics: number
  progressPct: number
  streak: number
  completedLessons: number
  totalLessons: number
}

const ACHIEVEMENT_DEFS: AchievementDef[] = [
  {
    id: 'first-step',
    title: 'First Step',
    description: 'Complete your first lesson topic.',
    icon: '🌱',
    check: (ctx) => ctx.completedTopics >= 1,
  },
  {
    id: 'five-topics',
    title: 'Getting Warm',
    description: 'Complete 5 lesson topics.',
    icon: '✨',
    check: (ctx) => ctx.completedTopics >= 5,
  },
  {
    id: 'ten-topics',
    title: 'On a Roll',
    description: 'Complete 10 lesson topics.',
    icon: '🔥',
    check: (ctx) => ctx.completedTopics >= 10,
  },
  {
    id: 'first-lesson',
    title: 'Lesson Cleared',
    description: 'Finish every topic in one full lesson.',
    icon: '📘',
    check: (ctx) => ctx.completedLessons >= 1,
  },
  {
    id: 'three-lessons',
    title: 'Python Explorer',
    description: 'Finish 3 complete lessons.',
    icon: '🧭',
    check: (ctx) => ctx.completedLessons >= 3,
  },
  {
    id: 'streak-3',
    title: '3-Day Streak',
    description: 'Learn on 3 days in a row.',
    icon: '⚡',
    check: (ctx) => ctx.streak >= 3,
  },
  {
    id: 'streak-7',
    title: 'Week Warrior',
    description: 'Keep a 7-day learning streak.',
    icon: '🏅',
    check: (ctx) => ctx.streak >= 7,
  },
  {
    id: 'half-progress',
    title: 'Halfway Hero',
    description: 'Reach 50% overall progress.',
    icon: '🎯',
    check: (ctx) => ctx.progressPct >= 50,
  },
  {
    id: 'twenty-five',
    title: 'Code Builder',
    description: 'Complete 25 lesson topics.',
    icon: '🛠️',
    check: (ctx) => ctx.completedTopics >= 25,
  },
  {
    id: 'all-lessons',
    title: 'Course Champion',
    description: 'Finish all 8 Python lessons.',
    icon: '🏆',
    check: (ctx) => ctx.completedLessons >= ctx.totalLessons,
  },
  {
    id: 'full-progress',
    title: 'Python Graduate',
    description: 'Complete every topic in the curriculum.',
    icon: '🎓',
    check: (ctx) => ctx.completedTopics >= ctx.totalTopics,
  },
  {
    id: 'streak-14',
    title: 'Dedicated Learner',
    description: 'Maintain a 14-day streak.',
    icon: '💎',
    check: (ctx) => ctx.streak >= 14,
  },
]

function getAchievementContext(): AchievementContext {
  const totalTopics = getTotalSubtopicCount()
  const completedTopics = getTotalCompletedSubtopics()
  const progressPct = totalTopics
    ? Math.round((completedTopics / totalTopics) * 100)
    : 0
  const store = readStore()

  return {
    completedTopics,
    totalTopics,
    progressPct,
    streak: computeStreak(store.activityDates),
    completedLessons: getCompletedLessonCount(),
    totalLessons: LESSON_DATA.length,
  }
}

export type Achievement = AchievementDef & { unlocked: boolean }

export function getAchievements(): Achievement[] {
  const ctx = getAchievementContext()
  return ACHIEVEMENT_DEFS.map((def) => ({
    ...def,
    unlocked: def.check(ctx),
  }))
}

export function getUnlockedAchievementCount() {
  return getAchievements().filter((item) => item.unlocked).length
}

export function getDashboardStats() {
  const ctx = getAchievementContext()
  return {
    lessonCount: LESSON_DATA.length,
    lessonsCompleted: ctx.completedLessons,
    topicsCompleted: ctx.completedTopics,
    topicsTotal: ctx.totalTopics,
    progressPct: ctx.progressPct,
    streak: ctx.streak,
    achievementsUnlocked: getUnlockedAchievementCount(),
    achievementsTotal: ACHIEVEMENT_DEFS.length,
  }
}

export function markSubtopicComplete(lessonId: string, subtopic: string) {
  const store = readStore()
  const existing = store.completed[lessonId] ?? []
  if (existing.includes(subtopic)) return

  store.completed[lessonId] = [...existing, subtopic]
  const today = todayISO()
  if (!store.activityDates.includes(today)) {
    store.activityDates = [...store.activityDates, today]
  }
  writeStore(store)
}

export function isSubtopicComplete(lessonId: string, subtopic: string) {
  return (readStore().completed[lessonId] ?? []).includes(subtopic)
}

export function getLessonProgress(lessonId: string, total: number) {
  const completed = readStore().completed[lessonId]?.length ?? 0
  return {
    completed,
    total,
    percent: total > 0 ? Math.round((completed / total) * 100) : 0,
  }
}

export function getCompletedSubtopics(lessonId: string) {
  return readStore().completed[lessonId] ?? []
}

export function getLessonProgressPercent(lessonId: string) {
  const lesson = LESSON_DATA.find((item) => item.id === lessonId)
  if (!lesson) return 0
  return getLessonProgress(lessonId, lesson.subtopics.length).percent
}

export function buildCarouselItems(): CarouselItem[] {
  return CAROUSEL_META.map((meta) => {
    const lesson = LESSON_DATA.find((item) => item.id === meta.id)
    return {
      ...meta,
      exercises: lesson?.subtopics.length ?? meta.exercises,
      progress: getLessonProgressPercent(meta.id),
    }
  })
}
