<script lang="ts">
	import { onMount } from 'svelte'
	import type { Drink } from '$lib/types.js'
	import { pb } from '$lib/pocketbase'
	import Carousel from '$lib/components/Carousel.svelte'
	import DrinkCard from '$lib/components/DrinkCard.svelte'

	export let data

	let drinks: Drink[] = data.drinks

	onMount(() => {
		pb.collection('drinks').subscribe<Drink>('*', ({ action, record }) => {
			switch (action) {
				case 'create':
					record = { ...record, cover: pb.getFileUrl(record, record.cover) }
					drinks = [record, ...drinks]
					break
				case 'update':
					let i = drinks.findIndex(drink => drink.id === record.id)
					drinks[i] = { ...record, cover: pb.getFileUrl(record, record.cover) }
					break
				case 'delete':
					drinks = drinks.filter(drink => drink.id !== record.id)
					break
				default:
					break
			}
		})
		return () => pb.collection('drinks').unsubscribe()
	})
</script>

<ul class="product_list">
	<Carousel perPage={1} autoplay={50000} dots={false}>
		{#each drinks.filter(d => d.active) as drink (drink.id)}
			<DrinkCard {drink} />
		{/each}
	</Carousel>
</ul>
