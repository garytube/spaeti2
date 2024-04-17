<script>
	import HeroText from '$lib/components/HeroText.svelte';
	import Logo from '$lib/components/Logo.svelte';
	import Basket from '$lib/components/Sidebar/Basket.svelte';
	import Menu from '$lib/components/Sidebar/Menu.svelte';
	import { basketStore } from '$lib/store/basket';
	import Scanner from '$lib/utils/Scanner.svelte';
	let { children } = $props();
</script>

<Scanner></Scanner>
<div class=" h-auto min-h-screen max-w-[calc(100vw-225px)] pl-12">
	<Logo />
	<div class="mt-24 pb-2">
		<HeroText title="Hey," subtitle="what's up?" />
	</div>
	<main>
		{@render children()}
	</main>
</div>

<Menu />
<Basket />
