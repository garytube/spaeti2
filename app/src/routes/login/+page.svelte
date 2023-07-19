<script lang="ts">
	import type { PageData } from './$types'

	export let data: PageData
</script>

<h1>Login</h1>

<form action="?/login" method="post">
	<input type="text" name="email" id="email" value="g@geryy.io" />
	<input type="password" name="password" id="password" />
	<button type="submit">Login</button>
</form>
