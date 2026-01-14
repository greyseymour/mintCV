import { createClient } from '@/lib/supabase/client'
import type { Block, CV } from '@/types'
import { nanoid } from 'nanoid'

/**
 * Generate a unique slug for a CV
 */
export function generateSlug(title: string): string {
  const base = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    || 'untitled'

  const id = nanoid(8)
  return `${base}-${id}`
}

/**
 * Create a new CV
 */
export async function createCV(params: {
  userId: string
  title: string
  template: string
  blocks: Block[]
}): Promise<{ data: CV | null; error: any }> {
  const supabase = createClient()

  const slug = generateSlug(params.title)

  const { data, error } = await supabase
    .from('cvs')
    .insert({
      user_id: params.userId,
      title: params.title,
      slug,
      template: params.template,
      blocks: params.blocks as any,
      published: false,
    })
    .select()
    .single()

  return { data: data as CV | null, error }
}

/**
 * Update an existing CV
 */
export async function updateCV(params: {
  id: string
  title?: string
  template?: string
  blocks?: Block[]
  published?: boolean
}): Promise<{ data: CV | null; error: any }> {
  const supabase = createClient()

  const updates: any = {}
  if (params.title !== undefined) updates.title = params.title
  if (params.template !== undefined) updates.template = params.template
  if (params.blocks !== undefined) updates.blocks = params.blocks
  if (params.published !== undefined) {
    updates.published = params.published
    if (params.published) {
      updates.published_at = new Date().toISOString()
    }
  }

  const { data, error } = await supabase
    .from('cvs')
    .update(updates)
    .eq('id', params.id)
    .select()
    .single()

  return { data: data as CV | null, error }
}

/**
 * Get CV by ID
 */
export async function getCVById(id: string): Promise<{ data: CV | null; error: any }> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('cvs')
    .select('*')
    .eq('id', id)
    .single()

  return { data: data as CV | null, error }
}

/**
 * Get CV by slug (public)
 */
export async function getCVBySlug(slug: string): Promise<{ data: CV | null; error: any }> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('cvs')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  // Increment view count
  if (data) {
    await supabase
      .from('cvs')
      .update({ view_count: (data.view_count || 0) + 1 })
      .eq('id', data.id)
  }

  return { data: data as CV | null, error }
}

/**
 * Get all CVs for a user
 */
export async function getUserCVs(userId: string): Promise<{ data: CV[] | null; error: any }> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('cvs')
    .select('*')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false })

  return { data: data as CV[] | null, error }
}

/**
 * Delete a CV
 */
export async function deleteCV(id: string): Promise<{ error: any }> {
  const supabase = createClient()

  const { error } = await supabase
    .from('cvs')
    .delete()
    .eq('id', id)

  return { error }
}

/**
 * Publish a CV
 */
export async function publishCV(id: string): Promise<{ data: CV | null; error: any }> {
  return updateCV({ id, published: true })
}

/**
 * Unpublish a CV
 */
export async function unpublishCV(id: string): Promise<{ data: CV | null; error: any }> {
  return updateCV({ id, published: false })
}

/**
 * Duplicate a CV
 */
export async function duplicateCV(params: {
  cvId: string
  userId: string
}): Promise<{ data: CV | null; error: any }> {
  const { data: original, error: fetchError } = await getCVById(params.cvId)

  if (fetchError || !original) {
    return { data: null, error: fetchError }
  }

  return createCV({
    userId: params.userId,
    title: `${original.title} (Copy)`,
    template: original.template,
    blocks: original.blocks as Block[],
  })
}
