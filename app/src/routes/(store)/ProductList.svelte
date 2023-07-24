<script lang="ts">
  import Carousel from "$lib/Carousel.svelte";
  import { pb } from "$lib/pocketbase";
  import type { Drink } from "$lib/types.js";

  export let drinks: Drink[];
</script>

<ul class="product_list">
  <Carousel autoplay={0}>
    {#each drinks as drink, index (index)}
      {@const thumb = pb.files.getUrl(drink, drink.cover)}

      <div class="drink border-2 flex justify-center">
        <img src={thumb} alt={drink.name} class="h-[800px] object-contain" />
      </div>
    {/each}
  </Carousel>
</ul>
