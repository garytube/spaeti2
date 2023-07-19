import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import Pocketbase from 'pocketbase'
const pb = new Pocketbase('https')

export const load = (async () => {
  return {};
}) satisfies PageServerLoad;



export const actions: Actions = {
  login: async ({ locals, request }) => {
    const data = await request.formData();
    const email = data.get('email');
    const password = data.get('password');

    const { token, record } = await locals.pocketbase.collection('users').authWithPassword(email, password);
    console.log(token, record)
    return { success: true };
  }
};