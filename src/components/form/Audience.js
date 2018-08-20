import React from 'react';
import _ from 'lodash';

import Trans from '../../Trans';

/**
 * Object of audiences to a list of HTML options
 * @param {object} audiences
 * @returns {XML[]}
 */
const audiencesToOptions = (audiences) => (
  _.map(['all', 'students', 'tutors', 'students_and_tutors'], (key) => (
    <option key={key} disabled={key === 'all'} value={key}>{audiences[key]}</option>
  ))
);

/**
 * React component for an audience (e.g. all, students, tutors, students and tutors)
 * @param {object} audiences
 * @param {string} audience
 * @param {function} setAudience
 * @param {boolean} disabled
 * @returns {XML}
 */
export default ({
  audiences, audience, setAudience, disabled,
}) => (
  <div className="form-group">
    <label htmlFor="id_audience">{Trans.recipient}</label>
    <select
      id="id_audience"
      className="audience form-control"
      value={audience}
      onChange={(event) => setAudience(event.target.value)}
      disabled={disabled}
    >
      <option key="" value="">{Trans.chooseRecipient}</option>
      {audiencesToOptions(audiences)}
    </select>
  </div>
);
