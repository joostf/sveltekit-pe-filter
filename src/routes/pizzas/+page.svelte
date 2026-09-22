<script>
  import PizzaList from '$lib/components/PizzaList.svelte'
  import SiteHeader from '$lib/components/SiteHeader.svelte'

  let { data } = $props()
</script>

<SiteHeader selectedType={data.selectedType} selectedSort={data.selectedSort} />
<main><PizzaList {...data} /></main>

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