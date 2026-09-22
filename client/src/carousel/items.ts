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

/** Static carousel metadata — progress is filled in at runtime from user stats. */
export const CAROUSEL_META: Omit<CarouselItem, 'progress'>[] = [
  {
    id: "python-basics",
    chapter: "01",
    label: "Introduction to Python Basics",
    description: "Core Concepts for Absolute Beginners",
    level: "Beginner",
    exercises: 8,
    color: "#00A99D",
  },
  {
    id: "variables",
    chapter: "02",
    label: "Variables & Data Types",
    description: "Learn how Python stores and manages data",
    level: "Beginner",
    exercises: 9,
    color: "#2563EB",
  },
  {
    id: "operators",
    chapter: "03",
    label: "Operators",
    description: "Master arithmetic, comparison and logical operators",
    level: "Beginner",
    exercises: 9,
    color: "#7C3AED",
  },
  {
    id: "conditions",
    chapter: "04",
    label: "Conditional Statements",
    description: "Make decisions using if, elif and else",
    level: "Beginner",
    exercises: 7,
    color: "#E11D48",
  },
  {
    id: "loops",
    chapter: "05",
    label: "Loops",
    description: "Repeat tasks using for and while loops",
    level: "Beginner",
    exercises: 8,
    color: "#EA580C",
  },
  {
    id: "functions",
    chapter: "06",
    label: "Functions",
    description: "Create reusable blocks of Python code",
    level: "Intermediate",
    exercises: 8,
    color: "#0891B2",
  },
  {
    id: "lists",
    chapter: "07",
    label: "Lists & Tuples",
    description: "Store and manage collections of data",
    level: "Intermediate",
    exercises: 9,
    color: "#16A34A",
  },
  {
    id: "dictionaries",
    chapter: "08",
    label: "Dictionaries",
    description: "Work with Python key-value data structures",
    level: "Intermediate",
    exercises: 9,
    color: "#CA8A04",
  },
];

/** @deprecated Use buildCarouselItems() for live progress */
export const ITEMS: CarouselItem[] = CAROUSEL_META.map((item) => ({
  ...item,
  progress: 0,
}));
