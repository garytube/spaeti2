<script lang="ts">
  import "../app.postcss";
  import { Toaster } from "svelte-french-toast";
</script>

<Toaster />

<slot />

<style lang="postcss">
  :global(body) {
    @apply bg-primary;
  }
</style>
