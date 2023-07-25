import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
  return new Response('HELLO WORLD');
};



export const POST: RequestHandler = async ({ request }) => {
  return new Response('HELLO WORLD');
};