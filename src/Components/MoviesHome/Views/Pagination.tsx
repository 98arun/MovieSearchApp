import { memo } from "react";
import "../index.css";

function Pagination(props: any) {
  const { postPerPage, totalPosts, paginate, currentPage } = props;
  const pageNumber: any = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pageNumber.push(i);
  }
  const renderCard = pageNumber.map((number: any) => {
    return (
      <button
        key={number}
        className={currentPage == number ? "active" : "pagination-btn"}
        onClick={() => paginate(number)}
      >
        {number}
      </button>
    );
  });
  return <div className="pagination-container">{renderCard}</div>;
}
export default memo(Pagination);
