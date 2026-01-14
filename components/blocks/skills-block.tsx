'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import type { Block } from '@/types'

interface SkillsBlockProps {
  block: Block
  onChange?: (data: any) => void
  readOnly?: boolean
}

export function SkillsBlock({ block, onChange, readOnly = false }: SkillsBlockProps) {
  const [skills, setSkills] = useState<string[]>(block.data?.skills || [])
  const [newSkill, setNewSkill] = useState('')

  const addSkill = () => {
    if (newSkill.trim()) {
      const updated = [...skills, newSkill.trim()]
      setSkills(updated)
      setNewSkill('')
      onChange?.({ skills: updated })
    }
  }

  const removeSkill = (index: number) => {
    const updated = skills.filter((_, i) => i !== index)
    setSkills(updated)
    onChange?.({ skills: updated })
  }

  if (readOnly) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="glass px-4 py-2 rounded-xl text-sm font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="glass-strong rounded-3xl p-6 space-y-4">
      <h3 className="text-sm font-semibold text-text-secondary">Skills</h3>

      <div className="flex gap-2">
        <input
          type="text"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addSkill()}
          placeholder="Add a skill..."
          className="flex-1 bg-background-secondary border border-border rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50"
        />
        <Button variant="glass" size="sm" onClick={addSkill}>
          Add
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="glass px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 group"
          >
            <span>{skill}</span>
            <button
              onClick={() => removeSkill(index)}
              className="opacity-0 group-hover:opacity-100 transition-opacity text-text-tertiary hover:text-red-400"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {skills.length === 0 && (
        <div className="text-center py-8 text-text-tertiary">
          <p className="text-sm">No skills added yet</p>
        </div>
      )}
    </div>
  )
}
