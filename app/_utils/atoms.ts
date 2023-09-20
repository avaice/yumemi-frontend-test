import { atom } from 'jotai'
import { Prefectures } from '../_query/server/getPrefectures'

export const selectedPrefecturesAtom = atom<Prefectures>([])
export const isLoadingPopulationsAtom = atom<boolean>(false)
