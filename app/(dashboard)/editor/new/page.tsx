'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { BlockEditor } from '@/components/editor/block-editor'
import { TemplateSelector } from '@/components/templates/template-selector'
import { getTemplate, type TemplateType } from '@/components/templates/template-registry'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import type { Block } from '@/types'

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic'

export default function NewEditorPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const cvId = searchParams.get('id')

  const [blocks, setBlocks] = useState<Block[]>([])
  const [cvTitle, setCvTitle] = useState('My Resume')
  const [template, setTemplate] = useState<TemplateType>('liquid-glass')
  const [saving, setSaving] = useState(false)
  const [currentCvId, setCurrentCvId] = useState<string | null>(cvId)
  const [viewMode, setViewMode] = useState<'edit' | 'preview' | 'template'>('edit')
  const [lastSaved, setLastSaved] = useState<Date | null>(null)

  // Load CV if editing existing
  useEffect(() => {
    if (cvId) {
      loadCV(cvId)
    }
  }, [cvId])

  // Auto-save every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (currentCvId && blocks.length > 0) {
        handleSave(true)
      }
    }, 30000)

    return () => clearInterval(interval)
  }, [currentCvId, blocks, cvTitle, template])

  const loadCV = async (id: string) => {
    try {
      const response = await fetch(`/api/cv/${id}`)
      const data = await response.json()

      if (data) {
        setCvTitle(data.title)
        setBlocks(data.blocks || [])
        setTemplate(data.template || 'liquid-glass')
        setCurrentCvId(data.id)
      }
    } catch (error) {
      console.error('Error loading CV:', error)
    }
  }

  const handleSave = async (silent = false) => {
    if (!silent) setSaving(true)

    try {
      const userId = 'demo-user' // TODO: Get from auth

      let response
      if (currentCvId) {
        // Update existing
        response = await fetch(`/api/cv/${currentCvId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: cvTitle, template, blocks }),
        })
      } else {
        // Create new
        response = await fetch('/api/cv', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, title: cvTitle, template, blocks }),
        })
      }

      const data = await response.json()

      if (data.id) {
        setCurrentCvId(data.id)
        setLastSaved(new Date())
        if (!silent) {
          alert('CV saved successfully!')
        }
      }
    } catch (error) {
      console.error('Error saving CV:', error)
      if (!silent) {
        alert('Failed to save CV')
      }
    } finally {
      if (!silent) setSaving(false)
    }
  }

  const handlePublish = async () => {
    if (!currentCvId) {
      // Save first
      await handleSave()
    }

    try {
      const response = await fetch(`/api/cv/${currentCvId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: true }),
      })

      if (response.ok) {
        alert('CV published successfully!')
        router.push('/dashboard')
      }
    } catch (error) {
      console.error('Error publishing CV:', error)
      alert('Failed to publish CV')
    }
  }

  const TemplateComponent = getTemplate(template)

  return (
    <div className="min-h-screen pb-20">
      {/* Fixed Header */}
      <div className="sticky top-0 z-40 glass-strong border-b border-border-strong backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 flex-1">
              <button
                onClick={() => router.push('/dashboard')}
                className="text-text-secondary hover:text-text-primary transition-colors"
              >
                ← Back
              </button>

              <input
                type="text"
                value={cvTitle}
                onChange={(e) => setCvTitle(e.target.value)}
                placeholder="Untitled CV"
                className="bg-transparent border-none text-xl font-semibold focus:outline-none placeholder:text-text-tertiary max-w-md"
              />

              {lastSaved && (
                <span className="text-xs text-text-tertiary">
                  Saved {lastSaved.toLocaleTimeString()}
                </span>
              )}
            </div>

            <div className="flex items-center space-x-3">
              {/* View Mode Tabs */}
              <div className="glass rounded-xl p-1 flex gap-1">
                <button
                  onClick={() => setViewMode('edit')}
                  className={`px-4 py-2 rounded-lg text-sm transition-all ${
                    viewMode === 'edit' ? 'glass-strong' : 'hover:bg-surface-hover'
                  }`}
                >
                  Edit
                </button>
                <button
                  onClick={() => setViewMode('preview')}
                  className={`px-4 py-2 rounded-lg text-sm transition-all ${
                    viewMode === 'preview' ? 'glass-strong' : 'hover:bg-surface-hover'
                  }`}
                >
                  Preview
                </button>
                <button
                  onClick={() => setViewMode('template')}
                  className={`px-4 py-2 rounded-lg text-sm transition-all ${
                    viewMode === 'template' ? 'glass-strong' : 'hover:bg-surface-hover'
                  }`}
                >
                  Template
                </button>
              </div>

              <Button
                variant="glass"
                onClick={() => handleSave()}
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Save'}
              </Button>

              <Button
                variant="primary"
                onClick={handlePublish}
              >
                Publish
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Editor Content */}
      <div className="container mx-auto px-4 py-8">
        {viewMode === 'template' && (
          <div className="max-w-6xl mx-auto">
            <Card variant="glass-strong" className="p-8 mb-8">
              <h2 className="text-3xl font-bold gradient-text mb-2">Choose a Template</h2>
              <p className="text-text-secondary mb-8">
                Select a template that best represents your style
              </p>

              <TemplateSelector
                selectedTemplate={template}
                onSelect={(t) => {
                  setTemplate(t)
                  setViewMode('edit')
                }}
              />
            </Card>
          </div>
        )}

        {viewMode === 'edit' && (
          <div className="max-w-5xl mx-auto">
            <BlockEditor
              initialBlocks={blocks}
              onChange={setBlocks}
              readOnly={false}
              walletAddress={undefined}
            />
          </div>
        )}

        {viewMode === 'preview' && (
          <div className="max-w-7xl mx-auto">
            <Card variant="glass" className="p-1">
              <TemplateComponent blocks={blocks} />
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
