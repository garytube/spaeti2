import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import Pocketbase from 'pocketbase'
import { invalidateAll } from '$app/navigation';
const pb = new Pocketbase('https')

export const load = (async ({ locals }) => {
  return {
    user: locals.user
  };
}) satisfies PageServerLoad;



export const actions: Actions = {
  logout: async ({ locals }) => {
    await locals.pocketbase.authStore.clear()
    locals.user = null
    redirect(303, '/drinks')
  },
  login: async ({ locals, request }) => {
    const data = await request.formData();
    const email = data.get('email');
    const password = data.get('password');

    const { record } = await locals.pocketbase.collection('users').authWithPassword(email, password);
    const { name, username, id, avatar } = record
    locals.user = { id, name, username, avatar }  // just for simplicity
    return
  }
};