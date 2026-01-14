import { NextRequest, NextResponse } from 'next/server'
import { polishJobDescription, polishBio } from '@/lib/services/ai-enhancement'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, content } = body

    if (!type || !content) {
      return NextResponse.json(
        { error: 'type and content are required' },
        { status: 400 }
      )
    }

    let polished: string

    switch (type) {
      case 'bio':
        polished = await polishBio(content)
        break
      case 'description':
        polished = await polishJobDescription(content)
        break
      default:
        return NextResponse.json(
          { error: 'Invalid type. Use "bio" or "description"' },
          { status: 400 }
        )
    }

    return NextResponse.json({ polished })
  } catch (error) {
    console.error('Error polishing content:', error)
    return NextResponse.json(
      { error: 'Failed to polish content' },
      { status: 500 }
    )
  }
}
