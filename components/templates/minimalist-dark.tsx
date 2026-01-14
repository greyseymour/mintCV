'use client'

import type { Block } from '@/types'

interface MinimalistDarkProps {
  blocks: Block[]
  walletAddress?: string
}

export function MinimalistDark({ blocks }: MinimalistDarkProps) {
  const headerBlock = blocks.find(b => b.type === 'header')
  const experienceBlock = blocks.find(b => b.type === 'experience')
  const skillsBlock = blocks.find(b => b.type === 'skills')
  const linksBlock = blocks.find(b => b.type === 'links')
  const builderScoreBlock = blocks.find(b => b.type === 'builder-score')
  const onchainBlock = blocks.find(b => b.type === 'onchain-highlights')
  const customBlocks = blocks.filter(b => b.type === 'custom-text')

  return (
    <div className="max-w-4xl mx-auto px-8 py-16 space-y-16 bg-background text-text-primary">
      {/* Header */}
      {headerBlock && (
        <div className="space-y-4 border-b border-border pb-8">
          <h1 className="text-6xl font-light tracking-tight">
            {headerBlock.data.name || 'Your Name'}
          </h1>
          <p className="text-2xl text-text-secondary font-light">
            {headerBlock.data.title || 'Your Title'}
          </p>
          <div className="flex gap-6 text-sm text-text-tertiary">
            {headerBlock.data.email && <span>{headerBlock.data.email}</span>}
            {headerBlock.data.location && <span>{headerBlock.data.location}</span>}
            {headerBlock.data.website && <span>{headerBlock.data.website}</span>}
          </div>
          {headerBlock.data.bio && (
            <p className="text-text-secondary leading-relaxed max-w-3xl mt-6">
              {headerBlock.data.bio}
            </p>
          )}
        </div>
      )}

      {/* Builder Score */}
      {builderScoreBlock && builderScoreBlock.data.score > 0 && (
        <div className="space-y-4">
          <h2 className="text-sm uppercase tracking-widest text-text-tertiary">Builder Score</h2>
          <div className="text-7xl font-light text-primary-400">
            {builderScoreBlock.data.score}
          </div>
          <p className="text-sm text-text-secondary">Talent Protocol</p>
        </div>
      )}

      {/* Experience */}
      {experienceBlock && experienceBlock.data.experiences?.length > 0 && (
        <div className="space-y-8">
          <h2 className="text-sm uppercase tracking-widest text-text-tertiary">Experience</h2>
          {experienceBlock.data.experiences.map((exp: any, idx: number) => (
            <div key={idx} className="space-y-3 pl-6 border-l-2 border-border">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-medium">{exp.title}</h3>
                  <p className="text-text-secondary">{exp.company}</p>
                </div>
                <div className="text-right text-sm text-text-tertiary">
                  <p>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</p>
                  {exp.location && <p>{exp.location}</p>}
                </div>
              </div>
              {exp.description && (
                <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-line">
                  {exp.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skillsBlock && skillsBlock.data.skills?.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-sm uppercase tracking-widest text-text-tertiary">Skills</h2>
          <div className="flex flex-wrap gap-3">
            {skillsBlock.data.skills.map((skill: string, idx: number) => (
              <span
                key={idx}
                className="px-4 py-2 border border-border rounded-lg text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Onchain Activity */}
      {onchainBlock && onchainBlock.data.transactions > 0 && (
        <div className="space-y-4">
          <h2 className="text-sm uppercase tracking-widest text-text-tertiary">Onchain Activity</h2>
          <div className="grid grid-cols-4 gap-6">
            <div>
              <div className="text-3xl font-light">{onchainBlock.data.contractsDeployed}</div>
              <p className="text-xs text-text-tertiary mt-1">Contracts</p>
            </div>
            <div>
              <div className="text-3xl font-light">{onchainBlock.data.nftsMinted}</div>
              <p className="text-xs text-text-tertiary mt-1">NFTs</p>
            </div>
            <div>
              <div className="text-3xl font-light">{onchainBlock.data.daoMemberships?.length || 0}</div>
              <p className="text-xs text-text-tertiary mt-1">DAOs</p>
            </div>
            <div>
              <div className="text-3xl font-light">{onchainBlock.data.transactions}</div>
              <p className="text-xs text-text-tertiary mt-1">TXs</p>
            </div>
          </div>
        </div>
      )}

      {/* Custom Sections */}
      {customBlocks.map((block, idx) => (
        <div key={idx} className="space-y-4">
          {block.data.title && (
            <h2 className="text-sm uppercase tracking-widest text-text-tertiary">
              {block.data.title}
            </h2>
          )}
          {block.data.content && (
            <p className="text-text-secondary leading-relaxed whitespace-pre-line">
              {block.data.content}
            </p>
          )}
        </div>
      ))}

      {/* Links */}
      {linksBlock && linksBlock.data.links?.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-sm uppercase tracking-widest text-text-tertiary">Links</h2>
          <div className="space-y-2">
            {linksBlock.data.links.map((link: any, idx: number) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-text-secondary hover:text-text-primary transition-colors"
              >
                {link.label} →
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
