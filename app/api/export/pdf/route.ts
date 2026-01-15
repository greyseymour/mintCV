import { NextRequest, NextResponse } from 'next/server'
import { renderToBuffer } from '@react-pdf/renderer'
import React from 'react'
import { MinimalistPDF } from '@/lib/pdf/minimalist-pdf'
import type { Block } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { blocks } = body

    if (!blocks) {
      return NextResponse.json(
        { error: 'blocks are required' },
        { status: 400 }
      )
    }

    // Generate PDF buffer
    const buffer = await renderToBuffer(React.createElement(MinimalistPDF, { blocks: blocks as Block[] }))

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="resume.pdf"',
      },
    })
  } catch (error) {
    console.error('Error generating PDF:', error)
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    )
  }
}
