<script lang="ts">
  import { onMount } from "svelte";
  import type { Drink } from "$lib/types.js";

  import { pb } from "$lib/pocketbase";
  import Carousel from "$lib/components/Carousel.svelte";
  import DrinkCard from "$lib/components/DrinkCard.svelte";
  export let data;

  let drinks: Drink[] = data.drinks;

  onMount(() => {
    pb.collection("drinks").subscribe<Drink>("*", ({ action, record }) => {
      switch (action) {
        case "create":
          drinks = [record, ...drinks];
          break;
        case "update":
          drinks = drinks.map((drink) =>
            drink.id === record.id ? record : drink
          );
          break;
        case "delete":
          drinks = drinks.filter((drink) => drink.id !== record.id);
          break;
        default:
          break;
      }
    });
    return () => pb.collection("drinks").unsubscribe();
  });
</script>

<ul class="product_list">
  <Carousel perPage={1} autoplay={6000} dots={false}>
    {#each drinks as drink (drink.id)}
      <DrinkCard {drink} />
    {/each}
  </Carousel>
</ul>
