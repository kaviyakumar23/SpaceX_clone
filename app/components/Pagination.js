import "./Pagination.css";
import { useEffect, useState } from "react";

const Pagination = ({ limit, data, setCurrentPageData }) => {
  const savedPageNumber = localStorage.getItem("pageNumber")
    ? Number(localStorage.getItem("pageNumber"))
    : 1;
  const [pageNumber, setPageNumber] = useState(savedPageNumber);

  const startIndex = (pageNumber - 1) * limit;
  const lastIndex = startIndex + limit;
  const totalPages = Math.ceil(data.length / limit);

  useEffect(() => {
    setCurrentPageData(data.slice(startIndex, lastIndex));
  }, [data, pageNumber, setCurrentPageData, startIndex, lastIndex]);

  useEffect(() => {
    localStorage.setItem("pageNumber", pageNumber);
  }, [pageNumber]);

  const handlePageClick = (page) => {
    if (page !== pageNumber) {
      setPageNumber(page);
    }
  };

  const handlePrevClick = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const handleNextClick = () => {
    if (pageNumber < totalPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  return (
    <>
      <div className="paginate">
        <span
          className={`pagination-button ${pageNumber === 1 ? "disabled" : ""}`}
          onClick={handlePrevClick}
        >
          Prev
        </span>
        {Array.from({ length: totalPages }, (_, index) => {
          const page = index + 1;
          return (
            <span
              key={page}
              className={`page-number ${page === pageNumber ? "active" : ""}`}
              onClick={() => handlePageClick(page)}
            >
              {page}
            </span>
          );
        })}
        <span
          className={`pagination-button ${
            pageNumber === totalPages ? "disabled" : ""
          }`}
          onClick={handleNextClick}
        >
          Next
        </span>
      </div>
    </>
  );
};

export default Pagination;
