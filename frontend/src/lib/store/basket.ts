import { type RecordModel } from 'pocketbase';
import { writable } from 'svelte/store';

export const basketStore = writable<RecordModel[]>([]);
