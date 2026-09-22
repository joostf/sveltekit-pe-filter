<script>
  import { goto } from '$app/navigation'

  let { selectedType = '', selectedSort = '' } = $props()
  let isLoading = $state(false)

  async function fetchAndRenderPizzas(url) {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (document.startViewTransition && !prefersReducedMotion) {
      await document.startViewTransition(() => goto(url, { keepFocus: true, noScroll: true })).finished
      return
    }

    await goto(url, { keepFocus: true, noScroll: true })
  }

  async function handleSubmit({preventDefault, currentTarget}) {
    preventDefault()
    isLoading = true

    try {
      const url = buildFilterUrl(currentTarget)
      await fetchAndRenderPizzas(url)
    } finally {
      isLoading = false
    }
  }

  function handleChange({currentTarget}) {
    const select = currentTarget
    select.form?.requestSubmit()
  }

  function buildFilterUrl(form) {
    const params = new URLSearchParams()
    const formData = new FormData(form)

    formData.forEach((value, key) => params.set(key, value))
    
    const query = params.toString()

    return query ? `/pizzas?${query}` : '/pizzas'
  }

  /*
    Code flow when a user changes a filter or navigates with browser history:
    1. handleChange() submits the form when a filter changes.
    2. handleSubmit() prevents a full browser reload and calls fetchAndRenderPizzas().
    3. buildFilterUrl() converts the form values into a URL such as /pizzas?type=vis.
    4. fetchAndRenderPizzas() calls goto().
    5. goto() performs SvelteKit client-side navigation and updates the URL with history.pushState().
    6. Because the URL changes, SvelteKit runs the server load function in pizzas/+page.server.js.
    7. The new result becomes the data prop in pizzas/+page.svelte.
    8. The page passes the new values to SiteHeader and PizzaList.
    9. Svelte updates the affected DOM automatically through reactive state.
    10. When the user goes back or forward, SvelteKit handles popstate, runs the load function again, and updates the page data and filter values automatically.
  */
</script>

<header>
  <nav aria-label="Hoofdnavigatie">
    <ul>
      <li>
        <a href="/">
          <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
            <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
            <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
          </svg>
          Home
        </a>
      </li>
      <li>
        <a href="/pizzas">
          <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 21.5c-3.04 0 -5.952 -.714 -8.5 -1.983l8.5 -16.517l8.5 16.517a19.09 19.09 0 0 1 -8.5 1.983" />
            <path d="M5.38 15.866a14.94 14.94 0 0 0 6.815 1.634a14.944 14.944 0 0 0 6.502 -1.479" />
            <path d="M13 11.01v-.01" />
            <path d="M11 14v-.01" />
          </svg>
          Alle nerdy pizza's
        </a>
      </li>
    </ul>
  </nav>

  <form action="/pizzas" method="GET" onsubmit={handleSubmit} aria-busy={isLoading}>
    <label>
      Filter op soort
      <select name="type" onchange={handleChange} disabled={isLoading}>
        <option value="" selected={selectedType === ''}>alle pizza's</option>
        <option value="vegetarisch" selected={selectedType === 'vegetarisch'}>vegetarisch</option>
        <option value="vlees" selected={selectedType === 'vlees'}>vlees</option>
        <option value="vis" selected={selectedType === 'vis'}>vis</option>
      </select>
    </label>

    <label>
      Sorteer op prijs
      <select name="price" onchange={handleChange} disabled={isLoading}>
        <option value="" selected={selectedSort === ''}>kies een volgorde</option>
        <option value="low-high" selected={selectedSort === 'low-high'}>laagste prijs</option>
        <option value="high-low" selected={selectedSort === 'high-low'}>hoogste prijs</option>
      </select>
    </label>

    <button type="submit" disabled={isLoading}>
      {#if isLoading}
        <span class="loader" aria-hidden="true"></span>
        Laden...
      {:else}
        Filter
      {/if}
    </button>
  </form>
</header>

<style>
  header {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: min(100%, 96rem);
    margin-inline: auto;

    @container (min-width: 60rem) {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
    }
  }

  nav {
    padding: 0 1rem;

    ul {
      display: flex;
      gap: 1rem;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    a {
      display: flex;
      align-items: center;
      gap: .25rem;
      padding: .75rem .5rem;
      border: 1px solid transparent;

      &:hover { color: var(--pizza-red); }
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: calc(100% - 2rem);
    margin: 1rem 0 2rem;
    padding: 1rem;
    border: 1px solid var(--pizza-green);
    border-radius: .5rem;

    &:focus-within {
      color: var(--pizza-white);
      background: var(--pizza-green);
      box-shadow: 0 2px 8px rgb(0 0 0 / 5%);
    }

    @container (min-width: 60rem) {
      width: auto;
      flex-direction: row;
      align-items: end;
      margin: 2rem 0;
      padding: .5rem 1rem;
    }
  }

  form {
    label {
      display: flex;
      flex-direction: column;
      gap: .35rem;
      font-weight: bold;
    }

    select,
    button {
      padding: .5rem .75rem;
      border: 1px solid var(--pizza-green);
      border-radius: .5rem;
      font: inherit;
      outline: none;
    }

    select {
      width: 100%;
      transition: .2s;
      background: var(--pizza-white);
      color: #000;

      &:focus,
      &:focus-visible {
        background: var(--pizza-red);
        color: var(--pizza-white);
      }

      &:disabled { cursor: wait; opacity: .7; }
    }

    button {
      min-width: 6.5rem;
      color: var(--pizza-white);
      background: var(--pizza-green);
      cursor: pointer;
      transition: .25s;

      &:hover,
      &:focus-visible { background: var(--pizza-red); }
      &:disabled { cursor: wait; opacity: .7; }
    }
  }

  .loader {
    display: inline-block;
    width: .9em;
    height: .9em;
    margin-right: .35em;
    border: 2px solid currentColor;
    border-right-color: transparent;
    border-radius: 50%;
    animation: spin .7s linear infinite;
    vertical-align: -.1em;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  @container (min-width: 60rem) {
    form {
      label { flex-direction: row; align-items: center; }
      select { width: auto; margin-left: .25rem; }
    }
  }
</style>