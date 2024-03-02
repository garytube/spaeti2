import { findProduct } from "$lib/pocketbase"
import type { Drink } from "$lib/types"
import { writable } from "svelte/store"

// status to check if cart is
export const cartPanelOpen = writable(false)

const createProductStore = () => {
  const { subscribe, set, update } = writable<Drink[]>([])

  return {
    subscribe,
    set,
    clear: () => set([]),
    addToCart: (barcode: string) =>
      findProduct(barcode).then(drink => {
        if (drink) update((drinks) => [drink, ...drinks])

      }),
    remove: (uuid: string) => {
      // remove entry from array by index
      update(drinks => drinks.filter(drink => drink.uuid !== uuid))
    }

  }
}

export const product = createProductStore()