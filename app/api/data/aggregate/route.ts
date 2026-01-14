import { NextRequest, NextResponse } from 'next/server'
import { aggregateUserData } from '@/lib/services/data-aggregator'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { walletAddress, githubUsername, farcasterFid } = body

    if (!walletAddress && !githubUsername && !farcasterFid) {
      return NextResponse.json(
        { error: 'At least one identifier is required' },
        { status: 400 }
      )
    }

    const data = await aggregateUserData({
      walletAddress,
      githubUsername,
      farcasterFid,
    })

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error aggregating user data:', error)
    return NextResponse.json(
      { error: 'Failed to aggregate user data' },
      { status: 500 }
    )
  }
}
