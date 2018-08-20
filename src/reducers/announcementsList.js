import _ from 'lodash';

import { cloneDeep } from './announcement';

/**
 * receives a list of announcements
 * @param {object} state
 * @param {object} announcementsList
 * @returns {object}
 */
const receiveAnnouncementsList = (state, announcementsList) => {
  const newState = cloneDeep(state);
  if (_.has(announcementsList, 'announcements')) {
    newState.announcementsList.announcements = announcementsList.announcements;
  }
  if (_.has(announcementsList, 'total')) {
    newState.announcementsList.total = announcementsList.total;
  }
  return newState;
};

/**
 * set the sort order
 * @param {object} state
 * @param {string} column
 * @param {string} order
 * @returns {object}
 */
const setSortOrder = (state, column, order) => {
  const newState = cloneDeep(state);
  newState.announcementsQuery.column = column;
  newState.announcementsQuery.order = order;
  return newState;
};

/**
 * set the page
 * @param {object} state
 * @param {number} page
 * @returns {object}
 */
const setPage = (state, page) => {
  const newState = cloneDeep(state);
  newState.announcementsQuery.page = page;
  return newState;
};

/**
 * set the query string
 * @param {object} state
 * @param {string} query
 * @returns {object}
 */
const setQuery = (state, query) => {
  const newState = cloneDeep(state);
  newState.announcementsQuery.q = query;
  return newState;
};

/**
 * opens the announcement list message (dismissible alert)
 * @param {object} state
 * @param {object} message
 * @returns {object}
 */
const openAnnouncementsListMessage = (state, message) => {
  const newState = cloneDeep(state);
  newState.announcementsList.message = message;
  return newState;
};

/**
 * closes the announcement list message (dismissible alert)
 * @param {object} state
 * @returns {object}
 */
const closeAnnouncementsListMessage = (state) => {
  const newState = cloneDeep(state);
  if (_.has(newState, 'announcementsList.message')) {
    delete newState.announcementsList.message;
  }
  return newState;
};

/**
 * the reducer
 * @param {object} state
 * @param {object} action
 * @returns {object}
 */
export default (state = {}, action = {}) => {
  switch (action.type) {
    case 'RECEIVE_ANNOUNCEMENTS':
      return receiveAnnouncementsList(state, action.announcementsList);
    case 'SET_SORT_ORDER':
      return setSortOrder(state, action.column, action.order);
    case 'SET_PAGE':
      return setPage(state, action.page);
    case 'SET_QUERY':
      return setQuery(state, action.query);
    case 'OPEN_ANNOUNCEMENTS_LIST_MESSAGE':
      return openAnnouncementsListMessage(state, action.message);
    case 'CLOSE_ANNOUNCEMENTS_LIST_MESSAGE':
      return closeAnnouncementsListMessage(state);
    default:
      return state;
  }
};
