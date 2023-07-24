<script lang="ts">
  import ProductCard from "$lib/ProductCard.svelte";
  import "../app.postcss";
  import { Toaster } from "svelte-french-toast";
</script>

<Toaster />
<ProductCard />
<slot />
