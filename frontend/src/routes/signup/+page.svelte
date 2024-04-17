<script lang="ts">
	import Logo from '$lib/components/Logo.svelte';
	import type { PageData } from './$types';
</script>

<div class="container mx-auto flex flex-col items-center justify-center px-8">
	<a href="/"> <Logo /></a>
	<article class="prose text-center">
		<h1>
			Mach mit beim coolsten <br />Späti im Büro! <br />
		</h1>
		<h2 class="mt-1">Anmelden ist super easy:</h2>

		<p>Drei einfache Schritte und du bist dabei! Kein Schnickschnack, kein langes Warten.</p>
		<p>
			Trag dich ein und werde Teil unserer Büro-Späti-Community. Ob du deine Lieblingssnacks teilen
			oder dich bei jemand anderem bedanken möchtest, hier ist es ein Kinderspiel.
		</p>

		<ol>
			<li><strong>Dein Name</strong> – damit wissen wer das</li>
			<li>
				<strong>Eine PIN</strong> – damit nur du auf dein Konto zugreifen kannst.
			</li>
			<li>
				<strong>Deine PayPal-Adresse</strong> so können deine Kollegen dir direkt Geld senden, wenn sie
				sich etwas aus dem Kühlschrank schnappen.
			</li>
		</ol>

		<h4>Registriere dich jetzt, füll den Kühlschrank und lass die gute Zeit rollen!</h4>
	</article>
	<div class="my-auto flex min-h-full max-w-xs flex-col justify-center px-6 py-12 lg:px-8">
		<div class="sm:mx-auto sm:w-full sm:max-w-sm">
			<img
				class="mx-auto h-10 w-auto"
				src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
				alt="Your Company"
			/>
		</div>

		<div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
			<form class="space-y-6" action="#" method="POST">
				<div>
					<label for="email" class="block text-sm font-medium leading-6 text-gray-900"
						>Email address</label
					>
					<div class="mt-2">
						<input
							id="email"
							name="email"
							type="email"
							autocomplete="email"
							required
							class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						/>
					</div>
				</div>

				<div>
					<div class="flex items-center justify-between">
						<label for="password" class="block text-sm font-medium leading-6 text-gray-900"
							>Password</label
						>
						<div class="text-sm">
							<a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500"
								>Forgot password?</a
							>
						</div>
					</div>
					<div class="mt-2">
						<input
							id="password"
							name="password"
							type="password"
							autocomplete="current-password"
							required
							class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						/>
					</div>
				</div>

				<div>
					<button
						type="submit"
						class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						>Sign in</button
					>
				</div>
			</form>
		</div>
	</div>
</div>
