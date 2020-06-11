/* eslint-disable no-undef */
/* eslint-disable global-require */

import _ from 'lodash';
import moment from 'moment';

describe('createOrUpdateDisabled', () => {
  let t0; let t1; let clock; let
    createOrUpdateDisabled;

  beforeEach(() => {
    window.gettext = sinon.stub().returnsArg(0);
    window.ngettext = sinon.spy();
    window.interpolate = sinon.spy();
    t0 = moment('2015-10-07 11:50:00');
    t1 = moment('2015-10-07 11:50:00').add(1, 'weeks');
    clock = sinon.useFakeTimers(t0.valueOf());
    createOrUpdateDisabled = require('../lib').createOrUpdateDisabled;
  });

  afterEach(() => {
    clock.restore();
    delete window.gettext;
    delete window.ngettext;
    delete window.interpolate;
  });

  it('should be disabled if the "audience" is an empty string', () => {
    expect(createOrUpdateDisabled({
      audience: '',
    })).toBeTruthy();
  });

  it('should be disabled if the "subject" is an empty string', () => {
    expect(createOrUpdateDisabled({
      audience: '',
      subject: '',
    })).toBeTruthy();
  });

  it('should be disabled if the "body" is an empty string', () => {
    expect(createOrUpdateDisabled({
      audience: '',
      subject: '',
      body: '',
    })).toBeTruthy();
  });

  it('should be disabled if programme is visible, yet no programme has been chosen', () => {
    expect(createOrUpdateDisabled({
      audience: 'students',
      subject: 'some subject',
      body: 'some body',
      programme: -1,
    })).toBeTruthy();
  });

  it('should be disabled if master course is visible, yet no master course has been chosen', () => {
    expect(createOrUpdateDisabled({
      audience: 'students',
      subject: 'some subject',
      body: 'some body',
      programme: 123,
      masterCourse: -1,
    })).toBeTruthy();
  });

  it('should be disabled if scheduled course is visible, yet no scheduled course has been chosen', () => {
    expect(createOrUpdateDisabled({
      audience: 'students',
      subject: 'some subject',
      body: 'some body',
      programme: 123,
      masterCourse: 456,
      scheduledCourse: -1,
    })).toBeTruthy();
  });

  it('should be disabled if group is visible, yet no group has been chosen', () => {
    expect(createOrUpdateDisabled({
      audience: 'students',
      subject: 'some subject',
      body: 'some body',
      programme: 123,
      masterCourse: 456,
      scheduledCourse: 789,
      scheduledCourseGroup: -1,
    })).toBeTruthy();
  });

  it('should be disabled if the announcement is not urgent, yet no "visible from" datetime has been specified', () => {
    expect(createOrUpdateDisabled({
      audience: 'all',
      subject: 'some subject',
      body: 'some body',
      programme: -1,
      masterCourse: -1,
      scheduledCourse: -1,
      scheduledCourseGroup: -1,
      isUrgent: false,
      visibleFrom: null,
      visibleTo: null,
    })).toBeTruthy();
  });

  it('should be disabled if the announcement is not urgent, yet no "visible to" datetime has been specified', () => {
    expect(createOrUpdateDisabled({
      audience: 'all',
      subject: 'some subject',
      body: 'some body',
      programme: -1,
      masterCourse: -1,
      scheduledCourse: -1,
      scheduledCourseGroup: -1,
      isUrgent: false,
      visibleFrom: t0,
      visibleTo: null,
    })).toBeTruthy();
  });

  it('should be disabled if the announcement is not urgent and the "visible from" datetime is after the "visible to" datetime', () => {
    expect(createOrUpdateDisabled({
      audience: 'all',
      subject: 'some subject',
      body: 'some body',
      programme: -1,
      masterCourse: -1,
      scheduledCourse: -1,
      scheduledCourseGroup: -1,
      isUrgent: false,
      visibleFrom: t1,
      visibleTo: t0,
    })).toBeTruthy();
  });

  it('should be disabled if the announcement is urgent and the "visible from" datetime is after the "visible to" datetime', () => {
    expect(createOrUpdateDisabled({
      audience: 'all',
      subject: 'some subject',
      body: 'some body',
      programme: -1,
      masterCourse: -1,
      scheduledCourse: -1,
      scheduledCourseGroup: -1,
      isUrgent: true,
      visibleFrom: t1,
      visibleTo: t0,
    })).toBeTruthy();
  });

  it('should be disabled if the announcement is not urgent and the "visible from" datetime is the same as the "visible to" datetime', () => {
    expect(createOrUpdateDisabled({
      audience: 'all',
      subject: 'some subject',
      body: 'some body',
      programme: -1,
      masterCourse: -1,
      scheduledCourse: -1,
      scheduledCourseGroup: -1,
      isUrgent: false,
      visibleFrom: t0,
      visibleTo: t0,
    })).toBeTruthy();
  });

  it('should be disabled if the announcement is urgent and the "visible from" datetime is the same as the "visible to" datetime', () => {
    expect(createOrUpdateDisabled({
      audience: 'all',
      subject: 'some subject',
      body: 'some body',
      programme: -1,
      masterCourse: -1,
      scheduledCourse: -1,
      scheduledCourseGroup: -1,
      isUrgent: true,
      visibleFrom: t0,
      visibleTo: t0,
    })).toBeTruthy();
  });

  it('should be disabled if the announcement is urgent, yet no "visible to" datetime has been specified', () => {
    expect(createOrUpdateDisabled({
      audience: 'all',
      subject: 'some subject',
      body: 'some body',
      programme: -1,
      masterCourse: -1,
      scheduledCourse: -1,
      scheduledCourseGroup: -1,
      isUrgent: true,
      visibleFrom: null,
      visibleTo: null,
    })).toBeTruthy();
  });

  it('should be disabled if the announcement is not urgent and the "visible to" date is in the past', () => {
    const tMinus1 = moment('2015-10-07 11:40:00');
    const tMinus2 = moment('2015-10-07 11:45:00');
    expect(createOrUpdateDisabled({
      audience: 'all',
      subject: 'some subject',
      body: 'some body',
      programme: -1,
      masterCourse: -1,
      scheduledCourse: -1,
      scheduledCourseGroup: -1,
      isUrgent: false,
      visibleFrom: tMinus1,
      visibleTo: tMinus2,
    })).toBeTruthy();
  });

  it('should be disabled if the announcement is urgent and the "visible to" date is in the past', () => {
    const tMinus1 = moment('2015-10-07 11:40:00');
    const tMinus2 = moment('2015-10-07 11:45:00');
    expect(createOrUpdateDisabled({
      audience: 'all',
      subject: 'some subject',
      body: 'some body',
      programme: -1,
      masterCourse: -1,
      scheduledCourse: -1,
      scheduledCourseGroup: -1,
      isUrgent: true,
      visibleFrom: tMinus1,
      visibleTo: tMinus2,
    })).toBeTruthy();
  });

  it('should be enabled if the announcement is not urgent and everything has been specified', () => {
    expect(createOrUpdateDisabled({
      audience: 'all',
      subject: 'some subject',
      body: 'some body',
      programme: -1,
      masterCourse: -1,
      scheduledCourse: -1,
      scheduledCourseGroup: -1,
      isUrgent: false,
      visibleFrom: t0,
      visibleTo: t1,
    })).toBeFalsy();
  });

  it('should be enabled if the announcement is urgent and everything has been specified', () => {
    expect(createOrUpdateDisabled({
      audience: 'all',
      subject: 'some subject',
      body: 'some body',
      programme: -1,
      masterCourse: -1,
      scheduledCourse: -1,
      scheduledCourseGroup: -1,
      isUrgent: true,
      visibleFrom: t0,
      visibleTo: t1,
    })).toBeFalsy();
  });
});

