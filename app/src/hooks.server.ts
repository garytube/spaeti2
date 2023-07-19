import { POCKETBASE_URL } from '$env/static/private';
import type { Handle } from '@sveltejs/kit';
import PocketBase from 'pocketbase'

export const handle = (async ({ event, resolve }) => {
  event.locals.pocketbase = new PocketBase(POCKETBASE_URL);

  // load the store data from the request cookie string
  event.locals.pocketbase.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

  try {
    // get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
    event.locals.pocketbase.authStore.isValid && await event.locals.pocketbase.collection('users').authRefresh();
  } catch (_) {
    // clear the auth store on failed refresh
    event.locals.pocketbase.authStore.clear();
  }

  const response = await resolve(event);

  // send back the default 'pb_auth' cookie to the client with the latest store state
  response.headers.append('set-cookie', event.locals.pocketbase.authStore.exportToCookie());

  return response;
}) satisfies Handle