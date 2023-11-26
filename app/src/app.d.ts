// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
/// <reference types="@sveltejs/kit" />
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			pocketbase: Pocketbase
			user?: {
				id: string,
				name: string,
				username: string,
				avatar: string,
			} | null
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export { };
