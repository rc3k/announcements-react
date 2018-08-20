import _ from 'lodash';
import moment from 'moment';

/**
 * does a deep clone of the given state, explicitly cloning any moment objects
 * @param {object} state
 * @returns {object}
 */
export const cloneDeep = (state) => {
  const newState = _.cloneDeep(state);
  _.forEach(['visibleFrom', 'visibleTo', 'modified', 'created'], (d) => {
    if (_.has(state, `announcement.${d}`) && _.isObject(state.announcement[d])) {
      newState.announcement[d] = state.announcement[d].clone();
    }
  });
  return newState;
};

/**
 * adds a (clean) announcement
 * @param {object} state
 * @returns {object}
 */
const addAnnouncement = (state) => {
  const newState = cloneDeep(state);
  newState.announcement = {
    subject: '',
    body: '',
    audience: '',
    programme: -1,
    masterCourse: -1,
    scheduledCourse: -1,
    scheduledCourseGroup: -1,
    isUrgent: false,
    visibleFrom: moment().startOf('minute'),
    visibleTo: moment().startOf('minute').add(1, 'weeks'),
  };
  newState.masterCourses = {};
  newState.scheduledCourses = {};
  newState.scheduledCourseGroups = {};
  return newState;
};

/**
 * receive an individual announcement
 * @param {object }state
 * @param {object} announcement
 * @returns {object}
 */
const receiveAnnouncement = (state, announcement) => {
  const newState = cloneDeep(state);
  const a = {
    id: announcement.id,
    displayID: announcement.display_id,
    subject: announcement.subject,
    body: announcement.body,
    audience: announcement.audience,
    isUrgent: announcement.is_urgent,
    programme: 0,
    scheduledCourse: 0,
    scheduledCourseGroup: 0,
    masterCourse: 0,
    visibleFrom: moment(announcement.visible_from),
    visibleTo: moment(announcement.visible_to),
    modified: moment(announcement.modified),
    created: moment(announcement.created),
  };
  if (!_.isNull(announcement.programme)) {
    a.programme = announcement.programme;
  }
  if (!_.isNull(announcement.scheduled_course)) {
    a.scheduledCourse = announcement.scheduled_course;
  }
  if (!_.isNull(announcement.group)) {
    a.scheduledCourseGroup = announcement.group;
  }
  if (!_.isNull(announcement.master_course)) {
    a.masterCourse = announcement.master_course;
  }
  newState.announcement = a;
  newState.announcementCache = _.cloneDeep(newState.announcement);
  newState.masterCourses = announcement.options.master_courses;
  newState.scheduledCourses = announcement.options.scheduled_courses;
  newState.scheduledCourseGroups = announcement.options.scheduled_course_groups;
  return newState;
};

/**
 * receives a modified date-time
 * @param {object} state
 * @param {object} modified
 * @returns {object}
 */
const receiveModified = (state, modified) => {
  const newState = cloneDeep(state);
  newState.announcement.modified = moment(modified);
  return newState;
};

/**
 * sets the announcement cache
 * @param {object} state
 * @returns {object}
 */
const setAnnouncementCache = (state) => {
  const newState = cloneDeep(state);
  newState.announcementCache = _.cloneDeep(state.announcement);
  return newState;
};

/**
 * sets an announcement attribute
 * @param {object} state
 * @param {string} attribute
 * @param {*} value
 * @returns {object}
 */
const setAnnouncementAttribute = (state, attribute, value) => {
  const newState = cloneDeep(state);
  newState.announcement[attribute] = value;
  return newState;
};

/**
 * sets whether the announcement is urgent
 * @param {object} state
 * @param {boolean} isUrgent
 * @returns {object}
 */
const setIsUrgent = (state, isUrgent) => {
  const newState = cloneDeep(state);
  newState.announcement.isUrgent = isUrgent;
  if (isUrgent) {
    newState.announcement.visibleFrom = moment().startOf('minute');
  }
  return newState;
};

/**
 * sets announcement audience (and clears other dependent attributes)
 * @param {object} state
 * @param {string} audience
 * @returns {object}
 */
const setAudience = (state, audience) => {
  const newState = cloneDeep(state);
  newState.announcement.audience = audience;
  newState.announcement.programme = -1;
  newState.announcement.masterCourse = -1;
  newState.announcement.scheduledCourse = -1;
  newState.announcement.scheduledCourseGroup = -1;
  newState.masterCourses = {};
  newState.scheduledCourses = {};
  newState.scheduledCourseGroups = {};
  return newState;
};

/**
 * sets announcement programme (and clears other dependent attributes)
 * @param {object} state
 * @param {number} programmeId
 * @returns {object}
 */
const setProgramme = (state, programmeId) => {
  const newState = cloneDeep(state);
  newState.announcement.programme = programmeId;
  newState.announcement.masterCourse = -1;
  newState.announcement.scheduledCourse = -1;
  newState.announcement.scheduledCourseGroup = -1;
  newState.masterCourses = {};
  newState.scheduledCourses = {};
  newState.scheduledCourseGroups = {};
  return newState;
};

/**
 * sets master course (and clears other dependent attributes)
 * @param {object} state
 * @param {number} masterCourseId
 * @returns {object}
 */
