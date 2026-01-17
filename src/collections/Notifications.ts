import type { CollectionConfig } from 'payload'

export const Notifications: CollectionConfig = {
  slug: 'notifications',
  admin: {
    useAsTitle: 'id',
    defaultColumns: ['recipient', 'from', 'type', 'read', 'createdAt'],
  },
  fields: [
    {
      name: 'recipient',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'from',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'type',
      type: 'text',
      required: true,
    },
    {
      name: 'read',
      type: 'checkbox',
      defaultValue: false,
      required: true,
    },
  ],
  timestamps: true,
  access: {
    read: ({ req: { user } }) => {
      if (!user) return false
      return {
        recipient: { equals: user.id },
      }
    },
    create: () => false,
    update: ({ req: { user } }) => {
      if (!user) return false
      return {
        recipient: { equals: user.id },
      }
    },
    delete: ({ req: { user } }) => {
      if (!user) return false
      return {
        recipient: { equals: user.id },
      }
    },
  },
}
