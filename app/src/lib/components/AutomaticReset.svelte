<script lang="ts">
  import { browser } from "$app/environment";
  import { cartPanelOpen, product } from "$lib/store/productStore";
  import { onMount } from "svelte";
  import toast from "svelte-french-toast";
  import { tweened } from "svelte/motion";
  import { fade } from "svelte/transition";
  import ProgressCircle from "./ProgressCircle.svelte";

  /**
   * Timeout in Seconds - when to reset the App
   */
  export let timeout = 5;
  /**
   * Delay in Seconds - when to start the timer
   */
  export let delay = 0;

  let timer = tweened(timeout);

  $: secondsTillReset = timeout;

  /**
   * R
   */
  const startTimerForReset = () => {
    secondsTillReset = timeout;
    timer.set(timeout, { duration: 0 });
    timer.set(0, { delay: delay * 1000, duration: timeout * 1000 });
  };

  onMount(() => {
    if (browser) {
      startTimerForReset();
      window.addEventListener("mousemove", startTimerForReset);
      window.addEventListener("touchstart", startTimerForReset);
      window.addEventListener("touchend", startTimerForReset);
    }
    return () => (
      window.removeEventListener("mousemove", startTimerForReset),
      window.removeEventListener("touchstart", startTimerForReset),
      window.removeEventListener("touchend", startTimerForReset)
    );
  });

  $: {
    if ($timer === 0) {
      product.clear();
      cartPanelOpen.set(false);
      toast.success("Der Warenkorb wurde aufgrund von Inaktivität geleert.");
    }
  }

  $: if ($product) {
    startTimerForReset();
  }
</script>

{#if $timer > 0}
  <div
    transition:fade={{ duration: 200 }}
    class="fixed z-50 bottom-4 left-4 w-12">
    <ProgressCircle value={$timer} max={timeout} />
    {Math.floor($timer)}
  </div>
{/if}
