<script lang="ts">
	import type { PageData } from './$types'
	import PocketBase from 'pocketbase'

	export let data: PageData
</script>

{#if data.user}
	<h1>Angemeldet als {data.user.name}</h1>
	<form action="?/logout" method="post">
		<button type="submit">Logout</button>
	</form>
{:else}
	<h1>Login</h1>
	<form action="?/login" method="post">
		<input type="text" name="email" id="email" value="g@geryy.io" />
		<input type="password" name="password" id="password" />
		<button type="submit">Login</button>
	</form>
{/if}
