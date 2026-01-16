import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { openapi, scalar } from 'payload-oapi'

import { Users } from './collections/Users'
import { Follows } from './collections/Follows'
import { Messages } from './collections/Messages'

import pkg from '../package.json'
const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Follows, Messages],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: vercelPostgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URL || '',
    },
  }),
  sharp,
  plugins: [
    openapi({
      openapiVersion: '3.0',
      metadata: { title: 'Web API REST', version: pkg.version },
      // hideInternalCollections: true,
    }),
    scalar({}),
  ],
})
