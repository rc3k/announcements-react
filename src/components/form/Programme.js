import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';

import Trans from '../../Trans';

/**
 * Object of programmes to a list of HTML options
 * @param {object} programmes
 * @returns {XML[]}
 */
const programmesToOptions = (programmes) => (
  _.map(programmes, (obj, key) => (
    <option key={key} value={key}>{obj.display_name}</option>
  ))
);

/**
 * React component for a programme
 * @param {object} programmes
 * @param {boolean} invisible
 * @param {number} programme
 * @param {function} setProgrammeThunk
 * @param {boolean} disabled
 * @returns {XML}
 */
export default ({
  programmes, invisible, programme, setProgrammeThunk, disabled,
}) => {
  const cn = classNames({
    invisible,
    'form-group': true,
  });
  return (
    <div className={cn}>
      <label htmlFor="id_programme">{Trans.programme}</label>
      <select
        id="id_programme"
        className="programme form-control"
        value={programme}
        onChange={(event) => setProgrammeThunk(parseInt(event.target.value))}
        disabled={disabled}
      >
        <option key="-1" value="-1">{Trans.chooseProgramme}</option>
        <option key="0" value="0">{Trans.allProgrammes}</option>
        {programmesToOptions(programmes)}
      </select>
    </div>
  );
};
