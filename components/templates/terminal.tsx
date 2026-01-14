'use client'

import type { Block } from '@/types'

interface TerminalProps {
  blocks: Block[]
  walletAddress?: string
}

export function Terminal({ blocks }: TerminalProps) {
  const headerBlock = blocks.find(b => b.type === 'header')
  const experienceBlock = blocks.find(b => b.type === 'experience')
  const skillsBlock = blocks.find(b => b.type === 'skills')
  const linksBlock = blocks.find(b => b.type === 'links')
  const builderScoreBlock = blocks.find(b => b.type === 'builder-score')
  const onchainBlock = blocks.find(b => b.type === 'onchain-highlights')
  const customBlocks = blocks.filter(b => b.type === 'custom-text')

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Terminal Header */}
        <div className="border border-green-400/30 rounded-lg p-6 space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="ml-4 text-green-400/60 text-sm">~/cv</span>
          </div>

          {headerBlock && (
            <>
              <div className="space-y-2">
                <p className="text-green-400/60">$ cat name.txt</p>
                <p className="text-3xl font-bold text-green-400">
                  {headerBlock.data.name || 'Your Name'}
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-green-400/60">$ cat title.txt</p>
                <p className="text-xl text-green-300">
                  {headerBlock.data.title || 'Your Title'}
                </p>
              </div>

              <div className="flex flex-wrap gap-4 text-sm">
                {headerBlock.data.email && (
                  <span className="text-green-400/80">[email: {headerBlock.data.email}]</span>
                )}
                {headerBlock.data.location && (
                  <span className="text-green-400/80">[location: {headerBlock.data.location}]</span>
                )}
                {headerBlock.data.website && (
                  <span className="text-green-400/80">[web: {headerBlock.data.website}]</span>
                )}
              </div>

              {headerBlock.data.bio && (
                <div className="space-y-2 mt-4">
                  <p className="text-green-400/60">$ cat bio.txt</p>
                  <p className="text-green-300/90 leading-relaxed">
                    {headerBlock.data.bio}
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Builder Score */}
        {builderScoreBlock && builderScoreBlock.data.score > 0 && (
          <div className="border border-green-400/30 rounded-lg p-6 space-y-4">
            <p className="text-green-400/60">$ echo $BUILDER_SCORE</p>
            <div className="text-6xl font-bold text-green-400 tabular-nums">
              {builderScoreBlock.data.score}
            </div>
            <p className="text-green-400/80 text-sm"># Talent Protocol Score</p>
          </div>
        )}

        {/* Onchain Stats */}
        {onchainBlock && onchainBlock.data.transactions > 0 && (
          <div className="border border-green-400/30 rounded-lg p-6 space-y-4">
            <p className="text-green-400/60">$ ./check_onchain_stats.sh</p>
            <div className="grid grid-cols-2 gap-4 font-mono">
              <div>
                <p className="text-green-400/60 text-sm">contracts_deployed=</p>
                <p className="text-2xl text-green-400">{onchainBlock.data.contractsDeployed}</p>
              </div>
              <div>
                <p className="text-green-400/60 text-sm">nfts_minted=</p>
                <p className="text-2xl text-green-400">{onchainBlock.data.nftsMinted}</p>
              </div>
              <div>
                <p className="text-green-400/60 text-sm">dao_memberships=</p>
                <p className="text-2xl text-green-400">{onchainBlock.data.daoMemberships?.length || 0}</p>
              </div>
              <div>
                <p className="text-green-400/60 text-sm">total_txs=</p>
                <p className="text-2xl text-green-400">{onchainBlock.data.transactions}</p>
              </div>
            </div>
            <p className="text-green-400/60 text-sm mt-4"># Status: ACTIVE</p>
          </div>
        )}

        {/* Experience */}
        {experienceBlock && experienceBlock.data.experiences?.length > 0 && (
          <div className="border border-green-400/30 rounded-lg p-6 space-y-6">
            <p className="text-green-400/60">$ ls -la experience/</p>
            {experienceBlock.data.experiences.map((exp: any, idx: number) => (
              <div key={idx} className="space-y-2 border-l-2 border-green-400/30 pl-4">
                <div className="flex justify-between items-start flex-wrap gap-2">
                  <div>
                    <p className="text-lg font-bold text-green-400">&gt; {exp.title}</p>
                    <p className="text-green-300/80">@ {exp.company}</p>
                  </div>
                  <div className="text-sm text-green-400/60 text-right">
                    <p>[{exp.startDate} - {exp.current ? 'CURRENT' : exp.endDate}]</p>
                    {exp.location && <p>{exp.location}</p>}
                  </div>
                </div>
                {exp.description && (
                  <p className="text-green-300/70 text-sm leading-relaxed whitespace-pre-line">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {skillsBlock && skillsBlock.data.skills?.length > 0 && (
          <div className="border border-green-400/30 rounded-lg p-6 space-y-4">
            <p className="text-green-400/60">$ cat skills.json</p>
            <div className="space-y-2">
              <p className="text-green-400/80">{'{'}</p>
              {skillsBlock.data.skills.map((skill: string, idx: number) => (
                <p key={idx} className="text-green-300 ml-4">
                  "{skill}"{idx < skillsBlock.data.skills.length - 1 ? ',' : ''}
                </p>
              ))}
              <p className="text-green-400/80">{'}'}</p>
            </div>
          </div>
        )}

        {/* Custom Sections */}
        {customBlocks.map((block, idx) => (
          <div key={idx} className="border border-green-400/30 rounded-lg p-6 space-y-4">
            {block.data.title && (
              <p className="text-green-400/60">$ cat {block.data.title.toLowerCase().replace(/\s+/g, '_')}.txt</p>
            )}
            {block.data.content && (
              <p className="text-green-300/90 leading-relaxed whitespace-pre-line">
                {block.data.content}
              </p>
            )}
          </div>
        ))}

        {/* Links */}
        {linksBlock && linksBlock.data.links?.length > 0 && (
          <div className="border border-green-400/30 rounded-lg p-6 space-y-4">
            <p className="text-green-400/60">$ cat links.txt</p>
            <div className="space-y-2">
              {linksBlock.data.links.map((link: any, idx: number) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-green-400 hover:text-green-300 hover:underline"
                >
                  → {link.label}: {link.url}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center text-green-400/40 text-sm pt-8">
          <p>$ exit</p>
        </div>
      </div>
    </div>
  )
}
