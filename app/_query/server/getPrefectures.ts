import { getFromResasApi } from '@/app/_utils/getFromResasApi'
import { z } from 'zod'

const prefecturesSchema = z.array(
  z.object({
    prefCode: z.number(),
    prefName: z.string(),
  })
)

const prefecturesDataSchema = z.object({
  message: z.null(),
  result: prefecturesSchema,
})

export type Prefectures = z.infer<typeof prefecturesSchema>

export const getPrefectures = async () => {
  const prefecturesData = await getFromResasApi('api/v1/prefectures', null)

  const validatedPopulationData = prefecturesDataSchema.parse(prefecturesData)

  return validatedPopulationData
}
