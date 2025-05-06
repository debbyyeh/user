import { create } from "zustand";

interface PageStore{
    cardsPerPage: number;
    currentPage: number;

    nextPage: () => void;
    prevPage: () => void;
}



export const usePageStore = create<PageStore>((set) => ({
    cardsPerPage: 6,
    currentPage: 1,



    nextPage: () => set((state) => ({ currentPage: state.currentPage + 1 })),
    prevPage: () => set((state) => ({ currentPage: state.currentPage - 1 })),
}));