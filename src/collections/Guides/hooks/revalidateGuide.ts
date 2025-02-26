import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath } from 'next/cache'

import type { Guide } from '@/payload-types'

export const revalidateGuide: CollectionAfterChangeHook<Guide> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/guides/${doc.slug}`
      payload.logger.info(`Revalidating guide at path: ${path}`)
      revalidatePath(path)
    }
    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const oldPath = `/guides/${previousDoc.slug}`
      payload.logger.info(`Revalidating old guide at path: ${oldPath}`)
      revalidatePath(oldPath)
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Guide> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const path = `/guides/${doc?.slug}`
    revalidatePath(path)
  }
  return doc
}
