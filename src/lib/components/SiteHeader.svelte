<script>
  let { selectedType = '', selectedSort = '' } = $props()
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

  <form action="/pizzas" method="GET">
    <label>
      Filter op soort
      <select name="type">
        <option value="" selected={selectedType === ''}>alle pizza's</option>
        <option value="vegetarisch" selected={selectedType === 'vegetarisch'}>vegetarisch</option>
        <option value="vlees" selected={selectedType === 'vlees'}>vlees</option>
        <option value="vis" selected={selectedType === 'vis'}>vis</option>
      </select>
    </label>

    <label>
      Sorteer op prijs
      <select name="price">
        <option value="" selected={selectedSort === ''}>kies een volgorde</option>
        <option value="low-high" selected={selectedSort === 'low-high'}>laagste prijs</option>
        <option value="high-low" selected={selectedSort === 'high-low'}>hoogste prijs</option>
      </select>
    </label>

    <button type="submit">
        Filter
    </button>
  </form>
</header>

<style>
  header {
    display: flex;
    flex-direction: column;
    align-items: start;
  }

  nav {
    padding: 0 1rem;

    ul {
      display: flex;
      gap: 1rem;
      list-style: none;
      margin: 1em -.5rem;
      padding: 0;
    }

    a {
      display: flex;
      align-items: center;
      gap: .25rem;
      padding: .5rem;
      border: 1px solid transparent;
      border-radius:.5rem;

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