export type CarouselItem = {
  id: string;
  label: string;
  chapter: string;
  description: string;
  level: string;
  exercises: number;
  progress: number;
  color: string;
};

export const ITEMS: CarouselItem[] = [
  {
    id: "python-basics",
    chapter: "01",
    label: "Introduction to Python Basics",
    description: "Core Concepts for Absolute Beginners",
    level: "Beginner",
    exercises: 4,
    progress: 100,
    color: "#00A99D",
  },

  {
    id: "variables",
    chapter: "02",
    label: "Variables & Data Types",
    description: "Learn how Python stores and manages data",
    level: "Beginner",
    exercises: 5,
    progress: 75,
    color: "#2563EB",
  },

  {
    id: "operators",
    chapter: "03",
    label: "Operators",
    description: "Master arithmetic, comparison and logical operators",
    level: "Beginner",
    exercises: 5,
    progress: 40,
    color: "#7C3AED",
  },

  {
    id: "conditions",
    chapter: "04",
    label: "Conditional Statements",
    description: "Make decisions using if, elif and else",
    level: "Beginner",
    exercises: 6,
    progress: 0,
    color: "#E11D48",
  },

  {
    id: "loops",
    chapter: "05",
    label: "Loops",
    description: "Repeat tasks using for and while loops",
    level: "Beginner",
    exercises: 6,
    progress: 0,
    color: "#EA580C",
  },

  {
    id: "functions",
    chapter: "06",
    label: "Functions",
    description: "Create reusable blocks of Python code",
    level: "Intermediate",
    exercises: 6,
    progress: 0,
    color: "#0891B2",
  },

  {
    id: "lists",
    chapter: "07",
    label: "Lists & Tuples",
    description: "Store and manage collections of data",
    level: "Intermediate",
    exercises: 5,
    progress: 0,
    color: "#16A34A",
  },

  {
    id: "dictionaries",
    chapter: "08",
    label: "Dictionaries",
    description: "Work with Python key-value data structures",
    level: "Intermediate",
    exercises: 5,
    progress: 0,
    color: "#CA8A04",
  },
];