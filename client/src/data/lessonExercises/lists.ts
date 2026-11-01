import { lessonExercises } from './types'

export const LISTS = lessonExercises('lists', {
  'Introduction to Lists': {
    concept:
      'Lists store ordered collections in [ ]. Items stay in sequence and can be changed (mutable).',
    steps: [
      'Create with square brackets.',
      'Separate items with commas.',
      'print the whole list to inspect it.',
    ],
    exampleCode: 'nums = [1, 2, 3]\nprint(nums)',
    exampleNote: 'Order is preserved: 1, then 2, then 3.',
    challenge: 'Create nums = [1, 2, 3] and print nums.',
    starterCode: '# Create a list\n',
    solution: 'nums = [1, 2, 3]\nprint(nums)',
    expectedOutput: '[1, 2, 3]',
    hints: [
      'Square brackets for lists.',
      'nums = [1, 2, 3]',
      'print(nums)',
    ],
  },
  'Creating Lists': {
    concept:
      'A list holds multiple values in order inside square brackets [ ]. You can change items later.',
    steps: [
      'Pick a name for the list.',
      'Put items inside [ ] separated by commas.',
      'Use print to see the whole list.',
    ],
    exampleCode: 'fruits = ["apple", "banana", "cherry"]\nprint(fruits)',
    exampleNote: 'Lists keep order: apple is first, cherry is last.',
    challenge: 'Create a list colors with "red", "green", "blue" and print it.',
    starterCode: '# Create colors list and print it\n',
    solution: 'colors = ["red", "green", "blue"]\nprint(colors)',
    expectedOutput: "['red', 'green', 'blue']",
    hints: [
      'Lists use square brackets [ ].',
      'Strings inside need quotes: "red", "green", "blue".',
      'colors = ["red", "green", "blue"] then print(colors).',
    ],
  },
  'Accessing List Elements': {
    concept:
      'Index from 0: first item is list[0]. Negative indices count from the end: list[-1] is last.',
    steps: [
      'Identify position (0-based).',
      'Use square brackets after the list name.',
      'print the element.',
    ],
    exampleCode: 'items = ["a", "b", "c"]\nprint(items[0])\nprint(items[-1])',
    exampleNote: 'items[0] is "a", items[-1] is "c".',
    challenge: 'Create items = ["a", "b", "c"] and print items[0] (the first item).',
    starterCode: 'items = ["a", "b", "c"]\n',
    solution: 'items = ["a", "b", "c"]\nprint(items[0])',
    expectedOutput: 'a',
    hints: [
      'First index is 0 not 1.',
      'print(items[0])',
      'Output letter a.',
    ],
  },
  'List Slicing': {
    concept:
      'Slice with [start:stop] — stop is exclusive. Omit start/stop for defaults. Creates a new sub-list.',
    steps: [
      'Pick start and stop indices.',
      'Use list[start:stop].',
      'print the slice.',
    ],
    exampleCode: 'nums = [10, 20, 30, 40]\nprint(nums[1:3])',
    exampleNote: 'Indices 1 and 2 → [20, 30].',
    challenge: 'Given nums = [10, 20, 30, 40], print nums[1:3].',
    starterCode: 'nums = [10, 20, 30, 40]\n',
    solution: 'nums = [10, 20, 30, 40]\nprint(nums[1:3])',
    expectedOutput: '[20, 30]',
    hints: [
      'Slice syntax [1:3]',
      'Stop index 3 is excluded.',
      'print(nums[1:3])',
    ],
  },
  'Adding and Removing Elements': {
    concept:
      'append adds to end; pop removes from end (or at index). Lists grow and shrink dynamically.',
    steps: [
      'Start with a list.',
      'append a new item.',
      'print after the change.',
    ],
    exampleCode: 'bag = ["book"]\nbag.append("pen")\nprint(bag)',
    exampleNote: 'bag becomes ["book", "pen"].',
    challenge: 'Start bag = ["book"], append "pen", then print bag.',
    starterCode: 'bag = ["book"]\n',
    solution: 'bag = ["book"]\nbag.append("pen")\nprint(bag)',
    expectedOutput: "['book', 'pen']",
    hints: [
      'bag.append("pen")',
      'After append, print bag.',
      'Two items in the list.',
    ],
  },
  'List Methods': {
    concept:
      'Lists have methods: .count(x), .index(x), .sort(), .reverse() — called with list.method().',
    steps: [
      'Create a list with duplicates if needed.',
      'Call a method like count.',
      'print the result.',
    ],
    exampleCode: 'nums = [1, 2, 2, 3]\nprint(nums.count(2))',
    exampleNote: 'count(2) returns how many times 2 appears — 2.',
    challenge: 'Create nums = [1, 2, 2, 3] and print nums.count(2).',
    starterCode: 'nums = [1, 2, 2, 3]\n',
    solution: 'nums = [1, 2, 2, 3]\nprint(nums.count(2))',
    expectedOutput: '2',
    hints: [
      'Use .count(2) not count(list).',
      'print(nums.count(2))',
      'Answer is 2.',
    ],
  },
  'Introduction to Tuples': {
    concept:
      'Tuples use ( ) and are immutable — after creation you cannot change items. Good for fixed records.',
    steps: [
      'Create with parentheses and commas.',
      'Access like lists with [index].',
      'print elements — no append on tuples.',
    ],
    exampleCode: 'point = (3, 4)\nprint(point[0])',
    exampleNote: 'point[0] is 3 — x coordinate.',
    challenge: 'Create point = (3, 4) and print point[0].',
    starterCode: 'point = (3, 4)\n',
    solution: 'point = (3, 4)\nprint(point[0])',
    expectedOutput: '3',
    hints: [
      'Tuples use parentheses.',
      'First element index 0.',
      'print(point[0])',
    ],
  },
  'Tuple Operations': {
    concept:
      'Concatenate tuples with +, repeat with *, unpack with a, b = tup. They behave like immutable lists.',
    steps: [
      'Create two tuples.',
      'Combine with +.',
      'print the new tuple.',
    ],
    exampleCode: 'a = (1, 2)\nb = (3,)\nprint(a + b)',
    exampleNote: '(1, 2) + (3,) → (1, 2, 3). Single-item tuple needs trailing comma.',
    challenge: 'Set a = (1, 2) and b = (3,). Print a + b.',
    starterCode: 'a = (1, 2)\nb = (3,)\n',
    solution: 'a = (1, 2)\nb = (3,)\nprint(a + b)',
    expectedOutput: '(1, 2, 3)',
    hints: [
      'b must be (3,) with comma.',
      'print(a + b)',
      'Concatenated tuple.',
    ],
  },
  'Practice Exercises': {
    concept:
      'Practice list creation, indexing, and append together in one short program.',
    steps: [
      'Build initial list.',
      'Modify with append.',
      'print length or content.',
    ],
    exampleCode: 'tasks = ["read"]\ntasks.append("code")\nprint(len(tasks))',
    exampleNote: 'len(tasks) is 2 after append.',
    challenge: 'Start tasks = ["read"], append "code", print len(tasks).',
    starterCode: 'tasks = ["read"]\n',
    solution: 'tasks = ["read"]\ntasks.append("code")\nprint(len(tasks))',
    expectedOutput: '2',
    hints: [
      'tasks.append("code")',
      'len(tasks) counts items.',
      'print(len(tasks))',
    ],
  },
})
