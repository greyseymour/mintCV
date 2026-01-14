import { getTalentPassport } from '@/lib/api/talent-protocol'
import { getGitHubData } from '@/lib/api/github'
import { getFarcasterUserByFid, getEngagementMetrics } from '@/lib/api/farcaster'
import { getOnchainActivity, getNFTsOwned } from '@/lib/api/onchain'
import type { TalentProtocolData, GitHubData, FarcasterData, OnchainActivity } from '@/types'

export interface AggregatedUserData {
  talent?: TalentProtocolData | null
  github?: GitHubData | null
  farcaster?: FarcasterData | null
  onchain?: OnchainActivity | null
  nfts?: any[]
  farcasterEngagement?: any
  lastUpdated: Date
}

/**
 * Aggregate all user data from connected sources
 */
export async function aggregateUserData(params: {
  walletAddress?: string
  githubUsername?: string
  farcasterFid?: string
}): Promise<AggregatedUserData> {
  const results: AggregatedUserData = {
    lastUpdated: new Date(),
  }

  // Fetch data in parallel
  const promises: Promise<any>[] = []

  // Talent Protocol (requires wallet)
  if (params.walletAddress) {
    promises.push(
      getTalentPassport(params.walletAddress)
        .then(data => { results.talent = data })
        .catch(err => console.error('Talent Protocol error:', err))
    )

    promises.push(
      getOnchainActivity(params.walletAddress as `0x${string}`)
        .then(data => { results.onchain = data })
        .catch(err => console.error('Onchain data error:', err))
    )

    promises.push(
      getNFTsOwned(params.walletAddress as `0x${string}`)
        .then(data => { results.nfts = data })
        .catch(err => console.error('NFT data error:', err))
    )
  }

  // GitHub
  if (params.githubUsername) {
    promises.push(
      getGitHubData(params.githubUsername)
        .then(data => { results.github = data })
        .catch(err => console.error('GitHub error:', err))
    )
  }

  // Farcaster
  if (params.farcasterFid) {
    promises.push(
      getFarcasterUserByFid(params.farcasterFid)
        .then(data => { results.farcaster = data })
        .catch(err => console.error('Farcaster error:', err))
    )

    promises.push(
      getEngagementMetrics(params.farcasterFid)
        .then(data => { results.farcasterEngagement = data })
        .catch(err => console.error('Farcaster engagement error:', err))
    )
  }

  // Wait for all requests to complete
  await Promise.all(promises)

  return results
}

/**
 * Refresh a specific data source
 */
export async function refreshDataSource(
  sourceType: 'talent' | 'github' | 'farcaster' | 'onchain',
  params: {
    walletAddress?: string
    githubUsername?: string
    farcasterFid?: string
  }
): Promise<any> {
  switch (sourceType) {
    case 'talent':
      if (!params.walletAddress) throw new Error('Wallet address required')
      return getTalentPassport(params.walletAddress)

    case 'github':
      if (!params.githubUsername) throw new Error('GitHub username required')
      return getGitHubData(params.githubUsername)

    case 'farcaster':
      if (!params.farcasterFid) throw new Error('Farcaster FID required')
      return getFarcasterUserByFid(params.farcasterFid)

    case 'onchain':
      if (!params.walletAddress) throw new Error('Wallet address required')
      return getOnchainActivity(params.walletAddress as `0x${string}`)

    default:
      throw new Error(`Unknown source type: ${sourceType}`)
  }
}

/**
 * Calculate a comprehensive "builder score" from all sources
 */
export function calculateBuilderScore(data: AggregatedUserData): number {
  let score = 0

  // Talent Protocol score (0-50 points)
  if (data.talent?.builderScore) {
    score += Math.min(data.talent.builderScore / 2, 50)
  }

  // GitHub contributions (0-25 points)
  if (data.github) {
    const githubScore = Math.min(
      (data.github.totalStars / 10) + // 1 point per 10 stars
      (data.github.repositories.length / 2) + // 0.5 point per repo
      (data.github.totalCommits / 100), // 1 point per 100 commits
      25
    )
    score += githubScore
  }

  // Farcaster engagement (0-15 points)
  if (data.farcaster && data.farcasterEngagement) {
    const farcasterScore = Math.min(
      (data.farcaster.followers / 100) + // 1 point per 100 followers
      (data.farcasterEngagement.totalLikes / 500) + // 1 point per 500 likes
      (data.farcasterEngagement.totalRecasts / 100), // 1 point per 100 recasts
      15
    )
    score += farcasterScore
  }

  // Onchain activity (0-10 points)
  if (data.onchain) {
    const onchainScore = Math.min(
      (data.onchain.contractsDeployed * 2) + // 2 points per contract
      (data.onchain.nftsMinted / 5) + // 1 point per 5 NFTs minted
      (data.onchain.daoMemberships.length * 1), // 1 point per DAO
      10
    )
    score += onchainScore
  }

  return Math.round(score)
}

/**
 * Get data freshness status
 */
export function getDataFreshness(lastUpdated: Date): {
  status: 'fresh' | 'stale' | 'expired'
  message: string
} {
  const now = new Date()
  const ageInMinutes = (now.getTime() - lastUpdated.getTime()) / 1000 / 60

  if (ageInMinutes < 60) {
    return { status: 'fresh', message: 'Updated recently' }
  } else if (ageInMinutes < 1440) {
    return { status: 'stale', message: 'Updated today' }
  } else {
    return { status: 'expired', message: 'Needs refresh' }
  }
}
