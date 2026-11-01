import { lessonExercises } from './types'

export const DICTIONARIES = lessonExercises('dictionaries', {
  'What is a Dictionary?': {
    concept:
      'Dictionaries map keys to values — like a real dictionary maps words to definitions. Lookup by key is fast.',
    steps: [
      'Think of labels (keys) and data (values).',
      'Use { key: value } syntax.',
      'Access with brackets: d[key].',
    ],
    exampleCode: 'cap = {"India": "New Delhi"}\nprint(cap["India"])',
    exampleNote: 'Key "India" returns "New Delhi".',
    challenge: 'Create cap = {"India": "New Delhi"} and print cap["India"].',
    starterCode: '# capital dictionary\n',
    solution: 'cap = {"India": "New Delhi"}\nprint(cap["India"])',
    expectedOutput: 'New Delhi',
    hints: [
      'Curly braces for dict.',
      'print(cap["India"])',
      'Key must match exactly.',
    ],
  },
  'Creating Dictionaries': {
    concept:
      'A dictionary stores key: value pairs inside { }. Keys are labels; values are the data.',
    steps: [
      'Use curly braces { }.',
      'Write key: value pairs separated by commas.',
      'Access a value with dict[key].',
    ],
    exampleCode: 'student = {"name": "Riya", "grade": 9}\nprint(student["name"])',
    exampleNote: 'student["name"] looks up the value for the key "name".',
    challenge:
      'Create pet = {"animal": "dog", "age": 3}. Print pet["animal"].',
    starterCode: '# Create pet dictionary and print the animal\n',
    solution: 'pet = {"animal": "dog", "age": 3}\nprint(pet["animal"])',
    expectedOutput: 'dog',
    hints: [
      'Dictionaries use { "key": value } syntax.',
      'Both keys and string values need quotes.',
      'pet = {"animal": "dog", "age": 3} then print(pet["animal"]).',
    ],
  },
  'Accessing Values': {
    concept:
      'Use dict[key] for direct access. .get(key, default) avoids errors if the key might be missing.',
    steps: [
      'Try dict[key] when key exists.',
      'Or use .get with a default.',
      'print the looked-up value.',
    ],
    exampleCode: 'scores = {"math": 90}\nprint(scores.get("math"))\nprint(scores.get("art", 0))',
    exampleNote: 'get("art", 0) returns 0 because art is missing.',
    challenge: 'Set scores = {"math": 90}. Print scores.get("math").',
    starterCode: 'scores = {"math": 90}\n',
    solution: 'scores = {"math": 90}\nprint(scores.get("math"))',
    expectedOutput: '90',
    hints: [
      '.get("math") not ["math"] is fine too.',
      'print(scores.get("math"))',
      'Output 90.',
    ],
  },
  'Adding and Updating Items': {
    concept:
      'Assign to a new key to add: d["new"] = value. Assign to existing key to update.',
    steps: [
      'Start with a dict.',
      'Set d[key] = value.',
      'print to confirm.',
    ],
    exampleCode: 'user = {"name": "Ana"}\nuser["score"] = 10\nprint(user["score"])',
    exampleNote: 'New key score added with value 10.',
    challenge: 'Start user = {"name": "Ana"}. Add user["score"] = 10 and print user["score"].',
    starterCode: 'user = {"name": "Ana"}\n',
    solution: 'user = {"name": "Ana"}\nuser["score"] = 10\nprint(user["score"])',
    expectedOutput: '10',
    hints: [
      'user["score"] = 10 adds the pair.',
      'print(user["score"])',
      'Output 10.',
    ],
  },
  'Removing Items': {
    concept:
      'del d[key] removes a pair. pop(key) removes and returns the value. popitem() removes last inserted (3.7+).',
    steps: [
      'Pick key to remove.',
      'Use del or pop.',
      'print the dict or returned value.',
    ],
    exampleCode: 'data = {"a": 1, "b": 2}\nremoved = data.pop("a")\nprint(removed)',
    exampleNote: 'pop returns 1 and removes key "a".',
    challenge: 'Set data = {"a": 1, "b": 2}. Use removed = data.pop("a") and print removed.',
    starterCode: 'data = {"a": 1, "b": 2}\n',
    solution: 'data = {"a": 1, "b": 2}\nremoved = data.pop("a")\nprint(removed)',
    expectedOutput: '1',
    hints: [
      'data.pop("a") returns the value.',
      'Store in removed variable.',
      'print(removed)',
    ],
  },
  'Dictionary Methods': {
    concept:
      'Common methods: .keys(), .values(), .items() — return views you can loop over.',
    steps: [
      'Create a small dict.',
      'Call .keys() or .values().',
      'print the view (shows keys or values).',
    ],
    exampleCode: 'info = {"x": 1, "y": 2}\nprint(list(info.keys()))',
    exampleNote: 'list(...) shows keys as a readable list.',
    challenge: 'Set info = {"x": 1, "y": 2} and print list(info.keys()).',
    starterCode: 'info = {"x": 1, "y": 2}\n',
    solution: 'info = {"x": 1, "y": 2}\nprint(list(info.keys()))',
    expectedOutput: "['x', 'y']",
    hints: [
      'info.keys() then wrap in list().',
      'print(list(info.keys()))',
      'Order may vary in older Python; keys x and y.',
    ],
  },
  'Looping Through Dictionaries': {
    concept:
      'for key in d: visits keys. for k, v in d.items(): gives both key and value each iteration.',
    steps: [
      'Use .items() in the for line.',
      'Unpack to two variables.',
      'print inside the loop.',
    ],
    exampleCode: 'pairs = {"a": 1}\nfor k, v in pairs.items():\n    print(k, v)',
    exampleNote: 'Prints a 1 with a space.',
    challenge: 'Loop for k, v in pairs.items() where pairs = {"a": 1} and print k, v.',
    starterCode: 'pairs = {"a": 1}\n',
    solution: 'pairs = {"a": 1}\nfor k, v in pairs.items():\n    print(k, v)',
    expectedOutput: 'a 1',
    hints: [
      'for k, v in pairs.items():',
      'print(k, v) indented.',
      'One line output.',
    ],
  },
  'Nested Dictionaries': {
    concept:
      'Values can be other dicts or lists — nested structures model real data (users with profiles, etc.).',
    steps: [
      'Outer dict holds inner dict as a value.',
      'Chain brackets: outer["inner"]["field"].',
      'print the deep value.',
    ],
    exampleCode: 'user = {"profile": {"city": "Pune"}}\nprint(user["profile"]["city"])',
    exampleNote: 'Two lookups: profile first, then city.',
    challenge:
      'Create user = {"profile": {"city": "Pune"}} and print user["profile"]["city"].',
    starterCode: 'user = {"profile": {"city": "Pune"}}\n',
    solution: 'user = {"profile": {"city": "Pune"}}\nprint(user["profile"]["city"])',
    expectedOutput: 'Pune',
    hints: [
      'Double bracket access.',
      'user["profile"]["city"]',
      'print that expression.',
    ],
  },
  'Practice Exercises': {
    concept:
      'Build a dict, update a value, loop items, print each pair — mirrors real config/settings code.',
    steps: [
      'Create dict with two keys.',
      'Update one value.',
      'Loop and print k, v.',
    ],
    exampleCode: 'cfg = {"theme": "dark"}\ncfg["theme"] = "light"\nfor k, v in cfg.items():\n    print(k, v)',
    exampleNote: 'After update, theme is light.',
    challenge:
      'cfg = {"theme": "dark"}, set cfg["theme"] = "light", loop items and print k, v.',
    starterCode: 'cfg = {"theme": "dark"}\n',
    solution:
      'cfg = {"theme": "dark"}\ncfg["theme"] = "light"\nfor k, v in cfg.items():\n    print(k, v)',
    expectedOutput: 'theme light',
    hints: [
      'Update before the loop.',
      'for k, v in cfg.items():',
      'print(k, v)',
    ],
  },
})
