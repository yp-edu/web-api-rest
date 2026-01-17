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
    admin: ({ req: { user } }) => user?.username === 'admin',
    create: () => true,
    read: () => true,
    update: ({ req: { user } }) => user?.username === 'admin',
    delete: ({ req: { user } }) => user?.username === 'admin',
  },
  fields: [],
}
