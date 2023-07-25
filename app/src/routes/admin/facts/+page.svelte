<script lang="ts">
  import { flip } from "svelte/animate";
  import type { PageData } from "./$types";
  import { enhance } from "$app/forms";
  import { fly } from "svelte/transition";

  export let data: PageData;
</script>

<div class=" mx-4">
  <div class="overflow-hidden rounded-lg bg-white shadow mb-4">
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
        <div class=" mt-2 flex items-center justify-end gap-x-2">
          <select
            id="Type"
            name="type"
            class="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary sm:text-sm sm:leading-6">
            <option value="beer">Bier</option>
            <option value="mate">Mate</option>
            <option selected value="coke">Coke</option>
          </select>
          <button
            type="button"
            class="text-sm font-semibold leading-6 px-3 py-2 rounded-md hover:bg-primary/10 text-primary"
            >Cancel</button>
          <button
            type="submit"
            class="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500">
            Save
          </button>
        </div>
      </form>
    </div>
  </div>

  <div class="overflow-hidden rounded-lg bg-white shadow">
    <div class="px-4 py-5 sm:p-6">
      <ul role="list" class="divide-y divide-gray-100">
        {#each data.facts as fact, i (fact.id)}
          <li
            transition:fly
            animate:flip={{ duration: 1000 }}
            class="flex items-center justify-between gap-x-6 py-5">
            <div class="min-w-0">
              <div class="flex items-start gap-x-3">
                <p
                  class="rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset text-green-700 bg-green-50 ring-green-600/20">
                  {fact.type}
                </p>
                <p class="text-sm font-semibold leading-6 text-gray-900">
                  {fact.text}
                </p>
              </div>
              <div
                class="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                <p class="whitespace-nowrap">
                  <time datetime={fact.created}
                    >{new Date(fact.created).toDateString()}</time>
                </p>
                <svg viewBox="0 0 2 2" class="h-0.5 w-0.5 fill-current">
                  <circle cx="1" cy="1" r="1" />
                </svg>
                <p class="truncate">
                  {fact.id}
                </p>
              </div>
            </div>
          </li>
        {/each}

        <!-- More items... -->
      </ul>
    </div>
  </div>
</div>
