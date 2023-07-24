<script lang="ts">
  import { product } from "$lib/store/productStore";
  import { addZero } from "$lib/utils/formatters";
  import { fade, fly } from "svelte/transition";

  export let showCart = false;

  $: totalPrice = $product
    .reduce((acc, curr) => acc + curr.price, 0)
    .toFixed(2);

  function closeCart() {
    showCart = false;
  }
</script>

{#if showCart}
  <!-- content here -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    class="relative z-10"
    aria-labelledby="slide-over-title"
    role="dialog"
    aria-modal="true">
    <div
      on:click={closeCart}
      transition:fade={{ duration: 500 }}
      id="slide-over-title"
      class="fixed inset-0 bg-primary-dark backdrop-blur-sm bg-opacity-75 transition-all" />

    <div class="fixed inset-0 max-w-max overflow-hidden">
      <div class="absolute inset-0 overflow-hidden">
        <div
          transition:fly={{ x: "100%", duration: 700 }}
          class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
          <div class="pointer-events-auto w-screen max-w-md">
            <div
              class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
              <div class="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                <div class="flex items-start justify-between">
                  <h2
                    class="text-xl font-body text-primary"
                    id="slide-over-title">
                    {$product.length}
                    {#if $product.length == 0}
                      Dein Warenkorb ist leer
                      <small
                        class="block text-primary-dark line-clamp-1 leading-tight mt-2"
                        >Nimm dir eine 🍾Flasche und scanne den Barcode an der
                        Seite vom Kühlschrank 😍</small>
                    {:else}
                      Deine Getränke
                    {/if}
                  </h2>
                  <div class="ml-3 flex h-7 items-center">
                    <button
                      on:click={closeCart}
                      type="button"
                      class="-m-2 p-2 text-gray-400 hover:text-gray-500">
                      <span class="sr-only">Close panel</span>
                      <svg
                        class="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        aria-hidden="true">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div class="mt-8">
                  <div class="flow-root">
                    {#if $product.length == 0}
                      <lottie-player
                        src="https://lottie.host/c1a19871-d62f-46c9-85e3-f37182a2e8f7/tpTHlaIeUl.json"
                        background="Transparent"
                        speed="1"
                        style="width: 100%"
                        direction="1"
                        mode="normal"
                        loop
                        autoplay />
                    {:else}
                      <ul
                        role="list"
                        class="-my-6 divide-y divide-gray-200 overflow-x-hidden">
                        {#each $product as drink, index (index)}
                          <li
                            transition:fly={{ x: "100%", duration: 500 }}
                            class="flex py-6">
                            <div
                              class="h-24 w-24 flex-shrink-0 overflow-hidden">
                              <img
                                src={drink.cover}
                                alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
                                class="h-full w-full object-contain" />
                            </div>

                            <div class="ml-4 flex flex-1 flex-col">
                              <div>
                                <div
                                  class="flex justify-between text-base font-medium text-gray-900">
                                  <h3>
                                    <a href="/drink/{drink.id}"
                                      >#{index} - {drink.name}</a>
                                  </h3>
                                  <p class="ml-4">{addZero(drink.price)}</p>
                                </div>
                                <p class="mt-1 text-sm text-gray-500">0.5l</p>
                              </div>
                              <div
                                class="flex flex-1 items-end justify-between text-sm">
                                <button
                                  on:click={() => product.remove(index)}
                                  type="button"
                                  class="font-medium ml-auto opacity-20 hover:opacity-100 hover:text-indigo-600 h"
                                  >Entfernen</button>
                              </div>
                            </div>
                          </li>
                        {/each}

                        <!-- More products... -->
                      </ul>
                    {/if}
                  </div>
                </div>
              </div>

              {#if $product.length > 0}
                <div class="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div
                    class="flex justify-between text-base font-medium text-gray-900">
                    <p>Zu zahlender Betrag</p>
                    <p>{totalPrice} €</p>
                  </div>
                  <p class="mt-0.5 text-sm text-gray-500">
                    Bezahlt wird mit PayPal
                  </p>
                  <div class="mt-6">
                    <a
                      href="https://www.paypal.com/paypalme/GeraldScholz/{totalPrice}"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                      >PayPal {totalPrice} €</a>
                  </div>
                  <div
                    class="mt-6 flex justify-center font-body text-center text-xs text-slate-700">
                    <p>
                      Die Getränke werden
                      <span class="font-body text-primary">PRIVAT</span>
                      finanziert. <br />
                      Direkt bezahlen. Pfand zurück bringen.
                    </p>
                  </div>
                </div>
              {/if}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}
