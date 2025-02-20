// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import {
  lexicalEditor,
  FixedToolbarFeature,
  EXPERIMENTAL_TableFeature,
  BlocksFeature,
} from '@payloadcms/richtext-lexical'
import { Code } from '@/blocks/Code/config'
import path from 'node:path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { GuidesCollection } from './collections/Guides/index'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    autoLogin: {
      email: 'ismael@vercel.com',
      prefillOnly: true,
    },
  },
  collections: [Users, Media, GuidesCollection],
  editor: lexicalEditor({
    admin: {
      placeholder: 'Type your content here...',
    },
    features: ({ defaultFeatures }) => {
      return [
        ...defaultFeatures,
        FixedToolbarFeature(),
        EXPERIMENTAL_TableFeature(),
        BlocksFeature({ blocks: [Code] }),
      ]
    },
  }),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [
    // storage-adapter-placeholder
  ],
})
