<script lang="ts">
  import { onMount } from "svelte";
  import type { Drink } from "$lib/types.js";

  import { pb } from "$lib/pocketbase";
  import Carousel from "$lib/components/Carousel.svelte";
  import DrinkCard from "$lib/components/DrinkCard.svelte";
  import { cartPanelOpen, product } from "$lib/store/productStore.js";
  import { browser } from "$app/environment";
  import toast from "svelte-french-toast";
  export let data;

  let drinks: Drink[] = data.drinks;

  let touchTimeout: any;

  // wait 2 minutes before clearing the product
  const clearTouchTimeout = () => {
    // clearTimeout(touchTimeout);
    // touchTimeout = setTimeout(() => {
    //   if ($product.length === 0) return;
    //   console.log("first");
    //   product.clear();
    //   cartPanelOpen.set(false);
    //   toast.success("Der Warenkorb wurde aufgrund von Inaktivität geleert.");
    // }, 60000 * 2);
  };

  onMount(() => {
    if (browser) {
      window.addEventListener("mousemove", clearTouchTimeout);
      window.addEventListener("touchstart", clearTouchTimeout);
      window.addEventListener("touchend", clearTouchTimeout);
    }

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
    return () => (
      pb.collection("drinks").unsubscribe(), clearTimeout(touchTimeout)
    );
  });
</script>

<ul class="product_list">
  <Carousel perPage={1} autoplay={5000} dots={false}>
    {#each drinks.filter((d) => d.active) as drink (drink.id)}
      <DrinkCard {drink} />
    {/each}
  </Carousel>
</ul>
