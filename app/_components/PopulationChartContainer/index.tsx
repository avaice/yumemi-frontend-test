'use client'
import { useAtom, useAtomValue } from 'jotai'
import {
  isLoadingPopulationsAtom,
  selectedPrefecturesAtom,
} from '@/app/_utils/atoms'
import { Prefectures } from '@/app/_query/server/getPrefectures'
import {
  PopulationDataSchema,
  getPopulation,
} from '@/app/_query/client/getPopulation'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { PopulationChart } from '../PopulationChart'

import styles from './PopulationChartContainer.module.css'
import Image from 'next/image'

export type PopulationData = { prefName: string; data: PopulationDataSchema }

// 複数の都道府県の人口推移を取得して、PopulationChartコンポーネントで必要なまとめたデータに加工する
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

// getPopulationsDataSetをコンポーネント上で使うためのHook
const usePopulationsDataSet = (prefectures: Prefectures) => {
  const [result, setResult] = useState<PopulationData[]>()
  const [isLoading, setIsLoading] = useAtom(isLoadingPopulationsAtom)
  useEffect(() => {
    setIsLoading(true)
    getPopulationsDataSet(prefectures).then((v) => {
      setResult(v)
      setIsLoading(false)
    })
  }, [prefectures, setIsLoading])
  return { isLoading, data: result }
}

export const PopulationChartContainer = () => {
  const [dataType, setDataType] = useState('総人口')
  const selectedPrefectures = useAtomValue(selectedPrefecturesAtom)
  const { isLoading, data } = usePopulationsDataSet(selectedPrefectures)
  const onChangeTypeCheckRadio = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setDataType(e.target.value),
    []
  )
  return (
    <div className={styles.populationChart}>
      {data && data.length !== 0 && (
        <>
          <div className={styles.typeSelects}>
            {['総人口', '年少人口', '生産年齢人口', '老年人口'].map((v) => (
              <label key={`radio-${v}`} className={styles.typeSelect}>
                <input
                  name="typeCheck"
                  type="radio"
                  value={v}
                  onChange={onChangeTypeCheckRadio}
                  checked={dataType === v}
                />
                {v}
              </label>
            ))}
          </div>
          <div className={styles.chart}>
            {isLoading && (
              <div className={styles.loading}>
                <Image src="/reload.svg" alt="Loading" width={48} height={48} />
              </div>
            )}
            <PopulationChart populationsData={data ?? []} dataType={dataType} />
          </div>
        </>
      )}
    </div>
  )
}
