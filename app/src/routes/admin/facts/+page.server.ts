
import type { Fact } from '$lib/types';
import type { PageServerLoad } from './$types';


export const load = (async ({ locals }) => {
  const facts = structuredClone<Fact[]>(await locals.pocketbase
    .collection('facts')
    .getFullList())
  return { facts };
}) satisfies PageServerLoad;


/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ request, locals }) => {
    const formData = Object.fromEntries(await request.formData());
    console.log(formData)
    // example create data
    const data = {
      "text": formData.fact,
      "active": true,
      "type": formData.type,
    };
    await locals.pocketbase.collection('facts').create(data)
  }
};