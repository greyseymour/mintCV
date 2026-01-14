'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import type { Block } from '@/types'

interface Link {
  id: string
  label: string
  url: string
  icon?: string
}

interface LinksBlockProps {
  block: Block
  onChange?: (data: any) => void
  readOnly?: boolean
}

export function LinksBlock({ block, onChange, readOnly = false }: LinksBlockProps) {
  const [links, setLinks] = useState<Link[]>(block.data?.links || [])

  const addLink = () => {
    const newLink: Link = {
      id: `link-${Date.now()}`,
      label: '',
      url: '',
    }
    const updated = [...links, newLink]
    setLinks(updated)
    onChange?.({ links: updated })
  }

  const updateLink = (id: string, field: keyof Link, value: string) => {
    const updated = links.map(link =>
      link.id === id ? { ...link, [field]: value } : link
    )
    setLinks(updated)
    onChange?.({ links: updated })
  }

  const removeLink = (id: string) => {
    const updated = links.filter(link => link.id !== id)
    setLinks(updated)
    onChange?.({ links: updated })
  }

  if (readOnly) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Links</h2>
        <div className="grid gap-3">
          {links.map(link => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass rounded-2xl p-4 flex items-center justify-between hover:glass-strong transition-all group"
            >
              <span className="font-medium">{link.label}</span>
              <span className="text-sm text-text-tertiary group-hover:text-primary-500 transition-colors">
                →
              </span>
            </a>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="glass-strong rounded-3xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-text-secondary">Links</h3>
        <Button variant="glass" size="sm" onClick={addLink}>
          Add Link
        </Button>
      </div>

      {links.map((link) => (
        <div key={link.id} className="glass rounded-2xl p-4 space-y-3">
          <div className="flex justify-between items-center">
            <h4 className="text-sm font-semibold">Link {links.indexOf(link) + 1}</h4>
            <button
              onClick={() => removeLink(link.id)}
              className="text-sm text-text-tertiary hover:text-red-400 transition-colors"
            >
              Remove
            </button>
          </div>

          <input
            type="text"
            value={link.label}
            onChange={(e) => updateLink(link.id, 'label', e.target.value)}
            placeholder="Link Label (e.g., Portfolio, GitHub)"
            className="w-full bg-background-secondary border border-border rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50"
          />

          <input
            type="url"
            value={link.url}
            onChange={(e) => updateLink(link.id, 'url', e.target.value)}
            placeholder="https://..."
            className="w-full bg-background-secondary border border-border rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50"
          />
        </div>
      ))}

      {links.length === 0 && (
        <div className="text-center py-8 text-text-tertiary">
          <p className="text-sm">No links added yet</p>
        </div>
      )}
    </div>
  )
}
