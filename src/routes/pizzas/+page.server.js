import { fetchPizzas, createQuery } from '$lib/server/directus'

export async function load({ fetch, url }) {
  const selectedType = url.searchParams.get('type') ?? ''
  const selectedSort = url.searchParams.get('price') ?? ''
  const response = await fetchPizzas(fetch, createQuery({ type: selectedType, price: selectedSort }))

  return {
    pizzas: response.data ?? [],
    selectedType,
    selectedSort,
    meta: response.meta ?? {}
  }
}