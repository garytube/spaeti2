<script lang="ts">
	import { flip } from 'svelte/animate'
	import type { PageData } from './$types'
	import { enhance } from '$app/forms'
	import { fly } from 'svelte/transition'

	export let data: PageData
</script>

<div class="mx-4">
	<div
		class="overflow-hidden rounded-lg mt-12 border-4 border-violet-950 bg-white shadow-xl mb-4">
		<div class="px-4 py-5 sm:p-6">
			<!-- Content goes here -->
			<form method="post" use:enhance>
				<div class="col-span-full">
					<label for="fact" class="block font-body leading-6 text-primary"
						>Random Fact</label>
					<div class="mt-2">
						<textarea
							id="fact"
							name="fact"
							rows="2"
							class="block w-full rounded-md border-0 bg-white/5 p-1.5 font-body text-primary shadow-sm ring-2 ring-inset ring-primary focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6" />
					</div>
				</div>
				<div class=" mt-2 flex items-center max-w-max justify-end gap-x-2">
					<select
						id="Type"
						name="type"
						class="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary sm:text-sm sm:leading-6">
						<option value="beer">Bier</option>
						<option value="mate">Mate</option>
						<option selected value="coke">Coke</option>
					</select>
					<button
						type="submit"
						class="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500">
						Save
					</button>
				</div>
			</form>
		</div>
	</div>

	<div class="overflow-hidden">
		<ul role="list">
			{#each data.facts as fact, i (fact.id)}
				<li
					transition:fly
					animate:flip={{ duration: 1000 }}
					class="flex items-center relative justify-between py-4 my-4 px-8 rounded-lg bg-white border-4 border-violet-950">
					<div class="min-w-0">
						<div class="flex items-start gap-x-3">
							<p
								class="rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset text-purple-100 bg-primary ring-green-600/20 absolute top-2 right-2">
								{fact.type}
							</p>
							<p class="text-xl text-violet-900 font-body">
								{fact.text}
							</p>
						</div>
					</div>
				</li>
			{/each}

			<!-- More items... -->
		</ul>
	</div>
</div>
