import { useEffect, useState } from "react";
import { Table } from "./table/Table";
import { Card } from "./card/Card";
import { CreateCard } from "./CreateCard";
import { collection, getDocs } from "firebase/firestore/lite";
import { db } from "../../config/firebase";
import { editUserData, UserData } from "../../utils/util";
import useCardStore from "../../utils/cardStore";
import './index.css'
import { usePageStore } from "../../utils/pageStore";


export interface ContentProps{
    toggleEdit: (id: string) => void;
    handleDataChange: (id: string, field: string, value: string) => void;
    currentCards: UserData[];
}

export const Content = () => {

    const [isTableView, setIsTableView] = useState(false);
    const cards = useCardStore((state) => state.cards);
    const updateCard = useCardStore((state) => state.updateCard);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredUsers, setFilteredUsers] = useState<UserData[]>([]);

    const cardsPerPage = usePageStore((state) => state.cardsPerPage);
    const currentPage = usePageStore((state) => state.currentPage);

    useEffect(() => {
        const initialCards = async () => {
          const userData = collection(db, 'user-data');
          const dataSnapshot = await getDocs(userData);
          const dataList = dataSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as UserData[];
          useCardStore.setState({ cards: dataList });
        };
    
        initialCards();
    }, []);

    useEffect(() => {
        const handler = setTimeout(() => {
            if (searchTerm.trim() === "") {
                setFilteredUsers([]);
            } else {
                const results = cards.filter(
                    (user) =>
                        user.name.includes(searchTerm) || user.career.includes(searchTerm) || user.tel.includes(searchTerm)||user.gender.includes(searchTerm)
                );
                setFilteredUsers(results);
            }

        }, 300);

        return () => clearTimeout(handler);
    },[searchTerm]);

    const toggleEdit = (id: string) => {
        const cardToUpdate = cards.find((card) => card.id === id);

        if (cardToUpdate?.isEditing) {
          const { isEditing, ...updatedData } = cardToUpdate;
          editUserData(id, updatedData);
        }
    
        updateCard(id, { isEditing: !cardToUpdate?.isEditing });
    };

    const handleDataChange = (id: string, field: string, value: string) => {
        updateCard(id, { [field]: value });
    };

    const currentCards =(filteredUsers.length === 0 ? cards:filteredUsers).slice(
        (currentPage - 1) * cardsPerPage,
        currentPage * cardsPerPage
    );

    return(
        <div className='content-wrapper'>
            <div>
                <button className="dropdown-button" onClick={() => {
                    setIsTableView(!isTableView)
                    usePageStore.setState({ currentPage: 1 })
                }}>
                    {isTableView ? '切換成 Card' : '切換成 Table' } 
                </button>
            </div>
            <div className="search">
                <input
                    type="text"
                    placeholder="搜尋使用者..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
               {searchTerm.length > 0 ? <p>共有{filteredUsers.length}筆資料符合</p>: null}
            </div>
            {isTableView ? 
                <Table toggleEdit={toggleEdit} handleDataChange={handleDataChange} currentCards={currentCards}/> : 
                <Card  toggleEdit={toggleEdit} handleDataChange={handleDataChange} currentCards={currentCards}/>
            } 
            <CreateCard/>
        </div>
    )
}