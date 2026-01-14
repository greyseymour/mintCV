'use client'

import type { Block } from '@/types'

interface PortfolioGridProps {
  blocks: Block[]
  walletAddress?: string
}

export function PortfolioGrid({ blocks }: PortfolioGridProps) {
  const headerBlock = blocks.find(b => b.type === 'header')
  const experienceBlock = blocks.find(b => b.type === 'experience')
  const skillsBlock = blocks.find(b => b.type === 'skills')
  const linksBlock = blocks.find(b => b.type === 'links')
  const builderScoreBlock = blocks.find(b => b.type === 'builder-score')
  const onchainBlock = blocks.find(b => b.type === 'onchain-highlights')
  const customBlocks = blocks.filter(b => b.type === 'custom-text')

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header */}
      {headerBlock && (
        <div className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-primary-900/20 via-background to-accent-purple/10 border-b border-border">
          <div className="text-center space-y-6 px-8 max-w-4xl">
            <h1 className="text-7xl md:text-8xl font-bold gradient-text">
              {headerBlock.data.name || 'Your Name'}
            </h1>
            <p className="text-3xl text-text-secondary">
              {headerBlock.data.title || 'Your Title'}
            </p>
            {headerBlock.data.bio && (
              <p className="text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto mt-6">
                {headerBlock.data.bio}
              </p>
            )}
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              {headerBlock.data.email && (
                <span className="glass px-6 py-3 rounded-2xl text-sm">{headerBlock.data.email}</span>
              )}
              {headerBlock.data.location && (
                <span className="glass px-6 py-3 rounded-2xl text-sm">{headerBlock.data.location}</span>
              )}
              {headerBlock.data.website && (
                <a href={headerBlock.data.website} className="glass px-6 py-3 rounded-2xl text-sm hover:glass-strong transition-all">
                  {headerBlock.data.website}
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-8 py-16">
        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Builder Score Card */}
          {builderScoreBlock && builderScoreBlock.data.score > 0 && (
            <div className="glass-liquid rounded-3xl p-10 text-center space-y-4 row-span-2">
              <div className="text-8xl font-bold gradient-text animate-pulse-slow">
                {builderScoreBlock.data.score}
              </div>
              <p className="text-xl text-text-secondary">Builder Score</p>
              <p className="text-sm text-text-tertiary">Talent Protocol</p>
              {builderScoreBlock.data.credentials?.length > 0 && (
                <div className="grid gap-3 mt-8">
                  {builderScoreBlock.data.credentials.slice(0, 3).map((cred: any, idx: number) => (
                    <div key={idx} className="glass rounded-xl p-4 text-left">
                      <p className="font-semibold text-sm">{cred.name}</p>
                      <p className="text-xs text-text-tertiary">{cred.issuer}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Onchain Activity Grid */}
          {onchainBlock && onchainBlock.data.transactions > 0 && (
            <>
              <div className="glass-strong rounded-3xl p-8 text-center">
                <div className="text-5xl font-bold gradient-text">{onchainBlock.data.contractsDeployed}</div>
                <p className="text-text-secondary mt-3">Contracts Deployed</p>
              </div>
              <div className="glass-strong rounded-3xl p-8 text-center">
                <div className="text-5xl font-bold gradient-text">{onchainBlock.data.nftsMinted}</div>
                <p className="text-text-secondary mt-3">NFTs Minted</p>
              </div>
              <div className="glass-strong rounded-3xl p-8 text-center">
                <div className="text-5xl font-bold gradient-text">{onchainBlock.data.daoMemberships?.length || 0}</div>
                <p className="text-text-secondary mt-3">DAO Memberships</p>
              </div>
              <div className="glass-strong rounded-3xl p-8 text-center">
                <div className="text-5xl font-bold gradient-text">{onchainBlock.data.transactions}</div>
                <p className="text-text-secondary mt-3">Total Transactions</p>
              </div>
            </>
          )}
        </div>

        {/* Experience Timeline */}
        {experienceBlock && experienceBlock.data.experiences?.length > 0 && (
          <div className="mb-16">
            <h2 className="text-4xl font-bold gradient-text mb-8">Experience</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {experienceBlock.data.experiences.map((exp: any, idx: number) => (
                <div key={idx} className="glass-strong rounded-3xl p-8 space-y-4 hover:glow-primary transition-all">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold">{exp.title}</h3>
                      <p className="text-lg text-text-secondary">{exp.company}</p>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm text-text-tertiary">
                    <span>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                    {exp.location && <span>{exp.location}</span>}
                  </div>
                  {exp.description && (
                    <p className="text-text-secondary leading-relaxed whitespace-pre-line">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills Cloud */}
        {skillsBlock && skillsBlock.data.skills?.length > 0 && (
          <div className="mb-16">
            <h2 className="text-4xl font-bold gradient-text mb-8">Skills</h2>
            <div className="glass-strong rounded-3xl p-10">
              <div className="flex flex-wrap gap-4 justify-center">
                {skillsBlock.data.skills.map((skill: string, idx: number) => (
                  <span
                    key={idx}
                    className="glass-liquid px-6 py-4 rounded-2xl font-semibold text-lg hover:glow-accent transition-all cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Custom Content Grid */}
        {customBlocks.length > 0 && (
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {customBlocks.map((block, idx) => (
              <div key={idx} className="glass-strong rounded-3xl p-10 space-y-4">
                {block.data.title && (
                  <h2 className="text-3xl font-bold gradient-text">{block.data.title}</h2>
                )}
                {block.data.content && (
                  <p className="text-text-secondary leading-relaxed whitespace-pre-line">
                    {block.data.content}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Links */}
        {linksBlock && linksBlock.data.links?.length > 0 && (
          <div className="glass-liquid rounded-3xl p-10">
            <h2 className="text-3xl font-bold gradient-text mb-8 text-center">Connect</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {linksBlock.data.links.map((link: any, idx: number) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-strong rounded-2xl p-6 text-center hover:glow-primary transition-all group"
                >
                  <p className="font-semibold text-lg">{link.label}</p>
                  <p className="text-sm text-primary-500 group-hover:underline mt-2">Visit →</p>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
