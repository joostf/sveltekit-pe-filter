<script>
  import { assetUrl } from '$lib/asset'

  let { pizza, showDetail = false, entryIndex = 0 } = $props()
</script>

<article class:show-detail={showDetail} style={`view-transition-name: pizza-${pizza.id}; view-transition-class: pizza; --pizza-entry-delay: ${entryIndex * 40}ms;`}>
  {#if pizza.image}
    <img src={assetUrl(pizza.image, { width: 300 })} alt={pizza.name} width="300" height="300" />
  {/if}

  <header><h2>{pizza.name}</h2></header>

  {#if showDetail}
    <div><p>{@html pizza.description}</p></div>
  {/if}

  <footer>
    <p>Aantal keer besteld: {pizza.ordered}</p>
    <p>Prijs: <data value={pizza.price}>€ {Number(pizza.price).toFixed(2).replace('.', ',')}</data></p>
  </footer>
</article>


<style>
  article {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
    padding: 1rem;
    border: 1px solid var(--pizza-green);
    border-radius: .5rem;
    background: linear-gradient(180deg, var(--pizza-white), var(--pizza-light-green));
    transition: transform .2s ease;

    &::after {
      content: '';
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      height: 8px;
      background: linear-gradient(90deg, var(--pizza-green) 33%, var(--pizza-white) 33% 67%, var(--pizza-red) 67%);
    }

    &:hover { transform: translateY(-2px); }

    &.show-detail {
      max-width: 50rem;
      gap: 1rem;

      @container (min-width: 43.75rem) {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 1rem 3rem;
      }
    }

    img {
      width: calc(100% + 2rem);
      aspect-ratio: 1;
      object-fit: cover;
      margin: -1rem 0 .75rem -1rem;
    }

    h2 { margin: 0 0 .5rem; font-size: 1.2rem; font-weight: normal; }

    footer {
      margin-top: auto;
      font-size: .9rem;

      p { margin: .4rem 0; }
    }

    &.show-detail img {
      @container (min-width: 43.75rem) {
        grid-row: span 3;
        margin: -1rem 0 -.5rem -1rem;
      }
    }

    @media (prefers-reduced-motion: no-preference) {
      &:not(.show-detail) {
        animation: pizza-enter .4s ease-in both;
        animation-delay: var(--pizza-entry-delay, 0ms);
      }
    }
  }
</style>