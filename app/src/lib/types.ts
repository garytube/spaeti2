import { z } from 'zod'


export const drinkSchema = z.object({
  active: z.boolean(),
  collectionId: z.string(),
  collectionName: z.string(),
  cover: z.string(),
  created: z.string(),
  id: z.string(),
  name: z.string(),
  price: z.number(),
  stock: z.number(),
  updated: z.string(),
})

export type Drink = z.infer<typeof drinkSchema>