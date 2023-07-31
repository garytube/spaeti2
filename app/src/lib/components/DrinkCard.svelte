<script lang="ts">
  import { dev } from "$app/environment";
  import { product } from "$lib/store/productStore";

  import type { Drink } from "$lib/types";
  import { addZero } from "$lib/utils/formatters";
  import toast from "svelte-french-toast";

  export let drink: Drink;

  $: price = addZero(drink.price);
</script>

<div
  data-drink={drink.id}
  class="flex justify-center m-12 w-9/12 mt-0 mx-auto lg:max-w-xl flex-col items-center drink rounded-3xl bg-white border-primary-dark border-8 relative z-50">
  <img
    src={drink.cover}
    alt={drink.name}
    class="h-[400px] mt-12 mb-1 object-contain animate-wiggle" />
  <div class="font-bold text-primary-dark text-3xl">{drink.name}</div>
  <div class="font-bold text-primary text-4xl">{price}</div>
  {#if dev}
    <button on:click={() => product.addToCart(drink.barcode)} class="paypal">
      DEBUG +ADD
    </button>
  {/if}
  <button
    on:click={() =>
      toast.success("📸 Scanne ➡️ am Kühlschrank!", {
        duration: 4000,
        position: "bottom-center",
      })}
    class="paypal mb-8 font-body flex items-center text-2xl -rotate-3 text-white bg-primary py-3 px-8">
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
</div>

<style>
  .paypal {
    border-radius: 10px 20px;
    margin-top: 1rem;
  }
</style>
