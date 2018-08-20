import React from 'react';
import Trans from '../../Trans';

/**
 * React component for an announcement's subject
 * @param {string} subject
 * @param {number} maxLength
 * @param {function} setSubject
 * @param {boolean} disabled
 * @returns {XML}
 */
export default ({
  subject, maxLength, setSubject, disabled,
}) => (
  <div className="form-group">
    <input
      className="subject form-control"
      value={subject}
      onChange={(event) => setSubject(event.target.value)}
      type="text"
      maxLength={maxLength}
      placeholder={`${Trans.enterSubject} ${Trans.characters(maxLength)}`}
      disabled={disabled}
    />
  </div>
);
