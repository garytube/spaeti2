import { redirect, type Actions, error, fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
  return {
    user: locals.user
  };
}) satisfies PageServerLoad;



export const actions: Actions = {
  logout: async ({ locals }) => {
    await locals.pocketbase.authStore.clear()
    locals.user = null
    throw redirect(303, '/')
  },
  login: async ({ locals, request }) => {
    const data = await request.formData();
    const email = data.get('email');
    const password = data.get('password');
    try {
      const { record } = await locals.pocketbase.collection('users').authWithPassword(email, password)
      const { name, username, id, avatar } = record
      locals.user = { id, name, username, avatar }  // just for simplicity
      throw redirect(303, '/')
    } catch (e) {
      return fail(e.status, { email, incorrect: true })
    }
  }
};