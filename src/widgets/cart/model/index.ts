import { create } from 'zustand'

import IProduct from '@/entities/product/model'

interface IItem {
    quantity: number
    price: number
    product: {
        id: number
        title: string
    }
}

type Value = IItem[] | ((prevState: IItem[]) => IItem[])

interface State {
    phoneNumber: string
    currentProductId: number | null
    items: IItem[]
    setCurrentProductId: (currentProductId: number | null) => void
    setItems: (value: Value) => void
    setPhoneNumber: (phoneNumber: string) => void
}

const useCartStore = create<State>((set) => ({
    phoneNumber: '',
    currentProductId: null,
    items: [],
    setPhoneNumber: (phoneNumber: string) => set({ phoneNumber }),
    setCurrentProductId: (currentProductId: number | null) => set({ currentProductId }),
    setItems: (value: Value) =>
        set((state) => ({ items: typeof value === 'function' ? value(state.items) : value }))
}))

if (typeof window !== 'undefined') {
    useCartStore.subscribe((state) => {
        localStorage.setItem('cartItems', JSON.stringify(state.items))
        localStorage.setItem('phoneNumber', state.phoneNumber)
    })

    const savedItems = localStorage.getItem('cartItems')
    const savedPhoneNumber = localStorage.getItem('phoneNumber')

    if (savedItems) {
        useCartStore.setState({ items: JSON.parse(savedItems) })
    }

    if (savedPhoneNumber) {
        useCartStore.setState({ phoneNumber: savedPhoneNumber })
    }
}

export default useCartStore
