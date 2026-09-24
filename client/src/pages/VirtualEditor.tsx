import { useState } from 'react'
import type { ExecutionResult } from '../types'
import { runPlaygroundCode } from '../api/playground'
import { CodeEditor } from '../components/editor/CodeEditor'
import './VirtualEditor.css'

const STARTER_CODE = `# Write your Python code here

name = "Code Mentor"
print(name)
`

export function VirtualEditor() {
  const [code, setCode] = useState(STARTER_CODE)
  const [result, setResult] = useState<ExecutionResult | null>(null)
  const [running, setRunning] = useState(false)

  async function handleRun() {
    if (running) return

    setRunning(true)
    setResult(null)

    try {
      const executionResult = await runPlaygroundCode(code)
      setResult(executionResult)
    } catch (requestError) {
      setResult({
        success: false,
        output: '',
        error:
          requestError instanceof Error
            ? requestError.message
            : 'Unable to run the code right now.',
      })
    } finally {
      setRunning(false)
    }
  }

  return (
    <main className="virtual-editor-page">
      <header className="virtual-editor-page__header">
        <span className="virtual-editor-page__eyebrow">
          PYTHON PLAYGROUND
        </span>

        <h1>Virtual Editor</h1>

        <p>
          Write, run, and experiment with Python code in a simple coding
          workspace.
        </p>
      </header>

      <section className="virtual-editor-page__workspace">
        <div className="virtual-editor-page__editor-card">
          <header className="virtual-editor-page__toolbar">
            <div>
              <h2>Python Editor</h2>
              <p>Write your code and run it when you are ready.</p>
            </div>

            <button
              type="button"
              className="btn btn--primary"
              onClick={handleRun}
              disabled={running}
            >
              {running ? 'Running...' : 'Run'}
            </button>
          </header>

          <div className="virtual-editor-page__monaco">
            <CodeEditor
              value={code}
              onChange={setCode}
              language="python"
              height="520px"
            />
          </div>
        </div>

        <section className="virtual-editor-page__output">
          <header className="virtual-editor-page__output-header">
            <div>
              <span className="virtual-editor-page__section-label">
                CONSOLE
              </span>
              <h2>Execution Result</h2>
            </div>

            {result ? (
              <span
                className={
                  result.success
                    ? 'virtual-editor-page__status virtual-editor-page__status--success'
                    : 'virtual-editor-page__status virtual-editor-page__status--error'
                }
              >
                {result.success ? 'Success' : 'Error'}
              </span>
            ) : null}
          </header>

          <pre>
            {result
              ? result.error || result.output || 'No output.'
              : 'Run your Python code to see the output here.'}
          </pre>
        </section>
      </section>
    </main>
  )
}
