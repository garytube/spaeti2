import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
  return new Response('HELLO WORLD');
};



export const POST: RequestHandler = async ({ request }) => {
  console.log(await request.json())
  return new Response('HELLO WORLD');
};