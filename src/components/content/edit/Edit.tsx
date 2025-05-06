import useCardStore from "../../../utils/cardStore";
import { deleteCard, UserData } from "../../../utils/util"
import './style.css'

interface EditProps{
    card: UserData;
    toggleEdit: (id: string) => void;
    disabled?: boolean;
}

export const Edit = ({card, toggleEdit, disabled}: EditProps) => {
    const removeCard = useCardStore((state) => state.removeCard);
    return(
        <>
            <div className="icon-pencil" onClick={
                    () => !disabled && toggleEdit(card.id)
                }>
                {card.isEditing ? (
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    fill="currentColor"
                    >
                    <path d="M9 16.17l-3.59-3.58L4 14l5 5 12-12-1.41-1.42z" />
                    </svg>
                    ) : (
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        fill="currentColor"
                        >
                        <path d="M3 21v-3.75L14.81 5.44l3.75 3.75L6.75 21H3zm2.92-2H5v.92L5.92 19zM21.71 6.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-2.12 2.12 3.75 3.75 2.12-2.12z" />
                        </svg>
                    )}
            </div>
            <div className="icon-delete" onClick={() =>{
                    removeCard(card.id)
                    deleteCard(card.id)
                }}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    fill="currentColor"
                    >
                    <path d="M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59 7.11 5.7a1 1 0 0 0-1.41 1.41L10.59 12l-4.89 4.89a1 1 0 1 0 1.41 1.41L12 13.41l4.89 4.89a1 1 0 0 0 1.41-1.41L13.41 12l4.89-4.89a1 1 0 0 0 0-1.41z" />
                </svg>
            </div>
        </>
    )
}