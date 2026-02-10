export async function load({ fetch, url }) {
    const veggie = url.searchParams.get('vegatarian') ?? ''
    const params = new URLSearchParams()
    const baseURL = 'https://fdnd-agency.directus.app/items/demo_pizzas'

    if (veggie === 'true') {
        params.set('filter[vegatarian][_eq]', 'true')
    } else if (veggie === 'false') {
        params.set('filter[vegatarian][_null]', 'true')
    }

    const endpoint = `${baseURL}?${params.toString()}`

    const res = await fetch(endpoint)

    if (!res.ok) {
        console.error("Directus error:", await res.text())
        return { pizzas: [], veggie }
    }

    const json = await res.json()

    return {
        pizzas: json.data ?? [],
        veggie
    }
}
