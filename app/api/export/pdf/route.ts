import { NextRequest, NextResponse } from 'next/server'
import { renderToStream } from '@react-pdf/renderer'
import { MinimalistPDF } from '@/lib/pdf/minimalist-pdf'
import type { Block } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { blocks, template } = body

    if (!blocks) {
      return NextResponse.json(
        { error: 'blocks are required' },
        { status: 400 }
      )
    }

    // For now, use minimalist template for all
    // In the future, create different PDF templates
    const pdfDocument = <MinimalistPDF blocks={blocks as Block[]} />

    const stream = await renderToStream(pdfDocument)

    return new NextResponse(stream as any, {
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
