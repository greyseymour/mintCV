'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { getBlockComponent, BLOCK_METADATA } from './block-registry'
import type { Block, BlockType } from '@/types'

interface BlockEditorProps {
  initialBlocks?: Block[]
  onChange?: (blocks: Block[]) => void
  readOnly?: boolean
  walletAddress?: string
}

export function BlockEditor({ initialBlocks = [], onChange, readOnly = false, walletAddress }: BlockEditorProps) {
  const [blocks, setBlocks] = useState<Block[]>(initialBlocks)
  const [showAddMenu, setShowAddMenu] = useState(false)

  const addBlock = (type: BlockType) => {
    const newBlock: Block = {
      id: `block-${Date.now()}`,
      type,
      order: blocks.length,
      data: {},
      visible: true,
    }

    const updated = [...blocks, newBlock]
    setBlocks(updated)
    onChange?.(updated)
    setShowAddMenu(false)
  }

  const updateBlock = (id: string, data: any) => {
    const updated = blocks.map(block =>
      block.id === id ? { ...block, data } : block
    )
    setBlocks(updated)
    onChange?.(updated)
  }

  const removeBlock = (id: string) => {
    const updated = blocks.filter(block => block.id !== id)
    setBlocks(updated)
    onChange?.(updated)
  }

  const moveBlock = (id: string, direction: 'up' | 'down') => {
    const index = blocks.findIndex(block => block.id === id)
    if (index === -1) return

    const newIndex = direction === 'up' ? index - 1 : index + 1
    if (newIndex < 0 || newIndex >= blocks.length) return

    const updated = [...blocks]
    const [removed] = updated.splice(index, 1)
    updated.splice(newIndex, 0, removed)

    // Update order
    updated.forEach((block, i) => {
      block.order = i
    })

    setBlocks(updated)
    onChange?.(updated)
  }

  if (readOnly) {
    return (
      <div className="space-y-12 max-w-4xl mx-auto">
        {blocks
          .filter(block => block.visible)
          .sort((a, b) => a.order - b.order)
          .map(block => {
            const BlockComponent = getBlockComponent(block.type)
            return (
              <div key={block.id}>
                <BlockComponent
                  block={block}
                  readOnly={true}
                  walletAddress={walletAddress}
                />
              </div>
            )
          })}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Blocks */}
      {blocks
        .sort((a, b) => a.order - b.order)
        .map((block, index) => {
          const BlockComponent = getBlockComponent(block.type)
          const metadata = BLOCK_METADATA[block.type]

          return (
            <div key={block.id} className="relative group">
              {/* Block Controls */}
              <div className="absolute -left-16 top-6 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => moveBlock(block.id, 'up')}
                  disabled={index === 0}
                  className="w-10 h-10 glass rounded-xl flex items-center justify-center disabled:opacity-30 hover:glass-strong transition-all"
                  title="Move up"
                >
                  ↑
                </button>
                <button
                  onClick={() => moveBlock(block.id, 'down')}
                  disabled={index === blocks.length - 1}
                  className="w-10 h-10 glass rounded-xl flex items-center justify-center disabled:opacity-30 hover:glass-strong transition-all"
                  title="Move down"
                >
                  ↓
                </button>
                <button
                  onClick={() => removeBlock(block.id)}
                  className="w-10 h-10 glass rounded-xl flex items-center justify-center hover:glass-strong transition-all text-red-400"
                  title="Remove block"
                >
                  ×
                </button>
              </div>

              {/* Block Component */}
              <BlockComponent
                block={block}
                onChange={(data: any) => updateBlock(block.id, data)}
                readOnly={false}
                walletAddress={walletAddress}
              />
            </div>
          )
        })}

      {/* Add Block Button */}
      <div className="relative">
        {showAddMenu ? (
          <Card variant="glass-strong" className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold">Add Block</h3>
              <button
                onClick={() => setShowAddMenu(false)}
                className="text-text-tertiary hover:text-text-primary"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {(Object.entries(BLOCK_METADATA) as [BlockType, typeof BLOCK_METADATA[BlockType]][]).map(([type, meta]) => (
                <button
                  key={type}
                  onClick={() => addBlock(type)}
                  className="glass rounded-2xl p-4 text-left hover:glass-strong transition-all group"
                >
                  <div className="text-2xl mb-2">{meta.icon}</div>
                  <div className="text-sm font-semibold mb-1">{meta.label}</div>
                  <div className="text-xs text-text-tertiary">{meta.description}</div>
                </button>
              ))}
            </div>
          </Card>
        ) : (
          <button
            onClick={() => setShowAddMenu(true)}
            className="w-full glass-strong rounded-3xl p-6 text-center hover:glass-liquid transition-all group"
          >
            <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">+</div>
            <div className="text-sm font-semibold text-text-secondary">Add Block</div>
          </button>
        )}
      </div>

      {blocks.length === 0 && (
        <div className="text-center py-12 text-text-tertiary">
          <p className="text-lg mb-2">Your CV is empty</p>
          <p className="text-sm">Add your first block to get started</p>
        </div>
      )}
    </div>
  )
}
