import { lessonExercises } from './types'

export const FUNCTIONS = lessonExercises('functions', {
  'What are Functions?': {
    concept:
      'A function is a named block of code you can run anytime. It reduces repetition and makes programs easier to read.',
    steps: [
      'Define once with def.',
      'Call whenever needed.',
      'Think of functions as mini-programs inside your program.',
    ],
    exampleCode: 'def show():\n    print("Functions reuse code")\n\nshow()',
    exampleNote: 'def creates it; show() executes it.',
    challenge: 'Define show that prints "Functions reuse code" and call show().',
    starterCode: '# def show ...\n',
    solution: 'def show():\n    print("Functions reuse code")\n\nshow()',
    expectedOutput: 'Functions reuse code',
    hints: [
      'def show(): with colon.',
      'Indent the print line.',
      'Call show() after the definition.',
    ],
  },
  'Defining a Function': {
    concept:
      'A function is a reusable recipe. def names it; the indented lines below are what it does when called.',
    steps: [
      'Start with def function_name():',
      'Indent the body — the steps of the recipe.',
      'Call it later with function_name().',
    ],
    exampleCode: 'def greet():\n    print("Hello!")\n\ngreet()',
    exampleNote: 'def creates the function; greet() runs it.',
    challenge:
      'Define a function say_hi that prints "Hi there!" and call it once.',
    starterCode: '# Define say_hi and call it\n',
    solution: 'def say_hi():\n    print("Hi there!")\n\nsay_hi()',
    expectedOutput: 'Hi there!',
    hints: [
      'Use def say_hi(): with a colon at the end.',
      'Indent print("Hi there!") under def.',
      'Call say_hi() on a new line after the function.',
    ],
  },
  'Calling Functions': {
    concept:
      'Calling a function runs its body. Use name() with parentheses — empty if there are no arguments.',
    steps: [
      'Define the function first.',
      'Call it one or more times.',
      'Each call runs the body again.',
    ],
    exampleCode: 'def ping():\n    print("pong")\n\nping()\nping()',
    exampleNote: 'Two calls → two lines of pong.',
    challenge: 'Define ping that prints "pong", then call ping() twice.',
    starterCode: '# def ping and two calls\n',
    solution: 'def ping():\n    print("pong")\n\nping()\nping()',
    expectedOutput: 'pong\npong',
    hints: [
      'def ping(): print pong inside.',
      'Two ping() lines after definition.',
      'Output is two lines.',
    ],
  },
  'Function Parameters': {
    concept:
      'Parameters are inputs in the def line. Arguments are the actual values you pass when calling.',
    steps: [
      'Put parameter names inside def(...).',
      'Use those names in the body.',
      'Pass values when calling.',
    ],
    exampleCode: 'def greet(name):\n    print("Hello,", name)\n\ngreet("Sam")',
    exampleNote: 'name becomes "Sam" inside the function.',
    challenge: 'Define greet(name) that prints Hello, plus name. Call greet("Sam").',
    starterCode: '# def greet(name)\n',
    solution: 'def greet(name):\n    print("Hello,", name)\n\ngreet("Sam")',
    expectedOutput: 'Hello, Sam',
    hints: [
      'def greet(name):',
      'print("Hello,", name)',
      'greet("Sam")',
    ],
  },
  'Return Statement': {
    concept:
      'return sends a value back to the caller. After return, the function stops.',
    steps: [
      'Compute a result inside the function.',
      'return that value.',
      'print or store what the call returns.',
    ],
    exampleCode: 'def double(n):\n    return n * 2\n\nprint(double(5))',
    exampleNote: 'double(5) evaluates to 10.',
    challenge: 'Define double(n) that returns n * 2. Print double(5).',
    starterCode: '# def double with return\n',
    solution: 'def double(n):\n    return n * 2\n\nprint(double(5))',
    expectedOutput: '10',
    hints: [
      'return n * 2 inside function.',
      'print(double(5)) outside.',
      'Output 10.',
    ],
  },
  'Default Arguments': {
    concept:
      'Default parameters get a fallback value if the caller omits that argument: def f(x=1).',
    steps: [
      'Put defaults in the def parameter list.',
      'Call with or without that argument.',
      'Observe which value is used.',
    ],
    exampleCode: 'def power(base, exp=2):\n    return base ** exp\n\nprint(power(3))',
    exampleNote: 'power(3) uses exp=2 → 9.',
    challenge: 'Define power(base, exp=2) returning base ** exp. Print power(3).',
    starterCode: '# default exp=2\n',
    solution: 'def power(base, exp=2):\n    return base ** exp\n\nprint(power(3))',
    expectedOutput: '9',
    hints: [
      'exp=2 in def line.',
      'return base ** exp',
      'power(3) → 3 squared = 9.',
    ],
  },
  'Keyword Arguments': {
    concept:
      'Pass arguments by name: func(a=1, b=2) — order does not matter when all are keyword.',
    steps: [
      'Define a function with multiple parameters.',
      'Call using name=value syntax.',
      'print the result.',
    ],
    exampleCode: 'def divide(a, b):\n    return a / b\n\nprint(divide(b=2, a=10))',
    exampleNote: 'b=2 and a=10 still divides 10 by 2.',
    challenge: 'Define divide(a, b) returning a / b. Print divide(b=2, a=10).',
    starterCode: '# keyword argument call\n',
    solution: 'def divide(a, b):\n    return a / b\n\nprint(divide(b=2, a=10))',
    expectedOutput: '5.0',
    hints: [
      'return a / b',
      'Call with b=2, a=10',
      '10 / 2 = 5.0',
    ],
  },
  'Practice Exercises': {
    concept:
      'Build a small function that combines parameters and return, then print the result.',
    steps: [
      'Define with at least one parameter.',
      'return a computed value.',
      'print( function_call() ).',
    ],
    exampleCode: 'def add(a, b):\n    return a + b\n\nprint(add(4, 6))',
    exampleNote: 'add returns 10.',
    challenge: 'Define add(a, b) returning a + b. Print add(4, 6).',
    starterCode: '# practice function\n',
    solution: 'def add(a, b):\n    return a + b\n\nprint(add(4, 6))',
    expectedOutput: '10',
    hints: [
      'def add(a, b):',
      'return a + b',
      'print(add(4, 6))',
    ],
  },
})
