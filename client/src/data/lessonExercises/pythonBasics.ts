import { lessonExercises } from './types'

export const PYTHON_BASICS = lessonExercises('python-basics', {
  'What is Python?': {
    concept:
      'Python is a programming language that reads almost like English. You write instructions in a .py file, and the Python interpreter runs them line by line.',
    steps: [
      'Think of Python as giving step-by-step instructions to a computer.',
      'Every program is a sequence of lines the computer follows from top to bottom.',
      'Your first programs will mostly use print() to show messages on screen.',
    ],
    exampleCode: 'print("I am learning Python!")',
    exampleNote: 'When Python sees print(...), it displays whatever is inside the parentheses.',
    challenge: 'Print the message: I am learning Python!',
    starterCode: '# Your first print statement\n',
    solution: 'print("I am learning Python!")',
    expectedOutput: 'I am learning Python!',
    hints: [
      'Use the print() function.',
      'Put your message inside quotes inside the parentheses.',
      'print("I am learning Python!")',
    ],
  },
  'Features of Python': {
    concept:
      'Python is known for being easy to read, working on every major platform, and having a huge library ecosystem. Readable code helps you learn faster.',
    steps: [
      'Readable syntax means fewer symbols and clearer structure.',
      'You can combine text and numbers in one print using commas.',
      'Run small experiments — change one word and see what happens.',
    ],
    exampleCode: 'language = "Python"\nprint("Feature: readable", language)',
    exampleNote: 'Commas in print() add a space between each part automatically.',
    challenge:
      'Create a variable feature with value "easy to read" and print: Python is easy to read',
    starterCode: '# Store the feature and print the sentence\n',
    solution: 'feature = "easy to read"\nprint("Python is", feature)',
    expectedOutput: 'Python is easy to read',
    hints: [
      'Assign feature = "easy to read" first.',
      'Use print with two parts separated by a comma.',
      'print("Python is", feature)',
    ],
  },
  'Applications of Python': {
    concept:
      'Python powers websites, data science, AI, automation, games, and more. The same basics you learn today scale to all of these fields.',
    steps: [
      'Pick one application area that interests you.',
      'Store it in a variable — that is how programs remember data.',
      'Print a sentence that mentions your chosen field.',
    ],
    exampleCode: 'field = "web development"\nprint("Python is used in", field)',
    exampleNote: 'Variables let you reuse values without retyping them.',
    challenge:
      'Set field = "data science" and print: Python is used in data science',
    starterCode: '# field variable + print\n',
    solution: 'field = "data science"\nprint("Python is used in", field)',
    expectedOutput: 'Python is used in data science',
    hints: [
      'field = "data science"',
      'print needs a label and the variable.',
      'print("Python is used in", field)',
    ],
  },
  'Installing Python': {
    concept:
      'To run Python locally you install it from python.org. In this platform, the Run button sends your code to a Python runner — same language, instant feedback.',
    steps: [
      'Write code in the editor.',
      'Click Run to execute it remotely.',
      'Read the output panel — that is what your program printed.',
    ],
    exampleCode: 'version = 3\nprint("Running Python", version)',
    exampleNote: 'You are already "installed" here — just write and run.',
    challenge: 'Print exactly: Ready to code',
    starterCode: '# Confirm your environment works\n',
    solution: 'print("Ready to code")',
    expectedOutput: 'Ready to code',
    hints: [
      'One line is enough.',
      'Use print with quotes around the text.',
      'print("Ready to code")',
    ],
  },
  'Python Syntax': {
    concept:
      'Python syntax rules: use lowercase for built-ins like print, wrap text in quotes, and end statements without semicolons. Indentation matters later for blocks.',
    steps: [
      'Function names like print are lowercase.',
      'Strings use "double" or \'single\' quotes.',
      'Each statement usually goes on its own line.',
    ],
    exampleCode: 'greeting = "Hello"\nprint(greeting + ", World!")',
    exampleNote: '+ joins two strings together into one.',
    challenge:
      'Create greeting = "Hello" and print Hello, World! using + to join strings.',
    starterCode: 'greeting = "Hello"\n# Join and print\n',
    solution: 'greeting = "Hello"\nprint(greeting + ", World!")',
    expectedOutput: 'Hello, World!',
    hints: [
      'Use + between greeting and ", World!"',
      'Everything goes inside print(...).',
      'print(greeting + ", World!")',
    ],
  },
  'Your First Python Program': {
    concept:
      'The classic first program prints "Hello, World!" It proves your setup works and introduces print() — the most common way to show output.',
    steps: [
      'Type print( then a quoted message.',
      'Close the quote and parenthesis.',
      'Run it and confirm the output matches.',
    ],
    exampleCode: 'print("Hello, World!")',
    exampleNote: 'Every programmer starts here — you are in good company.',
    challenge: 'Print exactly: Hello, World!',
    starterCode: '# Classic first program\n',
    solution: 'print("Hello, World!")',
    expectedOutput: 'Hello, World!',
    hints: [
      'One print statement.',
      'Match punctuation and capitalization exactly.',
      'print("Hello, World!")',
    ],
  },
  'Comments in Python': {
    concept:
      'Comments start with #. Python ignores them — they are notes for humans. Use comments to explain why, not what every line does.',
    steps: [
      'Put # at the start of a comment line.',
      'Write code on the next line without #.',
      'Only the code runs; the comment is skipped.',
    ],
    exampleCode: '# This line is a comment\nprint("Comments help readers")',
    exampleNote: 'The first line never executes; only print runs.',
    challenge:
      'Add a comment # My first comment on line 1, then print: Comments work!',
    starterCode: '# My first comment\n# Add print below\n',
    solution: '# My first comment\nprint("Comments work!")',
    expectedOutput: 'Comments work!',
    hints: [
      'Line 1 should start with #.',
      'Line 2 is the print statement.',
      'print("Comments work!")',
    ],
  },
  'Practice Exercises': {
    concept:
      'You have seen print, variables, strings, and comments. Practice ties them together — read the problem, plan, then type every character yourself.',
    steps: [
      'Name = value on one line.',
      'print with a message and the variable.',
      'Run before checking to catch typos early.',
    ],
    exampleCode: 'name = "Coder"\nprint("Welcome,", name)',
    exampleNote: 'Small programs follow: store → display.',
    challenge:
      'Create name = "Coder", then print Welcome, Coder using the variable.',
    starterCode: '# Practice: name + welcome message\n',
    solution: 'name = "Coder"\nprint("Welcome,", name)',
    expectedOutput: 'Welcome, Coder',
    hints: [
      'Two lines: assignment then print.',
      'Use a comma inside print.',
      'print("Welcome,", name)',
    ],
  },
})
