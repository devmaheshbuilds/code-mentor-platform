export type Language = {
  id: number
  name: string
  slug: string
}

export type LessonVisual =
  | {
      type: 'diagram'
      title: string
      description: string
      steps: string[]
    }
  | {
      type: 'video'
      title: string
      description: string
      url: string
    }

export type Lesson = {
  id: string
  moduleId: string
  title: string
  description: string
  explanation: string
  starterCode: string
  visual: LessonVisual
}

export type Module = {
  id: string
  languageId: number
  title: string
  description: string
  lessons: Lesson[]
}

export type ExecutionResult = {
  success: boolean
  output: string
  error?: string
  status?: string
  executionTime?: number
}

export type HintRequest = {
  code: string
  lessonId: string
  lessonTitle: string
  lessonExplanation: string
  hintLevel: number
}

export type HintResponse = {
  hint: string
  hintLevel: number
}