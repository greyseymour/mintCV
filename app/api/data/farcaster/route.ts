import { NextRequest, NextResponse } from 'next/server'
import { getFarcasterUserByFid, getFarcasterUserByUsername } from '@/lib/api/farcaster'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const fid = searchParams.get('fid')
    const username = searchParams.get('username')

    if (!fid && !username) {
      return NextResponse.json(
        { error: 'Either FID or username is required' },
        { status: 400 }
      )
    }

    let data
    if (fid) {
      data = await getFarcasterUserByFid(fid)
    } else if (username) {
      data = await getFarcasterUserByUsername(username)
    }

    if (!data) {
      return NextResponse.json(
        { error: 'No Farcaster data found' },
        { status: 404 }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching Farcaster data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch Farcaster data' },
      { status: 500 }
    )
  }
}
