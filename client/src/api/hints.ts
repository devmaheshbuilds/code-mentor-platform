import type { HintRequest, HintResponse } from '../types'
import { supabase } from '../lib/supabase'

interface HintApiResponse {
  statusCode: number
  data: {
    ai_response?: string
    hint?: string
  }
  message: string
  success: boolean
}

export async function requestHint(
  request: HintRequest,
): Promise<HintResponse> {
  const {
    lessonId,
    lessonTitle,
    lessonExplanation,
    code,
    hintLevel,
  } = request

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session?.access_token) {
    throw new Error('You must be logged in to request a hint.')
  }

  const question = [
    `I am working on the lesson "${lessonTitle}".`,
    '',
    'Lesson explanation:',
    lessonExplanation,
    '',
    `This is hint level ${hintLevel}.`,
    'Give me a concise educational hint that helps me figure out the problem myself.',
    'Do not give me the complete solution or replacement code.',
  ].join('\n')

  const response = await fetch('/api/mentor/hint', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.access_token}`,
    },
    body: JSON.stringify({
      lesson_id: lessonId,
      student_code: code,
      question,
    }),
  })

  let data: HintApiResponse | null = null

  try {
    data = (await response.json()) as HintApiResponse
  } catch {
    throw new Error('The mentor service returned an invalid response.')
  }

  if (!response.ok || !data?.success) {
    throw new Error(
      data?.message || 'Unable to get a hint from the mentor.',
    )
  }

  const hintText = data.data?.ai_response || data.data?.hint

  if (!hintText) {
    throw new Error('The mentor service returned an empty hint.')
  }

  return {
    hint: hintText,
    hintLevel,
  }
}