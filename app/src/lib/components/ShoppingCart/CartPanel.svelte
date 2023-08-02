<script lang="ts">
	import { cartPanelOpen, product } from '$lib/store/productStore'
	import { addZero } from '$lib/utils/formatters'
	import { fade, fly } from 'svelte/transition'
	import QRCode from 'qrcode'
	export let showCart = false
	import { tweened } from 'svelte/motion'
	import toast from 'svelte-french-toast'
	import { flip } from 'svelte/animate'
	import type { Drink } from '$lib/types'
	import { pb } from '$lib/pocketbase'
	import AutomaticReset from '../AutomaticReset.svelte'
	import {
		PUBLIC_PAYPAL,
		PUBLIC_RESTTIME,
		PUBLIC_WAIT_TO_PAY,
	} from '$env/static/public'

	let iHavePayedButton: HTMLButtonElement
	let generateQR: any

	const progress = tweened(0, {
		delay: 0,
		duration: parseInt(PUBLIC_WAIT_TO_PAY) * 1000,
	})

	const randomFact = async (drink: Drink) => {
		console.log('drink selected', drink)
		const result = await pb.collection('facts').getList(1, undefined, {
			filter: `type ~ "${drink.fact_type}"`,
			perPage: 1,
			sort: '@random',
			$autoCancel: false,
		})
		return result?.items[0]?.text || ''
	}

	const hasPayed = () => {
		product.clear()
		cartPanelOpen.set(false)
		toast.success('Danke für deine Zahlung! 🥳', { duration: 5000 })
	}

	$: totalPrice = $product.reduce((acc, curr) => acc + curr.price, 0).toFixed(2)

	$: QRCode.toDataURL(PUBLIC_PAYPAL + totalPrice)
		.then(dataUrl => (generateQR = dataUrl))
		.then(d => (generateQR = d))

	$: {
		if (showCart) {
			progress.set(100)
		} else {
			progress.set(0, { duration: 0 })
		}
	}
</script>

{#if showCart}
	{#if $product.length == 0}
		<AutomaticReset timeout={parseInt(PUBLIC_RESTTIME)} />
	{/if}
	<!-- content here -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		class="relative z-10"
		aria-labelledby="slide-over-title"
		role="dialog"
		aria-modal="true">
		<div
			on:click={() => cartPanelOpen.set(false)}
			transition:fade={{ duration: 500 }}
			id="slide-over-title"
			class="fixed inset-0 bg-primary-dark backdrop-blur-sm bg-opacity-75 transition-all" />

		<div class="fixed inset-0 max-w-max overflow-hidden">
			<div class="absolute inset-0 overflow-hidden">
				<div
					transition:fly={{ x: '100%', duration: 700 }}
					class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
					<div class="pointer-events-auto w-screen max-w-md">
						<div
							class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
							<div class="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
								<div class="flex items-start justify-between">
									<h2
										class="text-xl font-body text-primary"
										id="slide-over-title">
										{#if $product.length == 0}
											Dein Warenkorb ist leer
											<small
												class="block text-primary-dark line-clamp-1 leading-tight mt-2"
												>Nimm dir eine 🍾Flasche und scanne den Barcode an der
												Seite vom Kühlschrank 😍</small>
										{:else}
											Deine Getränke
										{/if}
									</h2>
									<div class="ml-3 flex h-7 items-center">
										<button
											on:click={() => cartPanelOpen.set(false)}
											type="button"
											class="-m-2 p-2 text-gray-600 hover:text-gray-600">
											<span class="sr-only">Close panel</span>
											<svg
												class="h-6 w-6"
												fill="none"
												viewBox="0 0 24 24"
												stroke-width="1.5"
												stroke="currentColor"
												aria-hidden="true">
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													d="M6 18L18 6M6 6l12 12" />
											</svg>
										</button>
									</div>
								</div>

								<div class="mt-8">
									<div class="flow-root">
										{#if $product.length == 0}
											<lottie-player
												src="https://lottie.host/c1a19871-d62f-46c9-85e3-f37182a2e8f7/tpTHlaIeUl.json"
												background="Transparent"
												speed="1"
												style="width: 100%"
												direction="1"
												mode="normal"
												loop
												autoplay />
										{:else}
											<ul
												role="list"
												class="-my-6 divide-y divide-gray-200 overflow-hidden">
												{#each $product as drink, i (drink.uuid)}
													<li
														animate:flip={{ duration: 200 }}
														transition:fly={{ x: '100%', duration: 500 }}
														class="flex py-6">
														<div
															class="h-24 w-24 flex-shrink-0 overflow-hidden">
															<img
																src={drink.cover}
																alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
																class="h-full w-full object-contain" />
														</div>

														<div class="ml-4 flex flex-1 flex-col">
															<div>
																<div
																	class="flex justify-between text-base font-medium text-gray-900">
																	<h3>
																		<a href="/drink/{drink.id}">{drink.name}</a>
																	</h3>
																	<p class="ml-4">{addZero(drink.price)}</p>
																</div>
																{#await randomFact(drink) then fact}
																	<p class="mt-1 text-sm text-gray-500">
																		{fact}
																	</p>
																{/await}
															</div>
															<div
																class="flex flex-1 items-end justify-between text-sm">
																{#if drink.uuid}
																	<!-- Die UUID wird gesetzt wenn das Produkt gescannt wird. 
                                  Da passier im Store Die UUID ist nicht in der Datenbank gespeichert, sondern wird nur im Store gespeichert.
                                  In der Carousel Übersicht fehlt die UUID noch-->
																	<button
																		on:click={() => product.remove(drink.uuid)}
																		type="button"
																		class="font-medium ml-auto opacity-60 hover:opacity-100 hover:text-indigo-600 h">
																		Entfernen
																	</button>
																{/if}
															</div>
														</div>
													</li>
												{/each}

												<!-- More products... -->
											</ul>
										{/if}
									</div>
								</div>
							</div>

							{#if $product.length > 0}
								<div class="border-t border-gray-200 px-4 py-6 sm:px-6">
									<div
										class="flex justify-between text-base font-medium text-gray-900">
										<p>Zu zahlender Betrag</p>
										<p>{totalPrice} €</p>
									</div>
									<p class="mt-0.5 text-sm text-gray-500">
										Bezahlt wird mit PayPal
									</p>
									<div class="">
										<div
											class="flex flex-1 flex-col justify-center items-center">
											<img
												src={generateQR}
												width="200px"
												alt="PayPal {totalPrice} €" />

											<button
												class="-mt-1 relative flex items-center justify-center transition-all duration-300 bg-green-500 disabled:bg-slate-200 disabled:text-slate-300 text-white px-4 py-2 rounded-lg font-body text-sm"
												disabled={$progress !== 100}
												bind:this={iHavePayedButton}
												on:click={hasPayed}>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													stroke-width="1.5"
													stroke="currentColor"
													class="w-6 h-6 mr-1">
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
												</svg>
												Ich hab bezahlt
												{#if $progress !== 100}
													<progress
														out:fade
														class="absolute bottom-1 h-[2px] left-0 right-0 mx-auto w-10/12"
														max="100"
														value={$progress} />
												{/if}
											</button>
										</div>
									</div>
									<div
										class="mt-2 flex justify-center font-body text-center text-xs text-slate-700">
										<p>
											Scann den QR Code und bezahle mit PayPal.<br />Sobald du
											fertig bist, drück den Button.
										</p>
									</div>
								</div>
							{/if}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	progress:not([value]) {
		background-color: #eee;
		border-radius: 2px;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25) inset;
	}
</style>
