export type Lesson = {
  id: string;
  title: string;
  subtopics: string[];
};

export const LESSON_DATA: Lesson[] = [

  {
    id: "python-basics",

    title: "Introduction to Python Basics",

    subtopics: [
      "What is Python?",
      "Features of Python",
      "Applications of Python",
      "Installing Python",
      "Python Syntax",
      "Your First Python Program",
      "Comments in Python",
      "Practice Exercises",
    ],
  },


  {
    id: "variables",

    title: "Variables & Data Types",

    subtopics: [
      "What are Variables?",
      "Creating Variables",
      "Variable Naming Rules",
      "Numbers",
      "Strings",
      "Booleans",
      "Type Conversion",
      "Input and Output",
      "Practice Exercises",
    ],
  },


  {
    id: "operators",

    title: "Operators",

    subtopics: [
      "Arithmetic Operators",
      "Assignment Operators",
      "Comparison Operators",
      "Logical Operators",
      "Identity Operators",
      "Membership Operators",
      "Bitwise Operators",
      "Operator Precedence",
      "Practice Exercises",
    ],
  },


  {
    id: "conditions",

    title: "Conditional Statements",

    subtopics: [
      "Introduction to Conditions",
      "if Statement",
      "if-else Statement",
      "if-elif-else",
      "Nested Conditions",
      "Conditional Expressions",
      "Practice Exercises",
    ],
  },


  {
    id: "loops",

    title: "Loops",

    subtopics: [
      "Introduction to Loops",
      "for Loop",
      "while Loop",
      "range() Function",
      "Nested Loops",
      "break Statement",
      "continue Statement",
      "Practice Exercises",
    ],
  },


  {
    id: "functions",

    title: "Functions",

    subtopics: [
      "What are Functions?",
      "Defining a Function",
      "Calling Functions",
      "Function Parameters",
      "Return Statement",
      "Default Arguments",
      "Keyword Arguments",
      "Practice Exercises",
    ],
  },


  {
    id: "lists",

    title: "Lists & Tuples",

    subtopics: [
      "Introduction to Lists",
      "Creating Lists",
      "Accessing List Elements",
      "List Slicing",
      "Adding and Removing Elements",
      "List Methods",
      "Introduction to Tuples",
      "Tuple Operations",
      "Practice Exercises",
    ],
  },


  {
    id: "dictionaries",

    title: "Dictionaries",

    subtopics: [
      "What is a Dictionary?",
      "Creating Dictionaries",
      "Accessing Values",
      "Adding and Updating Items",
      "Removing Items",
      "Dictionary Methods",
      "Looping Through Dictionaries",
      "Nested Dictionaries",
      "Practice Exercises",
    ],
  },

];