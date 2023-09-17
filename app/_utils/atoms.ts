import { atom } from 'jotai'
import { Prefectures } from '../_query/server/getPrefectures'

export const selectedPrefecturesAtom = atom<Prefectures>([])
