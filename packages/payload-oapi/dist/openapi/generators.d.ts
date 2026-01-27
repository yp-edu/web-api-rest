import type { OpenAPIV3, OpenAPIV3_1 } from 'openapi-types'
import type { PayloadRequest } from 'payload'
import type { PluginOptions } from '../types.js'
export declare const generateV30Spec: (
  req: Pick<PayloadRequest, 'payload' | 'protocol' | 'headers'>,
  options: PluginOptions,
) => Promise<OpenAPIV3.Document>
export declare const generateV31Spec: (
  req: Pick<PayloadRequest, 'payload' | 'protocol' | 'headers'>,
  options: PluginOptions,
) => Promise<OpenAPIV3_1.Document>
