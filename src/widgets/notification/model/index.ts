import { create } from 'zustand'

interface State {
    isNotificationHidden: boolean
    setIsNotificationHidden: (isNotificationHidden: boolean) => void
}

const useNotificationStore = create<State>((set) => ({
    isNotificationHidden: true,
    setIsNotificationHidden: (isNotificationHidden: boolean) => set({ isNotificationHidden })
}))

export default useNotificationStore
