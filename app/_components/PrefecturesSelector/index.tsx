import { Prefectures } from '@/app/_query/server/getPrefectures'
import styles from './prefecturesSelector.module.css'

type Props = {
  prefectures: Prefectures
}

export const PrefecturesSelector = ({ prefectures }: Props) => {
  return (
    <div className={styles.prefectures}>
      {prefectures.map((v) => (
        <label key={`pref-${v.prefCode}`} className={styles.prefectureInput}>
          <input type="checkbox" value={v.prefCode} />
          {v.prefName}
        </label>
      ))}
    </div>
  )
}
