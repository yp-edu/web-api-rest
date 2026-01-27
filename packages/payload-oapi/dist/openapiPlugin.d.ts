import type { Plugin } from 'payload'
import type { PluginOptions } from './types.js'
declare const openapi: ({
  specEndpoint,
  authEndpoint,
  openapiVersion,
  metadata,
  enabled,
  includeCollections,
  excludeCollections,
  hideInternalCollections,
  includeGlobals,
  excludeGlobals,
}: PluginOptions) => Plugin
export default openapi
