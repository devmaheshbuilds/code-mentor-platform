/**
 * Learning content for every lesson subtopic.
 * Flow: learn concept → read example → solve challenge with hints 1–3, hint 4 = answer.
 */

import { ALL_LESSON_EXERCISES } from './lessonExercises'

export type SubtopicExercise = {
  lessonId: string
  lessonTitle: string
  subtopic: string
  concept: string
  steps: string[]
  exampleCode: string
  exampleNote: string
  challenge: string
  starterCode: string
  solution: string
  expectedOutput: string
  hints: [string, string, string]
}

const LESSON_CONTEXT: Record<string, string> = {
  'python-basics': 'Python basics',
  variables: 'variables and data types',
  operators: 'operators',
  conditions: 'conditional statements',
  loops: 'loops',
  functions: 'functions',
  lists: 'lists and tuples',
  dictionaries: 'dictionaries',
}

function slugKey(lessonId: string, subtopic: string) {
  return `${lessonId}:${subtopic}`
}

function defaultExercise(
  lessonId: string,
  lessonTitle: string,
  subtopic: string,
): SubtopicExercise {
  const topic = subtopic.replace(/\?$/, '')
  const context = LESSON_CONTEXT[lessonId] ?? lessonTitle

  if (subtopic.toLowerCase().includes('practice')) {
    return {
      lessonId,
      lessonTitle,
      subtopic,
      concept: `Time to practice everything you learned about ${context}. Read the challenge carefully before typing.`,
      steps: [
        'Re-read the challenge — what should the program print?',
        'Plan your variables and logic on paper first.',
        'Type the code yourself; use hints only when stuck.',
      ],
      exampleCode: '# Example pattern\nvalue = 10\nprint(value)',
      exampleNote: 'Every practice problem follows: store data → process → print result.',
      challenge: `Write a short Python program about "${topic}" from ${lessonTitle}. Store one value in a variable and print a message that includes it.`,
      starterCode: `# Practice: ${topic}\n`,
      solution: `topic = "${topic}"\nprint("Practicing:", topic)`,
      expectedOutput: `Practicing: ${topic}`,
      hints: [
        `Think about what "${topic}" means in ${context}.`,
        'Start with one variable, then use print() to show something.',
        'Try: topic = "...", then print("Practicing:", topic).',
      ],
    }
  }

  return {
    lessonId,
    lessonTitle,
    subtopic,
    concept: `${topic} is an important idea in ${context}. Study the example first — it shows the pattern you will use in the challenge.`,
    steps: [
      `Understand what "${topic}" means in plain English.`,
      'Study the example code line by line.',
      'When you feel ready, click “I’m ready to solve” and write the code yourself.',
    ],
    exampleCode: `# ${topic}\nmessage = "${topic}"\nprint(message)`,
    exampleNote: `This example prints the topic name so you see how print() and variables work together.`,
    challenge: `Create a variable lesson about "${topic}" and print: Learning: ${topic}`,
    starterCode: `# ${topic}\n`,
    solution: `lesson = "${topic}"\nprint("Learning:", lesson)`,
    expectedOutput: `Learning: ${topic}`,
    hints: [
      `What variable name fits "${topic}"?`,
      'Use print with two parts: a label and your variable.',
      `Try lesson = "${topic}" then print("Learning:", lesson).`,
    ],
  }
}

export function getSubtopicExercise(
  lessonId: string,
  lessonTitle: string,
  subtopic: string,
): SubtopicExercise {
  const key = slugKey(lessonId, subtopic)
  const custom = ALL_LESSON_EXERCISES[key]

  if (custom) {
    return { lessonId, lessonTitle, subtopic, ...custom }
  }

  return defaultExercise(lessonId, lessonTitle, subtopic)
}
