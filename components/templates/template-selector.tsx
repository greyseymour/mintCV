'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TEMPLATE_METADATA, type TemplateType } from './template-registry'

interface TemplateSelectorProps {
  selectedTemplate: TemplateType
  onSelect: (template: TemplateType) => void
}

export function TemplateSelector({ selectedTemplate, onSelect }: TemplateSelectorProps) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {(Object.entries(TEMPLATE_METADATA) as [TemplateType, typeof TEMPLATE_METADATA[TemplateType]][]).map(([key, meta]) => (
        <Card
          key={key}
          variant={selectedTemplate === key ? 'glass-strong' : 'glass'}
          className={`cursor-pointer transition-all hover:scale-[1.02] ${
            selectedTemplate === key ? 'ring-2 ring-primary-500' : ''
          }`}
          onClick={() => onSelect(key)}
        >
          {/* Template Preview */}
          <div className="aspect-video bg-background-secondary rounded-t-2xl flex items-center justify-center relative overflow-hidden">
            {/* Simple visual representation */}
            <div className="absolute inset-0 opacity-20">
              {key === 'minimalist-dark' && (
                <div className="p-8 space-y-4">
                  <div className="h-8 w-48 bg-text-primary/30"></div>
                  <div className="h-4 w-32 bg-text-secondary/30"></div>
                  <div className="space-y-2 mt-8">
                    <div className="h-3 w-full bg-text-tertiary/20"></div>
                    <div className="h-3 w-5/6 bg-text-tertiary/20"></div>
                  </div>
                </div>
              )}
              {key === 'liquid-glass' && (
                <div className="relative h-full">
                  <div className="absolute top-4 left-4 w-24 h-24 bg-primary-500/30 rounded-full blur-2xl"></div>
                  <div className="absolute bottom-4 right-4 w-24 h-24 bg-accent-purple/30 rounded-full blur-2xl"></div>
                  <div className="glass-liquid m-8 p-4 rounded-xl">
                    <div className="h-6 w-32 bg-gradient-to-r from-primary-500/50 to-accent-purple/50"></div>
                  </div>
                </div>
              )}
              {key === 'terminal' && (
                <div className="bg-black h-full p-8 font-mono">
                  <div className="space-y-2">
                    <div className="text-green-400 text-xs">$ cat name.txt</div>
                    <div className="h-4 w-32 bg-green-400/30"></div>
                    <div className="h-3 w-48 bg-green-400/20 mt-4"></div>
                  </div>
                </div>
              )}
              {key === 'portfolio-grid' && (
                <div className="p-4 grid grid-cols-2 gap-2">
                  <div className="h-20 glass-strong rounded-lg"></div>
                  <div className="h-20 glass-strong rounded-lg"></div>
                  <div className="h-20 glass-strong rounded-lg"></div>
                  <div className="h-20 glass-strong rounded-lg"></div>
                </div>
              )}
            </div>

            {selectedTemplate === key && (
              <div className="absolute top-4 right-4 bg-primary-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                Selected
              </div>
            )}
          </div>

          {/* Template Info */}
          <div className="p-6 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold">{meta.name}</h3>
              {meta.isPremium && (
                <span className="text-xs bg-accent-purple/20 text-accent-purple px-2 py-1 rounded-full">
                  Premium
                </span>
              )}
            </div>
            <p className="text-sm text-text-secondary">{meta.description}</p>
          </div>
        </Card>
      ))}
    </div>
  )
}
