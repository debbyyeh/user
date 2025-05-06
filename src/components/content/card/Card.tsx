import './style.css';
import { ContentProps } from "../Content";
import { CardItem } from "./CardItem";

export const Card = ({toggleEdit, handleDataChange, currentCards}: ContentProps)=>{

    return(
        <div className="card-wrapper">
            {currentCards.map((card, index) => (
                <CardItem key={card.id} card={card} toggleEdit={toggleEdit} handleDataChange={handleDataChange}/>
            ))}
        </div>
    )
}