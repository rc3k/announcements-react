import _ from 'lodash';

import {
  getMasterCoursesFromIds,
  getScheduledCoursesFromIds,
  getScheduledCourseGroupsFromIds,
  postAnnouncement,
  putAnnouncement,
  getAnnouncements,
  getAnnouncement,
  deleteAnnouncement,
} from './WebAPI';

import Trans from './Trans';

export const setState = (state) => ({
  type: 'SET_STATE',
  state,
});

export const addAnnouncement = () => ({
  type: 'ADD_ANNOUNCEMENT',
});

export const setSubject = (subject) => ({
  type: 'SET_SUBJECT',
  subject,
});

export const setBody = (body) => ({
  type: 'SET_BODY',
  body,
});

export const setAudience = (audience) => ({
  type: 'SET_AUDIENCE',
  audience,
});

const setProgramme = (programmeId) => ({
  type: 'SET_PROGRAMME',
  programmeId,
});

const setMasterCourse = (masterCourseId) => ({
  type: 'SET_MASTER_COURSE',
  masterCourseId,
});

const setScheduledCourse = (scheduledCourseId) => ({
  type: 'SET_SCHEDULED_COURSE',
  scheduledCourseId,
});

export const setScheduledCourseGroup = (scheduledCourseGroupId) => ({
  type: 'SET_SCHEDULED_COURSE_GROUP',
  scheduledCourseGroupId,
});

export const setIsUrgent = (isUrgent) => ({
  type: 'SET_IS_URGENT',
  isUrgent,
});

export const setVisibleFrom = (dateTime) => ({
  type: 'SET_VISIBLE_FROM',
  dateTime,
});

export const setVisibleTo = (dateTime) => ({
  type: 'SET_VISIBLE_TO',
  dateTime,
});

export const setSortOrder = (column, order) => ({
  type: 'SET_SORT_ORDER',
  column,
  order,
});

export const setPage = (page) => ({
  type: 'SET_PAGE',
  page,
});

export const setQuery = (query) => ({
  type: 'SET_QUERY',
  query,
});

const receiveMasterCourses = (masterCourses) => ({
  type: 'RECEIVE_MASTER_COURSES',
  masterCourses,
});

const receiveScheduledCourses = (scheduledCourses) => ({
  type: 'RECEIVE_SCHEDULED_COURSES',
  scheduledCourses,
});

const receiveScheduledCourseGroups = (scheduledCourseGroups) => ({
  type: 'RECEIVE_SCHEDULED_COURSE_GROUPS',
  scheduledCourseGroups,
});

export const receiveAnnouncementsList = (announcementsList) => ({
  type: 'RECEIVE_ANNOUNCEMENTS',
  announcementsList,
});

export const receiveAnnouncement = (announcement) => ({
  type: 'RECEIVE_ANNOUNCEMENT',
  announcement,
});

export const receiveModified = (modified) => ({
  type: 'RECEIVE_MODIFIED',
  modified,
});

export const openAnnouncementMessage = (message) => ({
  type: 'OPEN_ANNOUNCEMENT_MESSAGE',
  message,
});

export const closeAnnouncementMessage = () => ({
  type: 'CLOSE_ANNOUNCEMENT_MESSAGE',
});

const openAnnouncementsListMessage = (message) => ({
  type: 'OPEN_ANNOUNCEMENTS_LIST_MESSAGE',
  message,
});

export const closeAnnouncementsListMessage = () => ({
  type: 'CLOSE_ANNOUNCEMENTS_LIST_MESSAGE',
});

export const setAnnouncementCache = () => ({
  type: 'SET_ANNOUNCEMENT_CACHE',
});

export const setXhrInProgress = () => ({
  type: 'SET_XHR_IN_PROGRESS',
});

export const setXhrNotInProgress = () => ({
  type: 'SET_XHR_NOT_IN_PROGRESS',
});

export const openModal = (modalName) => ({
  type: 'OPEN_MODAL',
  modalName,
});

export const closeModal = (modalName) => ({
  type: 'CLOSE_MODAL',
  modalName,
});

const webAPICallbackWithActionCreator = (dispatch, actionCreator, openMessage) => (
  error, response,
) => {
  if (error) {
    dispatch(openMessage({
      title: Trans.didNotWork,
      alertType: 'warning',
      message: Trans.couldNotGetDataFromServer,
    }));
    dispatch(actionCreator({}));
  } else {
    dispatch(actionCreator(response.body));
  }
};

const webAPICallbackWithSuccessMessage = (dispatch, openMessage, cb, apiSettings) => (
  error, response,
) => {
  if (error) {
    let message = Trans.tryAgainLater;
    if (response) {
      if (response.badRequest && _.has(response, `body.${apiSettings.nonFieldErrorsKey}`)) {
        message = _.head(response.body[apiSettings.nonFieldErrorsKey]);
      } else if (_.has(response, 'statusText')) {
        message = response.statusText;
      }
    }
    dispatch(openMessage({
      title: Trans.didNotWork,
      alertType: 'danger',
      message,
    }));
  } else {
    cb(response.body);
  }
};

