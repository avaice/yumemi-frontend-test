'use client'
import { useAtomValue } from 'jotai'
import { selectedPrefecturesAtom } from '@/app/_utils/atoms'
import { Prefectures } from '@/app/_query/server/getPrefectures'
import {
  PopulationDataSchema,
  getPopulation,
} from '@/app/_query/client/getPopulation'
import { useEffect, useState } from 'react'
import { PopulationChart } from '../PopulationChart'

import styles from './PopulationChartContainer.module.css'

export type PopulationData = { prefName: string; data: PopulationDataSchema }

const getPopulationsDataSet = (prefectures: Prefectures) =>
  Promise.all(
    prefectures.map((pref) =>
      getPopulation(pref.prefCode).then((data) => {
        if (data?.status !== 'ok') {
          throw new Error('fetch failed')
        }
        return {
          prefName: pref.prefName,
          data: data.data.result.data,
        }
      })
    )
  )

const usePopulationsDataSet = (prefectures: Prefectures) => {
  const [result, setResult] = useState<PopulationData[]>()
  useEffect(() => {
    getPopulationsDataSet(prefectures).then((v) => setResult(v))
  }, [prefectures])
  return result
}

export const PopulationChartContainer = () => {
  const selectedPrefectures = useAtomValue(selectedPrefecturesAtom)
  const data = usePopulationsDataSet(selectedPrefectures)

  return (
    <div className={styles.populationChart}>
      {data?.length === 0 ? (
        <div className={styles.wrap}>
          <p>都道府県を選択してください</p>
        </div>
      ) : (
        <div className={styles.chart}>
          <PopulationChart populationsData={data ?? []} />
        </div>
      )}
    </div>
  )
}
