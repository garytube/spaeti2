<script lang="ts">
  import "../app.postcss";
  import { Toaster } from "svelte-french-toast";
</script>

<Toaster />

<slot />

<style>
  :global(body) {
    @apply bg-primary;
  }
</style>
