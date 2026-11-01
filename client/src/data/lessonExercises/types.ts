import type { SubtopicExercise } from '../subtopicContent'

export type ExercisePayload = Omit<
  SubtopicExercise,
  'lessonId' | 'lessonTitle' | 'subtopic'
>

export function lessonExercises(
  lessonId: string,
  entries: Record<string, ExercisePayload>,
): Record<string, ExercisePayload> {
  const keyed: Record<string, ExercisePayload> = {}
  for (const [subtopic, payload] of Object.entries(entries)) {
    keyed[`${lessonId}:${subtopic}`] = payload
  }
  return keyed
}
