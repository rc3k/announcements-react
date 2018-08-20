import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

import Subject from './form/Subject';
import Body from './form/Body';
import Audience from './form/Audience';
import Programme from './form/Programme';
import MasterCourse from './form/MasterCourse';
import ScheduledCourse from './form/ScheduledCourse';
import ScheduledCourseGroup from './form/ScheduledCourseGroup';
import UrgentCheckbox from './form/UrgentCheckbox';
import DateTime from './form/DateTime';
import Trans from '../Trans';
import * as actionCreators from '../actionCreators';

/**
 * React component for an announcement form
 * @param {object} audiences
 * @param {object} programmes
 * @param {object} masterCourses
 * @param {object} scheduledCourses
 * @param {object} scheduledCourseGroups
 * @param {object} announcement
 * @param {function} setSubject
 * @param {function} setSubject
 * @param {function} setBody
 * @param {function} setAudience
 * @param {function} setProgrammeThunk
 * @param {function} setMasterCourseThunk
 * @param {function} setScheduledCourseThunk
 * @param {function} setScheduledCourseGroup
 * @param {function} setIsUrgent
 * @param {function} setVisibleFrom
 * @param {function} setVisibleTo
 * @param {boolean} disabled
 * @returns {XML}
 */
export const AnnouncementForm = ({
  audiences,
  programmes,
  masterCourses,
  scheduledCourses,
  scheduledCourseGroups,
  announcement,
  setSubject,
  setBody,
  setAudience,
  setProgrammeThunk,
  setMasterCourseThunk,
  setScheduledCourseThunk,
  setScheduledCourseGroup,
  setIsUrgent,
  setVisibleFrom,
  setVisibleTo,
  disabled,
}) => (
  <div>

    {/* begin subject and body */}
    <div className="row">
      <div className="col-md-12">
        <Subject
          maxLength="70"
          subject={announcement.subject}
          setSubject={setSubject}
          disabled={disabled}
        />
      </div>
    </div>
    <div className="row">
      <div className="col-md-12">
        <Body
          body={announcement.body}
          setBody={setBody}
          disabled={disabled}
        />
      </div>
    </div>
    {/* end subject and body */}

    {/* begin audience and 'is urgent' */}
    <div className="row">
      <div className="col-md-4">
        <Audience
          audiences={audiences}
          audience={announcement.audience}
          setAudience={setAudience}
          disabled={disabled}
        />
      </div>
      <div className="col-md-8">
        <UrgentCheckbox
          isUrgent={announcement.isUrgent}
          setIsUrgent={setIsUrgent}
          disabled={disabled}
        />
      </div>
    </div>
    {/* end audience and 'is urgent' */}

    {/* begin programme and 'visible from' */}
    <div className="row">
      <div className="col-md-4">
        <Programme
          programmes={programmes}
          invisible={announcement.audience === '' || announcement.audience === 'all'}
          programme={announcement.programme}
          setProgrammeThunk={setProgrammeThunk}
          disabled={disabled}
        />
      </div>
      <div className="col-md-4">
        <DateTime
          id="id_visiblefrom"
          label={Trans.visibleFrom}
          disabled={announcement.isUrgent || disabled}
          dateTime={announcement.visibleFrom}
          setDateTime={setVisibleFrom}
        />
      </div>
      <div className="col-md-4" />
    </div>
    {/* end programme and 'visible from' */}

    {/* begin master course and 'visible to' */}
    <div className="row">
      <div className="col-md-4">
        <MasterCourse
          masterCourses={masterCourses}
          invisible={announcement.programme < 1}
          masterCourse={announcement.masterCourse}
          setMasterCourseThunk={setMasterCourseThunk}
          disabled={disabled}
        />
      </div>
      <div className="col-md-4">
        <DateTime
          id="id_visibleto"
          label={Trans.visibleTo}
          disabled={disabled}
          dateTime={announcement.visibleTo}
          setDateTime={setVisibleTo}
        />
      </div>
      <div className="col-md-4" />
    </div>
    {/* end master course and 'visible to' */}

    {/* begin scheduled course (skip this row if possible) */}
    {announcement.masterCourse < 1 ? null : (
      <div className="row">
        <div className="col-md-4">
          <ScheduledCourse
            scheduledCourses={scheduledCourses}
            invisible={announcement.masterCourse < 1}
            scheduledCourse={announcement.scheduledCourse}
            setScheduledCourseThunk={setScheduledCourseThunk}
            disabled={disabled}
          />
        </div>
        <div className="col-md-8" />
      </div>
    )}
    {/* end scheduled course */}

    {/* begin scheduled course group */}
    <div className="row">
      <div className="col-md-4">
        <ScheduledCourseGroup
          scheduledCourseGroups={scheduledCourseGroups}
          invisible={announcement.scheduledCourse < 1}
          scheduledCourseGroup={announcement.scheduledCourseGroup}
          setScheduledCourseGroup={setScheduledCourseGroup}
          disabled={disabled}
        />
      </div>
    </div>
    {/* end scheduled course group */}

  </div>
);

export const AnnouncementFormContainer = connect(({
  audiences,
  programmes,
  masterCourses,
  scheduledCourses,
  scheduledCourseGroups,
  announcement,
}) => ({
  audiences,
  programmes,
  masterCourses,
  scheduledCourses,
  scheduledCourseGroups,
  announcement,
}), _.pick(actionCreators, [
  'setSubject',
  'setBody',
  'setAudience',
  'setProgrammeThunk',
  'setMasterCourseThunk',
  'setScheduledCourseThunk',
  'setScheduledCourseGroup',
  'setIsUrgent',
  'setVisibleFrom',
  'setVisibleTo',
]))(AnnouncementForm);
