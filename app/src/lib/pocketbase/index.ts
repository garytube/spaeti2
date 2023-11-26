import { v4 as uuidv4 } from 'uuid';
import type { Drink } from '$lib/types'
import toast from 'svelte-french-toast'
import Pocketbase from 'pocketbase'
import { dev } from '$app/environment';

export const BACKEND = dev ? 'http://localhost:8090' : import.meta.env.VITE_PB_URL

export const pb = new Pocketbase(BACKEND)

export async function findProduct(bardcode: string) {
  console.log("Searching DB for EAN: " + bardcode)
  let drink = await pb
    .collection('drinks')
    .getFirstListItem<Drink>(`barcode="${bardcode}"`)
    .catch(e => {
      if (e.status === 404) {
        toast.error(`Das gehört nicht zum Späti`, {
          icon: '❌',
          style: 'border-radius: 200px; background: #59048e; color: #03e8e8;'
        })
        console.warn('EAN ' + bardcode + ' nicht Datenbank')
      }
    }) || undefined

  if (drink) {
    // load image
    drink = { ...drink, cover: pb.getFileUrl(drink, drink.cover), uuid: uuidv4() }
  }

  return drink
}


