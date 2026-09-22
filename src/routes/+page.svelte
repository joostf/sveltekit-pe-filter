<script>
  import PizzaList from '$lib/components/PizzaList.svelte'
  import SiteHeader from '$lib/components/SiteHeader.svelte'

  let { data } = $props()

  const { pizzas } = $derived(data)
  const title = "Populairste nerdy pizza's"
</script>

<SiteHeader />
<PizzaList {title} {pizzas} />