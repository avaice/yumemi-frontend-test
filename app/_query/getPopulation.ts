import { z } from 'zod'

const populationDataSchema = z.object({
  message: z.string(),
  result: z.object({
    boundaryYear: z.number(),
    data: z.array(
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
    ),
  }),
})

const responseSchema = z.union([
  z.object({
    status: z.literal('ok'),
    data: populationDataSchema,
  }),
  z.object({
    status: z.literal('error'),
    reason: z.string(),
  }),
])

export const getPopulation = async (prefCode: number) => {
  const urlParams = new URLSearchParams()
  urlParams.set('prefCode', prefCode.toString())

  const populationResult = await fetch(`/api/population?${urlParams}`)
  const populationData = await populationResult.json()

  const validatedPopulationData = responseSchema.parse(populationData)

  return validatedPopulationData
}
