<script lang="ts">
	import Card from '$lib/components/Card.svelte'
	import Logo from '$lib/components/Logo.svelte'
	import type { ActionData, PageData } from './$types'
	export let data: PageData
	export let form: ActionData
</script>

<div class="flex mt-8 justify-center">
	<Logo class="w-[600px]" />
</div>
<Card>
	{#if data.user}
		<div class="w-full text-center">
			<h1 class="font-semibold">
				Angemeldet als
				<span class="font-bold text-primary">
					{data.user.name}
				</span>
			</h1>

			<a
				class="font-bold my-4 block p-4 border-1 border-gray-200"
				href="/admin/drinks">Admin Menü</a>

			<form action="?/logout" method="post">
				<button type="submit">Logout</button>
			</form>
		</div>
	{:else}
		{#if form?.incorrect}<p class="error">Invalid credentials!</p>{/if}
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
						value={form?.email ?? ''}
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
</Card>
