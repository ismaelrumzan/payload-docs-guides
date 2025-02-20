import type { CollectionConfig } from 'payload'
import { Code } from '../../blocks/Code/config'
import {
  FixedToolbarFeature,
  BlocksFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { Topics } from './topics'

export const guidesSlug = 'guides'

export const GuidesCollection: CollectionConfig = {
  slug: guidesSlug,
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          name: 'content',
          fields: [
            {
              name: 'richText',
              type: 'richText',
              label: false,
              required: true,
            },
          ],
        },
        {
          name: 'meta',
          fields: [
            {
              name: 'description',
              type: 'text',
            },
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },
    {
      name: 'topics',
      type: 'select',
      options: Topics,
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
