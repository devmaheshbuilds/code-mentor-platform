import { lessonExercises } from './types'

export const VARIABLES = lessonExercises('variables', {
  'What are Variables?': {
    concept:
      'A variable is a labeled container in memory. You assign with = and read the value later by name.',
    steps: [
      'Left side: variable name.',
      'Middle: = means assign.',
      'Right side: the value to store.',
    ],
    exampleCode: 'score = 100\nprint(score)',
    exampleNote: 'print(score) shows 100 — the value stored under the name score.',
    challenge: 'Store 42 in a variable called answer and print it.',
    starterCode: '# answer = ?\n',
    solution: 'answer = 42\nprint(answer)',
    expectedOutput: '42',
    hints: [
      'answer = 42',
      'print(answer) without quotes around answer.',
      'Two lines: assign then print.',
    ],
  },
  'Creating Variables': {
    concept:
      'A variable is a named box. You write name = value and Python remembers that value for later.',
    steps: [
      'Choose a clear name on the left (like age or city).',
      'Put = in the middle — it means “store this”.',
      'Write the value on the right (number, text in quotes, etc.).',
    ],
    exampleCode: 'name = "Asha"\nage = 14\nprint(name)\nprint(age)',
    exampleNote: 'name holds text; age holds a number. print shows what is inside.',
    challenge: 'Create a variable city with the value "Mumbai" and print it.',
    starterCode: '# Create city and print it\n',
    solution: 'city = "Mumbai"\nprint(city)',
    expectedOutput: 'Mumbai',
    hints: [
      'Text in Python needs quotes around it.',
      'The variable name goes on the left of =.',
      'city = "Mumbai" then print(city).',
    ],
  },
  'Variable Naming Rules': {
    concept:
      'Names must start with a letter or underscore, use letters/numbers/underscores only, and are case-sensitive. Use snake_case like user_name for readability.',
    steps: [
      'No spaces — use underscores instead.',
      'Do not start with a number.',
      'Pick names that describe the data.',
    ],
    exampleCode: 'user_name = "Ravi"\nprint(user_name)',
    exampleNote: 'user_name is valid; 2name would be a syntax error.',
    challenge:
      'Create user_name = "Ravi" and print it. Use the underscore name exactly.',
    starterCode: '# Valid variable name\n',
    solution: 'user_name = "Ravi"\nprint(user_name)',
    expectedOutput: 'Ravi',
    hints: [
      'The variable is user_name not username.',
      'String value in quotes.',
      'print(user_name)',
    ],
  },
  Numbers: {
    concept:
      'Integers (whole numbers) and floats (decimals) are numeric types. Python does math with + - * / automatically.',
    steps: [
      'Assign numbers without quotes.',
      'Use operators for calculations.',
      'print() shows numeric results.',
    ],
    exampleCode: 'a = 10\nb = 5\nprint(a + b)',
    exampleNote: '10 + 5 equals 15 — no quotes needed for numbers.',
    challenge: 'Store width = 8 and height = 6, then print their product (width * height).',
    starterCode: 'width = 8\nheight = 6\n# Print product\n',
    solution: 'width = 8\nheight = 6\nprint(width * height)',
    expectedOutput: '48',
    hints: [
      'Multiplication uses *.',
      'print(width * height)',
      'Expected output is 48.',
    ],
  },
  Strings: {
    concept:
      'Strings are text in quotes. You can combine them with + or repeat with *.',
    steps: [
      'Wrap text in "quotes".',
      'Use + to concatenate strings.',
      'print the result.',
    ],
    exampleCode: 'first = "Py"\nsecond = "thon"\nprint(first + second)',
    exampleNote: '"Py" + "thon" becomes "Python".',
    challenge: 'Set word = "Code" and print CodeMentor by printing word + "Mentor".',
    starterCode: 'word = "Code"\n# Print word + "Mentor"\n',
    solution: 'word = "Code"\nprint(word + "Mentor")',
    expectedOutput: 'CodeMentor',
    hints: [
      'Concatenate with +.',
      'The second part is the string "Mentor".',
      'print(word + "Mentor")',
    ],
  },
  Booleans: {
    concept:
      'Booleans are True or False (capitalized). They represent yes/no decisions and power conditions later.',
    steps: [
      'Assign True or False without quotes.',
      'print boolean values directly.',
      'Compare expressions also produce booleans.',
    ],
    exampleCode: 'is_active = True\nprint(is_active)',
    exampleNote: 'True and False are special keywords in Python.',
    challenge: 'Set is_student = True and print it.',
    starterCode: '# Boolean variable\n',
    solution: 'is_student = True\nprint(is_student)',
    expectedOutput: 'True',
    hints: [
      'True is capitalized.',
      'No quotes around True.',
      'is_student = True then print(is_student)',
    ],
  },
  'Type Conversion': {
    concept:
      'Convert between types with int(), float(), and str(). str(5) becomes "5" for joining with text.',
    steps: [
      'Identify the type you need.',
      'Wrap the value in the converter function.',
      'Use the result in print or math.',
    ],
    exampleCode: 'age = 15\nprint("Age: " + str(age))',
    exampleNote: 'str(age) turns the number 15 into text so + works with "Age: ".',
    challenge:
      'Set age = 15 and print Age: 15 using str(age) to join with "Age: ".',
    starterCode: 'age = 15\n# Convert and print\n',
    solution: 'age = 15\nprint("Age: " + str(age))',
    expectedOutput: 'Age: 15',
    hints: [
      'str(age) converts the number.',
      'Join with + to "Age: ".',
      'print("Age: " + str(age))',
    ],
  },
  'Input and Output': {
    concept:
      'Output is print(). Input (input()) reads from the user — here we simulate input by assigning a value, then printing a formatted response.',
    steps: [
      'Pretend the user typed a name — store it in a variable.',
      'Build a response string.',
      'print the greeting.',
    ],
    exampleCode: 'name = "Alex"\nprint("Hello,", name)',
    exampleNote: 'In real programs, name = input("Your name? ") reads from keyboard.',
    challenge:
      'Set name = "Alex" and print Hello, Alex using print("Hello,", name).',
    starterCode: 'name = "Alex"\n# Greet the user\n',
    solution: 'name = "Alex"\nprint("Hello,", name)',
    expectedOutput: 'Hello, Alex',
    hints: [
      'name is already set.',
      'Use comma in print for natural spacing.',
      'print("Hello,", name)',
    ],
  },
  'Practice Exercises': {
    concept:
      'Combine variables, types, and print. Plan which values are numbers vs strings before typing.',
    steps: [
      'Create two variables of different types.',
      'Convert if you need to join text and numbers.',
      'Verify output with Run.',
    ],
    exampleCode: 'item = "book"\nprice = 12\nprint(item, price)',
    exampleNote: 'print with commas handles mixed types easily.',
    challenge: 'Set item = "book" and price = 12, then print both on one line.',
    starterCode: 'item = "book"\nprice = 12\n',
    solution: 'item = "book"\nprice = 12\nprint(item, price)',
    expectedOutput: 'book 12',
    hints: [
      'Both variables are defined.',
      'One print with comma between them.',
      'print(item, price)',
    ],
  },
})
