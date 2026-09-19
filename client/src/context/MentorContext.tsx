/**
 * Lesson state machine:
 * ready → explain (one line at a time) → practice (5 hints) → done
 */
import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { buildLesson, linesMatch } from '../api/mentor'
import type { CodePart, LessonPhase, MentorMessage } from '../types'

interface MentorContextValue {
  code: string
  messages: MentorMessage[]
  phase: LessonPhase
  partIndex: number
  partCount: number
  hintUsed: number
  currentPart: CodePart | null
  setCode: (value: string) => void
  startExplain: () => void
  sayNothing: () => void
  askDetail: () => void
  sayGotThis: () => void
  sayUnderstoodAll: () => void
  askPracticeHint: () => void
  checkPracticeLine: () => void
  sendInOwnWords: (text: string) => void
  resetLesson: () => void
}

const MentorContext = createContext<MentorContextValue | null>(null)

const welcome: MentorMessage = {
  id: 'welcome',
  kind: 'welcome',
  title: 'Hi, I am Code Mentor',
  body: 'Type Python on the left, then press Explain my code. I will go one small part at a time, in easy words.',
}

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

function partLabel(index: number, total: number, line: string) {
  return `Part ${index + 1} of ${total}  ·  ${line}`
}

export function MentorProvider({ children }: { children: ReactNode }) {
  const [code, setCodeState] = useState('name = "Manas"\n')
  const [sourceCode, setSourceCode] = useState('name = "Manas"\n')
  const [messages, setMessages] = useState<MentorMessage[]>([welcome])
  const [phase, setPhase] = useState<LessonPhase>('ready')
  const [parts, setParts] = useState<CodePart[]>([])
  const [partIndex, setPartIndex] = useState(0)
  const [hintUsed, setHintUsed] = useState(0)

  const currentPart = parts[partIndex] ?? null

  const addMentor = (body: string, title?: string) => {
    setMessages((prev) => [...prev, { id: createId(), kind: 'mentor', title, body }])
  }

  const addYou = (body: string) => {
    setMessages((prev) => [...prev, { id: createId(), kind: 'you', body }])
  }

  const showShortPart = (lessonParts: CodePart[], index: number) => {
    const part = lessonParts[index]
    addMentor(
      `${part.short}\n\nNow tell me: did you get this line? If not, press I understood nothing. I will go slower. If you want every extra detail, press Explain in detail.`,
      partLabel(index, lessonParts.length, part.line),
    )
  }

  const startExplain = () => {
    const source = phase === 'practice' || phase === 'done' ? sourceCode : code
    const lesson = buildLesson(source)
    if (!lesson) {
      addMentor('I do not see code yet. Type one real line, then press Explain my code.')
      return
    }

    setSourceCode(source)
    setCodeState(source)
    setParts(lesson.parts)
    setPartIndex(0)
    setHintUsed(0)
    setPhase('explain')
    addMentor(
      `I found ${lesson.parts.length} line${lesson.parts.length === 1 ? '' : 's'}. I will teach only the first line now. The other lines wait.\n\nOn the left, the green line is the one we are talking about.`,
    )
    showShortPart(lesson.parts, 0)
  }

  const sayNothing = () => {
    if (phase !== 'explain' || !currentPart) return
    addMentor(
      `${currentPart.wordByWord}\n\nThat was the same line, even slower. Press Explain in detail if you want more, or I got this part if it is clear.`,
      `Slower  ·  ${currentPart.line}`,
    )
  }

  const askDetail = () => {
    if (phase !== 'explain' || !currentPart) return
    addMentor(
      `${currentPart.detailed}\n\nThat is the full detail for this one line. Press I got this part when you are ready for the next line.`,
      `Full detail  ·  ${currentPart.line}`,
    )
  }

  const sayGotThis = () => {
    if (phase !== 'explain' || !currentPart) return

    const next = partIndex + 1
    if (next >= parts.length) {
      addMentor(
        'That was the last part. If you understood everything, we can start practice. You will type the code yourself.',
      )
      return
    }

    setPartIndex(next)
    showShortPart(parts, next)
  }

  const beginPractice = () => {
    setPhase('practice')
    setPartIndex(0)
    setHintUsed(0)
    setCodeState('')
    addMentor(
      'Practice time. The left box is empty now.\n\nType line 1 yourself. Ask for a hint if you are stuck. Hint 5 will show the line.',
      'Write it yourself',
    )
  }

  const sayUnderstoodAll = () => {
    if (phase !== 'explain') return
    beginPractice()
  }

  const askPracticeHint = () => {
    if (phase !== 'practice' || !currentPart) return
    const nextHint = Math.min(hintUsed + 1, 5)
    setHintUsed(nextHint)
    if (nextHint < 5) {
      addMentor(currentPart.hints[nextHint - 1], `Hint ${nextHint} of 5`)
      return
    }
    addMentor(
      `Here is the line:\n${currentPart.hints[4]}\n\nType that on the left, then press Check my line.`,
      'Hint 5 — the line',
    )
  }

  const checkPracticeLine = () => {
    if (phase !== 'practice' || !currentPart) return
    const typed = code.trim()
    if (!typed) {
      addMentor('The left box is empty. Type the line first.')
      return
    }

    if (!linesMatch(typed, currentPart.line)) {
      addMentor(
        hintUsed >= 5
          ? `Not quite. Look at this line and try again:\n${currentPart.line}`
          : 'Close, but not the same yet. Change it a little, or ask for the next hint.',
      )
      return
    }

    const next = partIndex + 1
    if (next >= parts.length) {
      setPhase('done')
      addMentor('Yes. You wrote every line. Nice work. Press Explain my code anytime to start again.')
      setCodeState(sourceCode)
      return
    }

    setPartIndex(next)
    setHintUsed(0)
    setCodeState('')
    addMentor(`Yes. Now type line ${next + 1} yourself.`, `Line ${next + 1} of ${parts.length}`)
  }

  const sendInOwnWords = (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || phase !== 'explain') return

    addYou(trimmed)
    const lower = trimmed.toLowerCase()

    if (/(nothing|idk|don't know|dont know|no idea|confused)/.test(lower)) {
      sayNothing()
      return
    }
    if (/(detail|more|deeper|explain more)/.test(lower)) {
      askDetail()
      return
    }
    if (/(everything|all of it|all parts|understood all)/.test(lower)) {
      sayUnderstoodAll()
      return
    }
    if (/(got it|i get|understood|makes sense|yes|ok)/.test(lower)) {
      sayGotThis()
      return
    }

    addMentor('Thanks. If that part is clear, press I got this. If not, press I understood nothing or Explain in detail.')
  }

  const setCode = (value: string) => {
    if (phase === 'explain') return
    setCodeState(value)
  }

  const resetLesson = () => {
    setPhase('ready')
    setParts([])
    setPartIndex(0)
    setHintUsed(0)
    setCodeState(sourceCode)
    setMessages([welcome])
  }

  const value = useMemo(
    () => ({
      code,
      messages,
      phase,
      partIndex,
      partCount: parts.length,
      hintUsed,
      currentPart,
      setCode,
      startExplain,
      sayNothing: () => {
        addYou('I understood nothing.')
        sayNothing()
      },
      askDetail: () => {
        addYou('Explain in detail.')
        askDetail()
      },
      sayGotThis: () => {
        addYou('I got this part.')
        sayGotThis()
      },
      sayUnderstoodAll: () => {
        addYou('I understood everything.')
        sayUnderstoodAll()
      },
      askPracticeHint: () => {
        addYou(`Need hint ${Math.min(hintUsed + 1, 5)}`)
        askPracticeHint()
      },
      checkPracticeLine,
      sendInOwnWords,
      resetLesson,
    }),
    [code, messages, phase, partIndex, parts.length, hintUsed, currentPart],
  )

  return <MentorContext.Provider value={value}>{children}</MentorContext.Provider>
}

export function useMentor() {
  const context = useContext(MentorContext)
  if (!context) {
    throw new Error('useMentor must be used within MentorProvider')
  }
  return context
}
