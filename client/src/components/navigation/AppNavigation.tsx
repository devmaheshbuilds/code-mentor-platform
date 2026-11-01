import './AppNavigation.css'

interface AppNavigationProps {
  currentPage: 'lessons' | 'virtual-editor'
}

function navigate(path: string) {
  window.history.pushState({}, '', path)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

export function AppNavigation({
  currentPage,
}: AppNavigationProps) {
  return (
    <nav className="app-navigation">
      <div className="app-navigation__inner">
        <button
          type="button"
          className="app-navigation__brand"
          onClick={() => navigate('/lessons')}
        >
          <span className="app-navigation__brand-mark">&lt;/&gt;</span>
          <span>Code Mentor</span>
        </button>

        <div className="app-navigation__links">
          <button
            type="button"
            className={
              currentPage === 'lessons'
                ? 'app-navigation__link app-navigation__link--active'
                : 'app-navigation__link'
            }
            onClick={() => navigate('/lessons')}
          >
            Lessons
          </button>

          <button
            type="button"
            className={
              currentPage === 'virtual-editor'
                ? 'app-navigation__link app-navigation__link--active'
                : 'app-navigation__link'
            }
            onClick={() => navigate('/virtual-editor')}
          >
            Virtual Editor
          </button>
        </div>
      </div>
    </nav>
  )
}