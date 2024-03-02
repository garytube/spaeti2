<script lang="ts">
  import { pb } from "$lib/pocketbase";
  import { onMount } from "svelte";
  import type { Drink } from "$lib/types.js";
  import Carousel from "$lib/components/Carousel.svelte";
  import DrinkCard from "$lib/components/DrinkCard.svelte";
  import { PUBLIC_AUTOPLAY } from "$env/static/public";
  export let data;

  let drinks: Drink[] = data.drinks;

  onMount(() => {
    pb.collection("drinks").subscribe<Drink>("*", ({ action, record }) => {
      switch (action) {
        case "create":
          record = { ...record, cover: pb.getFileUrl(record, record.cover) };
          drinks = [record, ...drinks];
          break;
        case "update":
          let i = drinks.findIndex((drink) => drink.id === record.id);
          drinks[i] = { ...record, cover: pb.getFileUrl(record, record.cover) };
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
  <Carousel perPage={1} autoplay={PUBLIC_AUTOPLAY} dots={false}>
    {#each drinks.filter((d) => d.active) as drink (drink.id)}
      <DrinkCard {drink} />
    {/each}
  </Carousel>
</ul>
