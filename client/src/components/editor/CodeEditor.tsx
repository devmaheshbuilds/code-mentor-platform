import Editor, { type OnMount } from '@monaco-editor/react'

interface CodeEditorProps {
  value: string
  onChange: (value: string) => void
  language?: string
  height?: string
  readOnly?: boolean
  blockClipboard?: boolean
}

export function CodeEditor({
  value,
  onChange,
  language = 'python',
  height = '420px',
  readOnly = false,
  blockClipboard = false,
}: CodeEditorProps) {
  const handleMount: OnMount = (editor, monaco) => {
    if (!blockClipboard) return

    const block = () => undefined

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyV, block)
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyC, block)
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyX, block)
    editor.addCommand(monaco.KeyMod.Shift | monaco.KeyCode.Insert, block)
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Insert, block)

    editor.onDidPaste(() => {
      editor.trigger('keyboard', 'undo', null)
    })
  }

  return (
    <Editor
      height={height}
      language={language}
      theme="vs-dark"
      value={value}
      onChange={(nextValue) => onChange(nextValue ?? '')}
      onMount={handleMount}
      options={{
        minimap: {
          enabled: false,
        },
        fontSize: 15,
        lineNumbers: 'on',
        wordWrap: 'on',
        automaticLayout: true,
        scrollBeyondLastLine: false,
        padding: {
          top: 12,
          bottom: 12,
        },
        readOnly,
        contextmenu: !blockClipboard,
      }}
    />
  )
}
