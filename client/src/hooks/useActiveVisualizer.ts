// Thin hook so later visuals can read the current editor code.
import { useMentor } from '../context/MentorContext'

export function useCode() {
  return useMentor().code
}
