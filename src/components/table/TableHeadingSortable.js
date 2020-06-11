import React from 'react';
import classNames from 'classnames';

import { toPascalCase } from '../../lib';

import Trans from '../../Trans';

/**
 * React component for a sortable table heading
 * @param {string} column
 * @param {string} order
 * @param {function} setSortOrder
 * @returns {XML}
 */
export default ({ column, order, setSortOrder }) => {
  const cn = classNames(
    'column-sort-icons',
    {
      [`sort-${order}`]: order !== '',
    },
  );
  const orderOnClick = order === 'asc' ? 'desc' : 'asc';
  return (
    <th onClick={() => setSortOrder(column, orderOnClick)} key={column}>
      {Trans[`column${toPascalCase(column)}`]}
      <div className={cn}>
        <i className="glyphicon glyphicon-triangle-top" />
        <i className="glyphicon glyphicon-triangle-bottom" />
      </div>
    </th>
  );
};
