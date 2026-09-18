<script>
    import { goto, onNavigate } from '$app/navigation'
    import { browser } from '$app/environment'

    let { data } = $props()
    let type = $derived(data.type ?? "")

    onNavigate((navigation) => {
        {
            const reduceMotion = window.matchMedia(
                '(prefers-reduced-motion: reduce)'
            ).matches

            if (reduceMotion || !document.startViewTransition) return
        }
        
        return new Promise((resolve) => {
            document.startViewTransition(async () => {
                resolve()
                await navigation.complete
            })
        })
    })

    function onChange() {
        const params = new URLSearchParams()

        if (type !== "") {
            params.set("type", type)
        }

        goto(`?${params.toString()}`)
    }
</script>

<main>
    <section class="pizzas">
        <h1>Nerdy pizza's</h1>

        <form>
            <label>
                <strong>Kies pizza</strong>
                <select
                    name="type"
                    bind:value={type}
                    onchange={onChange}
                >
                    <option value="">alle pizza's</option>
                    <option value="vegetarisch">vegetarische 🥦</option>
                    <option value="vlees">met vlees 🥩</option>
                    <option value="vis">met vis 🐟</option>
                </select>
            </label>
            {#if !browser}
                <button type="submit">Filter pizza's</button>  
            {/if}
        </form>

        {#each data.pizzas as pizza (pizza.id)}
            <article
                class="pizza-card"
                style={`view-transition-name: pizza-card-${pizza.id}`}
            >
                <h2>{pizza.name}</h2>
                <p>Prijs: €{pizza.price}</p>
                <p>Besteld: {pizza.ordered}</p>
                
                {@html pizza.description}

                {#if pizza.type === 'vegetarisch'}
                    <strong>🥦</strong>
                {:else if pizza.type === 'vlees'}
                    <strong>🥩</strong>
                {:else}
                    <strong>🐟</strong>
                {/if}
            </article>
        {/each}
    </section>
</main>

<style>
    main {
        --pizza-flour:#fcf4e4;
        --pizza-crust: #f5e0b7;
        --pizza-sauce: #e94f37;
        --pizza-cheese: #ffeb99;
        --pizza-veggie: #6dbf4f;
        --pizza-mushroom:#d4a373;
        --pizza-meat: #b33a3a;
        --pizza-card-bg: var(--pizza-crust);
        --pizza-card-border: var(--pizza-mushroom);
        --pizza-card-radius: .5rem;

        font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif, serif;
        line-height:1.5;
        background: var(--pizza-flour);
        height:100vh;
        width:100vw;
        padding:1rem;
    }

    form {
        margin-bottom: 1rem;
        display:flex;
    }

    label {
        display:flex;
        align-items:center;
        gap:.5rem;
    }

    select {
        padding: 0.3rem 0.5rem;
        border-radius: 4px;
        border: 1px solid #ccc;
        font-family: inherit;
        font-size: inherit;
        width:fit-content
    }

    button {
        margin-left: 0.5rem;
        padding: 0.3rem 0.5rem;
        border-radius: 4px;
        border: 1px solid #ccc;
        background-color: var(--pizza-sauce);
        color: white;
        cursor: pointer;
        font-size: inherit;
        font-family: inherit;
    }

    button:hover {
        background-color: #d43c2c;
    }

    .pizzas {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 1rem;

        h1 {
          color:var(--pizza-card-border)
        }
        h1,
        form {
            grid-column: 1 / -1;
        }
    }

    .pizza-card {
        view-transition-class: pizza-card;
        background-color: var(--pizza-card-bg);
        border: 2px solid var(--pizza-card-border);
        border-radius: var(--pizza-card-radius);
        padding: 1rem;
        position: relative;

        strong {
            --_bg: var(--pizza-veggie);
            position: absolute;
            right:0.5rem;
            top:.5rem;
            font-size: 1.5rem;
            
        }
    }

    .pizza-card h2 {
        margin-top: 0;
        color: var(--pizza-sauce);
    }

    .pizza-card p {
        margin: 0.3rem 0;
    }

    @keyframes pizza-in {
        from {
            opacity: 0;
            transform: translateY(3rem) scale(0.25);
        }
        to {
            opacity: 1;
            transform: translateY(0)  scale(1);
        }
    }

    ::view-transition-new(.pizza-card) {
        animation: pizza-in 250ms ease-out both;
        transform-origin: left bottom;
    }

    @media (prefers-reduced-motion: reduce) {
        ::view-transition-new(.pizza-card) {
            animation: none;
        }
    }
</style>
