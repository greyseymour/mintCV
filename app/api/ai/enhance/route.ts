import { NextRequest, NextResponse } from 'next/server'
import { enhanceCV, suggestSkills } from '@/lib/services/ai-enhancement'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { blocks, targetRole, action } = body

    if (!blocks) {
      return NextResponse.json(
        { error: 'blocks are required' },
        { status: 400 }
      )
    }

    if (action === 'suggest-skills') {
      const experienceBlock = blocks.find((b: any) => b.type === 'experience')
      if (!experienceBlock || !experienceBlock.data.experiences) {
        return NextResponse.json(
          { error: 'No experience data found' },
          { status: 400 }
        )
      }

      const skills = await suggestSkills(experienceBlock.data.experiences)
      return NextResponse.json({ skills })
    }

    const result = await enhanceCV({ blocks, targetRole })

    return NextResponse.json(result)
  } catch (error) {
    console.error('Error enhancing CV:', error)
    return NextResponse.json(
      { error: 'Failed to enhance CV' },
      { status: 500 }
    )
  }
}
