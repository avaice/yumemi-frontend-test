'use client'

import { Prefectures } from '@/app/_query/server/getPrefectures'
import styles from './prefecturesSelector.module.css'
import { useAtom, useAtomValue } from 'jotai'
import { useCallback, ChangeEvent } from 'react'
import {
  isLoadingPopulationsAtom,
  selectedPrefecturesAtom,
} from '@/app/_utils/atoms'

type Props = {
  prefectures: Prefectures
}

export const PrefecturesSelector = ({ prefectures }: Props) => {
  const [selectedPrefectures, setSelectedPrefectures] = useAtom(
    selectedPrefecturesAtom
  )
  const isLoading = useAtomValue(isLoadingPopulationsAtom)
  const onChangeCheckbox = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.checked) {
        setSelectedPrefectures([
          ...selectedPrefectures,
          prefectures.find((v) => v.prefCode === Number(e.target.value))!,
        ])
      } else {
        setSelectedPrefectures(
          selectedPrefectures.filter(
            (v) => v.prefCode !== Number(e.target.value)
          )
        )
      }
    },
    [prefectures, selectedPrefectures, setSelectedPrefectures]
  )

  return (
    <div className={styles.prefectures}>
      {prefectures.map((v) => (
        <label key={`pref-${v.prefCode}`} className={styles.prefectureInput}>
          <input
            type="checkbox"
            value={v.prefCode}
            checked={
              selectedPrefectures.findIndex(
                (pref) => pref.prefCode === v.prefCode
              ) !== -1
            }
            disabled={isLoading}
            onChange={onChangeCheckbox}
          />
          {v.prefName}
        </label>
      ))}
    </div>
  )
}
