import { useState } from 'react'
import { CodeEditor } from './CodeEditor'
import './Editor.css'

const STARTER_CODE = `# Write your Python code here

name = "Code Mentor"
print(name)
`

export function Editor() {
  const [code, setCode] = useState(STARTER_CODE)
  const [output, setOutput] = useState('')

  function handleRun() {
    setOutput('Run button is ready. Code execution will be connected in the next step.')
  }

  return (
    <section className="panel editor">
      <header className="panel__header">
        <div>
          <h2>Python Editor</h2>
          <p className="editor__subtitle">
            Write your Python code and run it when you are ready.
          </p>
        </div>

        <button
          type="button"
          className="btn btn--primary"
          onClick={handleRun}
        >
          Run
        </button>
      </header>

      <div className="editor__monaco">
        <CodeEditor
          value={code}
          onChange={setCode}
          language="python"
          height="430px"
        />
      </div>

      <section className="editor__output">
        <div className="editor__output-header">
          <h3>Output</h3>
        </div>

        <pre className="editor__output-content">
          {output || 'Run your code to see the output here.'}
        </pre>
      </section>
    </section>
  )
}