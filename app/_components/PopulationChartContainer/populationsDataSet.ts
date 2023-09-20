import { getPopulation } from '@/app/_query/client/getPopulation'
import { Prefectures } from '@/app/_query/server/getPrefectures'
import { isLoadingPopulationsAtom } from '@/app/_utils/atoms'
import { useAtom } from 'jotai'
import { useState, useEffect } from 'react'
import { PopulationData } from '.'

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
export const usePopulationsDataSet = (prefectures: Prefectures) => {
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
