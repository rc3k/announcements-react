import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';

import Trans from '../../Trans';

/**
 * Object of scheduled course groups to a list of HTML options
 * @param {object} scheduledCourseGroups
 * @returns {XML[]}
 */
const scheduledCourseGroupsToOptions = (scheduledCourseGroups) => (
  _.map(scheduledCourseGroups, (displayName, key) => (
    <option key={key} value={key}>{displayName}</option>
  ))
);

/**
 * React component for scheduled course groups
 * @param {object} scheduledCourseGroups
 * @param {boolean} invisible
 * @param {number} scheduledCourseGroup
 * @param {function} setScheduledCourseGroup
 * @param {boolean} disabled
 * @returns {XML}
 */
export default ({
  scheduledCourseGroups, invisible, scheduledCourseGroup, setScheduledCourseGroup, disabled,
}) => {
  const cn = classNames({
    invisible,
    'form-group': true,
  });
  return (
    <div className={cn}>
      <label htmlFor="id_group">{Trans.courseGroup}</label>
      <select
        id="id_group"
        className="scheduled-course-group form-control"
        value={scheduledCourseGroup}
        onChange={(event) => setScheduledCourseGroup(parseInt(event.target.value))}
        disabled={disabled}
      >
        <option key="-1" value="-1">{Trans.chooseScheduledCourseGroup}</option>
        <option key="0" value="0">{Trans.allGroups}</option>
        {scheduledCourseGroupsToOptions(scheduledCourseGroups)}
      </select>
    </div>
  );
};
