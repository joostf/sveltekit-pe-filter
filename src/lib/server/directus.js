import { error } from '@sveltejs/kit'

const BASE_URL = 'https://fdnd-agency.directus.app/items'

export function createQuery({ type = '', price = '', limit, slug = '' } = {}) {
  const params = new URLSearchParams()

  if (type) params.set('filter[type][_eq]', type)
  if (slug) params.set('filter[slug][_eq]', slug)

  if (price === 'low-high') {
    params.set('sort', 'price')
  } else if (price === 'high-low') {
    params.set('sort', '-price')
  } else if (!slug) {
    params.set('sort', 'name')
  }

  if (limit) params.set('limit', String(limit))
  if (!slug) params.set('meta', 'total_count,filter_count')

  return params
}

export async function fetchPizzas(fetch, params) {
  const response = await fetch(`${BASE_URL}/demo_pizzas?${params.toString()}`)

  if (!response.ok) {
    throw error(502, 'De pizza-api is tijdelijk niet beschikbaar.')
  }

  return response.json()
}
