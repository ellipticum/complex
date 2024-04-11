import { create } from 'zustand'

import IProduct from '@/entities/product/model'

interface IItem {
    quantity: number
    productId: number
}

type Value = IItem[] | ((prevState: IItem[]) => IItem[])

interface State {
    currentProductId: number | null
    items: IItem[]
    setCurrentProductId: (currentProductId: number) => void
    setItems: (value: Value) => void
}

const useCartStore = create<State>((set) => ({
    currentProductId: null,
    items: [],
    setCurrentProductId: (currentProductId: number) => set({ currentProductId }),
    setItems: (value: Value) =>
        set((state) => ({ items: typeof value === 'function' ? value(state.items) : value }))
}))

export default useCartStore