const setMasterCourse = (state, masterCourseId) => {
  const newState = cloneDeep(state);
  newState.announcement.masterCourse = masterCourseId;
  newState.announcement.scheduledCourse = -1;
  newState.announcement.scheduledCourseGroup = -1;
  newState.scheduledCourses = {};
  newState.scheduledCourseGroups = {};
  return newState;
};

/**
 * sets scheduled course (and clears other dependent attributes)
 * @param {object} state
 * @param {number} scheduledCourseId
 * @returns {object}
 */
const setScheduledCourse = (state, scheduledCourseId) => {
  const newState = cloneDeep(state);
  newState.announcement.scheduledCourse = scheduledCourseId;
  newState.announcement.scheduledCourseGroup = -1;
  newState.scheduledCourseGroups = {};
  return newState;
};

/**
 * receives master courses
 * @param {object} state
 * @param {object} masterCourses
 * @returns {object}
 */
const receiveMasterCourses = (state, masterCourses) => {
  const newState = cloneDeep(state);
  newState.masterCourses = masterCourses;
  return newState;
};

/**
 * receives scheduled courses
 * @param {object} state
 * @param {object} scheduledCourses
 * @returns {object}
 */
const receiveScheduledCourses = (state, scheduledCourses) => {
  const newState = cloneDeep(state);
  newState.scheduledCourses = scheduledCourses;
  return newState;
};

/**
 * receives scheduled course groups
 * @param {object} state
 * @param {object} scheduledCourseGroups
 * @returns {object}
 */
const receiveScheduledCourseGroups = (state, scheduledCourseGroups) => {
  const newState = cloneDeep(state);
  newState.scheduledCourseGroups = scheduledCourseGroups;
  return newState;
};

/**
 * opens the announcement message (dismissible alert)
 * @param {object} state
 * @param {object} message
 * @returns {object}
 */
const openAnnouncementMessage = (state, message) => {
  const newState = cloneDeep(state);
  newState.announcement.message = message;
  return newState;
};

/**
 * closes the announcement message (dismissible alert)
 * @param {object} state
 * @returns {object}
 */
const closeAnnouncementMessage = (state) => {
  const newState = cloneDeep(state);
  if (_.has(newState, 'announcement.message')) {
    delete newState.announcement.message;
  }
  return newState;
};

/**
 * @param {object} state
 * @param {string} modalName
 * @returns {object}
 */
const openModal = (state, modalName) => {
  const newState = cloneDeep(state);
  newState.modals[modalName] = true;
  return newState;
}

/**
 * @param {object} state
 * @param {string} modalName
 * @returns {object}
 */
const closeModal = (state, modalName) => {
  const newState = cloneDeep(state);
  newState.modals[modalName] = false;
  return newState;
}

/**
 * the reducer
 * @param {object} state
 * @param {object} action
 * @returns {object}
 */
export default (state = {}, action = {}) => {
  switch (action.type) {
    case 'ADD_ANNOUNCEMENT':
      return addAnnouncement(state);
    case 'RECEIVE_ANNOUNCEMENT':
      return receiveAnnouncement(state, action.announcement);
    case 'RECEIVE_MODIFIED':
      return receiveModified(state, action.modified);
    case 'SET_ANNOUNCEMENT_CACHE':
      return setAnnouncementCache(state);
    case 'SET_SUBJECT':
      return setAnnouncementAttribute(state, 'subject', action.subject);
    case 'SET_BODY':
      return setAnnouncementAttribute(state, 'body', action.body);
    case 'SET_AUDIENCE':
      return setAudience(state, action.audience);
    case 'SET_PROGRAMME':
      return setProgramme(state, action.programmeId);
    case 'RECEIVE_MASTER_COURSES':
      return receiveMasterCourses(state, action.masterCourses);
    case 'SET_MASTER_COURSE':
      return setMasterCourse(state, action.masterCourseId);
    case 'RECEIVE_SCHEDULED_COURSES':
      return receiveScheduledCourses(state, action.scheduledCourses);
    case 'SET_SCHEDULED_COURSE':
      return setScheduledCourse(state, action.scheduledCourseId);
    case 'RECEIVE_SCHEDULED_COURSE_GROUPS':
      return receiveScheduledCourseGroups(state, action.scheduledCourseGroups);
    case 'SET_SCHEDULED_COURSE_GROUP':
      return setAnnouncementAttribute(state, 'scheduledCourseGroup', action.scheduledCourseGroupId);
    case 'SET_IS_URGENT':
      return setIsUrgent(state, action.isUrgent);
    case 'SET_VISIBLE_FROM':
      return setAnnouncementAttribute(state, 'visibleFrom', action.dateTime);
    case 'SET_VISIBLE_TO':
      return setAnnouncementAttribute(state, 'visibleTo', action.dateTime);
    case 'OPEN_ANNOUNCEMENT_MESSAGE':
      return openAnnouncementMessage(state, action.message);
    case 'CLOSE_ANNOUNCEMENT_MESSAGE':
      return closeAnnouncementMessage(state);
    case 'OPEN_MODAL':
      return openModal(state, action.modalName);
    case 'CLOSE_MODAL':
      return closeModal(state, action.modalName);
    default:
      return state;
  }
};
