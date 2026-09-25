import type { ExecutionResult } from '../types'
import { apiUrl } from '../lib/apiBase'

interface ExecuteResponse {
  statusCode: number
  data: ExecutionResult
  message: string
  success: boolean
}

/** Run Python in the virtual editor via the server playground endpoint. */
export async function runPlaygroundCode(
  code: string,
): Promise<ExecutionResult> {
  const response = await fetch(apiUrl('/api/execute'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code }),
  })

  let data: ExecuteResponse | null = null

  try {
    data = (await response.json()) as ExecuteResponse
  } catch {
    throw new Error('The execution server returned an invalid response.')
  }

  if (!response.ok || !data?.data) {
    const message =
      data?.message ||
      (response.status === 502
        ? 'Code runner unavailable. Restart the server after updating server/.env.'
        : 'Unable to run the code.')
    throw new Error(message)
  }

  return data.data
}
