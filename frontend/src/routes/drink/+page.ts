import type { PageLoad } from './$types';

export const load = (async () => {
	return {
		date: new Date().toISOString()
	};
}) satisfies PageLoad;
