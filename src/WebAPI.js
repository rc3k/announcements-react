import _ from 'lodash';
import request from 'superagent';
import Cookies from 'cookies-js';

const apiUrl = (path) => `${process.env.REACT_APP_API_URL}/${path}`

/**
 * creates an announcement object for submission to the API
 * @param {object} announcement
 * @returns {object}
 */
const getAnnouncementForAPISubmission = (announcement) => {
  const a = {
    subject: announcement.subject,
    body: announcement.body,
    audience: announcement.audience,
    is_urgent: announcement.isUrgent,
  };
  if (announcement.programme > 0) {
    a.programme = announcement.programme;
  }
  if (announcement.scheduledCourse > 0) {
    a.scheduled_course = announcement.scheduledCourse;
  }
  if (announcement.scheduledCourseGroup > 0) {
    a.group = announcement.scheduledCourseGroup;
  }
  if (_.isObject(announcement.visibleFrom)) {
    a.visible_from = announcement.visibleFrom.toISOString();
  }
  if (_.isObject(announcement.visibleTo)) {
    a.visible_to = announcement.visibleTo.toISOString();
  }
  return a;
};

/**
 * gets master courses from ids
 * @param {number[]} masterCourses
 * @param {function} cb
 */
export function getMasterCoursesFromIds(masterCourses, cb) {
  request.post(apiUrl('master_courses'))
    .set('X-CSRFToken', Cookies.get('csrftoken'))
    .type('application/json')
    .accept('application/json')
    .send(masterCourses)
    .end(cb);
}

/**
 * gets scheduled courses from ids
 * @param {number[]} scheduledCourses
 * @param {function} cb
 */
export function getScheduledCoursesFromIds(scheduledCourses, cb) {
  request.post(apiUrl('scheduled_courses'))
    .set('X-CSRFToken', Cookies.get('csrftoken'))
    .type('application/json')
    .accept('application/json')
    .send(scheduledCourses)
    .end(cb);
}

/**
 * gets scheduled course groups from ids
 * @param {number[]} scheduledCourseGroups
 * @param {function} cb
 */
export function getScheduledCourseGroupsFromIds(scheduledCourseGroups, cb) {
  request.post(apiUrl('scheduled_course_groups'))
    .set('X-CSRFToken', Cookies.get('csrftoken'))
    .type('application/json')
    .accept('application/json')
    .send(scheduledCourseGroups)
    .end(cb);
}

/**
 * post an announcement to the web API
 * @param {object} announcement
 * @param {function} cb
 */
export function postAnnouncement(announcement, cb) {
  request.post(apiUrl('api/announcements/add/'))
    .set('X-CSRFToken', Cookies.get('csrftoken') || '')
    .type('application/json')
    .accept('application/json')
    .send(getAnnouncementForAPISubmission(announcement))
    .end(cb);
}

/**
 * put an announcement to the web API
 * @param {object} announcement
 * @param {function} cb
 */
export function putAnnouncement(announcement, cb) {
  request.put(apiUrl(`api/announcements/update/${announcement.id}`))
    .set('X-CSRFToken', Cookies.get('csrftoken'))
    .type('application/json')
    .accept('application/json')
    .send(getAnnouncementForAPISubmission(announcement))
    .end(cb);
}

/**
 * gets announcements for a page
 * @param {object} query
 * @param {function} cb
 */
export function getAnnouncements(query, cb) {
  request.get(apiUrl('api/announcements/'))
    .set('X-CSRFToken', Cookies.get('csrftoken'))
    .type('application/json')
    .accept('application/json')
    .query(query)
    .end(cb);
}

/**
 * get an individual announcement
 * @param {number} id
 * @param {function} cb
 */
export function getAnnouncement(id, cb) {
  request.get(apiUrl(`api/announcements/${id}`))
    .set('X-CSRFToken', Cookies.get('csrftoken'))
    .type('application/json')
    .accept('application/json')
    .end(cb);
}

/**
 * delete an individual announcement
 * @param {number} id
 * @param {function} cb
 */
export function deleteAnnouncement(id, cb) {
  request.delete(apiUrl(`api/announcements/delete/${id}`))
    .set('X-CSRFToken', Cookies.get('csrftoken'))
    .type('application/json')
    .accept('application/json')
    .end(cb);
}
