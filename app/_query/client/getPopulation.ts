import { z } from 'zod'

const populationDataSchema = z.array(
  z.union([
    z.object({
      label: z.literal('総人口'),
      data: z.array(
        z.object({
          year: z.number(),
          value: z.number(),
        })
      ),
    }),
    z.object({
      label: z.enum(['年少人口', '生産年齢人口', '老年人口']),
      data: z.array(
        z.object({
          year: z.number(),
          value: z.number(),
          rate: z.number(),
        })
      ),
    }),
  ])
)

const populationApiDataSchema = z.object({
  message: z.null(),
  result: z.object({
    boundaryYear: z.number(),
    data: populationDataSchema,
  }),
})

const responseSchema = z.union([
  z.object({
    status: z.literal('ok'),
    data: populationApiDataSchema,
  }),
  z.object({
    status: z.literal('error'),
    reason: z.string(),
  }),
])

export type PopulationDataSchema = z.infer<typeof populationDataSchema>
type ResponseSchema = z.infer<typeof responseSchema>

const cache = new Map<number, ResponseSchema>()

export const getPopulation = async (prefCode: number) => {
  if (cache.has(prefCode)) {
    return cache.get(prefCode)
  }

  const urlParams = new URLSearchParams()
  urlParams.set('prefCode', prefCode.toString())

  const populationResult = await fetch(`/api/population?${urlParams}`)
  const populationData = await populationResult.json()

  const validatedPopulationData = responseSchema.parse(populationData)
  cache.set(prefCode, validatedPopulationData)

  return validatedPopulationData
}
