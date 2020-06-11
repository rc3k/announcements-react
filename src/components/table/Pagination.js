import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';

/**
 * a separator to display between non-sequential page items
 * @returns {XML}
 */
const getSeparatorToRender = () => <li className="disabled"><span>...</span></li>;

/**
 * the number of pages, either side of the current page, for which list items will be rendered
 * @type {number}
 */
const PAGE_RANGE = 2;

export default class Pagination extends React.Component {
  /**
   * @param {number} pageNum
   */
  onPageChange(pageNum) {
    const { page, pageCount, onPageChange } = this.props;
    if (pageNum !== page && pageNum >= 1 && pageNum <= pageCount) {
      onPageChange(pageNum);
    }
  }

  /**
   * gets the page numbers for which list items should be rendered
   * this excludes the first and last pages
   * @returns {number[]}
   */
  getPageNumbers() {
    const { page, pageCount } = this.props;
    return _.filter(
      _.range(2, pageCount),
      (pageNum) => Math.abs(pageNum - page) <= PAGE_RANGE,
    );
  }

  /**
   * a list item for a specific page number
   * @param {number} pageNum
   * @returns {XML}
   */
  getPageListItemToRender(pageNum) {
    const { page } = this.props;
    return (
      <li
        id={`list-item-page-${pageNum}`}
        key={page}
        onClick={_.bind(this.onPageChange, this, pageNum)}
        className={`list-item-page${page === pageNum ? ' active' : ''}`}
      >
        <span>{page}</span>
      </li>
    );
  }

  /**
   * @returns {XML}
   */
  getPreviousPageListItemToRender() {
    const { page, previousLabel } = this.props;
    return (
      <li
        onClick={_.bind(this.onPageChange, this, page - 1)}
        className={`list-item-previous${page === 1 ? ' disabled' : ''}`}
        aria-label={previousLabel}
      >
        <span className="material-icons" aria-hidden="true">&#xE408;</span>
      </li>
    );
  }

  /**
   * @returns {XML}
   */
  getNextPageListItemToRender() {
    const { page, pageCount, nextLabel } = this.props;
    return (
      <li
        onClick={_.bind(this.onPageChange, this, page + 1)}
        className={`list-item-next${page === pageCount ? ' disabled' : ''}`}
        aria-label={nextLabel}
      >
        <span className="material-icons" aria-hidden="true">&#xE409;</span>
      </li>
    );
  }

  /**
   * render
   * @returns {XML}
   */
  render() {
    const { pageCount } = this.props;
    const pages = this.getPageNumbers();
    const cn = classNames({
      hide: pageCount <= 1,
    });
    return (
      <nav className={cn}>
        <ul className="pagination">
          {this.getPreviousPageListItemToRender()}
          {this.getPageListItemToRender(1)}
          {(_.head(pages) > 2) ? getSeparatorToRender() : ''}
          {_.map(pages, _.bind(this.getPageListItemToRender, this))}
          {(_.last(pages) < pageCount - 1) ? getSeparatorToRender() : ''}
          {(pageCount > 1) ? this.getPageListItemToRender(pageCount) : ''}
          {this.getNextPageListItemToRender()}
        </ul>
      </nav>
    );
  }
}

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  pageCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  previousLabel: PropTypes.string.isRequired,
  nextLabel: PropTypes.string.isRequired,
};
