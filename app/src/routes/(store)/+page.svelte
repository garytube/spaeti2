<script lang="ts">
  import { onMount } from "svelte";
  import type { Drink } from "$lib/types.js";
  import ProductList from "./ProductList.svelte";
  import { pb } from "$lib/pocketbase";
  import { product } from "$lib/store/productStore";
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

<ProductList {drinks} />
