<script lang="ts">
	import Card from '$lib/components/Card.svelte'
	import type { PageData } from './$types'

	export let data: PageData
</script>

{#each data.drinks as drink, i (drink.id)}
	<Card>
		<a
			class="font-bold ml-4 flex items-center text-2xl text-violet-800"
			href="drinks/{drink.id}">
			<img class="w-8 mr-4" src={drink.cover} alt={drink.name} />
			{drink.name}
		</a>
	</Card>
{/each}
