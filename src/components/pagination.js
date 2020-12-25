import React from 'react';

const Pagination = ({ aptsPerPage, totalApts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalApts/ aptsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav aria-label="Page navigation example">
    <ul className="pagination">
        <li className="page-item"><a className="page-link" href="prev">Previous</a></li>
        {pageNumbers.map(number => (
            <li key={number} className='page-item'>
                <a onClick={() => paginate(number)} href='#' className='page-link'>
                {number}
                </a>
            </li>
        ))}
        <li className="page-item"><a className="page-link" href="next">Next</a></li>
    </ul>
    </nav>
  );
};

export default Pagination;

