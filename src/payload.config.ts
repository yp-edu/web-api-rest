import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig, type PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { openapi, scalar } from 'payload-oapi'

import { Users } from './collections/Users'
import { Follows } from './collections/Follows'
import { Messages } from './collections/Messages'

import pkg from '../package.json'
import { migrations } from './migrations'
import { cleanup } from './jobs/cleanupUsers'

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
      connectionString: process.env.DATABASE_URL || '',
    },
    prodMigrations: migrations,
  }),
  sharp,
  plugins: [
    openapi({
      openapiVersion: '3.0',
      metadata: { title: 'Web API REST', version: pkg.version },
      hideInternalCollections: true,
    }),
    scalar({ hideModels: true }),
  ],
  jobs: {
    tasks: [cleanup],
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        if (req.user && req.user.username === 'admin') return true

        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${process.env.CRON_SECRET}`
      },
    },
  },
})
