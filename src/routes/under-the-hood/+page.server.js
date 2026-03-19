export async function load({ fetch, url }) {
    /*
      SSR + URL Driven Development:

      - This load() function runs on the server.
      - It reads state directly from the URL (search parameters).
      - The URL is the single source of truth for filtering.
    */

    // Read query parameter from the URL
    // Example: ?vegatarian=true
    const type = url.searchParams.get('type') ?? ''

    // URLSearchParams helps us construct query strings
    // using standard Web APIs
    const params = new URLSearchParams()

    // Base API endpoint (external CMS)
    const baseURL = 'https://fdnd-agency.directus.app/items/demo_pizzas'

    /*
      Conditional data filtering:

      - We translate UI state (veggie filter)
        into API query parameters.
      - This logic lives on the server, not in the client.
    */
 
     // Only add filter if a non-empty type was provided
    if (type && type.trim() !== '') {
        params.set('filter[type][_eq]', type);
    }


    // Final endpoint is derived from URL + filter logic
    const endpoint = `${baseURL}?${params.toString()}`

    /*
      Web Standards + SSR:

      - fetch is a standard Web API
      - SvelteKit provides it in the server context
      - The data is fetched before HTML is rendered
    */
    const res = await fetch(endpoint)

    // Graceful error handling during SSR
    if (!res.ok) {
        console.error("Directus error:", await res.text())

        // Even on failure, we return predictable state
        return { pizzas: [], type }
    }

    const json = await res.json()

    /*
      State serialization:

      - Returned data becomes part of the page state
      - It is embedded in the HTML
      - The client will later hydrate this data
    */
    return {
        pizzas: json.data ?? [], //short circuiting
        type
    }
}

