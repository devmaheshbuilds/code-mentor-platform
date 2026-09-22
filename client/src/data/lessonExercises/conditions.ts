import { lessonExercises } from './types'

export const CONDITIONS = lessonExercises('conditions', {
  'Introduction to Conditions': {
    concept:
      'Conditions let programs make decisions. Code runs only when a test is True — like “if it is raining, take an umbrella”.',
    steps: [
      'Think of a True/False question about your data.',
      'Use if with that test (covered in next topics).',
      'For now, print a boolean to see True/False.',
    ],
    exampleCode: 'temperature = 35\nprint(temperature > 30)',
    exampleNote: '35 > 30 is True — the condition “hot” would pass.',
    challenge: 'Set temperature = 35 and print temperature > 30.',
    starterCode: 'temperature = 35\n',
    solution: 'temperature = 35\nprint(temperature > 30)',
    expectedOutput: 'True',
    hints: [
      'Use > for greater than.',
      'print(temperature > 30)',
      'Expect True.',
    ],
  },
  'if Statement': {
    concept:
      'An if statement runs code only when a condition is True. It always ends with a colon : and the next line must be indented.',
    steps: [
      'Start with if.',
      'Write the condition (something that is True or False).',
      'End with : then indent the code that should run when True.',
    ],
    exampleCode: 'score = 85\nif score >= 60:\n    print("Pass")',
    exampleNote: 'Because 85 >= 60 is True, Python prints Pass.',
    challenge:
      'Set temperature = 32. If temperature is greater than 30, print "Hot day".',
    starterCode: 'temperature = 32\n# Write your if statement below\n',
    solution: 'temperature = 32\nif temperature > 30:\n    print("Hot day")',
    expectedOutput: 'Hot day',
    hints: [
      'Compare temperature with 30 using >.',
      'Remember the colon : at the end of the if line.',
      'Indent print("Hot day") under the if.',
    ],
  },
  'if-else Statement': {
    concept:
      'else adds a backup path when the if condition is False. Exactly one branch runs — if or else, never both.',
    steps: [
      'Write if condition: with indented body.',
      'Add else: at the same indent as if.',
      'Indent the alternative body under else.',
    ],
    exampleCode: 'age = 15\nif age >= 18:\n    print("Adult")\nelse:\n    print("Minor")',
    exampleNote: '15 >= 18 is False, so else runs and prints Minor.',
    challenge:
      'Set age = 15. If age >= 18 print "Adult", else print "Minor".',
    starterCode: 'age = 15\n',
    solution: 'age = 15\nif age >= 18:\n    print("Adult")\nelse:\n    print("Minor")',
    expectedOutput: 'Minor',
    hints: [
      'if and else align at the same indent.',
      'Bodies need one extra indent.',
      'else: then print("Minor")',
    ],
  },
  'if-elif-else': {
    concept:
      'elif (else if) checks extra conditions in order. Python stops at the first True branch; else catches everything left.',
    steps: [
      'Start with if for the first test.',
      'Add elif for more tests.',
      'Finish with else if needed.',
    ],
    exampleCode: 'score = 75\nif score >= 90:\n    print("A")\nelif score >= 60:\n    print("Pass")\nelse:\n    print("Fail")',
    exampleNote: '75 triggers elif score >= 60 → Pass.',
    challenge:
      'Set score = 75. if score>=90 print "A", elif score>=60 print "Pass", else print "Fail".',
    starterCode: 'score = 75\n',
    solution:
      'score = 75\nif score >= 90:\n    print("A")\nelif score >= 60:\n    print("Pass")\nelse:\n    print("Fail")',
    expectedOutput: 'Pass',
    hints: [
      'Check higher threshold first (90 before 60).',
      'elif lines align with if.',
      '75 should hit the elif branch.',
    ],
  },
  'Nested Conditions': {
    concept:
      'You can put if inside if for layered decisions. Inner if runs only when outer if was True.',
    steps: [
      'Handle the outer condition first.',
      'Indent an inner if inside the outer block.',
      'Keep indent levels consistent (usually 4 spaces).',
    ],
    exampleCode: 'logged_in = True\nrole = "admin"\nif logged_in:\n    if role == "admin":\n        print("Full access")',
    exampleNote: 'Both must be True to reach the inner print.',
    challenge:
      'Set logged_in = True and role = "admin". If logged_in, and inside if role == "admin", print "Full access".',
    starterCode: 'logged_in = True\nrole = "admin"\n',
    solution:
      'logged_in = True\nrole = "admin"\nif logged_in:\n    if role == "admin":\n        print("Full access")',
    expectedOutput: 'Full access',
    hints: [
      'Outer if logged_in:',
      'Inner if role == "admin": indented further.',
      'print("Full access") inside inner if.',
    ],
  },
  'Conditional Expressions': {
    concept:
      'A ternary-style expression: value_if_true if condition else value_if_false — compact choice in one line.',
    steps: [
      'Pick the two possible values.',
      'Place condition between them with if/else.',
      'Assign or print the result.',
    ],
    exampleCode: 'age = 20\nstatus = "Adult" if age >= 18 else "Minor"\nprint(status)',
    exampleNote: 'Reads like English: status is Adult if age >= 18 otherwise Minor.',
    challenge:
      'Set age = 20. Set status = "Adult" if age >= 18 else "Minor" and print status.',
    starterCode: 'age = 20\n',
    solution: 'age = 20\nstatus = "Adult" if age >= 18 else "Minor"\nprint(status)',
    expectedOutput: 'Adult',
    hints: [
      'One-line conditional assignment.',
      'True branch before if, false after else.',
      'status = "Adult" if age >= 18 else "Minor"',
    ],
  },
  'Practice Exercises': {
    concept:
      'Combine if/elif/else with comparisons. Trace which branch runs before you type.',
    steps: [
      'List thresholds in order.',
      'Write if/elif chain.',
      'Run to confirm one output line.',
    ],
    exampleCode: 'n = 0\nif n > 0:\n    print("positive")\nelif n == 0:\n    print("zero")\nelse:\n    print("negative")',
    exampleNote: 'Zero hits the elif n == 0 branch.',
    challenge:
      'Set n = 0. if n>0 print "positive", elif n==0 print "zero", else print "negative".',
    starterCode: 'n = 0\n',
    solution:
      'n = 0\nif n > 0:\n    print("positive")\nelif n == 0:\n    print("zero")\nelse:\n    print("negative")',
    expectedOutput: 'zero',
    hints: [
      'Zero is not positive.',
      'elif n == 0 catches zero.',
      'print("zero") in that branch.',
    ],
  },
})
