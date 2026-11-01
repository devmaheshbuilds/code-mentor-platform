import './ProgressTracker.css'

const learningPath = [
  {
    title: 'Variables & Data',
    description: 'Store values and work with different types of data.',
    progress: 100,
    status: 'complete',
  },
  {
    title: 'Python Basics',
    description: 'Build a strong foundation with Python fundamentals.',
    progress: 68,
    status: 'current',
  },
  {
    title: 'Control Flow',
    description: 'Learn conditions, loops, and decision making.',
    progress: 0,
    status: 'next',
  },
  {
    title: 'Functions',
    description: 'Create reusable blocks of code.',
    progress: 0,
    status: 'locked',
  },
]

const recentActivity = [
  {
    title: 'Completed Variables & Data',
    time: 'Today',
    icon: '✓',
  },
  {
    title: 'Practiced print()',
    time: 'Yesterday',
    icon: '⌘',
  },
  {
    title: 'Completed 4 Python lessons',
    time: '2 days ago',
    icon: '✓',
  },
  {
    title: 'Started Python Basics',
    time: '4 days ago',
    icon: '→',
  },
]

const achievements = [
  {
    icon: '🚀',
    title: 'First Steps',
    description: 'Complete your first lesson',
  },
  {
    icon: '🔥',
    title: '7 Day Streak',
    description: 'Learn for 7 days in a row',
  },
  {
    icon: '⚡',
    title: 'Fast Learner',
    description: 'Complete 5 lessons',
  },
]

