import { drinkSchema } from '$lib/types';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
  const data = await locals.pocketbase
    .collection('drinks')
    .getFullList({ sort: '-created' })

  const drinks = drinkSchema.array().parse(data);

  if (drinks) {
    drinks.forEach((drink, index) => {
      drinks[index].cover = locals.pocketbase.getFileUrl(drink, drink.cover)
    })
  }

  return { drinks };

}) satisfies PageServerLoad;