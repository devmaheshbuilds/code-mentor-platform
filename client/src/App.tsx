import { useEffect, useState } from "react";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/login";
import Signup from "./pages/signup";

import { MentorProvider } from "./context/MentorContext";
import { DiagonalCarousel } from "./carousel/DiagonalCarousel";
import { LessonPage } from "./pages/LessonPage";

import "./App.css";
import "./pages/LessonPage.css";

function App() {
  const [path, setPath] = useState(window.location.pathname);
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);

  useEffect(() => {
    const handlePopState = () => {
      setPath(window.location.pathname);
      setSelectedLesson(null);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  // LOGIN
  if (path === "/login") {
    return <Login />;
  }

  // SIGNUP
  if (path === "/signup") {
    return <Signup />;
  }

  // LESSONS
  if (path === "/lessons") {
    return (
      <MentorProvider>
        {selectedLesson ? (
          <LessonPage
            lessonId={selectedLesson}
            onBack={() => {
              setSelectedLesson(null);
            }}
          />
        ) : (
          <div className="app-shell">
            <DiagonalCarousel
              onLessonStart={(lessonId) => {
                setSelectedLesson(lessonId);
              }}
            />
          </div>
        )}
      </MentorProvider>
    );
  }

  // DASHBOARD
  return <Dashboard />;
}

export default App;