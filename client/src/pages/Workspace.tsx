// Main learner screen: code on the left, mentor on the right.
import { Editor } from '../components/editor/Editor'
import { HintPanel } from '../components/hintpanel/HintPanel'
import './Workspace.css'

export function Workspace() {
  return (
    <div className="workspace">
      <header className="workspace__hero">
        <h1>Code Mentor</h1>
        <p>I explain one easy part. You tell me what you got. Then you type the code yourself.</p>
      </header>

      <ol className="workspace__steps">
        <li>Write code and press Explain my code</li>
        <li>Say if you got it, need it simpler, or want more detail</li>
        <li>When you understand, type the code with 5 hints</li>
      </ol>

      <div className="workspace__grid">
        <Editor />
        <HintPanel />
      </div>
    </div>
  )
}
