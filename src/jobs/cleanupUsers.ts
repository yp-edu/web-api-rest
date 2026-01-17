import type { TaskConfig } from 'payload'

interface CleanupIO {
  input: Record<string, never>
  output: { deletedUsers: number; deletedMessages: number; deletedFollows: number }
}

export const cleanup: TaskConfig<CleanupIO> = {
  slug: 'cleanup',
  inputSchema: [],
  outputSchema: [],
  schedule: [{ cron: '0 0 * * *', queue: 'default' }],
  handler: async ({ req, job }) => {
    const { payload } = req

    const adminUser = await payload.find({
      collection: 'users',
      where: {
        username: { equals: 'admin' },
      },
      limit: 1,
      depth: 0,
      overrideAccess: true,
    })

    const adminUserId = adminUser.docs[0]?.id

    const deletedMessages = await payload.delete({
      collection: 'messages',
      where: {
        user: { not_equals: adminUserId },
      },
    })
    const deletedFollows = await payload.delete({
      collection: 'follows',
      where: {
        follower: { not_equals: adminUserId },
      },
    })
    const deletedUsers = await payload.delete({
      collection: 'users',
      where: {
        id: { not_equals: adminUserId },
      },
    })
    return {
      output: {
        deletedUsers: deletedUsers.docs.length,
        deletedMessages: deletedMessages.docs.length,
        deletedFollows: deletedFollows.docs.length,
      },
    }
  },
}
