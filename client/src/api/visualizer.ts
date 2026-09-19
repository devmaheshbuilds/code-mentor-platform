// Tiny next-step text used by leftover visualizer helpers.
export function describeNextIdea(code: string): string {
  if (!code.trim()) return 'Write one line first, like name = "Manas".'
  if (!/print\s*\(/.test(code)) return 'Add print() so you can see the stored value.'
  return 'Change one small thing, then ask the mentor again.'
}
