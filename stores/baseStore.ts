import create from 'zustand'

export interface IBaseState {
	nearUsdPrice: number
	setNearUsdPrice: (val: number) => void
}

const useBaseStore = create<IBaseState>((set) => ({
	nearUsdPrice: 0,
	setNearUsdPrice: (val: number) => set(() => ({ nearUsdPrice: val })),
}))

export default useBaseStore
