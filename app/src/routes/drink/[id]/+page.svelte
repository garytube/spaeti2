<script lang="ts">
	import type { PageData } from './$types'

	export let data: PageData

	let { drink } = data
</script>

<h1>Drink {drink.name}</h1>

<div class="container">
	<form action="" method="post">
		<label for="stock">Stock</label>
		<input bind:value={drink.stock} type="number" name="stock" />

		<label for="name">Name</label>
		<input bind:value={drink.name} type="text" name="name" />

		<label for="price">Price</label>
		<input bind:value={drink.price} type="text" name="price" />

		<label for="active">Active</label>
		<input bind:checked={drink.active} type="checkbox" name="active" />
		<button type="submit">Update</button>
	</form>
</div>
