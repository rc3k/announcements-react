import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import _ from 'lodash';

import { AnnouncementFormContainer } from './AnnouncementForm';
import ActionButtons from './form/ActionButtons';
import DismissibleAlert from './DismissibleAlert';
import Trans from '../Trans';
import * as actionCreators from '../actionCreators';
import { createOrUpdateDisabled } from '../lib';

/**
 * React component for adding an announcement
 * @param {object} router
 * @param {object} announcement
 * @param {function} closeAnnouncementMessage
 * @param {function} postAnnouncementThunk
 * @returns {XML}
 */
const AnnouncementAdd = ({
  announcement,
  closeAnnouncementMessage,
  postAnnouncementThunk,
  history,
}) => (
  <div className="add-announcement">

    {/* begin header, intro paragraph, dismissible alert */}
    <div className="row well">
      <h2 className="pull-left">{Trans.addAnnouncement}</h2>
    </div>
    <p>{Trans.addAnnouncementDescription}</p>
    <DismissibleAlert
      title={_.has(announcement, 'message.title') ? announcement.message.title : ''}
      visible={_.has(announcement, 'message')}
      alertType={_.has(announcement, 'message.alertType') ? announcement.message.alertType : ''}
      message={_.has(announcement, 'message.message') ? announcement.message.message : ''}
      onClick={closeAnnouncementMessage}
    />
    {/* end header, intro paragraph, dismissible alert */}

    {/* begin announcement form */}
    <div className="announcement-form">
      <div className="well">

        <AnnouncementFormContainer disabled={false} />

        {/* begin action buttons */}
        <div className="row">
          <div className="pull-right">
            <ActionButtons
              disabled={createOrUpdateDisabled(announcement)}
              actionText={Trans.create}
              onClick={() => postAnnouncementThunk(history.push)}
              cancelText={Trans.cancel}
              cancelAction={() => history.push('/')}
            />
          </div>
        </div>
        {/* end action buttons */}

      </div>
    </div>
    {/* end announcement form */}

  </div>
);

export const AnnouncementAddContainer = connect(({
  announcement,
}) => ({
  announcement,
}), _.pick(actionCreators, 'closeAnnouncementMessage', 'postAnnouncementThunk'))(withRouter(AnnouncementAdd));
