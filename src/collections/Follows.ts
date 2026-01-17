import type { CollectionConfig, Where } from 'payload'
import { APIError } from 'payload'

export const Follows: CollectionConfig = {
  slug: 'follows',
  admin: {
    useAsTitle: 'id',
    defaultColumns: ['follower', 'following', 'createdAt'],
  },
  fields: [
    {
      name: 'follower',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'following',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
  ],
  timestamps: true,
  hooks: {
    beforeValidate: [
      async ({ data, operation }) => {
        if (data?.follower && data?.following && data.follower === data.following) {
          throw new APIError('Cannot follow yourself', 400)
        }
        return data
      },
    ],
    beforeChange: [
      async ({ data, req, operation }) => {
        if (!data.follower || !data.following) {
          return data
        }

        if (operation === 'create') {
          if (req.user && data.follower !== req.user.id) {
            throw new APIError('You can only create follows where you are the follower', 403)
          }

          const existing = await req.payload.find({
            collection: 'follows' as any,
            where: {
              and: [
                { follower: { equals: data.follower } },
                { following: { equals: data.following } },
              ],
            },
            limit: 1,
            depth: 0,
            overrideAccess: false,
            req,
          })

          if (existing.totalDocs > 0) {
            throw new APIError('Already following', 400)
          }
        }

        return data
      },
    ],
  },
  access: {
    read: ({ req: { user } }) => {
      if (!user) return false
      return {
        follower: { equals: user.id },
      } as Where
    },
    create: ({ req: { user } }) => {
      if (!user) return false
      return {
        follower: { equals: user.id },
      } as Where
    },
    update: ({ req: { user } }) => {
      if (!user) return false
      return {
        follower: { equals: user.id },
      }
    },
    delete: ({ req: { user } }) => {
      if (!user) return false
      return {
        follower: { equals: user.id },
      }
    },
  },
}
