<script>
    import { goto } from '$app/navigation'
    let { data } = $props()
    let veggie = $state(data.veggie ?? "")
    let form

    function onChange() {
        const params = new URLSearchParams()
        if (veggie !== "") params.set("vegatarian", veggie)

        goto(`?${params.toString()}`)
    }
</script>

<main>
    

    <section class="pizzas">
        <h1>Nerdy pizza's</h1>

        <form bind:this={form}>
            <label>
                <strong>Kies pizza</strong>
                <select name="vegatarian" bind:value={veggie} onchange={onChange}>
                    <option value="">alle pizza's 🥦 & 🥩 </option>
                    <option value="true">vegetarische 🥦</option>
                    <option value="false">met vlees 🥩</option>
                </select>
            </label>

            <noscript>
                <button type="submit">Filter pizza's</button>
            </noscript>    
        </form>

        {#each data.pizzas as pizza}
            <article class="pizza-card">
                <h2>{pizza.name}</h2>
                <p>Prijs: €{pizza.price}</p>
                <p>Besteld: {pizza.ordered}</p>
                
                {@html pizza.description}

                {#if pizza.vegatarian === true}
                    <strong>🥦</strong>
                {:else}
                    <strong>🥩</strong>
                {/if}
            </article>
        {/each}
    </section>


</main>

<style>
    main {
        --pizza-crust: #f5e0b7;
        --pizza-sauce: #e94f37;
        --pizza-cheese: #ffeb99;
        --pizza-veggie: #6dbf4f;
        --pizza-meat: #b33a3a;
        --pizza-card-bg: var(--pizza-crust);
        --pizza-card-border: #d4a373;
        --pizza-card-radius: 8px;

        font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif, serif;
        line-height:1.5;
    }

    form {
        margin-bottom: 1rem;
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

        h1,
        form {
            grid-column: 1 / -1;
        }
    }

    .pizza-card {
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

    .veggie {
        font-weight: bold;
        color: var(--pizza-veggie);
    }

    .pizza-card p {
        margin: 0.3rem 0;
    }
</style>
