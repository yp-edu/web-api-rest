import type { CollectionConfig } from 'payload'

export const Messages: CollectionConfig = {
  slug: 'messages',
  admin: {
    useAsTitle: 'id',
    defaultColumns: ['user', 'message', 'createdAt'],
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'message',
      type: 'text',
      required: true,
    },
  ],
  timestamps: true,
  access: {
    read: async ({ req: { user } }) => {
      if (!user) return false
      return true
    },
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => {
      if (!user) return false
      return {
        user: { equals: user.id },
      }
    },
    delete: ({ req: { user } }) => {
      if (!user) return false
      return {
        user: { equals: user.id },
      }
    },
  },
}
