import React from 'react';
import moment from 'moment';

import DateTimePicker from 'react-datetime-picker';

/**
 * React component for a date/time
 * @param {string} id
 * @param {string} label
 * @param {boolean} disabled
 * @param {object} dateTime
 * @param {function} setDateTime
 * @returns {XML}
 */
export default ({
  id, label, disabled, dateTime, setDateTime,
}) => (
  <div className="form-group">
    <label htmlFor={id}>{label}</label>
    <DateTimePicker
      id={id}
      disabled={disabled}
      value={dateTime ? dateTime.toDate() : null}
      onChange={(value) => setDateTime(moment(value))}
    />
  </div>
)
