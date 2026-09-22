<script>
  import PizzaList from '$lib/components/PizzaList.svelte'
  import SiteHeader from '$lib/components/SiteHeader.svelte'

  let { data } = $props()
</script>

<SiteHeader selectedType={data.selectedType} selectedSort={data.selectedSort} />
<PizzaList {...data} />