import _ from 'lodash';

describe('thunks', () => {
  let dispatchSpy;
  let state;
  let getState;
  let xhr;
  let requests;
  let Trans;

  beforeEach(() => {
    dispatchSpy = sinon.spy();
    state = {};
    getState = () => state;

    // fake xhrs
    xhr = sinon.useFakeXMLHttpRequest();
    requests = [];
    xhr.onCreate = (x) => {
      requests.push(x);
    };

    // monkey-patch window.Urls
    window.Urls = {
      'announcements_api:add': sinon.spy(),
    };

    // stub window.gettext to return its first argument
    window.gettext = sinon.stub().returnsArg(0);
    Trans = require('../Trans').default;
  });

  afterEach(() => {
    xhr.restore();
    delete window.gettext;
    delete window.Urls;
  });

  describe('postAnnouncementThunk', () => {
    let postAnnouncementThunk;
    let setXhrInProgress;
    let openAnnouncementMessage;
    let responseJSON;
    let push;

    beforeEach(() => {
      ({
        postAnnouncementThunk,
        setXhrInProgress,
        openAnnouncementMessage,
      } = require('../actionCreators'));
      state = {
        xhrInProgress: false,
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
        apiSettings: {
          nonFieldErrorsKey: 'non_field_errors',
        },
      };
      push = sinon.spy();
    });

    it('should not make any requests when an XHR is in progress', () => {
      state.xhrInProgress = true;
      postAnnouncementThunk(push)(dispatchSpy, getState);
      expect(dispatchSpy.called).toBeFalsy();
      expect(_.size(requests)).toBe(0);
    });

    it('should set XHR in progress', () => {
      postAnnouncementThunk(push)(dispatchSpy, getState);
      expect(dispatchSpy.withArgs(setXhrInProgress()).calledOnce).toBeTruthy();
    });

    it('should make one POST request', () => {
      postAnnouncementThunk(push)(dispatchSpy, getState);
      expect(_.size(requests)).toBe(1);
      expect(requests[0].method).toBe('POST');
      expect(requests[0].requestBody).toBe(JSON.stringify(
        {
          subject: 'some subject',
          body: 'some body',
          audience: 'students',
          is_urgent: false,
          programme: 9,
          scheduled_course: 52,
          group: 103,
        },
      ));
    });

    describe('when unsuccessful with a bad request and a non-field error', () => {
      beforeEach(() => {
        responseJSON = {
          [state.apiSettings.nonFieldErrorsKey]: ['A non field error'],
        };
        postAnnouncementThunk(push)(dispatchSpy, getState);
        requests[0].respond(400, {
          'Content-Type': 'application/json',
        }, JSON.stringify(responseJSON));
      });

      it('should not redirect to index page', () => {
        expect(push.called).toBe(false);
      });

      it('should open a danger message with the non-field error', () => {
        expect(dispatchSpy.withArgs(openAnnouncementMessage({
          title: Trans.didNotWork,
          alertType: 'danger',
          message: 'A non field error',
        })).calledOnce).toBeTruthy();
      });
    });
  });
});
