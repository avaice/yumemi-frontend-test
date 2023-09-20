'use client'
import { useAtomValue } from 'jotai'
import { selectedPrefecturesAtom } from '@/app/_utils/atoms'
import { PopulationDataSchema } from '@/app/_query/client/getPopulation'
import { ChangeEvent, useCallback, useState } from 'react'
import { PopulationChart } from '../PopulationChart'

import styles from './PopulationChartContainer.module.css'
import Image from 'next/image'
import { usePopulationsDataSet } from './populationsDataSet'

export type PopulationData = { prefName: string; data: PopulationDataSchema }

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
