import type { ExecutionResult } from '../types'
import { apiUrl } from '../lib/apiBase'
import { supabase } from '../lib/supabase'

export interface RunCodeRequest {
  code: string
  language: string
}

interface LessonTestCaseResult {
  test_case_id: number
  input: string
  expected_output: string
  actual_output: string
  passed: boolean
}

interface LessonSubmitResponse {
  statusCode: number
  data: {
    allPassed: boolean
    results: LessonTestCaseResult[]
  }
  message: string
  success: boolean
}

/**
 * Submits lesson code to the existing Express lesson submission endpoint.
 *
 * Express handles the Judge0 execution and test-case evaluation.
 * The frontend never calls Judge0 directly.
 */
export async function submitLessonCode(
  lessonId: string,
  code: string,
): Promise<ExecutionResult> {
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session?.access_token) {
    throw new Error('You must be logged in to run this lesson.')
  }

  const response = await fetch(apiUrl(`/api/lessons/${lessonId}/submit`), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.access_token}`,
    },
    body: JSON.stringify({
      code,
    }),
  })

  let data: LessonSubmitResponse | null = null

  try {
    data = (await response.json()) as LessonSubmitResponse
  } catch {
    throw new Error('The execution server returned an invalid response.')
  }

  if (!response.ok || !data?.success) {
    throw new Error(
      data?.message || 'Unable to run the lesson code.',
    )
  }

  const results = data.data.results

  const output = results
    .map((result, index) => {
      const status = result.passed ? 'PASSED' : 'FAILED'

      return [
        `Test Case ${index + 1}: ${status}`,
        `Input: ${result.input || '(no input)'}`,
        `Expected: ${result.expected_output || '(no output)'}`,
        `Actual: ${result.actual_output || '(no output)'}`,
      ].join('\n')
    })
    .join('\n\n')

  return {
    success: data.data.allPassed,
    output: output || 'No test case results were returned.',
    status: data.data.allPassed ? 'completed' : 'failed',
  }
}