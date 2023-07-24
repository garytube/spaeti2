<script>
	import Scanner from '$lib/scanner.svelte'
	export let data
</script>

<Scanner />
<header class="bg-white shadow-sm h-10 static px-2 flex items-center">
	<div class="flex-1 flex justify-between items-center">
		<a href="/" class="font-bold text-purple-900 uppercase text-xs">
			Mate <span class="text-sky-500">&</span> Freunde
		</a>
		{#if data.user?.avatar}
			<div>
				<img
					class="inline-block h-6 w-6 rounded-full"
					src={`http://127.0.0.1:8090/api/files/users/${data.user.id}/${data.user.avatar}`}
					alt={data.user.username} />
			</div>
		{/if}
	</div>
</header>
<slot />
<footer
	class="text-sm text-gray-500 static p-2 flex items-center justify-center mt-auto">
	<a href="/login">Login</a>
</footer>
