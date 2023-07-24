<script lang="ts">
  import { product } from "../store/productStore";

  // array of number from the bardcoade scanner
  let scannerInput: string[] = [];

  function collectScannerInput(e: KeyboardEvent) {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      product.addToCart(scannerInput.join(""));
      scannerInput = []; // clear input
    }
    // push keys if key was number
    if (/\d/.test(e.key)) {
      scannerInput.push(e.key);
      e.preventDefault();
    }
  }
</script>

<svelte:window on:keypress={collectScannerInput} />
