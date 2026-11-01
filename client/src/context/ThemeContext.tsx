import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import type { ReactNode } from 'react'

const THEME_STORAGE_KEY = 'codementor-theme'

type ThemeContextType = {
  darkMode: boolean
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

function readInitialTheme(): boolean {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY)
    if (stored === 'light') return false
    if (stored === 'dark') return true
  } catch {
    /* ignore */
  }
  return true
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [darkMode, setDarkMode] = useState(readInitialTheme)

  useEffect(() => {
    document.documentElement.classList.toggle('dark-mode', darkMode)
    document.documentElement.style.colorScheme = darkMode ? 'dark' : 'light'
    try {
      localStorage.setItem(THEME_STORAGE_KEY, darkMode ? 'dark' : 'light')
    } catch {
      /* ignore */
    }
  }, [darkMode])

  const toggleTheme = () => {
    setDarkMode((prev) => !prev)
  }

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('useTheme must be used inside ThemeProvider')
  }

  return context
}
