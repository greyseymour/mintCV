'use client'

import { useCreateBlockNote } from '@blocknote/react'
// import { BlockNoteView } from '@blocknote/react' // TODO: Fix BlockNote imports
import '@blocknote/react/style.css'
import type { Block } from '@/types'

interface CVEditorProps {
  initialBlocks?: Block[]
  onChange?: (blocks: Block[]) => void
  readOnly?: boolean
}

export function CVEditor({ initialBlocks = [], onChange, readOnly = false }: CVEditorProps) {
  const editor = useCreateBlockNote({
    initialContent: initialBlocks.length > 0 ? convertToBlockNoteFormat(initialBlocks) : undefined,
  })

  const handleChange = () => {
    if (onChange && editor) {
      const blocks = convertFromBlockNoteFormat(editor.document)
      onChange(blocks)
    }
  }

  return (
    <div className="cv-editor">
      {/* TODO: Fix BlockNote integration */}
      <div>BlockNote editor placeholder</div>
    </div>
  )
}

// Helper to convert our Block format to BlockNote format
function convertToBlockNoteFormat(blocks: Block[]): any[] {
  return blocks.map(block => {
    switch (block.type) {
      case 'header':
        return {
          type: 'heading',
          props: { level: 1 },
          content: block.data.text || '',
        }
      case 'experience':
        return {
          type: 'paragraph',
          content: `${block.data.title} at ${block.data.company}`,
        }
      case 'skills':
        return {
          type: 'bulletListItem',
          content: block.data.skills?.join(', ') || '',
        }
      default:
        return {
          type: 'paragraph',
          content: JSON.stringify(block.data),
        }
    }
  })
}

// Helper to convert BlockNote format back to our Block format
function convertFromBlockNoteFormat(blocks: any[]): Block[] {
  return blocks.map((block, index) => ({
    id: block.id || `block-${index}`,
    type: 'custom-text', // Default type
    order: index,
    data: block,
    visible: true,
  }))
}
