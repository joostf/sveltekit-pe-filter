<script>
  import SiteHeader from '$lib/components/SiteHeader.svelte'
  import PizzaList from '$lib/components/PizzaList.svelte'

  let { data } = $props()

  const { pizzas } = $derived(data)
</script>

<SiteHeader />
<PizzaList {pizzas} title="Populairste nerdy pizza's" />


