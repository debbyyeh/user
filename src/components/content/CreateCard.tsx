import useCardStore from "../../utils/cardStore"

export const CreateCard = () => {

    return(
          <div className="addUser" onClick={() =>
            useCardStore.setState({ isPopupVisible: true })
          }>
              新增人員
          </div>
    )
}