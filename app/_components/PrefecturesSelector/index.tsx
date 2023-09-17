import { Prefectures } from '@/app/_query/server/getPrefectures'

type Props = {
  prefectures: Prefectures
}

export const PrefecturesSelector = ({ prefectures }: Props) => {
  return (
    <div>
      {prefectures.map((v) => (
        <label key={`pref-${v.prefCode}`}>
          <input type="checkbox" value={v.prefCode} />
          {v.prefName}
        </label>
      ))}
    </div>
  )
}
