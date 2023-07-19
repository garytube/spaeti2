import type { Actions } from '@sveltejs/kit';
import type { Drink } from '../../../types';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals, params }) => {
  const drink: Drink = structuredClone(await locals.pocketbase.collection('drinks').getOne(params.id)) satisfies Drink
  return { drink };
}) satisfies PageServerLoad;


export const actions: Actions = {
  default: async ({ request, locals, params }) => {
    const data = await request.formData();

    const name = data.get('name');
    const price = data.get('price');
    const stock = data.get('stock');
    const active = data.get('active');

    const record = await locals.pocketbase.collection('drinks').update(params.id, {
      name,
      price,
      stock,
      active
    })
    console.log({ record })
    return { success: true };


  }
};