export const setProgrammeThunk = (programmeId) => (dispatch, getState) => {
  dispatch(setProgramme(programmeId));
  if (_.has(getState(), `programmes.${programmeId}`)) {
    const masterCourseIds = getState().programmes[programmeId].master_course_ids;
    getMasterCoursesFromIds(
      masterCourseIds,
      webAPICallbackWithActionCreator(dispatch, receiveMasterCourses, openAnnouncementMessage),
    );
  } else {
    dispatch(receiveMasterCourses({}));
  }
};

export const setMasterCourseThunk = (masterCourseId) => (dispatch, getState) => {
  dispatch(setMasterCourse(masterCourseId));
  if (_.has(getState(), `masterCourses.${masterCourseId}`)) {
    const scheduledCourseIds = getState().masterCourses[masterCourseId].scheduled_course_ids;
    getScheduledCoursesFromIds(
      scheduledCourseIds,
      webAPICallbackWithActionCreator(dispatch, receiveScheduledCourses, openAnnouncementMessage),
    );
  } else {
    dispatch(receiveScheduledCourses({}));
  }
};

export const setScheduledCourseThunk = (scheduledCourseId) => (dispatch, getState) => {
  dispatch(setScheduledCourse(scheduledCourseId));
  if (_.has(getState(), `scheduledCourses.${scheduledCourseId}`)) {
    const scheduledCourses = getState().scheduledCourses[scheduledCourseId];
    const scheduledCourseGroupIds = scheduledCourses.scheduled_course_group_ids;
    getScheduledCourseGroupsFromIds(
      scheduledCourseGroupIds,
      webAPICallbackWithActionCreator(
        dispatch, receiveScheduledCourseGroups, openAnnouncementMessage,
      ),
    );
  } else {
    dispatch(receiveScheduledCourseGroups({}));
  }
};

export const postAnnouncementThunk = (push) => (dispatch, getState) => {
  if (getState().xhrInProgress) {
    return;
  }
  dispatch(setXhrInProgress());
  postAnnouncement(
    getState().announcement,
    webAPICallbackWithSuccessMessage(
      dispatch,
      openAnnouncementMessage,
      (body) => {
        dispatch(setXhrNotInProgress());
        dispatch(openAnnouncementsListMessage({
          title: 'Aces!',
          alertType: 'success',
          message: `Your announcement (id ${body.id}) was created successfully.`,
        }));
        push('/');
      },
      getState().apiSettings,
    ),
  );
};

export const putAnnouncementThunk = () => (dispatch, getState) => {
  if (getState().xhrInProgress) {
    return;
  }
  dispatch(setXhrInProgress());
  const { announcement } = getState();
  putAnnouncement(
    announcement,
    webAPICallbackWithSuccessMessage(
      dispatch,
      openAnnouncementMessage,
      (body) => {
        dispatch(setXhrNotInProgress());
        dispatch(openAnnouncementMessage({
          title: 'Aces!',
          alertType: 'success',
          message: `Your announcement (id ${announcement.id}) was updated successfully.`,
        }));
        dispatch(setAnnouncementCache());
        dispatch(receiveModified(body));
      },
      getState().apiSettings,
    ),
  );
};

export const deleteAnnouncementThunk = (push) => (dispatch, getState) => {
  const { announcement } = getState();
  deleteAnnouncement(
    announcement.id,
    webAPICallbackWithSuccessMessage(
      dispatch,
      openAnnouncementMessage,
      () => {
        dispatch(
          openAnnouncementsListMessage({
            title: 'Aces!',
            alertType: 'success',
            message: `Your announcement (id ${announcement.id}) was deleted successfully.`,
          }),
        );
        push('/');
      },
      getState().apiSettings,
    ),
  );
};

export const getAnnouncementsThunk = () => (dispatch, getState) => {
  getAnnouncements(
    getState().announcementsQuery,
    webAPICallbackWithActionCreator(
      dispatch, receiveAnnouncementsList, openAnnouncementsListMessage,
    ),
  );
};

export const getAnnouncementThunk = (id) => (dispatch) => {
  getAnnouncement(
    id,
    webAPICallbackWithActionCreator(dispatch, receiveAnnouncement, openAnnouncementsListMessage),
  );
};

export const setSortOrderThunk = (column, order) => (dispatch) => {
  dispatch(setSortOrder(column, order));
  dispatch(setPage(1));
  dispatch(getAnnouncementsThunk());
};

export const setPageThunk = (page, perPage) => (dispatch) => {
  dispatch(setPage(page, perPage));
  dispatch(getAnnouncementsThunk());
};

export const resetPageThunk = () => (dispatch) => {
  dispatch(setPage(1));
  dispatch(getAnnouncementsThunk());
};

export const resetQueryThunk = () => (dispatch, getState) => {
  if (getState().announcementsQuery.q === '') {
    return;
  }
  dispatch(setQuery(''));
  dispatch(setPage(1));
  dispatch(getAnnouncementsThunk());
};
