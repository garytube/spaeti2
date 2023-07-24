<script lang="ts">
  import { pb } from "$lib/pocketbase";
  import { product } from "$lib/store/productStore";
  import { addZero } from "$lib/utils/formatters";

  export let drink;

  $: price = addZero(drink.price);
</script>

<div
  data-drink={drink.id}
  class="flex justify-center m-12 w-9/12 mt-0 mx-auto lg:max-w-xl flex-col items-center drink rounded-3xl bg-white border-primary-dark border-8 relative z-50">
  <img
    src={drink.cover}
    alt={drink.name}
    class="h-[450px] mt-12 mb-1 object-contain animate-wiggle" />
  <div class="font-bold text-primary-dark text-3xl">{drink.name}</div>
  <div class="font-bold text-primary text-4xl">{price}</div>
  <button
    on:click={() => product.add(drink)}
    class="paypal mb-8 font-body text-2xl -rotate-3 text-white bg-primary py-3 px-8">
    + Hinzufügen
  </button>
</div>

<style>
  .paypal {
    border-radius: 10px 20px;
    margin-top: 1rem;
  }
</style>
