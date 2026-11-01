import { lessonExercises } from './types'

export const LOOPS = lessonExercises('loops', {
  'Introduction to Loops': {
    concept:
      'Loops repeat work without copy-pasting code. When you need the same action many times, a loop is the tool.',
    steps: [
      'Identify what should repeat.',
      'Choose for (known count) or while (until condition).',
      'Indent the repeated lines.',
    ],
    exampleCode: 'count = 0\nwhile count < 3:\n    print("repeat")\n    count += 1',
    exampleNote: 'This while loop prints "repeat" three times.',
    challenge:
      'Use while count < 3 to print "repeat" three times. Start count = 0 and increment with count += 1.',
    starterCode: 'count = 0\n# while loop\n',
    solution: 'count = 0\nwhile count < 3:\n    print("repeat")\n    count += 1',
    expectedOutput: 'repeat\nrepeat\nrepeat',
    hints: [
      'while count < 3:',
      'Indent print and count += 1.',
      'Increment count or the loop never ends.',
    ],
  },
  'for Loop': {
    concept:
      'A for loop repeats code for each item in a sequence. for item in items: means “do the block once per item”.',
    steps: [
      'Write for and a loop variable name.',
      'Write in and the sequence (like range(5) or a list).',
      'End with : and indent the repeated lines.',
    ],
    exampleCode: 'for i in range(3):\n    print(i)',
    exampleNote: 'range(3) gives 0, 1, 2 — so the loop runs three times.',
    challenge: 'Use a for loop to print the numbers 1, 2, 3 each on their own line.',
    starterCode: '# Use for and range to print 1, 2, 3\n',
    solution: 'for n in range(1, 4):\n    print(n)',
    expectedOutput: '1\n2\n3',
    hints: [
      'range(1, 4) produces 1, 2, 3.',
      'Start with for n in range(1, 4):',
      'Indent print(n) underneath the for line.',
    ],
  },
  'while Loop': {
    concept:
      'while repeats as long as its condition is True. Update variables inside the loop so the condition eventually becomes False.',
    steps: [
      'Initialize counter variables before while.',
      'Write while condition:',
      'Update state inside the loop body.',
    ],
    exampleCode: 'n = 1\nwhile n <= 3:\n    print(n)\n    n += 1',
    exampleNote: 'n goes 1, 2, 3 then stops when n becomes 4.',
    challenge: 'Print 1, 2, 3 using a while loop starting n = 1 while n <= 3.',
    starterCode: 'n = 1\n',
    solution: 'n = 1\nwhile n <= 3:\n    print(n)\n    n += 1',
    expectedOutput: '1\n2\n3',
    hints: [
      'while n <= 3:',
      'print(n) then n += 1',
      'Same pattern as the example with n starting at 1.',
    ],
  },
  'range() Function': {
    concept:
      'range(stop) goes 0..stop-1. range(start, stop) goes start..stop-1. range(start, stop, step) skips by step.',
    steps: [
      'Decide start, stop, and optional step.',
      'Pass range(...) to for.',
      'print each value to see the sequence.',
    ],
    exampleCode: 'for x in range(2, 10, 2):\n    print(x)',
    exampleNote: 'Starts at 2, steps by 2: 2, 4, 6, 8.',
    challenge: 'Use for x in range(2, 10, 2) to print even numbers 2, 4, 6, 8.',
    starterCode: '# range with step 2\n',
    solution: 'for x in range(2, 10, 2):\n    print(x)',
    expectedOutput: '2\n4\n6\n8',
    hints: [
      'Third argument to range is step.',
      'for x in range(2, 10, 2):',
      'Indent print(x).',
    ],
  },
  'Nested Loops': {
    concept:
      'A loop inside a loop runs the inner loop completely for each outer step. Common for grids and pairs.',
    steps: [
      'Write the outer for loop.',
      'Indent an inner for loop inside it.',
      'print something showing both counters.',
    ],
    exampleCode: 'for i in range(2):\n    for j in range(2):\n        print(i, j)',
    exampleNote: 'Produces (0,0), (0,1), (1,0), (1,1) — four lines.',
    challenge:
      'Use nested loops: for i in range(2): for j in range(2): print(i, j)',
    starterCode: '# Nested for loops\n',
    solution: 'for i in range(2):\n    for j in range(2):\n        print(i, j)',
    expectedOutput: '0 0\n0 1\n1 0\n1 1',
    hints: [
      'Inner loop fully inside outer loop body.',
      'print(i, j) with comma.',
      'Four lines of output.',
    ],
  },
  'break Statement': {
    concept:
      'break exits the nearest loop immediately — useful when you found what you search for.',
    steps: [
      'Loop through items.',
      'When a condition hits, break.',
      'Code after the loop may still run.',
    ],
    exampleCode: 'for n in range(5):\n    if n == 3:\n        break\n    print(n)',
    exampleNote: 'Prints 0, 1, 2 then stops when n is 3.',
    challenge:
      'Loop for n in range(5). Print n each time, but break when n == 3 (before printing 3).',
    starterCode: 'for n in range(5):\n    # break at 3\n',
    solution: 'for n in range(5):\n    if n == 3:\n        break\n    print(n)',
    expectedOutput: '0\n1\n2',
    hints: [
      'Check if n == 3 at start of loop body.',
      'break before print when n is 3.',
      'Output stops at 2.',
    ],
  },
  'continue Statement': {
    concept:
      'continue skips the rest of the current iteration and jumps to the next loop cycle.',
    steps: [
      'Detect values to skip.',
      'continue before the main work.',
      'Loop keeps running for other values.',
    ],
    exampleCode: 'for n in range(4):\n    if n == 2:\n        continue\n    print(n)',
    exampleNote: 'Prints 0, 1, 3 — skips 2.',
    challenge:
      'for n in range(4): if n == 2 continue, else print n. Should skip printing 2.',
    starterCode: 'for n in range(4):\n',
    solution: 'for n in range(4):\n    if n == 2:\n        continue\n    print(n)',
    expectedOutput: '0\n1\n3',
    hints: [
      'if n == 2: continue',
      'print(n) when not continuing.',
      'Missing line is 2.',
    ],
  },
  'Practice Exercises': {
    concept:
      'Combine range, for, and if. Sum patterns often use a total variable updated each iteration.',
    steps: [
      'Initialize total = 0.',
      'Loop and add each number.',
      'print total after the loop.',
    ],
    exampleCode: 'total = 0\nfor n in range(1, 4):\n    total += n\nprint(total)',
    exampleNote: '1+2+3 = 6.',
    challenge: 'Sum numbers 1 through 3 using a for loop and print the total.',
    starterCode: 'total = 0\n',
    solution: 'total = 0\nfor n in range(1, 4):\n    total += n\nprint(total)',
    expectedOutput: '6',
    hints: [
      'for n in range(1, 4):',
      'total += n inside loop.',
      'print(total) after loop.',
    ],
  },
})
