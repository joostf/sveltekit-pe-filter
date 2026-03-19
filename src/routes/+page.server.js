
export async function load({ fetch, url }) {
    const type = url.searchParams.get('type'); // null if not present

    const params = new URLSearchParams();
    const baseURL = 'https://fdnd-agency.directus.app/items/demo_pizzas';

    // Only add filter if a non-empty type was provided
    if (type && type.trim() !== '') {
        params.set('filter[type][_eq]', type);
    }

    const endpoint = params.toString()
        ? `${baseURL}?${params.toString()}`
        : baseURL;

    const res = await fetch(endpoint);

    if (!res.ok) {
        console.error("Directus error:", await res.text());
        return { pizzas: [], type: type ?? '' };
    }

    const json = await res.json();

    return {
        pizzas: json.data ?? [],
        type: type ?? ''
    };
}