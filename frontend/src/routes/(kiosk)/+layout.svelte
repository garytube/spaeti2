<script>
	let { children } = $props();
	import Scanner from '$lib/utils/Scanner.svelte';
</script>

<Scanner />
{@render children()}
