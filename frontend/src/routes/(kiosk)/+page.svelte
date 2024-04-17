<script lang="ts">
	import { pb } from '@db';
	import Image from '$lib/components/Image.svelte';
	import { basketStore } from '$lib/store/basket';
	let data = pb.collection('drinks').getFullList({
		expand: 'owner'
	});
</script>

<svelte:head>
	<title>Home 1</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="grid grid-cols-2 gap-4">
	{#await data then drinks}
		{#each drinks as drink (drink.id)}
			<!-- content here -->
			<div
				role="button"
				aria-label={drink.name}
				tabindex="0"
				on:click={() => basketStore.update((items) => [...items, drink])}
				on:keydown={(e) => {
					if (e.key === 'Enter' || e.key === ' ') {
						basketStore.update((items) => [...items, drink]);
					}
				}}
				class="group flex max-w-48 cursor-pointer flex-col items-center overflow-hidden rounded-3xl px-2 py-8 text-black duration-200 hover:bg-purple-600 hover:text-white"
			>
				<Image className="h-[160px]" record={drink} />
				<div class="label text-2xl font-semibold">{drink.name}</div>
				<span class="rounded-full bg-black bg-opacity-5 px-3 py-0.5 text-sm font-thin">
					{#if drink.expand?.owner}
						by {drink.expand.owner.username}
					{:else}
						<span>Für umme!</span>
					{/if}
				</span>
			</div>
		{/each}
	{/await}
</div>
