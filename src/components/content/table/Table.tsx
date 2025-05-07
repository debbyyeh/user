
import { ContentProps } from '../Content';
import { Edit } from '../edit/Edit';
import './style.css'

export const Table =({toggleEdit,handleDataChange, currentCards}: ContentProps)=>{

  return(
      <div className='table-wrapper'>
        <table className="user-table">
            <thead>
              <tr>
                <th>姓名</th>
                <th>生日</th>
                <th>電話</th>
                <th>性別</th>
                <th>職業</th>
                <th>編輯</th>
              </tr>
            </thead>
            <tbody>
              {currentCards.map((card) => (
                <tr key={card.id}>
                  <td>
                    {card.isEditing ? (
                      <input
                        type="text"
                        value={card.name}
                        onChange={(e) => handleDataChange(card.id, "name", e.target.value)}
                      />
                    ) : (
                      card.name
                    )}
                  </td>
                  <td>{card.isEditing ? (
                    <input
                      type="date"
                      value={card.birthDate}
                      onChange={(e) => handleDataChange(card.id, "birthDate", e.target.value)}
                    />
                    ) : (
                      card.birthDate
                    )}
                  </td>
                  <td>
                  {card.isEditing ? (
                    <input
                      type="text"
                      value={card.tel}
                      onChange={(e) => handleDataChange(card.id, "tel", e.target.value)}
                    />
                  ) : (
                    card.tel
                  )}
                  </td>
                  <td>
                  {card.isEditing ? (
                    <select
                      value={card.gender}
                      onChange={(e) => handleDataChange(card.id, "gender", e.target.value)}
                    >
                      <option value="男">男</option>
                      <option value="女">女</option>
                      <option value="不透露">不透露</option>
                    </select>
                  ) : (
                    card.gender
                  )}
                  </td>
                  <td>
                  {card.isEditing ? (
                    <select
                      value={card.career}
                      onChange={(e) => handleDataChange(card.id, "career", e.target.value)}
                    >
                      <option value="學生">學生</option>
                      <option value="教師">教師</option>
                      <option value="工程師">工程師</option>
                      <option value="無業">無業</option>
                    </select>
                  ) : (
                    card.career
                  )}
                  </td>
                  <td>
                    <Edit card={card} toggleEdit={toggleEdit}/>
                  </td>
                </tr>
              ))}
            </tbody>
        </table>
      </div>
  )
}