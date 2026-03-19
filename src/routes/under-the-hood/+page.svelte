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
    let type = $state(data.type ?? "")

    function onChange() {
        /*
            Navigation API + URL Driven Development:

            - Update the URL when the select changes
            - The URL represents application state
            - No manual data fetching on the client
        */

        const params = new URLSearchParams()

        if (type !== "") {
            params.set("type", type)
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
                    name="type"
                    bind:value={type}
                    onchange={onChange}
                >
                    <option value="">alle pizza's</option>
                    <option value="vegetarisch">vegetarische 🥦</option>
                    <option value="vlees">met vlees 🥩</option>
                    <option value="vis">met vis 🐟</option>
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
                {#if pizza.type === 'vegetarisch'}
                    <strong>🥦</strong>
                {:else if pizza.type === 'vlees'}
                    <strong>🥩</strong>
                {:else}
                    <strong>🐟</strong>
                {/if}

                
            </article>
        {/each}
    </section>

    <section class="meta">
        <div class="inner">
            <h2>Under the hood</h2>
            <h3>(Meta) Frontend Framework Features</h3>

            <table>
                <thead>
                    <tr>
                    <th>Feature</th>
                    <th>Description</th>
                    <th>Where it appears</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>URL-driven routing</td>
                    <td>Routes and data loading are defined by the URL</td>
                    <td>Folder-based routing, load()</td>
                    </tr>
                    <tr>
                    <td>Server-side rendering (SSR)</td>
                    <td>HTML is rendered on the server before sending to client</td>
                    <td>+page.server.js</td>
                    </tr>
                    <tr>
                    <td>Progressive enhancement</td>
                    <td>Core functionality works without JavaScript</td>
                    <td>HTML form + goto()</td>
                    </tr>
                    <tr>
                    <td>Hydration</td>
                    <td>Client activates server-rendered HTML</td>
                    <td>$props(), reactive bindings</td>
                    </tr>
                    <tr>
                    <td>Client-side state</td>
                    <td>UI feedback without page reloads</td>
                    <td>$state, conditional rendering</td>
                    </tr>
                    <tr>
                    <td>Scoped styling</td>
                    <td>Styles are isolated per component</td>
                    <td>&lt;style&gt; in component</td>
                    </tr>
                </tbody>
            </table>

            <h3>Frameworks concepts compared</h3>

            <table>
                <thead>
                    <tr>
                    <th>Concept</th>
                    <th>SvelteKit</th>
                    <th>Next.js / React</th>
                    <th>Nuxt / Vue</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>File-based routing</td>
                    <td>+page.svelte</td>
                    <td>app/page.tsx</td>
                    <td>pages/index.vue</td>
                    </tr>
                    <tr>
                    <td>SSR data loading</td>
                    <td>load()</td>
                    <td>Server Components / getServerSideProps</td>
                    <td>useAsyncData</td>
                    </tr>
                    <tr>
                    <td>Form enhancement</td>
                    <td>use:enhance</td>
                    <td>Server Actions</td>
                    <td>Native forms + Nitro</td>
                    </tr>
                    <tr>
                    <td>Hydration</td>
                    <td>Automatic</td>
                    <td>hydrateRoot</td>
                    <td>Automatic</td>
                    </tr>
                    <tr>
                    <td>Scoped CSS</td>
                    <td>Component styles</td>
                    <td>CSS Modules</td>
                    <td>&lt;style scoped&gt;</td>
                    </tr>
                </tbody>
            </table>

            <h3>Differences between frameworks</h3>

            <table>
                <thead>
                    <tr>
                    <th>Aspect</th>
                    <th>SvelteKit</th>
                    <th>Next.js (React)</th>
                    <th>Nuxt (Vue)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>Default mental model</td>
                    <td>Server-first, HTML-first</td>
                    <td>Component-first, client-first (historically)</td>
                    <td>Hybrid, progressive</td>
                    </tr>
                    <tr>
                    <td>Progressive enhancement</td>
                    <td>Built-in and encouraged</td>
                    <td>Possible, but not the default</td>
                    <td>Supported, but often abstracted</td>
                    </tr>
                    <tr>
                    <td>Form handling</td>
                    <td>Native HTML forms + server actions</td>
                    <td>Server Actions or API routes</td>
                    <td>Server routes or composables</td>
                    </tr>
                    <tr>
                    <td>Hydration strategy</td>
                    <td>Automatic, minimal JavaScript</td>
                    <td>Automatic, often heavier bundles</td>
                    <td>Automatic, configurable</td>
                    </tr>
                    <tr>
                    <td>Client state philosophy</td>
                    <td>Local, minimal, reactive</td>
                    <td>Explicit hooks and stores</td>
                    <td>Refs, reactive objects</td>
                    </tr>
                    <tr>
                    <td>Rendering control</td>
                    <td>Per route (SSR, CSR, static)</td>
                    <td>Per page or component</td>
                    <td>Per page or layout</td>
                    </tr>
                    <tr>
                    <td>CSS scoping</td>
                    <td>Automatic per component</td>
                    <td>Manual (CSS Modules, styled)</td>
                    <td>Built-in via &lt;style scoped&gt;</td>
                    </tr>
                    <tr>
                    <td>Learning curve</td>
                    <td>Low to medium</td>
                    <td>Medium to high</td>
                    <td>Medium</td>
                    </tr>
                    <tr>
                    <td>Framework abstraction level</td>
                    <td>Thin layer over web standards</td>
                    <td>Thicker abstraction</td>
                    <td>Moderate abstraction</td>
                    </tr>
                </tbody>
                </table>
        </div>
    </section>
</main>

<style>
    /*
      Scoped CSS:

      - Styles apply only to this component
    */

    main {
        padding:1rem;
        display:grid;
        grid-template-columns: 1fr;

        @media (min-width: 75em) {
            padding:0;
            gap:1rem;
            grid-template-columns: repeat(2, 1fr);
        }

        h1 {
            margin-bottom: 0;
        }
    }
    section {
        padding:1rem;

        @media (min-width: 75em) {
            padding:1rem;
        }
        
        &.meta {
            margin: 4rem -1rem -1rem;
            background-color: var(--pizza-crust);

            @media (min-width: 75em) {
                margin:0;
                grid-template-columns: repeat(2, 1fr);
            }
        }
    }


    .inner {
        max-width: 1100px;
        margin: 0 auto;
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
        align-self: center;
    }

    button:hover {
        background-color: #d43c2c;
    }

    .pizzas {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap:1rem;
        height:fit-content;

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

    table {
        width: 100%;
        border-collapse: collapse;
        margin: 2rem 0 4rem;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        font-size: 0.95rem;
    }

    thead {
        background-color: var(--pizza-sauce);
        color:#fff
    }

    thead th {
        text-align: left;
        padding: 0.75rem 1rem;
        font-weight: 600;
        border-bottom: 2px solid #111;
        width:calc(100 / sibling-count() * 1%);
    }

    tbody td {
        padding: 0.75rem 1rem;
        vertical-align: top;
        border-bottom: 1px solid #111;
    }

    tbody tr:last-child td {
        border-bottom: none;
    }

    tbody tr:hover {
        background-color: var(--pizza-sauce);
        color:#fff;
    }

    th,
    td {
        line-height: 1.4;
    }

    @media (max-width: 700px) {
        table {
        font-size: 0.9rem;
        }

        thead {
        display: none;
        }

        tbody tr {
        display: block;
        margin-bottom: 1.5rem;
        border-bottom: 2px solid #e5e7eb;
        }

        tbody td {
        display: block;
        padding: 0.5rem 0;
        }

        tbody td::before {
        content: attr(data-label);
        display: block;
        font-weight: 600;
        margin-bottom: 0.25rem;
        color: #555;
        }
    }
</style>
