import type { Language, Lesson, Module } from '../types'
import { apiUrl } from '../lib/apiBase'
import { getFallbackModules } from './fallbackCurriculum'
import { lessonVisuals } from '../data/lessonVisuals'

interface ApiResponse<T> {
  statusCode: number
  data: T
  message: string
  success: boolean
}

interface BackendLanguage {
  id: number
  name: string
}

interface BackendLesson {
  id: number
  module_id: number
  title: string
  concept_text: string
  starter_code: string
  sequence_no: number
}

interface BackendModule {
  id: number
  language_id: number
  title: string
  sequence_no: number
}

const moduleDescriptions: Record<number, string> = {
  1: 'Learn the fundamentals of Python and write your first programs.',
  2: 'Understand variables, data types, and how Python stores information.',
  3: 'Learn how programs make decisions and repeat instructions.',
  4: 'Learn how to create reusable blocks of code with functions.',
  5: 'Work with collections and solve practical programming problems.',
}

function createLanguage(language: BackendLanguage): Language {
  return {
    id: language.id,
    name: language.name,
    slug: language.name.toLowerCase().replace(/\s+/g, '-'),
  }
}

function createLesson(lesson: BackendLesson): Lesson {
  return {
    id: String(lesson.id),
    moduleId: String(lesson.module_id),
    title: lesson.title,
    description: lesson.concept_text,
    explanation: lesson.concept_text,
    starterCode: lesson.starter_code,
    visual: lessonVisuals[String(lesson.id)] ?? {
      type: 'diagram',
      title: lesson.title,
      description: 'Understand the main idea before writing your code.',
      steps: [
        'Read the lesson concept.',
        'Understand the idea being explained.',
        'Modify the starter code yourself.',
        'Run the program and observe the result.',
      ],
    },
  }
}

async function request<T>(path: string): Promise<T> {
  const response = await fetch(apiUrl(path))

  let data: ApiResponse<T>

  try {
    data = (await response.json()) as ApiResponse<T>
  } catch {
    throw new Error('The server returned an invalid response.')
  }

  if (!response.ok || !data.success) {
    throw new Error(data.message || 'Unable to fetch curriculum data.')
  }

  return data.data
}

export async function getLanguages(): Promise<Language[]> {
  const languages = await request<BackendLanguage[]>('/api/languages')

  return languages.map(createLanguage)
}

async function fetchModulesFromApi(): Promise<Module[]> {
  const [languages, backendModules, backendLessons] = await Promise.all([
    getLanguages(),
    request<BackendModule[]>('/api/module'),
    request<BackendLesson[]>('/api/lessons'),
  ])

  const lessonsByModule = new Map<number, Lesson[]>()

  for (const lesson of backendLessons) {
    const existingLessons = lessonsByModule.get(lesson.module_id) ?? []

    existingLessons.push(createLesson(lesson))
    lessonsByModule.set(lesson.module_id, existingLessons)
  }

  for (const lessons of lessonsByModule.values()) {
    lessons.sort((first, second) => {
      const firstSequence = backendLessons.find(
        (lesson) => String(lesson.id) === first.id,
      )?.sequence_no ?? 0

      const secondSequence = backendLessons.find(
        (lesson) => String(lesson.id) === second.id,
      )?.sequence_no ?? 0

      return firstSequence - secondSequence
    })
  }

  return backendModules
    .sort((first, second) => first.sequence_no - second.sequence_no)
    .map((module) => ({
      id: String(module.id),
      languageId: module.language_id,
      title: module.title,
      description:
        moduleDescriptions[module.id] ??
        languages.find((language) => language.id === module.language_id)
          ?.name ??
        'Programming',
      lessons: lessonsByModule.get(module.id) ?? [],
    }))
}

export async function getModules(): Promise<Module[]> {
  try {
    return await fetchModulesFromApi()
  } catch {
    return getFallbackModules()
  }
}