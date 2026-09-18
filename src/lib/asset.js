const ASSET_URL = 'https://fdnd-agency.directus.app/assets'

/** @param {string | undefined} image */
export function assetUrl(image) {
  return image ? `${ASSET_URL}/${image}` : ''
}