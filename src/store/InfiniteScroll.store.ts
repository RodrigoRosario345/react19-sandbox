import { create } from 'zustand';

export const useInfiniteScrollStore = create((set) => ({
    posInitItem: 0,
    setPosInitItem: (index: number) => set({ posInitItem: index })
}))