<script lang="ts">
	import { enhance } from '$app/forms'
	import Card from '$lib/components/Card.svelte'

	import type { PageData } from './$types'

	export let data: PageData
	let { drink } = data
</script>

<Card>
	<img
		src={drink.cover}
		alt={drink.name}
		class="h-[400px] mb-1 object-contain animate-wiggle" />
	<div class="font-bold text-primary-dark text-3xl">{drink.name}</div>
	<hr />
	<form
		action=""
		method="post"
		use:enhance={() =>
			async ({ update }) =>
				await update({ reset: false })}>
		<div class="block">
			<label for="stock">Stock</label>
			<input bind:value={drink.stock} type="number" name="stock" />
		</div>

		<div class="block">
			<label for="name">Name</label>
			<input bind:value={drink.name} type="text" name="name" />
		</div>
		<div class="block">
			<label for="price">Price</label>
			<input bind:value={drink.price} type="text" name="price" />
		</div>
		<div class="block">
			<label for="active">Active</label>
			<input bind:checked={drink.active} type="checkbox" name="active" />
		</div>
		<button
			class="-rotate-3 text-white bg-primary py-3 px-8 mt-4 rounded-lg"
			type="submit">Update</button>
	</form>
</Card>

<style>
	label {
		display: inline-block;
		min-width: 80px;
	}
	input {
		padding: 4px;
		border: 1px solid #ccc;
		margin: 10px auto;
	}
</style>
