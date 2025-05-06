import useCardStore from "../../utils/cardStore";
import './style.css';
import { usePageStore } from "../../utils/pageStore";

export const Pagination = () => {

    const cards = useCardStore((state) => state.cards);
    const cardsPerPage = usePageStore((state) => state.cardsPerPage);
    const currentPage = usePageStore((state) => state.currentPage);
    const nextPage = usePageStore((state) => state.nextPage);
    const prevPage = usePageStore((state) => state.prevPage);

    const totalPages = Math.ceil(cards.length / cardsPerPage);

    return(
        <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>
          上一頁
        </button>
        <span>
          第 {currentPage} 頁 / 共 {totalPages} 頁
        </span>
        <button onClick={nextPage} disabled={currentPage === totalPages}>
          下一頁
        </button>
      </div>
    )
}