import type { ClipboardEvent, KeyboardEvent } from 'react'

export function blockClipboardEvent(
  event: ClipboardEvent<HTMLElement> | KeyboardEvent<HTMLElement>,
) {
  event.preventDefault()
  event.stopPropagation()
}

export const clipboardBlockProps = {
  onCopy: blockClipboardEvent,
  onCut: blockClipboardEvent,
  onPaste: blockClipboardEvent,
} as const
