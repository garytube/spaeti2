<script lang="ts">
	import Logo from '$lib/components/Logo.svelte'
</script>

<nav
	class="h-12 bg-violet-950 text-violet-500 flex relative items-center pl-48 mb-12">
	<Logo class="w-[200px] -top-9 -left-4 absolute" />
	<ul class="flex gap-8 font-bold text-yellow-300">
		<li><a href="facts">FACTS</a></li>
		<li><a href="drinks">DRINKS</a></li>
		<li><a href="astro">ASTRO</a></li>
		<li>USER</li>
	</ul>
</nav>

<slot />
