'use server'

import { getPayload } from 'payload'
import { cache } from 'react'
import { draftMode } from 'next/headers'
import configPromise from '@payload-config'
import type { Guide } from '@/payload-types'

// Initialize payload only once
const getPayloadInstance = cache(async () => {
  return await getPayload({ config: configPromise })
})

// Helper to handle draft mode detection
const getDraftStatus = async (): Promise<boolean> => {
  try {
    const { isEnabled } = await draftMode()
    return isEnabled
  } catch {
    // If draftMode() fails, we're not in a request context
    return false
  }
}

export const getGuides = cache(async (): Promise<Guide[]> => {
  try {
    // Use forceDraft if provided, otherwise check draftMode
    const draft = await getDraftStatus()
    const payload = await getPayloadInstance()

    const result = await payload.find({
      collection: 'guides',
      draft,
      sort: '-createdAt',
      depth: 2,
    })

    return result.docs || []
  } catch (error) {
    console.error('Error fetching guides:', error)
    return []
  }
})

export const getGuideBySlug = cache(async (slug: string): Promise<Guide | null> => {
  if (!slug) return null

  try {
    // Use forceDraft if provided, otherwise check draftMode
    const draft = await getDraftStatus()
    const payload = await getPayloadInstance()
    const result = await payload.find({
      collection: 'guides',
      draft,
      overrideAccess: draft,
      where: {
        slug: {
          equals: slug,
        },
      },
      depth: 2,
      limit: 1,
    })

    return result.docs?.[0] || null
  } catch (error) {
    console.error(`Error fetching guide by slug "${slug}":`, error)
    return null
  }
})

export const getGuideById = cache(async (id: string | number): Promise<Guide | null> => {
  if (!id) return null

  try {
    const draft = await getDraftStatus()
    const payload = await getPayloadInstance()

    const result = await payload.findByID({
      collection: 'guides',
      draft,
      id: String(id), // Ensure ID is a string
      depth: 2,
    })

    return result || null
  } catch (error) {
    console.error(`Error fetching guide by ID "${id}":`, error)
    return null
  }
})
