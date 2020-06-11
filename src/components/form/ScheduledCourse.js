import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';

import Trans from '../../Trans';

/**
 * Object of scheduled courses to a list of HTML options
 * @param {object} scheduledCourses
 * @returns {XML[]}
 */
const scheduledCoursesToOptions = (scheduledCourses) => (
  _.map(scheduledCourses, (obj, key) => (
    <option key={key} value={key}>{obj.display_name}</option>
  ))
);

/**
 * React component for scheduled courses
 * @param {object} scheduledCourses
 * @param {boolean} invisible
 * @param {number} scheduledCourse
 * @param {function} setScheduledCourseThunk
 * @param {boolean} disabled
 * @returns {XML}
 */
export default ({
  scheduledCourses, invisible, scheduledCourse, setScheduledCourseThunk, disabled,
}) => {
  const cn = classNames({
    invisible,
    'form-group': true,
  });
  return (
    <div className={cn}>
      <label htmlFor="id_scheduledcourse">{Trans.scheduledCourse}</label>
      <select
        id="id_scheduledcourse"
        className="scheduled-course form-control"
        value={scheduledCourse}
        onChange={(event) => setScheduledCourseThunk(parseInt(event.target.value, 10))}
        disabled={disabled}
      >
        <option key="-1" value="-1">{Trans.chooseScheduledCourse}</option>
        {scheduledCoursesToOptions(scheduledCourses)}
      </select>
    </div>
  );
};
