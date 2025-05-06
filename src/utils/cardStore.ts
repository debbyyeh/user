import { create } from "zustand";
import { UserData } from "./util";

interface CardStore{
    cards: UserData[]
    addCard: (card: UserData) => void;
    removeCard: (id: string) => void;
    updateCard: (id: string, updatedData: Partial<UserData>) => void;

    currentPage: number;

    isPopupVisible: boolean;
}

const useCardStore = create<CardStore>((set)=>({
    currentPage: 1,
    cards: [],
    addCard: (card: UserData) => set((state) => ({
        cards: [...state.cards, card],
    })),
    removeCard: (id: string) => set((state) => ({
        cards: state.cards.filter((card) => card.id !== id),
    })),
    updateCard: (id: string,  updatedData: Partial<UserData>) => set((state) => ({
        cards: state.cards.map((card) =>
            card.id === id ? { ...card, ...updatedData } : card
        ),
    })),
    isPopupVisible: false,
}));


export default useCardStore;