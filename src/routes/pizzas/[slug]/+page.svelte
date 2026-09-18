<script>
  import PizzaCard from '$lib/components/PizzaCard.svelte'
  import SiteHeader from '$lib/components/SiteHeader.svelte'

  let { data } = $props()
</script>

<svelte:head><title>{data.pizza.name} | Nerdy Pizzas</title></svelte:head>

<SiteHeader />
<main><PizzaCard pizza={data.pizza} showDetail /></main>

<style>
  main {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: min(100%, 96rem);
    margin-inline: auto;
    padding-bottom: 1rem;
  }
</style>