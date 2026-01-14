'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { BlockEditor } from '@/components/editor/block-editor'
import { Button } from '@/components/ui/button'
import type { Block } from '@/types'

export default function EditorPage() {
  const router = useRouter()
  const [blocks, setBlocks] = useState<Block[]>([])
  const [cvTitle, setCvTitle] = useState('')
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    try {
      // TODO: Save to Supabase
      console.log('Saving CV:', { title: cvTitle, blocks })

      // For now, just show success
      alert('CV saved successfully!')
    } catch (error) {
      console.error('Error saving CV:', error)
      alert('Failed to save CV')
    } finally {
      setSaving(false)
    }
  }

  const handlePublish = async () => {
    // TODO: Implement publish logic
    console.log('Publishing CV')
  }

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
                className="bg-transparent border-none text-xl font-semibold focus:outline-none placeholder:text-text-tertiary"
              />
            </div>

            <div className="flex items-center space-x-3">
              <Button
                variant="glass"
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Save Draft'}
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
        <div className="max-w-5xl mx-auto">
          <BlockEditor
            initialBlocks={blocks}
            onChange={setBlocks}
            readOnly={false}
            walletAddress={undefined} // TODO: Get from connected wallet
          />
        </div>
      </div>

      {/* Help Panel */}
      <div className="fixed bottom-6 right-6">
        <button className="glass-strong w-14 h-14 rounded-full flex items-center justify-center text-2xl hover:glow-primary transition-all">
          ?
        </button>
      </div>
    </div>
  )
}
