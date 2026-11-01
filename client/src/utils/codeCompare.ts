export function normalizeCode(code: string): string {
  return code
    .trim()
    .replace(/\r\n/g, '\n')
    .replace(/\s+/g, ' ')
    .replace(/"/g, "'")
}

export function codesMatch(typed: string, expected: string): boolean {
  return normalizeCode(typed) === normalizeCode(expected)
}

export function outputsMatch(actual: string, expected: string): boolean {
  return normalizeCode(actual) === normalizeCode(expected)
}
