import { findProduct } from "$lib/pocketbase"
import type { Drink } from "$lib/types"
import { writable } from "svelte/store"

const createProductStore = () => {
  const { subscribe, set } = writable<Drink | undefined>({
    "active": true,
    "barcode": "4001568200525",
    "collectionId": "pfoaa8ot80iflek",
    "collectionName": "drinks",
    "cover": "http://localhost:8090/api/files/pfoaa8ot80iflek/j60trmpdfo6ngli/vita_UgoKEMMHe7.webp",
    "created": "2023-07-20 14:01:43.273Z",
    "id": "j60trmpdfo6ngli",
    "name": "Vita Malz 0,33l",
    "price": 1,
    "stock": 24,
    "updated": "2023-07-20 14:02:14.730Z",
    "expand": {}
  })

  return {
    subscribe,
    clear: () => set(undefined),
    barcode: (ean: string) => {
      set(undefined)
      return findProduct(ean).then(drink => {
        console.log(drink)
        if (drink) {
          set(drink)
          return drink
        }
      })
    }
  }
}

export const product = createProductStore()