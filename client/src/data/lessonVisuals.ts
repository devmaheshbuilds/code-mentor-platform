import type { LessonVisual } from '../types'

export const lessonVisuals: Record<string, LessonVisual> = {
  '4': {
    type: 'diagram',
    title: 'What is Python?',
    description: 'A simple view of how Python code is written and executed.',
    steps: [
      'You write Python code in a readable syntax.',
      'The Python interpreter reads your program.',
      'The interpreter executes the instructions.',
      'The program produces a result or output.',
    ],
  },

  '5': {
    type: 'diagram',
    title: 'Running Python',
    description: 'Understand the basic flow from source code to execution.',
    steps: [
      'Create or open a Python program.',
      'Write Python instructions in the file.',
      'Run the program using the Python interpreter.',
      'Python executes the instructions from the program.',
    ],
  },

  '1': {
    type: 'diagram',
    title: 'Python Syntax',
    description: 'See how Python statements form a program.',
    steps: [
      'Write a valid Python statement.',
      'Python uses indentation to organize blocks.',
      'Keywords and values form meaningful instructions.',
      'The interpreter executes valid statements.',
    ],
  },

  '3': {
    type: 'diagram',
    title: 'Input and Output',
    description: 'Understand how a program receives and displays information.',
    steps: [
      'input() can receive information from the user.',
      'The entered value is stored in a variable.',
      'Your program can process that value.',
      'print() displays information as output.',
    ],
  },

  '2': {
    type: 'diagram',
    title: 'Your First Python Program',
    description: 'Follow the basic structure of a simple Python program.',
    steps: [
      'Start with a Python statement.',
      'Python reads the statement.',
      'The interpreter executes it.',
      'The result appears as program output.',
    ],
  },

  '9': {
    type: 'diagram',
    title: 'Variables',
    description: 'A variable gives a name to a value stored by your program.',
    steps: [
      'Choose a meaningful variable name.',
      'Assign a value using =.',
      'The variable now refers to that value.',
      'Use the variable later in your program.',
    ],
  },

  '7': {
    type: 'diagram',
    title: 'Numbers',
    description: 'Python supports numbers for calculations and mathematical operations.',
    steps: [
      'Store a number in a variable.',
      'Use integers or decimal values.',
      'Apply mathematical operators.',
      'Python calculates and returns the result.',
    ],
  },

  '10': {
    type: 'diagram',
    title: 'Strings',
    description: 'Strings represent text in Python.',
    steps: [
      'Write text inside quotes.',
      'Store the text in a variable if needed.',
      'Use string operations to work with the text.',
      'Print or combine strings to produce output.',
    ],
  },

  '8': {
    type: 'diagram',
    title: 'Booleans',
    description: 'Boolean values represent one of two logical states.',
    steps: [
      'True represents a true condition.',
      'False represents a false condition.',
      'Comparisons often produce Boolean values.',
      'Boolean values can control program decisions.',
    ],
  },

  '6': {
    type: 'diagram',
    title: 'Type Conversion',
    description: 'Values can be converted from one data type to another.',
    steps: [
      'Identify the current type of a value.',
      'Choose the required target type.',
      'Use a conversion function such as int() or str().',
      'Use the converted value in your program.',
    ],
  },

  '11': {
    type: 'diagram',
    title: 'if / else',
    description: 'Conditions allow a program to choose between different paths.',
    steps: [
      'Python evaluates the condition.',
      'If the condition is True, the if block runs.',
      'If it is False, the else block can run.',
      'Only the appropriate branch is executed.',
    ],
  },

  '15': {
    type: 'diagram',
    title: 'elif',
    description: 'elif allows a program to check multiple conditions.',
    steps: [
      'Python checks the first condition.',
      'If it is False, the next elif condition is checked.',
      'Python continues until a condition is True.',
      'The matching block is executed.',
    ],
  },

  '13': {
    type: 'diagram',
    title: 'for Loops',
    description: 'A for loop repeats code for each item in a sequence.',
    steps: [
      'Python gets the next item from the sequence.',
      'The loop variable receives that item.',
      'The loop body executes.',
      'Python moves to the next item and repeats.',
    ],
  },

  '14': {
    type: 'diagram',
    title: 'while Loops',
    description: 'A while loop repeats code while a condition remains True.',
    steps: [
      'Python checks the condition.',
      'If it is True, the loop body runs.',
      'The program updates its state.',
      'Python checks the condition again.',
    ],
  },

  '12': {
    type: 'diagram',
    title: 'break and continue',
    description: 'These statements change how a loop progresses.',
    steps: [
      'break stops the current loop completely.',
      'continue skips the rest of the current iteration.',
      'The loop can then continue with its next iteration.',
      'Use them carefully to control loop behavior.',
    ],
  },

  '24': {
    type: 'diagram',
    title: 'Defining Functions',
    description: 'Functions group reusable instructions under a name.',
    steps: [
      'Define a function using def.',
      'Give the function a meaningful name.',
      'Write the instructions inside the function.',
      'Call the function when you want it to run.',
    ],
  },

  '22': {
    type: 'diagram',
    title: 'Parameters and Arguments',
    description: 'Functions can receive values through parameters.',
    steps: [
      'Define parameters in the function.',
      'Call the function with arguments.',
      'The arguments are assigned to the parameters.',
      'The function uses those values.',
    ],
  },

  '21': {
    type: 'diagram',
    title: 'Return Values',
    description: 'A function can send a result back to the code that called it.',
    steps: [
      'The function performs its calculation.',
      'return sends a value back.',
      'The calling code receives the value.',
      'The returned value can be stored or used further.',
    ],
  },

  '25': {
    type: 'diagram',
    title: 'Scope',
    description: 'Scope determines where a variable can be accessed.',
    steps: [
      'A variable can be created in a particular scope.',
      'Local variables belong to their function.',
      'Global variables exist outside functions.',
      'Python follows scope rules when looking for variables.',
    ],
  },

  '23': {
    type: 'diagram',
    title: 'Function Practice',
    description: 'Combine function concepts to solve a small problem.',
    steps: [
      'Identify the task your function should perform.',
      'Choose the required parameters.',
      'Write the function logic.',
      'Return or display the required result.',
    ],
  },

  '19': {
    type: 'diagram',
    title: 'Lists',
    description: 'Lists store multiple values together in an ordered collection.',
    steps: [
      'Create a list using square brackets.',
      'Store multiple values inside the list.',
      'Access values using their index.',
      'Modify or process the list as needed.',
    ],
  },

  '17': {
    type: 'diagram',
    title: 'List Operations',
    description: 'Python provides useful operations for working with lists.',
    steps: [
      'Start with a list of values.',
      'Add, remove, or update items.',
      'Access items using indexes or slicing.',
      'Use built-in list methods when appropriate.',
    ],
  },

  '20': {
    type: 'diagram',
    title: 'Dictionaries',
    description: 'Dictionaries store data using key-value pairs.',
    steps: [
      'Create a dictionary with key-value pairs.',
      'Use a key to access its corresponding value.',
      'Add or update key-value pairs.',
      'Use the dictionary to organize related information.',
    ],
  },

  '16': {
    type: 'diagram',
    title: 'Dictionary Operations',
    description: 'Learn how to access and modify dictionary data.',
    steps: [
      'Access a value using its key.',
      'Add a new key-value pair.',
      'Update an existing value.',
      'Remove or inspect dictionary entries.',
    ],
  },

  '18': {
    type: 'diagram',
    title: 'Practical Collection Problems',
    description: 'Use lists and dictionaries together to solve practical problems.',
    steps: [
      'Understand the information the problem requires.',
      'Choose a suitable collection structure.',
      'Process the stored values using Python logic.',
      'Produce the required result.',
    ],
  },
}