import { dev } from '$app/environment';
import PocketBase from 'pocketbase';

const api = dev ? 'http://127.0.0.1:8090' : undefined;

export const pb = new PocketBase(api);
