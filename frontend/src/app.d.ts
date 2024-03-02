// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
/// <reference types="@sveltejs/kit" />

interface User {
	id: string,
	name: string,
	username: string,
	avatar: string,
}

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			pocketbase: Pocketbase
			user?: User
			// interface PageData {}
			// interface Platform {}
		}
	}
}
export { User }