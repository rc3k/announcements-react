import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';

import Trans from '../../Trans';

/**
 * Object of master courses to a list of HTML options
 * @param {object} masterCourses
 * @returns {XML[]}
 */
const masterCoursesToOptions = (masterCourses) => (
  _.map(masterCourses, (obj, key) => (
    <option key={key} value={key}>{obj.display_name}</option>
  ))
);

/**
 * React component for master courses
 * @param {object} masterCourses
 * @param {boolean} invisible
 * @param {number} masterCourse
 * @param {function} setMasterCourseThunk
 * @param {boolean} disabled
 * @returns {XML}
 */
export default ({
  masterCourses, invisible, masterCourse, setMasterCourseThunk, disabled,
}) => {
  const cn = classNames({
    invisible,
    'form-group': true,
  });
  return (
    <div className={cn}>
      <label htmlFor="id_mastercourse">{Trans.masterCourse}</label>
      <select
        id="id_mastercourse"
        className="master-course form-control"
        value={masterCourse}
        onChange={(event) => setMasterCourseThunk(parseInt(event.target.value, 10))}
        disabled={disabled}
      >
        <option key="-1" value="-1">{Trans.chooseMasterCourse}</option>
        <option key="0" value="0">{Trans.allMasterCourses}</option>
        {masterCoursesToOptions(masterCourses)}
      </select>
    </div>
  );
};
