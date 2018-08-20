import React from 'react';
import { ucFirst } from '../../lib';

import Trans from '../../Trans';

/**
 * React component for a table heading
 * @param {string} column
 * @returns {XML}
 */
export default ({ column }) => (
  <th>
    {Trans[`column${ucFirst(column)}`]}
  </th>
);
