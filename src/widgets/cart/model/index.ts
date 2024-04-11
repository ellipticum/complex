import { create } from 'zustand'

import IProduct from '@/entities/product/model'

interface IItem {
    quantity: number
    product: IProduct
}

type Value = IItem[] | ((prevState: IItem[]) => IItem[])

interface State {
    items: IItem[]
    setItems: (value: Value) => void
}

const useCartStore = create<State>((set) => ({
    items: [],
    setItems: (value: Value) =>
        set((state) => ({ items: typeof value === 'function' ? value(state.items) : value }))
}))

export default useCartStore
