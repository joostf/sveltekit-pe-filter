<script>
    import { goto } from '$app/navigation'

    /*
        Hydration (client takes over server-rendered HTML):

        1. Server-side rendering (SSR):

        - The server generates the full HTML page with all pizza data.
        - This HTML is sent to the browser.
        - User sees content immediately, even before any JavaScript runs.
        - This improves performance and SEO.

        2. DOMContentLoaded (browser event):

            - Fires when the initial HTML document is completely loaded and parsed.
            - At this point, the DOM exists, but external resources (images, CSS) may still be loading.
            - Browser can now attach JavaScript behaviors safely.

        3. Svelte hydration / client-side rendering (CSR):

            - Svelte’s JS bundle loads after the HTML.
            - Hydration process:
                a. Attaches reactive bindings (like `bind:value={veggie}`).
                b. Attaches event listeners (like `onchange={onChange}`).
                c. Connects the existing server-rendered DOM to Svelte's reactive system.
            - **Important:** HTML is **not replaced**, only enhanced with interactivity.
            - After hydration, the page behaves like a fully client-side Svelte app.

    */
    let { data } = $props()

    /*
        Client-side state:

        - This state controls the UI
        - It is initialized from server data
        - After hydration, it lives only in the browser
    */
    let veggie = $state(data.veggie ?? "")

    function onChange() {
        /*
            Navigation API + URL Driven Development:

            - Update the URL when the select changes
            - The URL represents application state
            - No manual data fetching on the client
        */

        const params = new URLSearchParams()

        if (veggie !== "") {
            params.set("vegatarian", veggie)
        }

        /*
          goto() under the hood:

          - Updates the browser URL (History API)
          - Triggers a navigation
          - Re-runs the server load() function
          - New HTML + data are returned
          - Page updates without full reload
        */
        goto(`?${params.toString()}`)
    }
</script>

<main>
    <section class="pizzas">
        <h1>Nerdy pizza's</h1>

        <!--
          Progressive Enhancement:

          - With JavaScript: onchange + goto()
          - Without JavaScript: <noscript> fallback
          - Same URL-based behavior in both cases
        -->
        <form>
            <label>
                <strong>Kies pizza</strong>
                <select
                    name="vegatarian"
                    bind:value={veggie}
                    onchange={onChange}
                >
                    <option value="">alle pizza's</option>
                    <option value="true">vegetarische 🥦</option>
                    <option value="false">met vlees 🥩</option>
                </select>
            </label>

            <!--
              No-JavaScript fallback:

              - Browser performs a normal form submit
              - URL query parameter is sent
              - Server load() handles filtering
            -->

            <button type="submit">Filter pizza's</button>
        </form>

        <!--
          Declarative rendering:

          - UI is derived from data state
          - No manual DOM manipulation
        -->
        {#each data.pizzas as pizza}
            <article class="pizza-card">
                <h2>{pizza.name}</h2>
                <p>Prijs: €{pizza.price}</p>
                <p>Besteld: {pizza.ordered}</p>

                {@html pizza.description}

                <!-- Conditional rendering based on data / state -->
                {#if pizza.vegatarian === true}
                    <strong>🥦</strong>
                {:else}
                    <strong>🥩</strong>
                {/if}
            </article>
        {/each}
    </section>
</main>

<style>
    /*
      Scoped CSS:

      - Styles apply only to this component
    */

    main {
        --pizza-flour:#fcf4e4;
        --pizza-crust: #f5e0b7;
        --pizza-sauce: #e94f37;
        --pizza-cheese: #ffeb99;
        --pizza-veggie: #6dbf4f;
        --pizza-mushroom:#d4a373;
        --pizza-meat: #b33a3a;
        --pizza-card-bg: var(--pizza-crust);
        --pizza-card-border: var(--pizza-mushroom);
        --pizza-card-radius: .5rem;

        font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif, serif;
        line-height:1.5;
        background: var(--pizza-flour);
        height:100vh;
        width:100vw;
        padding:1rem;
    }

    form {
        margin-bottom: 1rem;
        display:flex;
    }

    label {
        display:flex;
        align-items:center;
        gap:.5rem;
    }

    select {
        padding: 0.3rem 0.5rem;
        border-radius: 4px;
        border: 1px solid #ccc;
        font-family: inherit;
        font-size: inherit;
        width:fit-content
    }

    button {
        margin-left: 0.5rem;
        padding: 0.3rem 0.5rem;
        border-radius: 4px;
        border: 1px solid #ccc;
        background-color: var(--pizza-sauce);
        color: white;
        cursor: pointer;
        font-size: inherit;
        font-family: inherit;
    }

    button:hover {
        background-color: #d43c2c;
    }

    .pizzas {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 1rem;

        h1 {
          color:var(--pizza-card-border)
        }
        h1,
        form {
            grid-column: 1 / -1;
        }
    }

    .pizza-card {
        background-color: var(--pizza-card-bg);
        border: 2px solid var(--pizza-card-border);
        border-radius: var(--pizza-card-radius);
        padding: 1rem;
        position: relative;

        strong {
            --_bg: var(--pizza-veggie);
            position: absolute;
            right:0.5rem;
            top:.5rem;
            font-size: 1.5rem;
            
        }
    }

    .pizza-card h2 {
        margin-top: 0;
        color: var(--pizza-sauce);
    }

    .veggie {
        font-weight: bold;
        color: var(--pizza-veggie);
    }

    .pizza-card p {
        margin: 0.3rem 0;
    }
</style>
