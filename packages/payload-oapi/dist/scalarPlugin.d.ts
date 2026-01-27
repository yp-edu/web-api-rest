import type { Plugin } from 'payload'
declare const scalar: ({
  specEndpoint,
  docsUrl,
  enabled,
  hideModels,
}: {
  specEndpoint?: string
  docsUrl?: string
  enabled?: boolean
  hideModels?: boolean
}) => Plugin
export default scalar
