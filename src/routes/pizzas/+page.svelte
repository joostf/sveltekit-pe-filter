<script>
  import PizzaList from '$lib/components/PizzaList.svelte'
  import SiteHeader from '$lib/components/SiteHeader.svelte'

  let { data } = $props()
</script>

<svelte:head><title>Alle nerdy pizza's | Nerdy Pizzas</title></svelte:head>

<SiteHeader selectedType={data.selectedType} selectedSort={data.selectedSort} />
<PizzaList {...data} />

