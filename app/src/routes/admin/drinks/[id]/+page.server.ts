import { redirect, type Actions, fail } from '@sveltejs/kit';
import { drinkSchema, type Drink } from '$lib/types';
import type { PageServerLoad } from '../../../(store)/drink/[id]/$types';

export const load = (async ({ locals, params }) => {
  const data: Drink = structuredClone(await locals.pocketbase.collection('drinks').getOne(params.id)) satisfies Drink
  const drink = drinkSchema.parse(data);

  if (drink) {
    drink.cover = locals.pocketbase.getFileUrl(drink, drink.cover)
  }

  return { drink };
}) satisfies PageServerLoad;


export const actions: Actions = {
  default: async ({ request, locals, params }) => {
    if (!locals.user) {
      throw redirect(303, '/login')
    }
    const data = await request.formData();

    const name = data.get('name');
    const price = data.get('price');
    const stock = data.get('stock');
    const active = data.get('active') === 'on' ? true : false;

    await locals.pocketbase.collection('drinks').update(params.id, { name, price, stock, active }).catch(() => { throw fail(403) })

    return { success: true };
  }
} satisfies PageServerLoad;