import { NextRequest, NextResponse } from 'next/server'
import { createCV, getUserCVs } from '@/lib/services/cv-service'

// POST - Create new CV
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, title, template, blocks } = body

    if (!userId || !title) {
      return NextResponse.json(
        { error: 'userId and title are required' },
        { status: 400 }
      )
    }

    const { data, error } = await createCV({
      userId,
      title,
      template: template || 'minimalist-dark',
      blocks: blocks || [],
    })

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error creating CV:', error)
    return NextResponse.json(
      { error: 'Failed to create CV' },
      { status: 500 }
    )
  }
}

// GET - Get user's CVs
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { error: 'userId is required' },
        { status: 400 }
      )
    }

    const { data, error } = await getUserCVs(userId)

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(data || [])
  } catch (error) {
    console.error('Error fetching CVs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch CVs' },
      { status: 500 }
    )
  }
}