export function Progress() {
  const overallProgress = 68

  return (
    <main className="progress-page">
      <div className="progress-page__container">
        <header className="progress-page__header">
          <div>
            <span className="progress-page__eyebrow">
              LEARNING DASHBOARD
            </span>

            <h1>Your Progress</h1>

            <p>
              Keep track of your coding journey and see how far you have come.
            </p>
          </div>

          <div className="progress-page__streak">
            <span className="progress-page__streak-icon">🔥</span>
            <div>
              <strong>7 days</strong>
              <span>Learning streak</span>
            </div>
          </div>
        </header>

        <section className="progress-hero">
          <div className="progress-hero__content">
            <div className="progress-hero__top">
              <div>
                <span className="progress-card__eyebrow">
                  CURRENT JOURNEY
                </span>

                <h2>Python Fundamentals</h2>

                <p>
                  Build the foundations you need to start writing Python
                  confidently.
                </p>
              </div>

              <strong className="progress-hero__percentage">
                {overallProgress}%
              </strong>
            </div>

            <div className="progress-bar">
              <div
                className="progress-bar__fill"
                style={{ width: `${overallProgress}%` }}
              />
            </div>

            <div className="progress-hero__footer">
              <span>12 of 18 lessons completed</span>
              <span>6 lessons remaining</span>
            </div>
          </div>

          <div className="progress-hero__visual">
            <div className="progress-ring">
              <div className="progress-ring__inner">
                <strong>{overallProgress}%</strong>
                <span>complete</span>
              </div>
            </div>
          </div>
        </section>

        <section className="progress-stats">
          <article className="stat-card">
            <div className="stat-card__icon stat-card__icon--blue">✓</div>
            <div>
              <strong>12</strong>
              <span>Lessons completed</span>
            </div>
          </article>

          <article className="stat-card">
            <div className="stat-card__icon stat-card__icon--green">↗</div>
            <div>
              <strong>68%</strong>
              <span>Overall progress</span>
            </div>
          </article>

          <article className="stat-card">
            <div className="stat-card__icon stat-card__icon--orange">🔥</div>
            <div>
              <strong>7</strong>
              <span>Day streak</span>
            </div>
          </article>

          <article className="stat-card">
            <div className="stat-card__icon stat-card__icon--purple">🏆</div>
            <div>
              <strong>4</strong>
              <span>Achievements</span>
            </div>
          </article>
        </section>

        <div className="progress-page__grid">
          <section className="dashboard-card learning-path">
            <div className="dashboard-card__header">
              <div>
                <span className="progress-card__eyebrow">ROADMAP</span>
                <h2>Learning Path</h2>
              </div>

              <span className="dashboard-card__count">4 topics</span>
            </div>

            <div className="learning-path__list">
              {learningPath.map((item, index) => (
                <div
                  className={`learning-item learning-item--${item.status}`}
                  key={item.title}
                >
                  <div className="learning-item__timeline">
                    <span className="learning-item__dot">
                      {item.status === 'complete'
                        ? '✓'
                        : item.status === 'locked'
                          ? '🔒'
                          : index + 1}
                    </span>

                    {index < learningPath.length - 1 ? (
                      <span className="learning-item__line" />
                    ) : null}
                  </div>

                  <div className="learning-item__content">
                    <div className="learning-item__top">
                      <div>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                      </div>

                      <span className="learning-item__status">
                        {item.status === 'complete'
                          ? 'Complete'
                          : item.status === 'current'
                            ? `${item.progress}%`
                            : item.status === 'next'
                              ? 'Next'
                              : 'Locked'}
                      </span>
                    </div>

                    {item.status === 'current' ? (
                      <div className="learning-item__bar">
                        <div
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="dashboard-card weekly-card">
            <div className="dashboard-card__header">
              <div>
                <span className="progress-card__eyebrow">ACTIVITY</span>
                <h2>This Week</h2>
              </div>

              <span className="weekly-card__total">2h 35m</span>
            </div>

            <p className="weekly-card__subtitle">
              Your learning activity over the last 7 days.
            </p>

            <div className="activity-chart">
              {[
                ['M', 35],
                ['T', 55],
                ['W', 78],
                ['T', 42],
                ['F', 88],
                ['S', 65],
                ['S', 30],
              ].map(([day, height], index) => (
                <div className="activity-chart__day" key={`${day}-${index}`}>
                  <div className="activity-chart__bar">
                    <span style={{ height: `${height}%` }} />
                  </div>
                  <small>{day}</small>
                </div>
              ))}
            </div>

            <div className="weekly-card__footer">
              <span>
                <i className="activity-dot" />
                Lessons studied
              </span>
              <strong>4 this week</strong>
            </div>
          </section>
        </div>

        <div className="progress-page__bottom-grid">
          <section className="dashboard-card">
            <div className="dashboard-card__header">
              <div>
                <span className="progress-card__eyebrow">RECENT</span>
                <h2>Recent Activity</h2>
              </div>

              <button type="button" className="text-button">
                View all
              </button>
            </div>

            <div className="activity-list">
              {recentActivity.map((activity) => (
                <div className="activity-item" key={activity.title}>
                  <span className="activity-item__icon">{activity.icon}</span>

                  <div>
                    <strong>{activity.title}</strong>
                    <span>{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="dashboard-card">
            <div className="dashboard-card__header">
              <div>
                <span className="progress-card__eyebrow">MILESTONES</span>
                <h2>Achievements</h2>
              </div>

              <span className="dashboard-card__count">4 earned</span>
            </div>

            <div className="achievement-list">
              {achievements.map((achievement) => (
                <div className="achievement-item" key={achievement.title}>
                  <span className="achievement-item__icon">
                    {achievement.icon}
                  </span>

                  <div>
                    <strong>{achievement.title}</strong>
                    <span>{achievement.description}</span>
                  </div>

                  <span className="achievement-item__check">✓</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <section className="progress-cta">
          <div>
            <span>READY FOR THE NEXT STEP?</span>
            <h2>Keep your momentum going.</h2>
            <p>
              Continue your Python journey and turn today's progress into
              tomorrow's skills.
            </p>
          </div>

          <button type="button">
            Continue learning
            <span>→</span>
          </button>
        </section>
      </div>
    </main>
  )
}
