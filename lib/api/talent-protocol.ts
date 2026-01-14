import axios from 'axios'
import { API_ENDPOINTS } from '@/config/constants'
import type { TalentProtocolData, Credential } from '@/types'

const client = axios.create({
  baseURL: API_ENDPOINTS.TALENT_PROTOCOL,
  headers: {
    'X-API-KEY': process.env.TALENT_PROTOCOL_API_KEY || '',
  },
})

export interface TalentPassport {
  passport_id: string
  score: number
  verified: boolean
  credentials: any[]
  skills: string[]
}

export interface TalentCredential {
  id: string
  category: string
  name: string
  description: string
  image_url: string
  verification_url?: string
  issued_at: string
}

/**
 * Fetch Talent Protocol passport data by wallet address
 */
export async function getTalentPassport(walletAddress: string): Promise<TalentProtocolData | null> {
  try {
    const response = await client.get(`/passports/${walletAddress}`)
    const passport = response.data.passport as TalentPassport

    if (!passport) {
      return null
    }

    // Map credentials
    const credentials: Credential[] = passport.credentials.map((cred: TalentCredential) => ({
      id: cred.id,
      name: cred.name,
      issuer: cred.category,
      issuedDate: new Date(cred.issued_at),
      verificationUrl: cred.verification_url,
    }))

    return {
      builderScore: passport.score,
      credentials,
      skills: passport.skills || [],
      passportId: passport.passport_id,
    }
  } catch (error) {
    console.error('Error fetching Talent Protocol data:', error)
    return null
  }
}

/**
 * Fetch builder score only (lighter request)
 */
export async function getBuilderScore(walletAddress: string): Promise<number | null> {
  try {
    const data = await getTalentPassport(walletAddress)
    return data?.builderScore || null
  } catch (error) {
    console.error('Error fetching builder score:', error)
    return null
  }
}

/**
 * Search for talent profiles
 */
export async function searchTalentProfiles(query: string) {
  try {
    const response = await client.get('/passports/search', {
      params: { query },
    })
    return response.data
  } catch (error) {
    console.error('Error searching talent profiles:', error)
    return []
  }
}
