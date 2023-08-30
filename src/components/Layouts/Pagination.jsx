import React from 'react';

import leftArrowMark from 'img/left_arrow_pagination.svg';
import rightArrowMark from 'img/right_arrow_pagination.svg';
import styles from './Pagination.module.scss';

function Pagination({ nPages, currentPage, setCurrentPage }) {
  const { pagination, pagination__page_link, active_page_link } = styles;

  const pageNumbers = [...Array(nPages + 1).keys()].slice(1);

  const nextPage = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  return (
    <nav>
      <ul className={pagination}>
        {pageNumbers.length > 1 && (
          <li>
            <a className={pagination__page_link} onClick={prevPage} href="#">
              <img src={leftArrowMark} alt="left mark" height="20" width="20" />
            </a>
          </li>
        )}
        {pageNumbers.map((pgNumber) => (
          <li key={pgNumber}>
            <a
              onClick={() => setCurrentPage(pgNumber)}
              className={`${pagination__page_link} ${currentPage === pgNumber && active_page_link}`}
              href="#">
              {pgNumber}
            </a>
          </li>
        ))}
        {pageNumbers.length > 1 && (
          <li>
            <a className={pagination__page_link} onClick={nextPage} href="#">
              <img src={rightArrowMark} alt="right mark" height="20" width="20" />
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Pagination;
