const ASSET_URL = 'https://fdnd-agency.directus.app/assets'

export function assetUrl(image) {
  return image ? `${ASSET_URL}/${image}` : ''
}