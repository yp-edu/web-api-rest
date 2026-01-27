export const shouldIncludeCollection = (collection, options) => {
  const { slug } = collection.config
  if (options.hideInternalCollections && slug.startsWith('payload-')) {
    return false
  }
  if (options.excludeCollections?.includes(slug)) {
    return false
  }
  if (options.includeCollections !== undefined) {
    return options.includeCollections.includes(slug)
  }
  return true
}
export const shouldIncludeGlobal = (global, options) => {
  const { slug } = global
  if (options.hideInternalCollections && slug.startsWith('payload-')) {
    return false
  }
  if (options.excludeGlobals?.includes(slug)) {
    return false
  }
  if (options.includeGlobals !== undefined) {
    return options.includeGlobals.includes(slug)
  }
  return true
}
//# sourceMappingURL=filters.js.map
