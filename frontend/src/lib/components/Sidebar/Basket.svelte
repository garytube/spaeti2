<script lang="ts">
	import { basketStore } from '$lib/store/basket';
	import { fly, slide } from 'svelte/transition';
	import Image from '../Image.svelte';

	function remove(index: number) {
		$basketStore = $basketStore.filter((_, i) => i !== index);
	}

	$: totalPrice = $basketStore
		.filter((drink) => drink.expand)
		.reduce((acc, drink) => acc + drink.price, 0)
		.toFixed(2);
</script>

{#if $basketStore.length > 0}
	<div
		transition:fly={{ duration: 1000, x: 500 }}
		id="sidebar"
		class="fixed right-0 top-2 min-h-screen w-[200px] border-l-2 bg-slate-100 px-4 pt-8"
	>
		<div class="text-3xl font-bold leading-6">Deine<br />Auswahl</div>
		<div class="mt-8">
			<div
				class="text-xg op text-blachecked: mb-4 flex flex-col items-center justify-center border-b-4 border-black pb-4"
			>
				Total {totalPrice}€
				<button
					class="flex size-40 items-center justify-center rounded-2xl bg-yellow-500 text-3xl font-extrabold"
				>
					Bezahlen
				</button>
			</div>

			{#each $basketStore as drink, index (index)}
				<div
					transition:fly={{ duration: 300, x: 100, y: 500, opacity: 0.5 }}
					class="relative mx-auto mb-4 flex size-40 flex-col items-center rounded-2xl border-b py-1 pb-4 leading-snug duration-150 hover:bg-yellow-500 hover:text-white"
				>
					<button
						onclick={() => remove(index)}
						class="absolute right-4 top-2 size-6 rounded-full bg-yellow-500 text-sm"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="white"
							class="h-6 w-6"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
							/>
						</svg>
					</button>
					<Image record={drink} className="size-20 object-contain" />
					<div class="font-extrabold">{drink.name}</div>
					<div class="">
						{#if drink.expand?.owner}
							{drink.price.toFixed(2)}€ für {drink.expand.owner.username}
						{:else}
							<span>0€ - für umme!</span>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</div>
{/if}
