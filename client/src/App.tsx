import { useEffect, useState } from 'react'
import { AppNavigation } from './components/navigation/AppNavigation'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { Lessons } from './pages/Lessons'
import { VirtualEditor } from './pages/VirtualEditor'
import './App.css'

type AppPage =
  | 'dashboard'
  | 'login'
  | 'signup'
  | 'lessons'
  | 'virtual-editor'

function getCurrentPage(): AppPage {
  const path = window.location.pathname

  if (path === '/login') {
    return 'login'
  }

  if (path === '/signup') {
    return 'signup'
  }

  if (path === '/lessons') {
    return 'lessons'
  }

  if (path === '/virtual-editor') {
    return 'virtual-editor'
  }

  if (path === '/dashboard') {
    return 'dashboard'
  }

  return 'dashboard'
}

export default function App() {
  const [currentPage, setCurrentPage] =
    useState<AppPage>(getCurrentPage)

  useEffect(() => {
    function handleNavigation() {
      setCurrentPage(getCurrentPage())
    }

    window.addEventListener(
      'popstate',
      handleNavigation,
    )

    return () => {
      window.removeEventListener(
        'popstate',
        handleNavigation,
      )
    }
  }, [])

  const showAppNavigation =
    currentPage !== 'login' &&
    currentPage !== 'signup' &&
    currentPage !== 'dashboard'

  return (
    <div className="app-shell">
      {showAppNavigation ? (
        <AppNavigation
          currentPage={
            currentPage === 'virtual-editor'
              ? 'virtual-editor'
              : 'lessons'
          }
        />
      ) : null}

      {currentPage === 'login' ? (
        <Login />
      ) : currentPage === 'signup' ? (
        <Signup />
      ) : currentPage === 'virtual-editor' ? (
        <VirtualEditor />
      ) : currentPage === 'lessons' ? (
        <Lessons />
      ) : (
        <Dashboard />
      )}
    </div>
  )
}