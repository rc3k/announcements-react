import _ from 'lodash';
import announcement from './announcement';
import announcementsList from './announcementsList';

/**
 * sets state
 * @param {object} state
 * @returns {object}
 */
const setState = (state) => {
  const newState = _.cloneDeep(state);
  newState.announcement = {
    subject: '',
    body: '',
    audience: '',
    programme: -1,
    masterCourse: -1,
    scheduledCourse: -1,
    scheduledCourseGroup: -1,
    isUrgent: false,
    visibleFrom: null,
    visibleTo: null,
    modified: null,
    created: null,
  };
  newState.masterCourses = {};
  newState.scheduledCourses = {};
  newState.scheduledCourseGroups = {};
  newState.announcementsList = {
    announcements: [],
    total: 0,
  };
  newState.announcementsQuery = {
    q: '',
    order: 'desc',
    column: 'announcement_id',
    page: 1,
    per_page: 20,
  };
  newState.xhrInProgress = false;
  newState.modals = {};
  return newState;
};

/**
 * sets whether an XHR is in progress
 * @param {object} state
 * @param {boolean} inProgress
 * @returns {object}
 */
const setXhrInProgress = (state, inProgress) => {
  const newState = _.cloneDeep(state);
  newState.xhrInProgress = inProgress;
  return newState;
};

/**
 * common reducer
 * @param {object} state
 * @param {object} action
 * @returns {object}
 */
const commonReducer = (state = {}, action = {}) => {
  switch (action.type) {
    case 'SET_STATE':
      return setState(action.state);
    case 'SET_XHR_IN_PROGRESS':
      return setXhrInProgress(state, true);
    case 'SET_XHR_NOT_IN_PROGRESS':
      return setXhrInProgress(state, false);
    default:
      return state;
  }
};

/**
 * Reduce the reducers into one function
 * @param reducers
 */
const reduceReducers = (...reducers) => (previous, current) => (
  _.reduce(
    reducers,
    (p, r) => r(p, current),
    previous,
  )
);

export default reduceReducers(announcementsList, announcement, commonReducer);
