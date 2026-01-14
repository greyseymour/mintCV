'use client'

import { useState } from 'react'
import type { Block } from '@/types'

interface CustomTextBlockProps {
  block: Block
  onChange?: (data: any) => void
  readOnly?: boolean
}

export function CustomTextBlock({ block, onChange, readOnly = false }: CustomTextBlockProps) {
  const [data, setData] = useState(block.data || {
    title: '',
    content: '',
  })

  const handleChange = (field: string, value: string) => {
    const newData = { ...data, [field]: value }
    setData(newData)
    onChange?.(newData)
  }

  if (readOnly) {
    return (
      <div className="space-y-3">
        {data.title && <h2 className="text-2xl font-bold">{data.title}</h2>}
        {data.content && (
          <p className="text-text-secondary whitespace-pre-line">{data.content}</p>
        )}
      </div>
    )
  }

  return (
    <div className="glass-strong rounded-3xl p-6 space-y-4">
      <h3 className="text-sm font-semibold text-text-secondary">Custom Section</h3>

      <input
        type="text"
        value={data.title}
        onChange={(e) => handleChange('title', e.target.value)}
        placeholder="Section Title"
        className="w-full bg-background-secondary border border-border rounded-xl px-4 py-3 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-primary-500/50"
      />

      <textarea
        value={data.content}
        onChange={(e) => handleChange('content', e.target.value)}
        placeholder="Add your content here..."
        rows={6}
        className="w-full bg-background-secondary border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50 resize-none"
      />
    </div>
  )
}
