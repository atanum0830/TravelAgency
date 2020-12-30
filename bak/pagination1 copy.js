import React from 'react';

const Pagination = ({ itemsPerPage, totalItems, curPageNo, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems/ itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
          <li className="page-item"><a className="page-link" href="prev">Previous</a></li>
          {pageNumbers.forEach(pageNo => {
            if (pageNo === curPageNo) {
              <li key={pageNo} className="page-item active" aria-current="page">
                <a onClick={() => paginate(pageNo)} href="#" className="page-link">{pageNo}</a>
              </li>
            } else {
              <li key={pageNo} className="page-item">
                <a onClick={() => paginate(pageNo)} href="#" className="page-link">{pageNo}</a>
              </li>
            }
          })}
          <li className="page-item"><a className="page-link" href="next">Next</a></li>
      </ul>
    </nav>
  );
};

export default Pagination;

