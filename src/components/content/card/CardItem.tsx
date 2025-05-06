import { useState } from "react";
import { UserData } from "../../../utils/util";
import { Edit } from "../edit/Edit";
import { ProfileImage } from "./ProfileImage";

interface CardItemProps{
    card: UserData
    toggleEdit: (id: string) => void;
    isUploading?: boolean;
    handleDataChange: (id: string, field: string, value: string) => void;
}

export const CardItem = ({card, toggleEdit, isUploading,handleDataChange}: CardItemProps) => { 

    const [dropdownVisible, setDropdownVisible] = useState<{ [key: string]: boolean }>({});
    const [genderDropdownVisible, setGenderDropdownVisible] = useState<{ [key: string]: boolean }>({});

    return(
        <div className="card">
            <ProfileImage key={card.id} card={card} handleDataChange={handleDataChange}/>
            <div className="operation display-flex">
                <Edit card={card} toggleEdit={toggleEdit} disabled={isUploading}/>
            </div>
            <div className="info">
                {card.isEditing ? (
                    <>
                    <input
                        className='name'
                        placeholder='姓名'
                        type="text"
                        value={card.name}
                        onChange={(e) =>
                            handleDataChange(card.id, 'name', e.target.value)
                        }
                    />
                    <input
                        className='birth'
                        type="date"
                        value={card.birthDate}
                        onChange={(e) =>
                            handleDataChange(card.id, 'birthDate', e.target.value)
                        }
                    />
                    {card.isEditing ? (
                        <div
                            className="dropdown-container"
                            onMouseEnter={() => setGenderDropdownVisible((prev) => ({ ...prev, [card.id]: true }))}
                            onMouseLeave={() => setGenderDropdownVisible((prev) => ({ ...prev, [card.id]: false }))}
                        >
                            <div className="dropdown-label">
                                性別：{card.gender}
                            </div>
                            {genderDropdownVisible[card.id] && (
                                <ul className="dropdown-menu">
                                    {['男', '女', '不透露'].map((item, index) => (
                                        <li
                                            key={`gender-${index}`}
                                            className="dropdown-item"
                                            onClick={() => {
                                                handleDataChange(card.id, 'gender', item)
                                                setGenderDropdownVisible((prev) => ({ ...prev, [card.id]: false }));
                                            }}
                                        >
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ) : (
                        <p>性別：{!card.gender ? '不透露' : card.gender}</p>
                    )}
                    </>
                ) : (
                    <>
                        <div className='name'>名字：{card.name}</div>
                        <div className='birth'>生日：{card.birthDate}</div>
                        <div className='gender'>性別：{card.gender}</div>
                    </>
                )}
            </div>
            <div className="tel display-flex">
                {card.isEditing ? (
                    <>
                    <span>TEL:</span>
                    <input
                        type="text"
                        value={card.tel}
                        onChange={(e) =>
                            handleDataChange(card.id, 'tel', e.target.value)
                        }
                    />
                    </>
                    ) : (
                <p>TEL: {card.tel}</p>
                )}
            </div>
            <div className="dropDown">
                {card.isEditing ? (
                    <div
                        className="dropdown-container"
                        onMouseEnter={() => setDropdownVisible((prev) => ({ ...prev, [card.id]: true }))}
                        onMouseLeave={() => setDropdownVisible((prev) => ({ ...prev, [card.id]: false }))}
                    >
                        <div className="dropdown-label">
                            職業：{!card.career ? '待選' : card.career}
                        </div>
                        {dropdownVisible[card.id] && (
                            <ul className="dropdown-menu">
                                {['學生', '教師', '工程師', '無業'].map((item, index) => (
                                    <li
                                        key={`career-${index}`}
                                        className="dropdown-item"
                                        onClick={() => {
                                            handleDataChange(card.id, 'career', item)
                                            setDropdownVisible((prev) => ({ ...prev, [card.id]: false }));
                                        }}
                                    >
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    ) : (
                    <p>職業：{!card.career ? '待選' : card.career}</p>
                )}
            </div>
        </div>
    )
}     