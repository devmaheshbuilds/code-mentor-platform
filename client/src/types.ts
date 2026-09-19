// Shared types for the interactive Python lesson (explain → practice).
export type MessageKind = 'welcome' | 'mentor' | 'you'

export type LessonPhase = 'ready' | 'explain' | 'practice' | 'done'

export interface MentorMessage {
  id: string
  kind: MessageKind
  title?: string
  body: string
}

export interface CodePart {
  line: string
  short: string
  wordByWord: string
  detailed: string
  hints: [string, string, string, string, string]
}

export interface Lesson {
  parts: CodePart[]
}
