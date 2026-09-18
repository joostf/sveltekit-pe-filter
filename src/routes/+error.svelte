<script>
  let { status = 500, error: pageError } = $props()
</script>

<main><h1>{status}</h1><p>{pageError?.message ?? 'Er is iets fout gegaan.'}</p><a href="/">Terug naar de pizza's</a></main>