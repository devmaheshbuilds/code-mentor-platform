/**
 * Mock Python mentor used until the LoRA teacher is wired up.
 * buildLesson() splits code into one teachable line (part) each.
 */
import type { CodePart, Lesson } from '../types'

export function buildLesson(code: string): Lesson | null {
  const lines = usableLines(code)
  if (lines.length === 0) return null
  return { parts: lines.map((line) => makePart(line)) }
}

export function linesMatch(typed: string, target: string): boolean {
  return normalize(typed) === normalize(target)
}

function makePart(line: string): CodePart {
  const trimmed = line.trim()

  if (trimmed.startsWith('#')) {
    const note = trimmed.slice(1).trim() || 'a short reminder'
    return part(trimmed, {
      short: section(
        trimmed,
        'This line is a note for you. The computer does not run it.',
        [
          ['#', 'This mark means "this is only a note".'],
          [note, 'These words are for you, not for Python.'],
        ],
        'Python sees # and skips the rest of the line. Nothing is stored. Nothing is printed.',
      ),
      wordByWord: wordWalk(trimmed, [
        ['#', 'Read this as: "the computer should ignore this line."'],
        [note || '(your note)', 'Just human words. Like writing in a notebook.'],
      ]),
      detailed: section(
        trimmed,
        'Programmers write comments so they remember what the next lines are for.',
        [
          ['#', 'Starts a comment. Everything after it on this line is ignored.'],
          [note, 'You can write why the code exists, in any language you like.'],
        ],
        'Comments do not change how the program works. They only help people read the code later.',
      ),
      hints: noteHints('# this stores my name', trimmed),
    })
  }

  const assign = trimmed.match(/^(\w+)\s*=\s*(.+)$/)
  if (assign && !trimmed.startsWith('if ') && !trimmed.includes('==')) {
    const name = assign[1]
    const raw = assign[2].trim()
    const valueTalk = describeValue(raw)
    return part(trimmed, {
      short: section(
        trimmed,
        `This line saves ${valueTalk.easy} in a place called ${name}.`,
        [
          [name, `This is a variable. Think of a box with the label ${name}.`],
          ['=', 'This mark means: put the right side into the left box.'],
          [raw, valueTalk.piece],
        ],
        `After this line, the computer remembers ${name}. Whenever you use ${name} later, it means ${valueTalk.easy}.`,
      ),
      wordByWord: wordWalk(trimmed, [
        [name, `Say this as the box name. We will keep ${valueTalk.easy} here.`],
        ['=', 'Say this as "put".'],
        [raw, `Say this as ${valueTalk.easy}. ${valueTalk.why}`],
      ]),
      detailed: section(
        trimmed,
        `This is an assignment. Assignment means: give a name to a value so you can use it again.`,
        [
          [name, `Variable name. Use letters like this so you can find the value later.`],
          ['=', 'Not "equals" like in maths. In Python, one = means "store".'],
          [raw, `${valueTalk.piece} ${valueTalk.why}`],
        ],
        `${valueTalk.detail}\n\nIf you change this line later, ${name} will hold a new value. The old value is forgotten.`,
      ),
      hints: [
        `You need a labeled box. A good label is ${name}.`,
        `Write ${name} on the left side.`,
        `Put = in the middle. That means store.`,
        `On the right side write ${raw}.`,
        trimmed,
      ],
    })
  }

  const printMatch = trimmed.match(/^print\s*\((.*)\)\s*$/)
  if (printMatch) {
    const inside = printMatch[1].trim()
    const shown = inside ? describeValue(inside) : null
    return part(trimmed, {
      short: section(
        trimmed,
        inside
          ? `This line shows ${shown?.easy ?? inside} on the screen.`
          : 'This line shows a blank line on the screen.',
        [
          ['print', 'This word tells Python: show something to the user.'],
          ['( )', 'The round brackets hold the thing you want to show.'],
          [inside || '(empty)', inside ? (shown?.piece ?? inside) : 'Nothing is inside, so a empty line appears.'],
        ],
        inside
          ? `When this line runs, you will see ${shown?.easy ?? inside} on the screen.`
          : 'When this line runs, you will see an empty line.',
      ),
      wordByWord: wordWalk(trimmed, [
        ['print', 'Say this as "show on the screen".'],
        ['(', 'This opens the list of things to show.'],
        [inside || 'nothing', inside ? `This is what appears: ${shown?.easy ?? inside}.` : 'Nothing to show.'],
        [')', 'This closes the print.'],
      ]),
      detailed: section(
        trimmed,
        'print() is how a program talks to you. It does not save anything. It only displays.',
        [
          ['print', 'A built-in command. You do not create it. Python already knows it.'],
          ['( )', 'Commands like print need brackets, even if they look extra.'],
          [
            inside || '(empty)',
            inside
              ? `${shown?.detail ?? inside}\nIf this is a variable name, print shows what is inside the box, not the box name.`
              : 'Empty brackets print a blank line.',
          ],
        ],
        inside
          ? `Example: if the box already holds a value, print shows that value.\nYou will not see the word print on the screen. You only see the result.`
          : 'Use an empty print when you want space between other lines.',
      ),
      hints: [
        'You want the computer to show something.',
        'Type the word print.',
        'Add ( ) after print.',
        inside ? `Inside the brackets write ${inside}.` : 'Leave the brackets empty.',
        trimmed,
      ],
    })
  }

  if (/input\s*\(/.test(trimmed)) {
    const question = trimmed.match(/input\s*\((.*)\)/)?.[1]?.trim() || ''
    return part(trimmed, {
      short: section(
        trimmed,
        'This line stops and asks the user to type something.',
        [
          ['input', 'This word means: wait for the user to type, then press Enter.'],
          ['( )', 'Inside here you can put a question to show on the screen.'],
          [question || '(no question text)', question ? `The user sees this question first.` : 'No question text is shown. The program still waits for typing.'],
        ],
        'Whatever the user types is given back as text (letters), even if they type 19.',
      ),
      wordByWord: wordWalk(trimmed, [
        ['input', 'Say this as "ask the person".'],
        ['(', 'Open the question.'],
        [question || 'no question', question ? `This text is shown before the user types.` : 'No extra question text.'],
        [')', 'Close the question. Now Python waits.'],
      ]),
      detailed: section(
        trimmed,
        'input() is how a program listens. The program pauses until the user presses Enter.',
        [
          ['input', 'Built-in command. It always returns text, called a string.'],
          [question || '""', 'The question is only a prompt. It is not the answer.'],
          ['the answer', 'If you save it, like age = input(...), the typed words go into the box called age.'],
        ],
        'Important: "19" as text is not the same as the number 19.\nIf you want to do maths or compare with >, first turn it into a number with int().',
      ),
      hints: [
        'You need to ask the user to type.',
        'Use the word input.',
        'Put a question inside ( ) and quotes.',
        'Save it in a box, like age = input("Age: ").',
        trimmed,
      ],
    })
  }

  const forMatch = trimmed.match(/^for\s+(\w+)\s+in\s+(.+):$/)
  if (forMatch || /^for\s+/.test(trimmed)) {
    const item = forMatch?.[1] ?? 'item'
    const source = forMatch?.[2] ?? 'a list'
    const rangeTalk = describeRange(source)
    return part(trimmed, {
      short: section(
        trimmed,
        'This line starts a loop. A loop means: do the same work again and again.',
        [
          ['for', 'This word means: go through things one by one.'],
          [item, `Each time, the current thing is stored in ${item}.`],
          ['in', 'This word means: take items from the thing on the right.'],
          [source, rangeTalk],
          [':', 'The colon means: the next indented lines belong to this loop.'],
        ],
        `Python will run the lines under this, once for every item.\n${item} changes each time.`,
      ),
      wordByWord: wordWalk(trimmed, [
        ['for', 'Say this as "for each".'],
        [item, `This is the name of the current item.`],
        ['in', 'Say this as "coming from".'],
        [source, rangeTalk],
        [':', 'Say this as "now do the lines below".'],
      ]),
      detailed: section(
        trimmed,
        'A for loop repeats a block. The block is every line that is indented under this line.',
        [
          ['for', 'Starts the loop.'],
          [item, `A new variable. First time it is the first item. Next time the next item.`],
          ['in', 'Points at the collection you walk through.'],
          [source, `${rangeTalk}`],
          [':', 'Required. If you forget :, Python shows an error.'],
        ],
        'The lines under the loop must be indented (moved right with space or Tab).\nWhen the items are finished, the loop stops and Python continues after the block.',
      ),
      hints: [
        'You want to repeat work.',
        'Start with for.',
        `Write ${item} in ${source}`,
        'End the line with :',
        trimmed,
      ],
    })
  }

  if (/^while\s+/.test(trimmed)) {
    const check = trimmed.replace(/^while\s+/, '').replace(/:$/, '').trim() || 'a yes/no check'
    return part(trimmed, {
      short: section(
        trimmed,
        'This line repeats while a question stays yes.',
        [
          ['while', 'This word means: keep going if the check is true.'],
          [check, 'This is the question Python asks again and again.'],
          [':', 'The next indented lines are what gets repeated.'],
        ],
        'If the check never becomes no, the loop never stops. So something inside the loop should change the check.',
      ),
      wordByWord: wordWalk(trimmed, [
        ['while', 'Say this as "as long as".'],
        [check, 'Say this as the question that must stay yes.'],
        [':', 'Say this as "do the lines below".'],
      ]),
      detailed: section(
        trimmed,
        'while is a loop that depends on a condition, not on a fixed list.',
        [
          ['while', 'Checks the condition before each repeat.'],
          [check, 'If this is true, the block runs. Then Python checks again.'],
          [':', 'Starts the indented block.'],
        ],
        'True means yes. False means no.\nIf you forget to change the values used in the check, you can create an infinite loop.',
      ),
      hints: [
        'You want to keep going until something changes.',
        'Start with while.',
        `Write the check: ${check}`,
        'End with :',
        trimmed,
      ],
    })
  }

  if (/^if\s+/.test(trimmed)) {
    const check = trimmed.replace(/^if\s+/, '').replace(/:$/, '').trim() || 'a yes/no check'
    return part(trimmed, {
      short: section(
        trimmed,
        'This line asks a yes/no question. The next lines run only if the answer is yes.',
        [
          ['if', 'This word means: only do the next step when the check is true.'],
          [check, `This is the question. ${describeCheck(check)}`],
          [':', 'The colon means: the indented lines below belong to this if.'],
        ],
        'If the answer is no, Python skips those indented lines and continues after them.',
      ),
      wordByWord: wordWalk(trimmed, [
        ['if', 'Say this as "only if".'],
        [check, `This is the question: ${describeCheck(check)}`],
        [':', 'Say this as "then do the lines below".'],
      ]),
      detailed: section(
        trimmed,
        'if lets the computer choose. It does not loop. It checks once, then moves on.',
        [
          ['if', 'Starts a choice.'],
          [check, `${describeCheck(check)}\n== means "is the same as". = means "store". Do not mix them.`],
          [':', 'Required. Then indent the lines that should run when yes.'],
        ],
        'True / yes: run the block.\nFalse / no: skip the block.\nYou can later add else for the "no" path.',
      ),
      hints: [
        'You want the computer to choose.',
        'Start with if.',
        `Write the check: ${check}`,
        'End with :',
        trimmed,
      ],
    })
  }

  if (/^elif\s+/.test(trimmed)) {
    const check = trimmed.replace(/^elif\s+/, '').replace(/:$/, '').trim() || 'another check'
    return part(trimmed, {
      short: section(
        trimmed,
        'This is a second chance. Python looks here only if the if above was no.',
        [
          ['elif', 'Short for "else if". Another question, not the first one.'],
          [check, describeCheck(check)],
          [':', 'The indented lines under this run only when this check is yes.'],
        ],
        'Only one of if / elif / else blocks will run.',
      ),
      wordByWord: wordWalk(trimmed, [
        ['elif', 'Say this as "or else, if this".'],
        [check, describeCheck(check)],
        [':', 'Then do the lines below.'],
      ]),
      detailed: section(
        trimmed,
        'elif is used after if. It is not checked if the first if already matched.',
        [
          ['elif', 'Second (or third) door.'],
          [check, describeCheck(check)],
        ],
        'Order matters. Python tests from top to bottom and stops at the first yes.',
      ),
      hints: [
        'The first if was not enough.',
        'Type elif.',
        `Write ${check}`,
        'End with :',
        trimmed,
      ],
    })
  }

  if (trimmed === 'else:') {
    return part(trimmed, {
      short: section(
        trimmed,
        'This is the backup plan. It runs when every check above was no.',
        [
          ['else', 'Means: if nothing above was true, do this.'],
          [':', 'The indented lines below are the backup steps.'],
        ],
        'else has no extra question. It always catches the leftover cases.',
      ),
      wordByWord: wordWalk(trimmed, [
        ['else', 'Say this as "otherwise".'],
        [':', 'Then do the lines below.'],
      ]),
      detailed: section(
        trimmed,
        'else must come after if (and any elif). It cannot stand alone.',
        [
          ['else', 'No condition. It is the last door.'],
          [':', 'Required, then indent the backup lines.'],
        ],
        'If the if above was yes, else does not run at all.',
      ),
      hints: [
        'You need a backup plan.',
        'Type else.',
        'Do not write a check after else.',
        'Put : at the end.',
        trimmed,
      ],
    })
  }

  if (/^def\s+/.test(trimmed)) {
    const fn = trimmed.match(/^def\s+(\w+)/)?.[1] ?? 'this_name'
    return part(trimmed, {
      short: section(
        trimmed,
        `This line names a small recipe called ${fn}. The recipe runs later, not right now.`,
        [
          ['def', 'This word means: define a function (a reusable set of steps).'],
          [fn, 'This is the recipe name.'],
          ['( )', 'This is where inputs can go later. Empty ( ) means no extra inputs now.'],
          [':', 'The indented lines below are the steps of the recipe.'],
        ],
        `Nothing happens until you call it later, like ${fn}().`,
      ),
      wordByWord: wordWalk(trimmed, [
        ['def', 'Say this as "make a recipe named".'],
        [fn, 'This is the name you will use later.'],
        ['( )', 'This is where you can pass extra information.'],
        [':', 'The steps are the indented lines below.'],
      ]),
      detailed: section(
        trimmed,
        'A function lets you write steps once and reuse them.',
        [
          ['def', 'Define. You are teaching Python a new command with this name.'],
          [fn, 'Call this later to run the steps.'],
          ['( )', 'Values inside here are called arguments. They go into the function when you call it.'],
        ],
        'The lines under def must be indented.\nWriting def does not run the steps. Calling the name does.',
      ),
      hints: [
        'You want to name a set of steps.',
        'Start with def.',
        `Write ${fn}()`,
        'End with :',
        trimmed,
      ],
    })
  }

  return part(trimmed, {
    short: section(
      trimmed,
      'This is one instruction for Python.',
      [[trimmed, 'Read it slowly from left to right. Each word or mark has a job.']],
      'If this line looks new, press I understood nothing. I will go even slower.',
    ),
    wordByWord: wordWalk(
      trimmed,
      tokenize(trimmed).map((piece) => [piece, guessToken(piece)] as [string, string]),
    ),
    detailed: section(
      trimmed,
      'Python tries to run this whole line as one command.',
      tokenize(trimmed).map((piece) => [piece, guessToken(piece)]),
      'Check spelling, brackets, and quotes. A missing " or ) can break the whole line.',
    ),
    hints: [
      'Look at the line on the left.',
      'Copy the same words, in the same order.',
      'Keep the same marks: = ( ) : " \'',
      'Check spaces. Then try again.',
      trimmed,
    ],
  })
}

function part(
  line: string,
  fields: Omit<CodePart, 'line'>,
): CodePart {
  return { line, ...fields }
}

function section(
  line: string,
  does: string,
  pieces: Array<[string, string]>,
  after: string,
): string {
  const pieceText = pieces.map(([bit, meaning]) => `• ${bit}\n  ${meaning}`).join('\n\n')
  return [
    `We are only looking at this line:\n${line}`,
    `What this line does:\n${does}`,
    `What each piece means:\n\n${pieceText}`,
    `What happens after it runs:\n${after}`,
  ].join('\n\n')
}

function wordWalk(line: string, pieces: Array<[string, string]>): string {
  const steps = pieces
    .map(([bit, meaning], index) => `Step ${index + 1}: ${bit}\n${meaning}`)
    .join('\n\n')
  return `We will read this line very slowly:\n${line}\n\n${steps}\n\nThat is the whole line. Nothing else on this part.`
}

function describeValue(raw: string): { easy: string; piece: string; why: string; detail: string } {
  const value = raw.trim()
  if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
    const text = value.slice(1, -1)
    return {
      easy: `the text ${text}`,
      piece: `This is text (a string). The quotes tell Python these are letters, not a command.`,
      why: `The quotes " " or ' ' wrap the text. Python does not show the quotes later unless you ask.`,
      detail: `Type: text / string. Inside the quotes is exactly: ${text || '(empty text)'}.`,
    }
  }
  if (/^\d+$/.test(value)) {
    return {
      easy: `the number ${value}`,
      piece: `This is a whole number. No quotes, so Python can do maths with it.`,
      why: `If you wrote "${value}" with quotes, it would be text, not a number.`,
      detail: `Type: integer (int). You can add, subtract, or compare it with > <.`,
    }
  }
  if (/^\d+\.\d+$/.test(value)) {
    return {
      easy: `the number ${value}`,
      piece: `This is a number with a decimal point.`,
      why: `Python treats this as a float (a number that can have a fraction).`,
      detail: `Type: float. Example: 1.5 + 2.5 works because both are numbers.`,
    }
  }
  if (value === 'True' || value === 'False') {
    return {
      easy: value === 'True' ? 'yes' : 'no',
      piece: `${value} is a yes/no value. True means yes. False means no.`,
      why: `These words must start with a capital letter in Python.`,
      detail: `Type: boolean (bool). Used in if and while checks.`,
    }
  }
  if (/^input\s*\(/.test(value)) {
    return {
      easy: 'whatever the user types',
      piece: 'input() waits for the user, then gives back their words.',
      why: 'The answer is always text, even if they type digits.',
      detail: 'If you need a number, wrap it: int(input(...)).',
    }
  }
  if (/^int\s*\(/.test(value)) {
    return {
      easy: 'a number made from something else',
      piece: 'int() tries to turn what is inside into a whole number.',
      why: 'Use this when input() gave you text like "19" and you need 19.',
      detail: 'If the text is not a number, Python will show an error.',
    }
  }
  return {
    easy: `whatever is inside ${value}`,
    piece: `${value} is a name. Python looks up the box with this label and uses what is inside.`,
    why: `This only works if you already created ${value} on an earlier line.`,
    detail: `If ${value} was never created, Python says NameError. That means: I cannot find that box.`,
  }
}

function describeRange(source: string): string {
  const range = source.match(/^range\s*\(\s*([^)]+)\s*\)$/)
  if (!range) {
    return `${source} is the list of things to walk through, one by one.`
  }
  const args = range[1].split(',').map((part) => part.trim())
  if (args.length === 1) {
    return `range(${args[0]}) makes numbers starting at 0 and stopping before ${args[0]}.`
  }
  if (args.length === 2) {
    return `range(${args[0]}, ${args[1]}) makes numbers from ${args[0]} up to, but not including, ${args[1]}.`
  }
  return `range(${args.join(', ')}) makes numbers from ${args[0]}, stopping before ${args[1]}, jumping by ${args[2]}.`
}

function describeCheck(check: string): string {
  if (check.includes('==')) {
    const [left, right] = check.split('==').map((part) => part.trim())
    return `Is ${left} the same as ${right}? == asks. It does not store.`
  }
  if (check.includes('!=')) {
    const [left, right] = check.split('!=').map((part) => part.trim())
    return `Is ${left} different from ${right}?`
  }
  if (check.includes('>=')) return `Is the left side greater than or equal to the right side?`
  if (check.includes('<=')) return `Is the left side less than or equal to the right side?`
  if (check.includes('>')) return `Is the left side bigger than the right side?`
  if (check.includes('<')) return `Is the left side smaller than the right side?`
  return `Python checks if this is true (yes) or false (no).`
}

function tokenize(line: string): string[] {
  return line.match(/"[^"]*"|'[^']*'|[A-Za-z_]\w*|\d+\.\d+|\d+|==|!=|>=|<=|[=<>():,\[\]]|\S+/g) ?? [line]
}

function guessToken(piece: string): string {
  if (piece === '=') return 'Store the right side into the left side.'
  if (piece === '==') return 'Ask: are these two the same?'
  if (piece === '(' || piece === ')') return 'Bracket. Groups things for a command.'
  if (piece === ':') return 'Means: the next indented lines belong to this line.'
  if (piece === ',') return 'Separates two things in a list.'
  if (/^["']/.test(piece)) return `Text: ${piece}.`
  if (/^\d/.test(piece)) return `Number: ${piece}.`
  return `This word or name is "${piece}".`
}

function noteHints(example: string, line: string): [string, string, string, string, string] {
  return [
    'This line should start with a mark that means note.',
    'That mark is #.',
    'After # write words for yourself.',
    `Like: ${example}`,
    line,
  ]
}

function usableLines(code: string): string[] {
  return code
    .split(/\r?\n/)
    .map((line) => line.trimEnd())
    .filter((line) => line.trim().length > 0)
}

function normalize(value: string): string {
  return value
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/"/g, "'")
    .replace(/,$/, '')
}
