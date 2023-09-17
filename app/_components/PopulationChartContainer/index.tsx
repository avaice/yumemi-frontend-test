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
import Image from 'next/image'

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
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    setIsLoading(true)
    getPopulationsDataSet(prefectures).then((v) => {
      setResult(v)
      setIsLoading(false)
    })
  }, [prefectures])
  return { isLoading, data: result }
}

export const PopulationChartContainer = () => {
  const selectedPrefectures = useAtomValue(selectedPrefecturesAtom)
  const { isLoading, data } = usePopulationsDataSet(selectedPrefectures)

  return (
    <div className={styles.populationChart}>
      {isLoading && (
        <div className={styles.wrap}>
          <Image src="/reload.svg" alt="Loading" width={48} height={48} />
        </div>
      )}
      {data?.length !== 0 && (
        <div className={styles.chart}>
          <PopulationChart populationsData={data ?? []} />
        </div>
      )}
    </div>
  )
}
