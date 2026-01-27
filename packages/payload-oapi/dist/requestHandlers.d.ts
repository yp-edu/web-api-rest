import type { PayloadRequest } from 'payload'
import type { PluginOptions } from './types.js'
export declare const createOpenAPIRequestHandler: (
  options: PluginOptions,
) => (req: PayloadRequest) => Promise<Response>
export declare const createOAuthPasswordFlowHandler: () => (
  req: PayloadRequest,
) => Promise<Response>
