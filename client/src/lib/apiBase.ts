const rawBase = import.meta.env.VITE_API_BASE_URL ?? ''

/** Backend origin in production (empty string uses same-origin / Vite proxy in dev). */
export const API_BASE_URL = rawBase.replace(/\/$/, '')

export function apiUrl(path: string): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${API_BASE_URL}${normalizedPath}`
}
