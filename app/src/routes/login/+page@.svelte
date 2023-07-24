<script lang="ts">
	import type { PageData } from './$types'
	export let data: PageData
</script>

<div
	class="max-w-xl mx-auto flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
	<div class="sm:mx-auto sm:w-full sm:max-w-sm">
		<img class="mx-auto h-60 w-auto" src="/logo.svg" alt="Mate und Freunde" />
	</div>
	{#if data.user}
		<div class="w-full text-center">
			<h1 class="font-semibold">
				Angemeldet als <span
					class="block bg-purple-100 px-4 py-2 my-2 max-w-max mx-auto rounded-xl text-2xl text-purple-800"
					>{data.user.name}</span>
			</h1>
			<form action="?/logout" method="post">
				<button type="submit">Logout</button>
			</form>
		</div>
	{:else}
		<form class="space-y-6 mx-auto" action="?/login" method="POST">
			<div>
				<label
					for="email"
					class="block w-full text-center text-sm font-medium leading-6 text-gray-900"
					>Email address</label>
				<div class="mt-2">
					<input
						id="email"
						name="email"
						type="email"
						autocomplete="off"
						required
						class="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
				</div>
			</div>

			<div>
				<div class="flex items-center justify-between">
					<label
						for="password"
						class="block w-full text-center text-sm font-medium leading-6 text-gray-900"
						>Password</label>
				</div>
				<div class="mt-2">
					<input
						id="password"
						name="password"
						type="password"
						autocomplete="off"
						required
						class="block w-full rounded-md px-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
				</div>
			</div>

			<div>
				<button
					type="submit"
					class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
					Anmelden
				</button>
			</div>
		</form>

		<p class="mt-10 text-center text-sm text-gray-500">
			Noch kein Freund?
			<a
				href="/"
				class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
				>Werde Späti Stammgast</a>
		</p>
	{/if}
	<div class="mt-1 sm:mx-auto sm:w-full sm:max-w-sm" />
</div>
