import { fetchPizzas } from '$lib/server/directus'

export async function load({ fetch }) {
  const params = new URLSearchParams({ limit: '4', sort: '-ordered' })
  const response = await fetchPizzas(fetch, params)

  return { pizzas: response.data ?? [] }
}