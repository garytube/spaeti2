<script lang="ts">
	import PocketBase from 'pocketbase'
	import { onMount } from 'svelte'
	import type { Drink } from '../types'

	const pb = new PocketBase('http://localhost:8090')
	export let data
	let drinks: Drink[] = data.drinks

	function handleUpdate(action: string, record: Drink) {
		switch (action) {
			case 'create':
				drinks = [record, ...drinks]
				break
			case 'update':
				drinks = drinks.map(drink => (drink.id === record.id ? record : drink))
				break
			case 'delete':
				drinks = drinks.filter(drink => drink.id !== record.id)
				break
			default:
				break
		}
	}

	onMount(() => {
		pb.collection('drinks').subscribe<Drink>('*', ({ action, record }) =>
			handleUpdate(action, record),
		)
		return () => pb.collection('drinks').unsubscribe()
	})
</script>

<h1>Späti</h1>

<div class="container">
	{#if drinks}
		<ul class="product_list">
			{#await drinks then products}
				{#each products as product}
					{@const thumb = pb.files.getUrl(product, product.cover, {
						thumb: '0x200',
					})}

					<li class="product">
						<a href="/drink/{product.id}">
							<h2>{product.name}</h2>
							<img src={thumb} alt={product.name} />
							<p>{product.price}€</p>
							<p>InStock: {product.stock}</p>
							<p>Active: {product.active}</p>
						</a>
					</li>
				{/each}
			{/await}
		</ul>
	{/if}
</div>

<a href="/login">Einkauf Login</a>
