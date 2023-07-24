import { product } from '$lib/store/productStore'
import type { Drink } from '$lib/types'
import PocketBase from 'pocketbase'
import toast from 'svelte-french-toast'

export const pb = new PocketBase('http://localhost:8090')


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
    drink = { ...drink, cover: pb.getFileUrl(drink, drink.cover) }
  }

  return drink
}