import { useState } from "react";

import { MentorProvider } from "./context/MentorContext";

import { DiagonalCarousel } from "./carousel/DiagonalCarousel";

import { LessonPage } from "./pages/LessonPage";

import "./App.css";
import "./pages/LessonPage.css";

export default function App() {
  const [selectedLesson, setSelectedLesson] =
    useState<string | null>(null);

  return (
    <MentorProvider>

      {selectedLesson ? (

        <LessonPage
          lessonId={selectedLesson}
          onBack={() =>
            setSelectedLesson(null)
          }
        />

      ) : (

        <div className="app-shell">

          <DiagonalCarousel
            onLessonStart={(lessonId) =>
              setSelectedLesson(lessonId)
            }
          />

        </div>

      )}

    </MentorProvider>
  );
}