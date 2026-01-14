import axios from 'axios'
import { API_ENDPOINTS } from '@/config/constants'
import type { FarcasterData } from '@/types'

const client = axios.create({
  baseURL: API_ENDPOINTS.NEYNAR,
  headers: {
    'api_key': process.env.NEYNAR_API_KEY || '',
  },
})

interface NeynarUser {
  fid: number
  username: string
  display_name: string
  pfp_url: string
  profile: {
    bio: {
      text: string
    }
  }
  follower_count: number
  following_count: number
  verifications: string[]
}

interface NeynarCast {
  hash: string
  author: {
    fid: number
    username: string
  }
  text: string
  timestamp: string
  reactions: {
    likes_count: number
    recasts_count: number
  }
}

/**
 * Fetch Farcaster user data by FID
 */
export async function getFarcasterUserByFid(fid: string): Promise<FarcasterData | null> {
  try {
    const response = await client.get('/farcaster/user/bulk', {
      params: { fids: fid },
    })

    const user = response.data.users[0] as NeynarUser

    if (!user) {
      return null
    }

    return {
      fid: user.fid.toString(),
      username: user.username,
      displayName: user.display_name,
      followers: user.follower_count,
      following: user.following_count,
      bio: user.profile?.bio?.text || '',
      pfpUrl: user.pfp_url,
    }
  } catch (error) {
    console.error('Error fetching Farcaster user by FID:', error)
    return null
  }
}

/**
 * Fetch Farcaster user data by username
 */
export async function getFarcasterUserByUsername(username: string): Promise<FarcasterData | null> {
  try {
    const response = await client.get('/farcaster/user/by_username', {
      params: { username },
    })

    const user = response.data.result.user as NeynarUser

    if (!user) {
      return null
    }

    return {
      fid: user.fid.toString(),
      username: user.username,
      displayName: user.display_name,
      followers: user.follower_count,
      following: user.following_count,
      bio: user.profile?.bio?.text || '',
      pfpUrl: user.pfp_url,
    }
  } catch (error) {
    console.error('Error fetching Farcaster user by username:', error)
    return null
  }
}

/**
 * Fetch user's verified addresses
 */
export async function getVerifiedAddresses(fid: string): Promise<string[]> {
  try {
    const response = await client.get('/farcaster/user/bulk', {
      params: { fids: fid },
    })

    const user = response.data.users[0] as NeynarUser
    return user?.verifications || []
  } catch (error) {
    console.error('Error fetching verified addresses:', error)
    return []
  }
}

/**
 * Fetch user's recent casts
 */
export async function getRecentCasts(fid: string, limit: number = 25): Promise<any[]> {
  try {
    const response = await client.get('/farcaster/casts', {
      params: {
        fid,
        limit,
      },
    })

    return response.data.result.casts || []
  } catch (error) {
    console.error('Error fetching recent casts:', error)
    return []
  }
}

/**
 * Get engagement metrics for a user
 */
export async function getEngagementMetrics(fid: string) {
  try {
    const casts = await getRecentCasts(fid, 100)

    const totalLikes = casts.reduce((sum, cast: NeynarCast) => sum + (cast.reactions?.likes_count || 0), 0)
    const totalRecasts = casts.reduce((sum, cast: NeynarCast) => sum + (cast.reactions?.recasts_count || 0), 0)

    return {
      totalCasts: casts.length,
      totalLikes,
      totalRecasts,
      avgLikesPerCast: casts.length > 0 ? totalLikes / casts.length : 0,
      avgRecastsPerCast: casts.length > 0 ? totalRecasts / casts.length : 0,
    }
  } catch (error) {
    console.error('Error fetching engagement metrics:', error)
    return null
  }
}

/**
 * Search for Farcaster users
 */
export async function searchFarcasterUsers(query: string) {
  try {
    const response = await client.get('/farcaster/user/search', {
      params: { q: query },
    })

    return response.data.result.users || []
  } catch (error) {
    console.error('Error searching Farcaster users:', error)
    return []
  }
}

/**
 * Get user's channels (communities)
 */
export async function getUserChannels(fid: string) {
  try {
    const response = await client.get('/farcaster/user/channels', {
      params: { fid },
    })

    return response.data.channels || []
  } catch (error) {
    console.error('Error fetching user channels:', error)
    return []
  }
}
