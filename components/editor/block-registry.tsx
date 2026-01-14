import { HeaderBlock } from '@/components/blocks/header-block'
import { ExperienceBlock } from '@/components/blocks/experience-block'
import { SkillsBlock } from '@/components/blocks/skills-block'
import { BuilderScoreBlock } from '@/components/blocks/builder-score-block'
import { OnchainHighlightsBlock } from '@/components/blocks/onchain-highlights-block'
import { LinksBlock } from '@/components/blocks/links-block'
import { CustomTextBlock } from '@/components/blocks/custom-text-block'
import type { BlockType } from '@/types'

export const BLOCK_REGISTRY: Record<BlockType, any> = {
  'header': HeaderBlock,
  'experience': ExperienceBlock,
  'skills': SkillsBlock,
  'builder-score': BuilderScoreBlock,
  'onchain-highlights': OnchainHighlightsBlock,
  'links': LinksBlock,
  'custom-text': CustomTextBlock,
  'nft-gallery': CustomTextBlock, // TODO: Implement NFT gallery
  'social-proof': CustomTextBlock, // TODO: Implement social proof
  'attestations': CustomTextBlock, // TODO: Implement attestations (V2)
}

export const BLOCK_METADATA: Record<BlockType, { label: string; icon: string; description: string }> = {
  'header': {
    label: 'Header',
    icon: '👤',
    description: 'Name, title, and contact information',
  },
  'experience': {
    label: 'Experience',
    icon: '💼',
    description: 'Work history and positions',
  },
  'skills': {
    label: 'Skills',
    icon: '⚡',
    description: 'Technical and soft skills',
  },
  'builder-score': {
    label: 'Builder Score',
    icon: '🏆',
    description: 'Talent Protocol builder score',
  },
  'onchain-highlights': {
    label: 'Onchain Activity',
    icon: '⛓️',
    description: 'Contracts, NFTs, and DAOs',
  },
  'links': {
    label: 'Links',
    icon: '🔗',
    description: 'Portfolio, social media, and websites',
  },
  'custom-text': {
    label: 'Custom Section',
    icon: '📝',
    description: 'Add any custom content',
  },
  'nft-gallery': {
    label: 'NFT Gallery',
    icon: '🖼️',
    description: 'Showcase your NFT collection (Coming Soon)',
  },
  'social-proof': {
    label: 'Social Proof',
    icon: '👥',
    description: 'Farcaster followers and engagement (Coming Soon)',
  },
  'attestations': {
    label: 'Recommendations',
    icon: '✨',
    description: 'Onchain attestations (V2)',
  },
}

export function getBlockComponent(blockType: BlockType) {
  return BLOCK_REGISTRY[blockType] || CustomTextBlock
}
