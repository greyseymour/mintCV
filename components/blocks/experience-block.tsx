'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import type { Block } from '@/types'

interface Experience {
  id: string
  title: string
  company: string
  location: string
  startDate: string
  endDate: string
  current: boolean
  description: string
}

interface ExperienceBlockProps {
  block: Block
  onChange?: (data: any) => void
  readOnly?: boolean
}

export function ExperienceBlock({ block, onChange, readOnly = false }: ExperienceBlockProps) {
  const [experiences, setExperiences] = useState<Experience[]>(
    block.data?.experiences || []
  )

  const addExperience = () => {
    const newExperience: Experience = {
      id: `exp-${Date.now()}`,
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    }
    const updated = [...experiences, newExperience]
    setExperiences(updated)
    onChange?.({ experiences: updated })
  }

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    const updated = experiences.map(exp =>
      exp.id === id ? { ...exp, [field]: value } : exp
    )
    setExperiences(updated)
    onChange?.({ experiences: updated })
  }

  const removeExperience = (id: string) => {
    const updated = experiences.filter(exp => exp.id !== id)
    setExperiences(updated)
    onChange?.({ experiences: updated })
  }

  if (readOnly) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Experience</h2>
        {experiences.map(exp => (
          <div key={exp.id} className="space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold">{exp.title}</h3>
                <p className="text-text-secondary">{exp.company}</p>
              </div>
              <div className="text-right text-sm text-text-tertiary">
                <p>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</p>
                <p>{exp.location}</p>
              </div>
            </div>
            {exp.description && (
              <p className="text-text-secondary text-sm whitespace-pre-line">
                {exp.description}
              </p>
            )}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="glass-strong rounded-3xl p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-text-secondary">Experience</h3>
        <Button variant="glass" size="sm" onClick={addExperience}>
          Add Position
        </Button>
      </div>

      {experiences.map((exp) => (
        <div key={exp.id} className="glass rounded-2xl p-4 space-y-4">
          <div className="flex justify-between items-start">
            <h4 className="text-sm font-semibold">Position {experiences.indexOf(exp) + 1}</h4>
            <button
              onClick={() => removeExperience(exp.id)}
              className="text-sm text-text-tertiary hover:text-red-400 transition-colors"
            >
              Remove
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              value={exp.title}
              onChange={(e) => updateExperience(exp.id, 'title', e.target.value)}
              placeholder="Job Title"
              className="bg-background-secondary border border-border rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50"
            />

            <input
              type="text"
              value={exp.company}
              onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
              placeholder="Company"
              className="bg-background-secondary border border-border rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50"
            />

            <input
              type="text"
              value={exp.location}
              onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
              placeholder="Location"
              className="bg-background-secondary border border-border rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50"
            />

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={exp.current}
                onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                className="w-4 h-4"
              />
              <label className="text-sm text-text-secondary">Current Role</label>
            </div>

            <input
              type="month"
              value={exp.startDate}
              onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
              placeholder="Start Date"
              className="bg-background-secondary border border-border rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50"
            />

            {!exp.current && (
              <input
                type="month"
                value={exp.endDate}
                onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                placeholder="End Date"
                className="bg-background-secondary border border-border rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50"
              />
            )}
          </div>

          <textarea
            value={exp.description}
            onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
            placeholder="Job description and achievements..."
            rows={4}
            className="w-full bg-background-secondary border border-border rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50 resize-none"
          />
        </div>
      ))}

      {experiences.length === 0 && (
        <div className="text-center py-8 text-text-tertiary">
          <p className="text-sm">No experience added yet</p>
        </div>
      )}
    </div>
  )
}
