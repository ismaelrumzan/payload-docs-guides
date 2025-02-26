import type { PayloadRequest, CollectionSlug } from 'payload'

const collectionPrefixMap: Partial<Record<CollectionSlug, string>> = {
  guides: '/guides',
}

type Props = {
  collection: keyof typeof collectionPrefixMap
  slug: string
  req: PayloadRequest
  data?: {
    guide?: {
      id?: number
      slug?: string
    }
  }
}

export const generatePreviewPath = ({ collection, slug, data }: Props) => {
  const prefix = collectionPrefixMap[collection]
  const path =
    collection === 'guides' && data?.guide?.slug
      ? `${prefix}/${data.guide.slug}/${slug}`
      : `${prefix}/${slug}`

  const encodedParams = new URLSearchParams({
    slug,
    collection,
    path,
    previewSecret: process.env.PREVIEW_SECRET || '',
  })

  const url = `/next/preview?${encodedParams.toString()}`

  return url
}
