<script lang="ts">
	import { dev } from '$app/environment'
	import { product } from '$lib/store/productStore'

	import type { Drink } from '$lib/types'
	import { addZero } from '$lib/utils/formatters'
	import toast from 'svelte-french-toast'
	import Card from './Card.svelte'

	export let drink: Drink

	$: price = addZero(drink.price)
</script>

<Card>
	<img
		src={drink.cover}
		alt={drink.name}
		class="h-[400px] mb-1 object-contain animate-wiggle" />
	<div class="font-bold text-primary-dark text-3xl">{drink.name}</div>
	<div class="font-bold text-primary text-4xl">{price}</div>

	<button
		on:click={() => {
			if (dev) {
				product.addToCart(drink.barcode)
			} else {
				toast.success('📸 Scanne ➡️ am Kühlschrank!', {
					duration: 4000,
					position: 'bottom-center',
				})
			}
		}}
		class="paypal font-body flex items-center text-2xl -rotate-3 text-white bg-primary py-3 px-8">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="w-7 h-7 mr-1">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z" />
		</svg>
		Nehmen & Scannen
	</button>
</Card>

<style>
	.paypal {
		border-radius: 10px 20px;
		margin-top: 1rem;
	}
</style>
