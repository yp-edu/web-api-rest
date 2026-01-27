import type { Collection, SanitizedGlobalConfig } from 'payload'
import type { PluginOptions } from '../types.js'
export declare const shouldIncludeCollection: (
  collection: Collection,
  options: PluginOptions,
) => boolean
export declare const shouldIncludeGlobal: (
  global: SanitizedGlobalConfig,
  options: PluginOptions,
) => boolean
