import type { Drink } from '../../lib/types';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
  const drinks: Drink[] = structuredClone(await locals.pocketbase
    .collection('drinks')
    .getFullList({ sort: '-created' }))

  if (drinks) {
    // load image
    drinks.forEach((drink, index) => {
      drinks[index].cover = locals.pocketbase.getFileUrl(drink, drink.cover)
    })
  }
  console.log(drinks);
  return { drinks };
}) satisfies PageServerLoad;