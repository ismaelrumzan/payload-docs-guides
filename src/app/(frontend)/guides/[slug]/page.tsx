import React from 'react'
import RichText from '@/components/RichText'
import { getGuideBySlug, getGuides } from '@/lib/data/guides'
import { LastUpdated } from '@/components/lastupdated'
import { BackLink } from '@/components/back-link'

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
      <div className="prose mx-auto max-w-4xl">
        <BackLink home="Guides" path="/guides" />
        <h1>{guide.title}</h1>
        <p>{guide.meta?.description}</p>
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-500 pb-2">
          <LastUpdated updatedAt={guide.updatedAt} />
          <div className="flex flex-row items-center gap-2">
            {guide.topics?.map((topic) => (
              <div
                className="p-2 rounded-full bg-gray-100 text-xs text-gray-600 capitalize"
                key={topic}
              >
                {topic}
              </div>
            ))}
          </div>
        </div>
        <RichText data={guide.content.richText} />
      </div>
    </article>
  )
}
