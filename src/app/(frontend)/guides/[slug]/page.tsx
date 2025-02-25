import React from 'react'
import RichText from '@/components/RichText'
import { getGuideBySlug, getGuides } from '@/lib/data/guides'

export async function generateStaticParams() {
  const guides = await getGuides(false)
  const params = guides.map(({ slug }) => {
    return { slug }
  })
  return params
}

export async function generateMetadata({ params }: Props) {
  const resolvedParams = await params
  const guide = await getGuideBySlug(resolvedParams.slug, false)
  if (!guide) return { title: 'Guide Not Found' }

  const title = guide?.title
  const description = guide?.meta?.description || `Learn more about ${guide?.title}`

  return {
    metadataBase: new URL('https://payload-docs-guides.vercel.app'),
    title,
    description,
    openGraph: {
      title,
      description,
    },
  }
}

type Props = {
  params: Promise<{ slug: string }>
}

export default async function Page({ params }: Props) {
  const resolvedParams = await params
  const guide = await getGuideBySlug(resolvedParams.slug, false)
  if (!guide) return { title: 'Course Not Found' }

  return (
    <article className="pt-16 pb-16">
      <div className="prose mx-auto">
        <RichText data={guide.content.richText} />
      </div>
    </article>
  )
}
