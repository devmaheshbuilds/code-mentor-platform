import { useEffect, useState } from 'react'
import {
  getDashboardStats,
  STATS_UPDATED_EVENT,
} from '../utils/lessonProgress'

type DashboardStats = ReturnType<typeof getDashboardStats>

export function useUserStats() {
  const [stats, setStats] = useState<DashboardStats>(() => getDashboardStats())

  useEffect(() => {
    function refresh() {
      setStats(getDashboardStats())
    }

    window.addEventListener(STATS_UPDATED_EVENT, refresh)
    return () => window.removeEventListener(STATS_UPDATED_EVENT, refresh)
  }, [])

  return stats
}
