import { LESSON_DATA } from "../carousel/lessonData";

type LessonPageProps = {
  lessonId: string;
  onBack: () => void;
};

export function LessonPage({
  lessonId,
  onBack,
}: LessonPageProps) {

  const lesson = LESSON_DATA.find(
    (item) => item.id === lessonId
  );

  if (!lesson) {
    return (
      <div className="lesson-page">
        <h1>Lesson not found</h1>

        <button
          className="back-button"
          onClick={onBack}
        >
          ← Back to Lessons
        </button>
      </div>
    );
  }

  return (
    <div className="lesson-page">

      <button
        className="back-button"
        onClick={onBack}
      >
        ← Back to Lessons
      </button>


      <div className="lesson-page-header">

        <span>PYTHON LESSON</span>

        <h1>
          {lesson.title}
        </h1>

        <p>
          Learn the concepts step by step
          and practice what you learn.
        </p>

      </div>


      <div className="subtopics-container">

        <h2>
          Lesson Topics
        </h2>


        <div className="subtopics-list">

          {lesson.subtopics.map(
            (topic, index) => (

              <button
                className="subtopic-card"
                key={topic}
                type="button"
              >

                <div className="subtopic-number">
                  {String(index + 1).padStart(
                    2,
                    "0"
                  )}
                </div>


                <div className="subtopic-content">

                  <h3>
                    {topic}
                  </h3>

                  <p>
                    Learn this topic
                  </p>

                </div>


                <span className="subtopic-arrow">
                  →
                </span>

              </button>

            )
          )}

        </div>

      </div>

    </div>
  );
}