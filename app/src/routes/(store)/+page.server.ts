import type { Drink } from '../../lib/types';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
  const drinks = await locals.pocketbase
    .collection<Drinks[]>('drinks')
    .getFullList({ sort: '-created', filter: 'active = true' })

  if (drinks) {
    console.log(drinks)
    // load image
    drinks.forEach((drink, index) => {
      drinks[index].cover = locals.pocketbase.getFileUrl(drink, drink.cover)
    })
  }

  return { drinks };
}) satisfies PageServerLoad;