import { redirect, type Handle } from '@sveltejs/kit';

import Pocketbase from 'pocketbase'


export const handle = (async ({ event, resolve, }) => {
  event.locals.pocketbase = new Pocketbase(import.meta.env.VITE_PB_URL)
  // load the store data from the request cookie string
  event.locals.pocketbase.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

  try {
    // get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
    event.locals.pocketbase.authStore.isValid && await event.locals.pocketbase.collection('users').authRefresh();
    const { name, username, id, avatar } = event.locals.pocketbase.authStore.model
    event.locals.user = { id, name, username, avatar }  // just for simplicity
  } catch (_) {
    // clear the auth store on failed refresh
    event.locals.pocketbase.authStore.clear();
  }

  // redirect all request to /admin/* if event.local.user is missing
  if (!event.locals.user && event.url.pathname.startsWith('/admin')) {
    throw redirect(303, "/login?redirect=" + event.url.pathname)
  }
  const response = await resolve(event);

  // send back the default 'pb_auth' cookie to the client with the latest store state
  response.headers.append('set-cookie', event.locals.pocketbase.authStore.exportToCookie());

  return response;
}) satisfies Handle