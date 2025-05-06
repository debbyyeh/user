import useCardStore from "../../utils/cardStore";
import './style.css';
import { usePageStore } from "../../utils/pageStore";

export const Pagination = () => {

    const cards = useCardStore((state) => state.cards);
    const cardsPerPage = usePageStore((state) => state.cardsPerPage);
    const currentPage = usePageStore((state) => state.currentPage);
    const nextPage = usePageStore((state) => state.nextPage);
    const prevPage = usePageStore((state) => state.prevPage);

    const totalPages = cards.length === 0 ? 1 : Math.ceil(cards.length / cardsPerPage);
    
    return(
        <div className="pagination">
        <button onClick={()=>{
          if (currentPage > 1) {
              prevPage();
          }
        }} disabled={currentPage === 1}>
          上一頁
        </button>
        <span>
          第 {currentPage} 頁 / 共 {totalPages} 頁
        </span>
        <button onClick={()=>{
            if (currentPage < totalPages) {
                nextPage();
            }
        }} disabled={currentPage === totalPages}>
          下一頁
        </button>
      </div>
    )
}