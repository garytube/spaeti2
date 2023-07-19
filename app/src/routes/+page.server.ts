import type { Drink } from '../types';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
  const drinks: Drink[] = structuredClone(await locals.pocketbase
    .collection('drinks')
    .getFullList({ sort: '-created' }))
  return { drinks };
}) satisfies PageServerLoad;