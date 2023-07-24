import { findProduct } from "$lib/pocketbase"
import type { Drink } from "$lib/types"
import { writable } from "svelte/store"

const createProductStore = () => {
  const { subscribe, set, update } = writable<Drink[]>([])

  return {
    subscribe,
    set,
    clear: () => set([]),
    add: (drink: Drink) => update(drinks => [...drinks, drink]),
    addToCart: (ean: string) =>
      findProduct(ean).then(drink => {
        if (drink) {
          update((drinks) => {
            if (drinks.length === 0) {
              return [drink]
            }
            return [...drinks, drink]
          })
        }
      }),

    remove: (index: number) => {
      // remove entry from array by index
      update(drinks => {
        if (drinks.length === 0) {
          return
        }
        drinks.splice(index, 1);
        console.log({ drinks });
        return drinks

      })
    }

  }
}

export const product = createProductStore()