import React from 'react';
import classNames from 'classnames';
import _ from 'lodash';

import Pagination from './Pagination';
import Trans from '../../Trans';

/**
 * Get the total number of pages
 * @param {number} total
 * @param {number} perPage
 * @returns {number}
 */
const getPageCount = (total, perPage) => (total === 0 ? 1 : Math.ceil(total / perPage));

/**
 * Start item
 * @param int page
 * @param int perPage
 * @returns {number}
 */
const getStartItem = (page, perPage) => (page - 1) * perPage + 1;

/**
 * End item
 * @param int total
 * @param int perPage
 * @param int page
 */
const getEndItem = (total, perPage, page) => _.min([page * perPage, total]);

/**
 * React component wrapping pagination
 * @param {number} page
 * @param {number} total
 * @param {number} perPage
 * @param {function} onPageChange
 * @returns {XML}
 */
export default ({
  page, total, perPage, onPageChange,
}) => {
  const cn = classNames({
    hide: total <= 1,
    'announcements-pagination': true,
  });

  return (
    <div className={cn}>
      <p className="pagination-text">
        {`Showing ${getStartItem(page, perPage)}-${getEndItem(page, perPage)}s of %(total)s items`}
      </p>
      <Pagination
        page={page}
        pageCount={getPageCount(total, perPage)}
        onPageChange={onPageChange}
        previousLabel={Trans.paginationPreviousPage}
        nextLabel={Trans.paginationNextPage}
      />
    </div>
  );
};
