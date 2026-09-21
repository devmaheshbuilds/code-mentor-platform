import Editor from '@monaco-editor/react'

interface CodeEditorProps {
  value: string
  onChange: (value: string) => void
  language?: string
  height?: string
  readOnly?: boolean
}

export function CodeEditor({
  value,
  onChange,
  language = 'python',
  height = '420px',
  readOnly = false,
}: CodeEditorProps) {
  return (
    <Editor
      height={height}
      language={language}
      theme="vs-dark"
      value={value}
      onChange={(nextValue) => onChange(nextValue ?? '')}
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
      }}
    />
  )
}
