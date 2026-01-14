// User and Authentication Types
export interface User {
  id: string
  email?: string
  walletAddress?: string
  farcasterFid?: string
  githubUsername?: string
  createdAt: Date
  updatedAt: Date
}

export interface Session {
  user: User
  accessToken: string
  expiresAt: Date
}

// CV and Resume Types
export type BlockType =
  | 'header'
  | 'experience'
  | 'skills'
  | 'onchain-highlights'
  | 'nft-gallery'
  | 'social-proof'
  | 'builder-score'
  | 'custom-text'
  | 'links'
  | 'attestations'

export interface Block {
  id: string
  type: BlockType
  order: number
  data: Record<string, any>
  visible: boolean
}

export interface CV {
  id: string
  userId: string
  slug: string
  title: string
  template: string
  blocks: Block[]
  published: boolean
  publishedAt?: Date
  nftTokenId?: string
  createdAt: Date
  updatedAt: Date
}

// Data Source Types
export interface TalentProtocolData {
  builderScore: number
  credentials: Credential[]
  skills: string[]
  passportId: string
}

export interface Credential {
  id: string
  name: string
  issuer: string
  issuedDate: Date
  verificationUrl?: string
}

export interface GitHubData {
  username: string
  repositories: Repository[]
  totalStars: number
  totalCommits: number
  languages: string[]
}

export interface Repository {
  name: string
  description: string
  stars: number
  forks: number
  language: string
  url: string
}

export interface OnchainActivity {
  address: string
  contractsDeployed: number
  nftsMinted: number
  nftsCollected: number
  daoMemberships: DaoMembership[]
  transactions: number
}

export interface DaoMembership {
  name: string
  tokenAddress: string
  balance: string
  votingPower?: string
}

export interface FarcasterData {
  fid: string
  username: string
  displayName: string
  followers: number
  following: number
  bio: string
  pfpUrl: string
}

// Token Types
export interface TokenBalance {
  address: string
  symbol: string
  balance: string
  stakedAmount?: string
}

export interface BurnTransaction {
  id: string
  userId: string
  amount: string
  reason: 'export-pdf' | 'export-docx' | 'mint-nft' | 'update-cv' | 'send-email'
  txHash: string
  createdAt: Date
}

// Template Types
export interface Template {
  id: string
  name: string
  description: string
  thumbnail: string
  isPremium: boolean
  stakeRequirement?: string
  category: 'minimalist' | 'liquid-glass' | 'terminal' | 'portfolio'
}

// Export Types
export type ExportFormat = 'pdf' | 'docx' | 'nft'

export interface ExportRequest {
  cvId: string
  format: ExportFormat
  userId: string
}
