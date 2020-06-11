/* eslint-disable no-undef */
/* eslint-disable global-require */

import _ from 'lodash';
import moment from 'moment';

import reducer from '../reducers';

describe('"announcements" reducer (in the "announcements" app)', () => {
  let t0; let t1; let t2; let
    clock;

  beforeEach(() => {
    t0 = moment('2015-10-07 11:50:00');
    t1 = moment('2015-10-07 11:50:00').add(1, 'weeks');
    t2 = moment();
    clock = sinon.useFakeTimers(t0.valueOf());
  });

  afterEach(() => {
    clock.restore();
  });

  it('should handle the "SET_STATE" action', () => {
    const oldState = {
      foo: 'bar',
    };
    const newState = reducer(oldState, {
      type: 'SET_STATE',
      state: {
        wibble: 'woo',
      },
    });
    expect(oldState).toEqual({
      foo: 'bar',
    });
    expect(newState).toEqual({
      wibble: 'woo',
      announcement: {
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
      },
      masterCourses: {},
      scheduledCourses: {},
      scheduledCourseGroups: {},
      announcementsList: {
        announcements: [],
        total: 0,
      },
      announcementsQuery: {
        q: '',
        order: 'desc',
        column: 'announcement_id',
        page: 1,
        per_page: 20,
      },
      xhrInProgress: false,
    });
  });

  it('should handle the "ADD_ANNOUNCEMENT" action', () => {
    const oldState = {
      foo: 'bar',
      announcement: {
        subject: 'some subject',
        body: 'some body',
        audience: 'students',
        programme: 9,
        masterCourse: 17,
        scheduledCourse: 52,
        scheduledCourseGroup: 103,
        isUrgent: false,
        visibleFrom: null,
        visibleTo: null,
      },
    };
    const newState = reducer(oldState, {
      type: 'ADD_ANNOUNCEMENT',
      state: {
        wibble: 'woo',
      },
    });
    expect(oldState).toEqual({
      foo: 'bar',
      announcement: {
        subject: 'some subject',
        body: 'some body',
        audience: 'students',
        programme: 9,
        masterCourse: 17,
        scheduledCourse: 52,
        scheduledCourseGroup: 103,
        isUrgent: false,
        visibleFrom: null,
        visibleTo: null,
      },
    });
    expect(newState.announcement.visibleFrom.toISOString()).toEqual(t0.toISOString());
    expect(newState.announcement.visibleTo.toISOString()).toEqual(t1.toISOString());
    delete newState.announcement.visibleFrom;
    delete newState.announcement.visibleTo;
    expect(newState).toEqual({
      foo: 'bar',
      announcement: {
        subject: '',
        body: '',
        audience: '',
        programme: -1,
        masterCourse: -1,
        scheduledCourse: -1,
        scheduledCourseGroup: -1,
        isUrgent: false,
      },
      masterCourses: {},
      scheduledCourses: {},
      scheduledCourseGroups: {},
    });
  });

  it('should handle the "SET_SUBJECT" action', () => {
    const oldState = {
      foo: 'bar',
      announcement: {
        subject: 'some subject',
      },
    };
    const newState = reducer(oldState, {
      type: 'SET_SUBJECT',
      subject: 'new subject',
    });
    expect(oldState).toEqual({
      foo: 'bar',
      announcement: {
        subject: 'some subject',
      },
    });
    expect(newState).toEqual({
      foo: 'bar',
      announcement: {
        subject: 'new subject',
      },
    });
  });

  it('should handle the "SET_BODY" action', () => {
    const oldState = {
      foo: 'bar',
      announcement: {
        body: 'some body',
      },
    };
    const newState = reducer(oldState, {
      type: 'SET_BODY',
      body: 'new body',
    });
    expect(oldState).toEqual({
      foo: 'bar',
      announcement: {
        body: 'some body',
      },
    });
    expect(newState).toEqual({
      foo: 'bar',
      announcement: {
        body: 'new body',
      },
    });
  });

  it('should handle the "SET_AUDIENCE" action', () => {
    const oldState = {
      foo: 'bar',
      announcement: {
        audience: 'students',
        programme: 9,
        masterCourse: 17,
        scheduledCourse: 52,
        scheduledCourseGroup: 103,
      },
      masterCourses: {
        1: {},
        2: {},
      },
      scheduledCourses: {
        3: {},
        4: {},
      },
      scheduledCourseGroups: {
        10: {},
        11: {},
        12: {},
      },
    };
    const newState = reducer(oldState, {
      type: 'SET_AUDIENCE',
      audience: 'tutors',
    });
    expect(oldState).toEqual({
      foo: 'bar',
      announcement: {
        audience: 'students',
        programme: 9,
        masterCourse: 17,
        scheduledCourse: 52,
        scheduledCourseGroup: 103,
      },
      masterCourses: {
        1: {},
        2: {},
      },
      scheduledCourses: {
        3: {},
        4: {},
      },
      scheduledCourseGroups: {
        10: {},
        11: {},
        12: {},
      },
    });
    expect(newState).toEqual({
      foo: 'bar',
      announcement: {
        audience: 'tutors',
        programme: -1,
        masterCourse: -1,
        scheduledCourse: -1,
        scheduledCourseGroup: -1,
      },
      masterCourses: {},
      scheduledCourses: {},
      scheduledCourseGroups: {},
    });
  });

  it('should handle the "SET_PROGRAMME" action', () => {
    const oldState = {
      foo: 'bar',
      announcement: {
        programme: 9,
        masterCourse: 17,
        scheduledCourse: 52,
        scheduledCourseGroup: 103,
      },
      masterCourses: {
        1: {},
        2: {},
      },
      scheduledCourses: {
        3: {},
        4: {},
      },
      scheduledCourseGroups: {
        10: {},
        11: {},
        12: {},
      },
    };
    const newState = reducer(oldState, {
      type: 'SET_PROGRAMME',
      programmeId: 10,
    });
    expect(oldState).toEqual({
      foo: 'bar',
      announcement: {
        programme: 9,
        masterCourse: 17,
        scheduledCourse: 52,
        scheduledCourseGroup: 103,
      },
      masterCourses: {
        1: {},
        2: {},
      },
      scheduledCourses: {
        3: {},
        4: {},
      },
      scheduledCourseGroups: {
        10: {},
        11: {},
        12: {},
      },
    });
    expect(newState).toEqual({
      foo: 'bar',
      announcement: {
        programme: 10,
        masterCourse: -1,
        scheduledCourse: -1,
        scheduledCourseGroup: -1,
      },
      masterCourses: {},
      scheduledCourses: {},
      scheduledCourseGroups: {},
    });
  });

  it('should handle the "RECEIVE_MASTER_COURSES" action', () => {
    const oldState = {
      foo: 'bar',
      masterCourses: {
        10: {},
        11: {},
      },
    };
    const newState = reducer(oldState, {
      type: 'RECEIVE_MASTER_COURSES',
      masterCourses: {
        12: {},
        13: {},
        14: {},
      },
    });
    expect(oldState).toEqual({
      foo: 'bar',
      masterCourses: {
        10: {},
        11: {},
      },
    });
    expect(newState).toEqual({
      foo: 'bar',
      masterCourses: {
        12: {},
        13: {},
        14: {},
      },
    });
  });

  it('should handle the "SET_MASTER_COURSE" action', () => {
    const oldState = {
      foo: 'bar',
      announcement: {
        masterCourse: 17,
        scheduledCourse: 52,
        scheduledCourseGroup: 103,
      },
      scheduledCourses: {
        3: {},
        4: {},
      },
      scheduledCourseGroups: {
        10: {},
        11: {},
        12: {},
      },
    };
    const newState = reducer(oldState, {
      type: 'SET_MASTER_COURSE',
      masterCourseId: 20,
    });
    expect(oldState).toEqual({
      foo: 'bar',
      announcement: {
        masterCourse: 17,
        scheduledCourse: 52,
        scheduledCourseGroup: 103,
      },
      scheduledCourses: {
        3: {},
        4: {},
      },
      scheduledCourseGroups: {
        10: {},
        11: {},
        12: {},
      },
    });
    expect(newState).toEqual({
      foo: 'bar',
      announcement: {
        masterCourse: 20,
        scheduledCourse: -1,
        scheduledCourseGroup: -1,
      },
      scheduledCourses: {},
      scheduledCourseGroups: {},
    });
  });

  it('should handle the "RECEIVE_SCHEDULED_COURSES" action', () => {
    const oldState = {
      foo: 'bar',
      scheduledCourses: {
        50: {},
        51: {},
        52: {},
      },
    };
    const newState = reducer(oldState, {
      type: 'RECEIVE_SCHEDULED_COURSES',
      scheduledCourses: {
        100: {},
        101: {},
      },
    });
    expect(oldState).toEqual({
      foo: 'bar',
      scheduledCourses: {
        50: {},
        51: {},
        52: {},
      },
    });
    expect(newState).toEqual({
      foo: 'bar',
      scheduledCourses: {
        100: {},
        101: {},
      },
    });
  });

  it('should handle the "SET_SCHEDULED_COURSE" action', () => {
    const oldState = {
      foo: 'bar',
      announcement: {
        scheduledCourse: 52,
        scheduledCourseGroup: 103,
      },
      scheduledCourseGroups: {
        10: {},
        11: {},
        12: {},
      },
    };
    const newState = reducer(oldState, {
      type: 'SET_SCHEDULED_COURSE',
      scheduledCourseId: 70,
    });
    expect(oldState).toEqual({
      foo: 'bar',
      announcement: {
        scheduledCourse: 52,
        scheduledCourseGroup: 103,
      },
      scheduledCourseGroups: {
        10: {},
        11: {},
        12: {},
      },
    });
    expect(newState).toEqual({
      foo: 'bar',
      announcement: {
        scheduledCourse: 70,
        scheduledCourseGroup: -1,
      },
      scheduledCourseGroups: {},
    });
  });

  it('should handle the "RECEIVE_SCHEDULED_COURSE_GROUPS" action', () => {
    const oldState = {
      foo: 'bar',
      scheduledCourseGroups: {
        50: {},
        51: {},
        52: {},
      },
    };
    const newState = reducer(oldState, {
      type: 'RECEIVE_SCHEDULED_COURSE_GROUPS',
      scheduledCourseGroups: {
        100: {},
        101: {},
      },
    });
    expect(oldState).toEqual({
      foo: 'bar',
      scheduledCourseGroups: {
        50: {},
        51: {},
        52: {},
      },
    });
    expect(newState).toEqual({
      foo: 'bar',
      scheduledCourseGroups: {
        100: {},
        101: {},
      },
    });
  });

  it('should handle the "SET_SCHEDULED_COURSE_GROUP" action', () => {
    const oldState = {
      foo: 'bar',
      announcement: {
        scheduledCourseGroup: 103,
      },
    };
    const newState = reducer(oldState, {
      type: 'SET_SCHEDULED_COURSE_GROUP',
      scheduledCourseGroupId: 150,
    });
    expect(oldState).toEqual({
      foo: 'bar',
      announcement: {
        scheduledCourseGroup: 103,
      },
    });
    expect(newState).toEqual({
      foo: 'bar',
      announcement: {
        scheduledCourseGroup: 150,
      },
    });
  });

  it('should handle the "SET_IS_URGENT" action', () => {
    const oldVisibleFrom = moment('2015-10-07 11:49:00');
    expect(oldVisibleFrom.isBefore(t0)).toBeTruthy();
    const oldState = {
      foo: 'bar',
      announcement: {
        isUrgent: false,
        visibleFrom: oldVisibleFrom,
      },
    };
    const newState = reducer(oldState, {
      type: 'SET_IS_URGENT',
      isUrgent: true,
    });
    expect(oldState).toEqual({
      foo: 'bar',
      announcement: {
        isUrgent: false,
        visibleFrom: oldVisibleFrom,
      },
    });
    expect(newState.announcement.visibleFrom.toISOString()).toEqual(t0.toISOString());
    delete newState.announcement.visibleFrom;
    expect(newState).toEqual({
      foo: 'bar',
      announcement: {
        isUrgent: true,
      },
    });
  });

  it('should handle the "SET_VISIBLE_FROM" action', () => {
    const oldState = {
      foo: 'bar',
      announcement: {},
    };
    const newState = reducer(oldState, {
      type: 'SET_VISIBLE_FROM',
      dateTime: moment('2015-12-02T09:00:00.000Z'),
    });
    expect(oldState).toEqual({
      foo: 'bar',
      announcement: {},
    });
    expect(newState).toEqual({
      foo: 'bar',
      announcement: {
        visibleFrom: moment('2015-12-02T09:00:00.000Z'),
      },
    });
  });

  it('should handle the "SET_VISIBLE_TO" action', () => {
    const oldState = {
      foo: 'bar',
      announcement: {},
    };
    const newState = reducer(oldState, {
      type: 'SET_VISIBLE_TO',
      dateTime: moment('2015-12-02T09:00:00.000Z'),
    });
    expect(oldState).toEqual({
      foo: 'bar',
      announcement: {},
    });
    expect(newState).toEqual({
      foo: 'bar',
      announcement: {
        visibleTo: moment('2015-12-02T09:00:00.000Z'),
      },
    });
  });

  it('should handle the "OPEN_ANNOUNCEMENT_MESSAGE" action', () => {
    const oldState = {
      foo: 'bar',
      announcement: {},
    };
    const newState = reducer(oldState, {
      type: 'OPEN_ANNOUNCEMENT_MESSAGE',
      message: {
        title: 'Some title',
        alertType: 'danger',
        message: 'Some message',
      },
    });
    expect(oldState).toEqual({
      foo: 'bar',
      announcement: {},
    });
    expect(newState).toEqual({
      foo: 'bar',
      announcement: {
        message: {
          title: 'Some title',
          alertType: 'danger',
          message: 'Some message',
        },
      },
    });
  });

  it('should handle the "CLOSE_ANNOUNCEMENT_MESSAGE" action', () => {
    const oldState = {
      foo: 'bar',
      announcement: {
        message: {},
      },
    };
    const newState = reducer(oldState, {
      type: 'CLOSE_ANNOUNCEMENT_MESSAGE',
    });
    expect(oldState).toEqual({
      foo: 'bar',
      announcement: {
        message: {},
      },
    });
    expect(newState).toEqual({
      foo: 'bar',
      announcement: {},
    });
  });

  it('should handle the "RECEIVE_ANNOUNCEMENTS" action', () => {
    const oldState = {
      foo: 'bar',
      announcementsList: {
        total: 20,
        announcements: [
          { id: 1 },
          { id: 2 },
        ],
      },
    };
    const newState = reducer(oldState, {
      type: 'RECEIVE_ANNOUNCEMENTS',
      announcementsList: {
        total: 37,
        announcements: [
          { id: 3 },
          { id: 4 },
          { id: 5 },
        ],
      },
    });
    expect(oldState).toEqual({
      foo: 'bar',
      announcementsList: {
        total: 20,
        announcements: [
          { id: 1 },
          { id: 2 },
        ],
      },
    });
    expect(newState).toEqual({
      foo: 'bar',
      announcementsList: {
        total: 37,
        announcements: [
          { id: 3 },
          { id: 4 },
          { id: 5 },
        ],
      },
    });
  });

  it('should handle the "SET_SORT_ORDER" action', () => {
    const oldState = {
      foo: 'bar',
      announcementsQuery: {
        foo: 'bar',
        column: 'announcement_id',
        order: 'desc',
      },
    };
    const newState = reducer(oldState, {
      type: 'SET_SORT_ORDER',
      column: 'recipient',
      order: 'asc',
    });
    expect(oldState).toEqual({
      foo: 'bar',
      announcementsQuery: {
        foo: 'bar',
        column: 'announcement_id',
        order: 'desc',
      },
    });
    expect(newState).toEqual({
      foo: 'bar',
      announcementsQuery: {
        foo: 'bar',
        column: 'recipient',
        order: 'asc',
      },
    });
  });

  it('should handle the "SET_PAGE" action', () => {
    const oldState = {
      foo: 'bar',
      announcementsQuery: {
        foo: 'bar',
        page: 13,
      },
    };
    const newState = reducer(oldState, {
      type: 'SET_PAGE',
      page: 76,
    });
    expect(oldState).toEqual({
      foo: 'bar',
      announcementsQuery: {
        foo: 'bar',
        page: 13,
      },
    });
    expect(newState).toEqual({
      foo: 'bar',
      announcementsQuery: {
        foo: 'bar',
        page: 76,
      },
    });
  });

  it('should handle the "SET_QUERY" action', () => {
    const oldState = {
      foo: 'bar',
      announcementsQuery: {
        foo: 'bar',
        q: 'anz01',
      },
    };
    const newState = reducer(oldState, {
      type: 'SET_QUERY',
      query: 'zubo 93',
    });
    expect(oldState).toEqual({
      foo: 'bar',
      announcementsQuery: {
        foo: 'bar',
        q: 'anz01',
      },
    });
    expect(newState).toEqual({
      foo: 'bar',
      announcementsQuery: {
        foo: 'bar',
        q: 'zubo 93',
      },
    });
  });

  it('should handle the "OPEN_ANNOUNCEMENTS_LIST_MESSAGE" action', () => {
    const oldState = {
      foo: 'bar',
      announcementsList: {},
    };
    const newState = reducer(oldState, {
      type: 'OPEN_ANNOUNCEMENTS_LIST_MESSAGE',
      message: {
        title: 'Some title',
        alertType: 'danger',
        message: 'Some message',
      },
    });
    expect(oldState).toEqual({
      foo: 'bar',
      announcementsList: {},
    });
    expect(newState).toEqual({
      foo: 'bar',
      announcementsList: {
        message: {
          title: 'Some title',
          alertType: 'danger',
          message: 'Some message',
        },
      },
    });
  });

  it('should handle the "CLOSE_ANNOUNCEMENTS_LIST_MESSAGE" action', () => {
    const oldState = {
      foo: 'bar',
      announcementsList: {
        message: {},
      },
    };
    const newState = reducer(oldState, {
      type: 'CLOSE_ANNOUNCEMENTS_LIST_MESSAGE',
    });
    expect(oldState).toEqual({
      foo: 'bar',
      announcementsList: {
        message: {},
      },
    });
    expect(newState).toEqual({
      foo: 'bar',
      announcementsList: {},
    });
  });

  it('should handle the "RECEIVE_ANNOUNCEMENT" action', () => {
    const oldState = {
      foo: 'bar',
      announcement: {
        displayID: '',
        subject: '',
        body: '',
        audience: '',
        programme: -1,
        masterCourse: -1,
        scheduledCourse: -1,
        scheduledCourseGroup: -1,
        isUrgent: false,
        visibleFrom: t0,
        visibleTo: t1,
        modified: null,
        created: null,
      },
    };
    const newState = reducer(oldState, {
      type: 'RECEIVE_ANNOUNCEMENT',
      announcement: {
        id: 99,
        display_id: 'AN-47',
        subject: 'Announce this!',
        body: 'Something descriptive',
        audience: 'all',
        programme: 9,
        master_course: 17,
        scheduled_course: 52,
        group: null,
        is_urgent: true,
        visible_from: t0.clone().add(1, 'weeks').toISOString(),
        visible_to: t1.clone().add(1, 'weeks').toISOString(),
        created: t2.toISOString(),
        modified: t2.clone().add(1, 'hours').toISOString(),
        options: {
          master_courses: {
            1: {},
            2: {},
          },
          scheduled_courses: {
            3: {},
            4: {},
            5: {},
          },
          scheduled_course_groups: {
            6: {},
            7: {},
          },
        },
      },
    });
    expect(oldState).toEqual({
      foo: 'bar',
      announcement: {
        displayID: '',
        subject: '',
        body: '',
        audience: '',
        programme: -1,
        masterCourse: -1,
        scheduledCourse: -1,
        scheduledCourseGroup: -1,
        isUrgent: false,
        visibleFrom: t0,
        visibleTo: t1,
        modified: null,
        created: null,
      },
    });

    expect(_.cloneDeep(newState.announcement)).toEqual(newState.announcementCache);
    delete newState.announcementCache;

    expect(newState.announcement.visibleFrom.toISOString()).toEqual(t0.clone().add(1, 'weeks').toISOString());
    expect(newState.announcement.visibleTo.toISOString()).toEqual(t1.clone().add(1, 'weeks').toISOString());
    delete newState.announcement.visibleFrom;
    delete newState.announcement.visibleTo;

    expect(newState.announcement.created.toISOString()).toEqual(t2.toISOString());
    expect(newState.announcement.modified.toISOString()).toEqual(t2.clone().add(1, 'hours').toISOString());
    delete newState.announcement.created;
    delete newState.announcement.modified;

    expect(newState).toEqual({
      foo: 'bar',
      announcement: {
        id: 99,
        displayID: 'AN-47',
        subject: 'Announce this!',
        body: 'Something descriptive',
        audience: 'all',
        programme: 9,
        masterCourse: 17,
        scheduledCourse: 52,
        scheduledCourseGroup: 0,
        isUrgent: true,
      },
      masterCourses: {
        1: {},
        2: {},
      },
      scheduledCourses: {
        3: {},
        4: {},
        5: {},
      },
      scheduledCourseGroups: {
        6: {},
        7: {},
      },
    });
  });

  it('should handle the "RECEIVE_MODIFIED" action', () => {
    const oldState = {
      foo: 'bar',
      announcement: {
        modified: t2,
      },
    };
    const newState = reducer(oldState, {
      type: 'RECEIVE_MODIFIED',
      modified: t2.clone().add(1, 'hours').toISOString(),
    });
    expect(oldState).toEqual({
      foo: 'bar',
      announcement: {
        modified: t2.clone(),
      },
    });
    expect(newState.announcement.modified.toISOString()).toEqual(t2.clone().add(1, 'hours').toISOString());
    delete newState.announcement.modified;
    expect(newState).toEqual({
      foo: 'bar',
      announcement: {},
    });
  });
});
