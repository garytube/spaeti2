// import adapter from '@sveltejs/adapter-static';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		alias: {
			'@db': './src/db'
		},
		adapter: adapter({
			fallback: 'index.html',
			pages: 'dist',
			assets: 'dist',
			strict: true
		})
	},
	preprocess: vitePreprocess({})
};

export default config;
