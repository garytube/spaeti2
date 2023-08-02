<script>
	import CartPanel from './CartPanel.svelte'
	import { cartPanelOpen, product } from '$lib/store/productStore'

	$: if ($product.length !== 0) {
		console.log('product', $product)
		cartPanelOpen.set(true)
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	on:click={() => cartPanelOpen.set(true)}
	class="rounded-full bg-primary-dark bg-opacity-30 hover:bg-opacity-80 duration-150 p-2 cursor-pointer fixed top-2 left-2">
	{#if $product.length > 0}
		<div
			class="h-4 w-4 animate-pulse rounded-full absolute -top-1 -right-1 text-[16px] bg-pink-600 font-body ring-2 ring-primary text-white flex justify-center items-center z-[1000]">
			{$product.length}
		</div>
	{/if}

	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		stroke-width="1.5"
		class="w-8 h-8 stroke-white"
		class:inactive={$product.length == 0}>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
	</svg>
</div>

<CartPanel showCart={$cartPanelOpen} />

<style>
	.inactive {
		opacity: 0.6;
	}
</style>
