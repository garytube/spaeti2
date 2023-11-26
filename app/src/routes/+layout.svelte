<script lang="ts">
  import "../app.postcss";
  import { Toaster } from "svelte-french-toast";
  import { BACKEND } from "$lib/pocketbase";
</script>

<Toaster />
<div class="fixed inset-0 z-50">{BACKEND}</div>
<slot />

<style lang="postcss">
  :global(body) {
    @apply bg-primary;
  }
</style>
