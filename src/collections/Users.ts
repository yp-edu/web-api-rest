import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'username',
  },
  auth: {
    loginWithUsername: true,
  },
  access: {
    create: () => true,
    read: () => true,
    update: () => false,
    delete: () => false,
  },
  fields: [],
}
