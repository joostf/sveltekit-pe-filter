const ASSET_URL = 'https://fdnd-agency.directus.app/assets'

export function assetUrl(image, { width, height, quality = 75, format = 'auto', fit = 'cover' } = {}) {
  if (!image) return ''

  const params = new URLSearchParams({ quality, format, fit })
  if (width) params.set('width', width)
  if (height) params.set('height', height)

  return `${ASSET_URL}/${image}?${params}`
}