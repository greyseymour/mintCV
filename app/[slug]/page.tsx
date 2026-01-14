import { getCVBySlug } from '@/lib/services/cv-service'
import { getTemplate } from '@/components/templates/template-registry'
import { notFound } from 'next/navigation'
import type { Block } from '@/types'

export default async function PublicCVPage({ params }: { params: { slug: string } }) {
  const { data: cv, error } = await getCVBySlug(params.slug)

  if (error || !cv || !cv.published) {
    notFound()
  }

  const TemplateComponent = getTemplate(cv.template as any)

  return (
    <div className="min-h-screen">
      <TemplateComponent blocks={cv.blocks as Block[]} />

      {/* Branding Footer */}
      <div className="fixed bottom-6 right-6">
        <a
          href="/"
          className="glass px-6 py-3 rounded-2xl text-sm hover:glass-strong transition-all flex items-center gap-2"
        >
          <span>Made with</span>
          <span className="gradient-text font-bold">MintCV</span>
        </a>
      </div>
    </div>
  )
}
