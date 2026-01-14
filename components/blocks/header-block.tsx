'use client'

import { useState } from 'react'
import type { Block } from '@/types'

interface HeaderBlockProps {
  block: Block
  onChange?: (data: any) => void
  readOnly?: boolean
}

export function HeaderBlock({ block, onChange, readOnly = false }: HeaderBlockProps) {
  const [data, setData] = useState(block.data || {
    name: '',
    title: '',
    location: '',
    email: '',
    website: '',
    bio: '',
  })

  const handleChange = (field: string, value: string) => {
    const newData = { ...data, [field]: value }
    setData(newData)
    onChange?.(newData)
  }

  if (readOnly) {
    return (
      <div className="space-y-4">
        <h1 className="text-5xl font-bold gradient-text">{data.name}</h1>
        <p className="text-2xl text-text-secondary">{data.title}</p>
        {data.location && (
          <p className="text-text-tertiary">{data.location}</p>
        )}
        <div className="flex gap-4 text-sm text-text-secondary">
          {data.email && <span>{data.email}</span>}
          {data.website && <span>{data.website}</span>}
        </div>
        {data.bio && (
          <p className="text-text-secondary max-w-2xl">{data.bio}</p>
        )}
      </div>
    )
  }

  return (
    <div className="glass-strong rounded-3xl p-6 space-y-4">
      <h3 className="text-sm font-semibold text-text-secondary mb-4">Header</h3>

      <input
        type="text"
        value={data.name}
        onChange={(e) => handleChange('name', e.target.value)}
        placeholder="Your Name"
        className="w-full bg-background-secondary border border-border rounded-xl px-4 py-3 text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-primary-500/50"
      />

      <input
        type="text"
        value={data.title}
        onChange={(e) => handleChange('title', e.target.value)}
        placeholder="Job Title / Role"
        className="w-full bg-background-secondary border border-border rounded-xl px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-primary-500/50"
      />

      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          value={data.location}
          onChange={(e) => handleChange('location', e.target.value)}
          placeholder="Location"
          className="bg-background-secondary border border-border rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50"
        />

        <input
          type="email"
          value={data.email}
          onChange={(e) => handleChange('email', e.target.value)}
          placeholder="Email"
          className="bg-background-secondary border border-border rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50"
        />
      </div>

      <input
        type="url"
        value={data.website}
        onChange={(e) => handleChange('website', e.target.value)}
        placeholder="Website / Portfolio"
        className="w-full bg-background-secondary border border-border rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50"
      />

      <textarea
        value={data.bio}
        onChange={(e) => handleChange('bio', e.target.value)}
        placeholder="Bio / Summary"
        rows={3}
        className="w-full bg-background-secondary border border-border rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50 resize-none"
      />
    </div>
  )
}
