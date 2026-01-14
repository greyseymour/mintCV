'use client'

import type { Block } from '@/types'

interface LiquidGlassProps {
  blocks: Block[]
  walletAddress?: string
}

export function LiquidGlass({ blocks }: LiquidGlassProps) {
  const headerBlock = blocks.find(b => b.type === 'header')
  const experienceBlock = blocks.find(b => b.type === 'experience')
  const skillsBlock = blocks.find(b => b.type === 'skills')
  const linksBlock = blocks.find(b => b.type === 'links')
  const builderScoreBlock = blocks.find(b => b.type === 'builder-score')
  const onchainBlock = blocks.find(b => b.type === 'onchain-highlights')
  const customBlocks = blocks.filter(b => b.type === 'custom-text')

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-purple/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-accent-cyan/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '4s' }} />
      </div>

      <div className="max-w-5xl mx-auto px-8 py-16 space-y-12">
        {/* Header */}
        {headerBlock && (
          <div className="glass-liquid rounded-3xl p-10 space-y-6">
            <h1 className="text-6xl font-bold gradient-text">
              {headerBlock.data.name || 'Your Name'}
            </h1>
            <p className="text-2xl text-text-secondary">
              {headerBlock.data.title || 'Your Title'}
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              {headerBlock.data.email && (
                <span className="glass px-4 py-2 rounded-xl">{headerBlock.data.email}</span>
              )}
              {headerBlock.data.location && (
                <span className="glass px-4 py-2 rounded-xl">{headerBlock.data.location}</span>
              )}
              {headerBlock.data.website && (
                <span className="glass px-4 py-2 rounded-xl">{headerBlock.data.website}</span>
              )}
            </div>
            {headerBlock.data.bio && (
              <p className="text-text-secondary leading-relaxed mt-6">
                {headerBlock.data.bio}
              </p>
            )}
          </div>
        )}

        {/* Builder Score */}
        {builderScoreBlock && builderScoreBlock.data.score > 0 && (
          <div className="glass-liquid rounded-3xl p-10 text-center space-y-4">
            <h2 className="text-sm uppercase tracking-widest text-text-tertiary">Builder Score</h2>
            <div className="text-8xl font-bold gradient-text animate-glow">
              {builderScoreBlock.data.score}
            </div>
            <p className="text-text-secondary">Talent Protocol</p>
            {builderScoreBlock.data.credentials?.length > 0 && (
              <div className="grid gap-3 mt-6">
                {builderScoreBlock.data.credentials.slice(0, 3).map((cred: any, idx: number) => (
                  <div key={idx} className="glass rounded-2xl p-4 text-left">
                    <p className="font-semibold">{cred.name}</p>
                    <p className="text-sm text-text-tertiary">{cred.issuer}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Onchain Highlights */}
        {onchainBlock && onchainBlock.data.transactions > 0 && (
          <div className="glass-strong rounded-3xl p-10 space-y-6">
            <h2 className="text-xl font-bold gradient-text">Onchain Activity</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="glass-liquid rounded-2xl p-6 text-center">
                <div className="text-4xl font-bold gradient-text">{onchainBlock.data.contractsDeployed}</div>
                <p className="text-sm text-text-secondary mt-2">Contracts</p>
              </div>
              <div className="glass-liquid rounded-2xl p-6 text-center">
                <div className="text-4xl font-bold gradient-text">{onchainBlock.data.nftsMinted}</div>
                <p className="text-sm text-text-secondary mt-2">NFTs</p>
              </div>
              <div className="glass-liquid rounded-2xl p-6 text-center">
                <div className="text-4xl font-bold gradient-text">{onchainBlock.data.daoMemberships?.length || 0}</div>
                <p className="text-sm text-text-secondary mt-2">DAOs</p>
              </div>
              <div className="glass-liquid rounded-2xl p-6 text-center">
                <div className="text-4xl font-bold gradient-text">{onchainBlock.data.transactions}</div>
                <p className="text-sm text-text-secondary mt-2">TXs</p>
              </div>
            </div>
          </div>
        )}

        {/* Experience */}
        {experienceBlock && experienceBlock.data.experiences?.length > 0 && (
          <div className="glass-strong rounded-3xl p-10 space-y-8">
            <h2 className="text-2xl font-bold gradient-text">Experience</h2>
            {experienceBlock.data.experiences.map((exp: any, idx: number) => (
              <div key={idx} className="glass rounded-2xl p-6 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold">{exp.title}</h3>
                    <p className="text-text-secondary">{exp.company}</p>
                  </div>
                  <div className="text-right text-sm text-text-tertiary">
                    <p>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</p>
                    {exp.location && <p>{exp.location}</p>}
                  </div>
                </div>
                {exp.description && (
                  <p className="text-text-secondary leading-relaxed whitespace-pre-line">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {skillsBlock && skillsBlock.data.skills?.length > 0 && (
          <div className="glass-strong rounded-3xl p-10 space-y-6">
            <h2 className="text-2xl font-bold gradient-text">Skills</h2>
            <div className="flex flex-wrap gap-3">
              {skillsBlock.data.skills.map((skill: string, idx: number) => (
                <span
                  key={idx}
                  className="glass-liquid px-6 py-3 rounded-2xl font-medium hover:glow-primary transition-all"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Custom Sections */}
        {customBlocks.map((block, idx) => (
          <div key={idx} className="glass-strong rounded-3xl p-10 space-y-4">
            {block.data.title && (
              <h2 className="text-2xl font-bold gradient-text">{block.data.title}</h2>
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
          <div className="glass-strong rounded-3xl p-10 space-y-6">
            <h2 className="text-2xl font-bold gradient-text">Links</h2>
            <div className="grid gap-3">
              {linksBlock.data.links.map((link: any, idx: number) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-liquid rounded-2xl p-4 flex items-center justify-between hover:glow-primary transition-all group"
                >
                  <span className="font-medium">{link.label}</span>
                  <span className="text-primary-500 group-hover:translate-x-2 transition-transform">→</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
