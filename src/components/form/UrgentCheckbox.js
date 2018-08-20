import React from 'react';
import Trans from '../../Trans';

/**
 * React component wrapping a checkbox to specify whether an announcement is urgent
 * @param {boolean} isUrgent
 * @param {function} setIsUrgent
 * @param {boolean} disabled
 * @returns {XML}
 */
export default ({ isUrgent, setIsUrgent, disabled }) => (
  <div className="form-group">
    <div className="checkbox">
      <label>
        <input
          type="checkbox"
          checked={isUrgent}
          onChange={() => setIsUrgent(!isUrgent)}
          disabled={disabled}
        />
        {' '}
        {Trans.isUrgentAnnouncement}
      </label>
    </div>
  </div>
);
