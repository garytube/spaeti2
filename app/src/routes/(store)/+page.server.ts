import { error } from '@sveltejs/kit';
import { drinkSchema } from '../../lib/types';
import type { PageServerLoad } from './$types';


export const load = (async ({ locals }) => {
  try {
    const data = await locals.pocketbase
      .collection('drinks')
      .getFullList({ sort: '-created', filter: 'active = true' })

    const drinks = drinkSchema.array().parse(data);

    if (drinks) {
      drinks.forEach((drink, index) => {
        drinks[index].cover = locals.pocketbase.getFileUrl(drink, drink.cover)
      })
    }

    return { drinks };
  } catch (e) {
    console.error(e);
    throw error(500, 'Datenbank offline');
  }
}) satisfies PageServerLoad;