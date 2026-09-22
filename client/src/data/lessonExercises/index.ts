import { CONDITIONS } from './conditions'
import { DICTIONARIES } from './dictionaries'
import { FUNCTIONS } from './functions'
import { LISTS } from './lists'
import { LOOPS } from './loops'
import { OPERATORS } from './operators'
import { PYTHON_BASICS } from './pythonBasics'
import { VARIABLES } from './variables'

export const ALL_LESSON_EXERCISES = {
  ...PYTHON_BASICS,
  ...VARIABLES,
  ...OPERATORS,
  ...CONDITIONS,
  ...LOOPS,
  ...FUNCTIONS,
  ...LISTS,
  ...DICTIONARIES,
}
