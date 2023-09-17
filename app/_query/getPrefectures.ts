import { z } from 'zod'

const prefecturesDataSchema = z.object({
  message: z.string(),
  result: z.array(
    z.object({
      prefCode: z.number(),
      prefName: z.string(),
    })
  ),
})

const responseSchema = z.union([
  z.object({
    status: z.literal('ok'),
    data: prefecturesDataSchema,
  }),
  z.object({
    status: z.literal('error'),
    reason: z.string(),
  }),
])

export const getPrefectures = async () => {
  const populationResult = await fetch(`/api/prefectures`)
  const populationData = await populationResult.json()

  const validatedPopulationData = responseSchema.parse(populationData)

  return validatedPopulationData
}
