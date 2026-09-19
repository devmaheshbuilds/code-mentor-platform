// During explain: read-only lines, green = current line. During practice: empty box.
import { useMentor } from '../../context/MentorContext'
import './Editor.css'

const EXAMPLE = `name = "Manas"
age = 19
print(name)
`

export function Editor() {
  const { code, setCode, phase, partIndex, partCount, currentPart, resetLesson } = useMentor()
  const locked = phase === 'explain'
  const lines = code.split(/\r?\n/)

  return (
    <section className="panel editor">
      <header className="panel__header">
        <h2>{phase === 'practice' ? 'Type this line' : 'Your code'}</h2>
        {phase === 'ready' ? (
          <button type="button" className="btn btn--ghost" onClick={() => setCode(EXAMPLE)}>
            Load example
          </button>
        ) : (
          <button type="button" className="btn btn--ghost" onClick={resetLesson}>
            Edit code again
          </button>
        )}
      </header>

      <p className="editor__help">
        {phase === 'explain'
          ? `The green line is the only line we are explaining now (${partIndex + 1} of ${partCount}).`
          : phase === 'practice'
            ? `Write line ${partIndex + 1} of ${partCount} yourself. Use hints if you get stuck.`
            : 'Type Python here, then press Explain my code.'}
      </p>

      {locked ? (
        <ol className="editor__lines">
          {lines.map((line, index) => {
            const active = currentPart ? line.trim() === currentPart.line : false
            return (
              <li key={`${index}-${line}`} className={active ? 'is-active' : undefined}>
                <span className="editor__n">{index + 1}</span>
                <code>{line || ' '}</code>
                {active ? <span className="editor__now">this line</span> : null}
              </li>
            )
          })}
        </ol>
      ) : (
        <>
          <label className="sr-only" htmlFor="code-editor">
            Python code
          </label>
          <textarea
            id="code-editor"
            className="editor__textarea"
            spellCheck={false}
            value={code}
            onChange={(event) => setCode(event.target.value)}
            placeholder={phase === 'practice' ? 'Type the line here' : 'name = "Manas"'}
          />
        </>
      )}
    </section>
  )
}
