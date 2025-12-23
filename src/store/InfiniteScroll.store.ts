import { create } from 'zustand';

interface InfiniteScrollState {
    scrollPosition: number;
    nextPosition: number;
    currentIteration: number;
}

interface InfiniteScrollStore {
    infiniteScrollState: InfiniteScrollState;
    setInfiniteScrollState: (patch: Partial<InfiniteScrollState>) => void;
    clearInfiniteScrollState: () => void;
}

const createEmptyInfiniteScrollState = (): InfiniteScrollState => ({
    scrollPosition: 0,
    nextPosition: 0,
    currentIteration: 0,
});

export const useInfiniteScrollStore = create<InfiniteScrollStore>((set) => ({
    infiniteScrollState: createEmptyInfiniteScrollState(),
    setInfiniteScrollState: (patch) => set((state) => ({
        infiniteScrollState: {
            ...state.infiniteScrollState,
            ...patch
        }
    })),
    clearInfiniteScrollState: () => set({
        infiniteScrollState: createEmptyInfiniteScrollState()
    })
}))