import { base } from 'viem/chains'

// App Configuration
export const APP_NAME = 'MintCV'
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

// Blockchain Configuration
export const CHAIN = base
export const CHAIN_ID = base.id

// Contract Addresses (to be deployed)
export const MINTCV_TOKEN_ADDRESS = process.env.NEXT_PUBLIC_MINTCV_TOKEN_ADDRESS as `0x${string}` | undefined
export const CV_NFT_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CV_NFT_CONTRACT_ADDRESS as `0x${string}` | undefined
export const STAKING_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS as `0x${string}` | undefined

// Token Economics
export const BURN_AMOUNTS = {
  PDF_EXPORT: '100', // 100 $MINTCV tokens
  DOCX_EXPORT: '100',
  NFT_MINT: '500',
  CV_UPDATE: '50',
  EMAIL_SEND: '25',
} as const

export const STAKE_TIERS = {
  PREMIUM_TEMPLATES: '1000',
  AI_ENHANCEMENT: '500',
  AUTO_SYNDICATION: '5000',
} as const

// API Endpoints
export const API_ENDPOINTS = {
  TALENT_PROTOCOL: 'https://api.talentprotocol.com/api/v2',
  GITHUB: 'https://api.github.com',
  NEYNAR: 'https://api.neynar.com/v2',
} as const

// Block Types
export const BLOCK_TYPES = [
  'header',
  'experience',
  'skills',
  'onchain-highlights',
  'nft-gallery',
  'social-proof',
  'builder-score',
  'custom-text',
  'links',
  'attestations',
] as const

// Template Categories
export const TEMPLATE_CATEGORIES = [
  'minimalist',
  'liquid-glass',
  'terminal',
  'portfolio',
] as const

// CV Settings
export const MAX_BLOCKS_PER_CV = 50
export const MAX_CV_TITLE_LENGTH = 100
export const SLUG_PATTERN = /^[a-z0-9-]+$/

// Rate Limiting
export const RATE_LIMITS = {
  CV_UPDATES_PER_HOUR: 10,
  API_REQUESTS_PER_MINUTE: 60,
  EXPORTS_PER_DAY: 20,
} as const

// Cache TTL (in seconds)
export const CACHE_TTL = {
  GITHUB_DATA: 3600, // 1 hour
  TALENT_PROTOCOL: 3600, // 1 hour
  FARCASTER_DATA: 1800, // 30 minutes
  ONCHAIN_DATA: 900, // 15 minutes
} as const

// Feature Flags
export const FEATURES = {
  ENABLE_NFT_MINTING: false, // Enable when contracts deployed
  ENABLE_AI_ENHANCEMENT: true,
  ENABLE_LINKEDIN_AUTH: false, // V2 feature
  ENABLE_AUTO_SYNDICATION: false, // V2 feature
} as const
