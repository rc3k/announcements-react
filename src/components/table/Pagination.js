import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';

/**
 * the number of pages, either side of the current page, for which list items will be rendered
 * @type {number}
 */
const PAGE_RANGE = 2;

export default class Pagination extends React.Component {
  /**
   * @param {number} page
   */
  onPageChange(page) {
    if (page !== this.props.page && page >= 1 && page <= this.props.pageCount) {
      this.props.onPageChange(page);
    }
  }

  /**
   * gets the page numbers for which list items should be rendered
   * this excludes the first and last pages
   * @returns {number[]}
   */
  getPageNumbers() {
    return _.filter(_.range(2, this.props.pageCount), (page) => Math.abs(page - this.props.page) <= PAGE_RANGE);
  }

  /**
   * a separator to display between non-sequential page items
   * @returns {XML}
   */
  getSeparatorToRender() {
    return <li className="disabled"><span>...</span></li>;
  }

  /**
   * a list item for a specific page number
   * @param {number} page
   * @returns {XML}
   */
  getPageListItemToRender(page) {
    return (
      <li
        id={`list-item-page-${page}`}
        key={page}
        onClick={_.bind(this.onPageChange, this, page)}
        className={`list-item-page${this.props.page === page ? ' active' : ''}`}
      >
        <span>{page}</span>
      </li>
    );
  }

  /**
   * @returns {XML}
   */
  getPreviousPageListItemToRender() {
    return (
      <li
        onClick={_.bind(this.onPageChange, this, this.props.page - 1)}
        className={`list-item-previous${this.props.page === 1 ? ' disabled' : ''}`}
        aria-label={this.props.previousLabel}
      >
        <span className="material-icons" aria-hidden="true">&#xE408;</span>
      </li>
    );
  }

  /**
   * @returns {XML}
   */
  getNextPageListItemToRender() {
    return (
      <li
        onClick={_.bind(this.onPageChange, this, this.props.page + 1)}
        className={`list-item-next${this.props.page === this.props.pageCount ? ' disabled' : ''}`}
        aria-label={this.props.nextLabel}
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
    const pages = this.getPageNumbers();
    const cn = classNames({
      hide: this.props.pageCount <= 1,
    });
    return (
      <nav className={cn}>
        <ul className="pagination">
          {this.getPreviousPageListItemToRender()}
          {this.getPageListItemToRender(1)}
          {(_.head(pages) > 2) ? this.getSeparatorToRender() : ''}
          {_.map(pages, _.bind(this.getPageListItemToRender, this))}
          {(_.last(pages) < this.props.pageCount - 1) ? this.getSeparatorToRender() : ''}
          {(this.props.pageCount > 1) ? this.getPageListItemToRender(this.props.pageCount) : ''}
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
