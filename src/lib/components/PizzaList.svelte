<script>
  import PizzaCard from '$lib/components/PizzaCard.svelte'

  let {
    pizzas = [],
    title = "Nerdy pizza's",
    selectedType = '',
    selectedSort = '',
    meta = {}
  } = $props()

  const typeLabels = {
    vegetarisch: 'soort: 🥦',
    vlees: 'soort: 🥩',
    vis: 'soort: 🐟'
  }

  const sortLabels = {
    'low-high': 'prijs: 💰 → 💰💰',
    'high-low': 'prijs: 💰💰 → 💰'
  }
</script>

<main>
  <header>
    <h1>{title} {#if meta.total_count}<small>{meta.filter_count} / {meta.total_count}</small>{/if}</h1>
    <p>
      {#if typeLabels[selectedType]}<span>{typeLabels[selectedType]}</span>{/if}
      {#if sortLabels[selectedSort]}<span>{selectedType ? '/ ' : ''}{sortLabels[selectedSort]}</span>{/if}
    </p>
  </header>

  {#if pizzas.length}
    <ul>
      {#each pizzas as pizza, index (pizza.id)}
        <li><a href={`/pizzas/${pizza.slug}`}><PizzaCard {pizza} entryIndex={index} /></a></li>
      {/each}
    </ul>
  {:else}
    <p>Geen pizza's gevonden met deze filters.</p>
  {/if}
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding-bottom: 1rem;

    header {
      padding: 0 1rem;

      h1 {
        font-size: clamp(1.35rem, 4vw, 3rem);
        font-weight: 100;
        margin-left: -2px;

        small { font-size: 1rem; }
      }

      p { min-height: 1.5rem; display: flex; flex-wrap: wrap; gap: .5rem; }
    }

    ul {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
      width: 100%;
      margin: 0;
      padding: 0;
      list-style: none;
      
      li {
        a { display: block; height: 100%; text-decoration: none; }
      }
    }
  }

  
</style>