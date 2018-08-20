import _ from 'lodash';
import moment from 'moment';

/**
 * determines whether the creation or updating of an announcement is disabled
 * @param {object} announcement
 * @returns {boolean}
 */
export const createOrUpdateDisabled = (announcement) => {
  if (announcement.audience === '' || announcement.subject === '' || announcement.body === '') {
    return true;
  }

  const programmeInvis = announcement.audience === '' || announcement.audience === 'all';
  if (!programmeInvis && announcement.programme === -1) {
    return true;
  }

  const masterCourseInvis = announcement.programme < 1;
  if (!masterCourseInvis && announcement.masterCourse === -1) {
    return true;
  }

  const scheduledCourseInvis = announcement.masterCourse < 1;
  if (!scheduledCourseInvis && announcement.scheduledCourse === -1) {
    return true;
  }

  const scheduledCourseGroupInvis = announcement.scheduledCourse < 1;
  if (!scheduledCourseGroupInvis && announcement.scheduledCourseGroup === -1) {
    return true;
  }

  if (!_.isObject(announcement.visibleFrom) || !_.isObject(announcement.visibleTo)) {
    return true;
  }

  const visibleFrom = announcement.visibleFrom.clone().startOf('minute');
  const visibleTo = announcement.visibleTo.clone().startOf('minute');
  if (!visibleFrom.isBefore(visibleTo)) {
    return true;
  }

  if (visibleTo.isBefore(moment().startOf('minute'))) {
    return true;
  }

  return false;
};

/**
 * whether the form is clean (no changes have been made)
 * @param {object} announcement
 * @param {object} announcementCache
 * @returns {boolean}
 */
export const formIsClean = (announcement, announcementCache) => {
  const editableFields = [
    'subject', 'body', 'audience', 'programme', 'scheduledCourse', 'scheduledCourseGroup', 'isUrgent',
  ];
  if (!_.isEqual(
    _.pick(_.cloneDeep(announcement), editableFields),
    _.pick(announcementCache, editableFields),
  )) {
    return false;
  }
  if (!_.every(['visibleFrom', 'visibleTo'], (a) => _.isEqual(announcement[a].toDate(), announcementCache[a].toDate()))) {
    return false;
  }
  return true;
};

/**
 * lowercase the first letter of the given word
 * @param {string} word
 * @returns {string}
 */
export function lcFirst(word) {
  return word.charAt(0).toLowerCase() + word.slice(1);
}

/**
 * uppercase the first letter of the given word
 * @param {string} word
 * @returns {string}
 */
export function ucFirst(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

/**
 * convert the given word in_snake_case to PascalCase
 * @param {string} words
 * @returns {string}
 */
export function toPascalCase(words) {
  return _.map(words.toLowerCase().split('_'), ucFirst).join('');
}

/**
 * convert the given word in_snake_case to camelCase
 * @param {string} words
 * @returns {string}
 */
export function toCamelCase(words) {
  return lcFirst(toPascalCase(words));
}
