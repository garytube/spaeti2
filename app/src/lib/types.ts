import { z } from 'zod'


export const drinkSchema = z.object({
  active: z.boolean(),
  collectionId: z.string(),
  collectionName: z.string(),
  barcode: z.string(),
  cover: z.string(),
  created: z.string(),
  id: z.string(),
  name: z.string(),
  price: z.number(),
  stock: z.number(),
  fact_type: z.string().optional(),
  updated: z.string(),
  uuid: z.string()
})
export const factSchema = z.object({
  active: z.boolean(),
  collectionId: z.string(),
  collectionName: z.string(),
  created: z.string(),
  id: z.string(),
  text: z.string(),
  type: z.string(),
  updated: z.string(),
})

export type Drink = z.infer<typeof drinkSchema>
export type Fact = z.infer<typeof factSchema>