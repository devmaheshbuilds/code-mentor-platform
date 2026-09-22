import { lessonExercises } from './types'

export const OPERATORS = lessonExercises('operators', {
  'Arithmetic Operators': {
    concept:
      'Arithmetic operators let Python do math. Use + − * / for normal math, // for whole-number division, and % for the remainder.',
    steps: [
      'Read the numbers in the problem first.',
      'Pick the operator that matches the math (+ add, − subtract, * multiply, / divide).',
      'Use print() so you can see the result on the screen.',
    ],
    exampleCode: 'a = 10\nb = 3\nprint(a + b)\nprint(a * b)\nprint(a // b)',
    exampleNote: '10 + 3 is 13, 10 * 3 is 30, and 10 // 3 is 3 (whole-number division).',
    challenge:
      'Store 17 in points and 4 in bonus. Print the total score (points + bonus).',
    starterCode: '# Store points and bonus, then print the total\n',
    solution: 'points = 17\nbonus = 4\nprint(points + bonus)',
    expectedOutput: '21',
    hints: [
      'You need two variables: one for points and one for bonus.',
      'Use the + operator to add them together inside print().',
      'points = 17, bonus = 4, then print(points + bonus).',
    ],
  },
  'Assignment Operators': {
    concept:
      'Assignment operators update variables. += adds and stores back; -= subtracts; *= multiplies. x += 2 means x = x + 2.',
    steps: [
      'Start with an initial value.',
      'Use += or similar to update in place.',
      'print after each update to see the change.',
    ],
    exampleCode: 'score = 10\nscore += 5\nprint(score)',
    exampleNote: 'score goes from 10 to 15 after score += 5.',
    challenge: 'Set score = 10, then use score += 5 and print score.',
    starterCode: 'score = 10\n# Add 5 using +=\n',
    solution: 'score = 10\nscore += 5\nprint(score)',
    expectedOutput: '15',
    hints: [
      'score += 5 is one line after the initial assignment.',
      'Do not use score = 15 directly — use +=.',
      'print(score) at the end.',
    ],
  },
  'Comparison Operators': {
    concept:
      'Comparisons return True or False: == equal, != not equal, > greater, < less, >= and <=.',
    steps: [
      'Compare two values with an operator.',
      'Store or print the boolean result.',
      'Check whether the comparison matches your expectation.',
    ],
    exampleCode: 'a = 5\nb = 3\nprint(a > b)',
    exampleNote: '5 > 3 is True.',
    challenge: 'Set age = 18 and print whether age >= 18 (use >=).',
    starterCode: 'age = 18\n# Compare and print\n',
    solution: 'age = 18\nprint(age >= 18)',
    expectedOutput: 'True',
    hints: [
      '>= means greater than or equal.',
      'print(age >= 18)',
      'Result should be True.',
    ],
  },
  'Logical Operators': {
    concept:
      'and, or, and not combine conditions. and needs both True; or needs at least one True; not flips True↔False.',
    steps: [
      'Write two boolean expressions.',
      'Combine with and or or.',
      'print the combined result.',
    ],
    exampleCode: 'sunny = True\nwarm = True\nprint(sunny and warm)',
    exampleNote: 'True and True is True; True and False is False.',
    challenge:
      'Set has_ticket = True and is_adult = False. Print has_ticket and is_adult.',
    starterCode: 'has_ticket = True\nis_adult = False\n',
    solution: 'has_ticket = True\nis_adult = False\nprint(has_ticket and is_adult)',
    expectedOutput: 'False',
    hints: [
      'and requires both to be True.',
      'One False makes the whole and False.',
      'print(has_ticket and is_adult)',
    ],
  },
  'Identity Operators': {
    concept:
      'is checks if two names point to the same object; is not checks they differ. Often used with None: if x is None.',
    steps: [
      'Assign a variable to None for “empty”.',
      'Compare with is.',
      'print True or False.',
    ],
    exampleCode: 'value = None\nprint(value is None)',
    exampleNote: 'value is None is True when nothing is assigned yet.',
    challenge: 'Set value = None and print value is None.',
    starterCode: 'value = None\n# Identity check\n',
    solution: 'value = None\nprint(value is None)',
    expectedOutput: 'True',
    hints: [
      'Use is not == for None checks.',
      'print(value is None)',
      'Expect True.',
    ],
  },
  'Membership Operators': {
    concept:
      'in checks if a value exists inside a sequence like a list or string. not in checks absence.',
    steps: [
      'Create a small list or string.',
      'Use in with a target value.',
      'print the boolean result.',
    ],
    exampleCode: 'colors = ["red", "blue"]\nprint("red" in colors)',
    exampleNote: '"red" in colors is True because red is in the list.',
    challenge:
      'Create colors = ["red", "blue"] and print whether "green" in colors.',
    starterCode: 'colors = ["red", "blue"]\n',
    solution: 'colors = ["red", "blue"]\nprint("green" in colors)',
    expectedOutput: 'False',
    hints: [
      'green is not in the list.',
      'print("green" in colors)',
      'Result is False.',
    ],
  },
  'Bitwise Operators': {
    concept:
      'Bitwise operators work on binary digits. & AND, | OR, ^ XOR, << shift left. Useful in low-level and flags; try & on small integers.',
    steps: [
      'Pick two small integers.',
      'Apply & (bitwise and).',
      'print the numeric result.',
    ],
    exampleCode: 'a = 5\nb = 3\nprint(a & b)',
    exampleNote: '5 & 3 equals 1 in binary AND.',
    challenge: 'Set a = 5 and b = 3, then print a & b.',
    starterCode: 'a = 5\nb = 3\n',
    solution: 'a = 5\nb = 3\nprint(a & b)',
    expectedOutput: '1',
    hints: [
      'Use & not and.',
      'print(a & b)',
      'Answer is 1.',
    ],
  },
  'Operator Precedence': {
    concept:
      'Python follows PEMDAS-like rules: parentheses first, then **, then * / // %, then + -. Use () to force order.',
    steps: [
      'Identify which operation should happen first.',
      'Add parentheses if needed.',
      'print the final numeric answer.',
    ],
    exampleCode: 'result = 2 + 3 * 4\nprint(result)',
    exampleNote: 'Multiplication before addition: 3*4=12, 2+12=14.',
    challenge: 'Print the value of 2 + 3 * 4 without changing the expression.',
    starterCode: '# Respect precedence\n',
    solution: 'print(2 + 3 * 4)',
    expectedOutput: '14',
    hints: [
      'One print statement.',
      '* happens before +.',
      'print(2 + 3 * 4) → 14',
    ],
  },
  'Practice Exercises': {
    concept:
      'Mix arithmetic and comparisons. Break complex expressions into steps if precedence feels confusing.',
    steps: [
      'Compute a numeric result.',
      'Compare it to a threshold.',
      'print the boolean.',
    ],
    exampleCode: 'total = 8 + 2\nprint(total >= 10)',
    exampleNote: 'total is 10, so >= 10 is True.',
    challenge: 'Set total = 7 + 3 and print total >= 10.',
    starterCode: 'total = 7 + 3\n',
    solution: 'total = 7 + 3\nprint(total >= 10)',
    expectedOutput: 'True',
    hints: [
      '7 + 3 equals 10.',
      'print(total >= 10)',
      'True because 10 >= 10.',
    ],
  },
})
