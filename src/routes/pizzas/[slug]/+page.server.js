import { error } from '@sveltejs/kit'
import { fetchPizzas, createQuery } from '$lib/server/directus'

export async function load({ fetch, params }) {
  const response = await fetchPizzas(fetch, createQuery({ slug: params.slug }))
  const pizza = response.data?.[0]

  if (!pizza) throw error(404, 'Deze pizza bestaat niet.')

  return { pizza }
}