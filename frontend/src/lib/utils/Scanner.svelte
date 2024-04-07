<script lang="ts">
	// array of number from the bardcoade scanner
	let scannerInput: string[] = [];

	function collectScannerInput(e: KeyboardEvent) {
		if (e.key === 'Enter' && scannerInput.length) {
			e.preventDefault();
			e.stopPropagation();
			alert(scannerInput.join(''));
			// product.addToCart(scannerInput.join(''));
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