describe('formIsClean', () => {
  let announcement; let cache; let
    formIsClean;

  beforeEach(() => {
    cache = {
      audience: 'all',
      subject: 'some subject',
      body: 'some body',
      programme: -1,
      masterCourse: -1,
      scheduledCourse: -1,
      scheduledCourseGroup: -1,
      isUrgent: true,
      visibleFrom: moment('2016-04-26 11:50:00'),
      visibleTo: moment('2016-04-26 11:50:00'),
    };
    announcement = _.cloneDeep(cache);
    announcement.visibleFrom = cache.visibleFrom.clone();
    announcement.visibleTo = cache.visibleTo.clone();
    formIsClean = require('../lib').formIsClean;
  });

  it('should be clean if no announcement fields have changed', () => {
    expect(formIsClean(announcement, cache)).toBeTruthy();
  });

  it('should not be clean if an announcement text field has changed', () => {
    announcement.subject = 'new subject';
    expect(formIsClean(announcement, cache)).toBeFalsy();
  });

  it('should not be clean if an announcement date field has changed', () => {
    announcement.visibleFrom = moment('2016-04-27 11:50:00');
    expect(formIsClean(announcement, cache)).toBeFalsy();
  });

  it('should not be clean if an announcement select field has changed', () => {
    announcement.programme = 291;
    expect(formIsClean(announcement, cache)).toBeFalsy();
  });
});
