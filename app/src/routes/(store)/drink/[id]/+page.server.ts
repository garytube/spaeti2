import { redirect, type Actions, fail } from '@sveltejs/kit';
import type { Drink } from '$lib/types';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals, params }) => {
  const drink: Drink = structuredClone(await locals.pocketbase.collection('drinks').getOne(params.id)) satisfies Drink
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
};