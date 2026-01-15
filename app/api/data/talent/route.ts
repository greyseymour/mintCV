import { NextRequest, NextResponse } from 'next/server'
import { getTalentPassport } from '@/lib/api/talent-protocol'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const walletAddress = searchParams.get('address')

    if (!walletAddress) {
      return NextResponse.json(
        { error: 'Wallet address is required' },
        { status: 400 }
      )
    }

    const data = await getTalentPassport(walletAddress)

    if (!data) {
      return NextResponse.json(
        { error: 'No Talent Protocol data found for this address' },
        { status: 404 }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching Talent Protocol data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch Talent Protocol data' },
      { status: 500 }
    )
  }
}
