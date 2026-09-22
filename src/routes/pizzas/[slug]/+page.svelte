<script>
  import PizzaCard from '$lib/components/PizzaCard.svelte'
  import SiteHeader from '$lib/components/SiteHeader.svelte'

  let { data } = $props()
</script>

<svelte:head><title>{data.pizza.name} | Nerdy Pizzas</title></svelte:head>

<SiteHeader />
<PizzaCard pizza={data.pizza} showDetail />

