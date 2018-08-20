import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import _ from 'lodash';

import AnnouncementMeta from './form/AnnouncementMeta';
import { AnnouncementFormContainer } from './AnnouncementForm';
import ActionButtons from './form/ActionButtons';
import ConfirmationModal from './modal/ConfirmationModal';
import DismissibleAlert from './DismissibleAlert';
import Trans from '../Trans';
import * as actionCreators from '../actionCreators';

/**
 * Confirm delete
 */
const confirmDelete = () => {
  document.getElementById('#confirm-delete').modal('show');
};

/**
 * React component for viewing an announcement
 * @param {object} router
 * @param {object} announcement
 * @param {function} closeAnnouncementMessage
 * @param {function} deleteAnnouncementThunk
 * @returns {XML}
 */
const AnnouncementView = ({
  router,
  announcement,
  closeAnnouncementMessage,
  deleteAnnouncementThunk,
}) => (
  <div className="view-announcement">

    {/* begin header, intro paragraph, dismissible alert */}
    <div className="row well">
      <h2 className="pull-left">{Trans.viewAnnouncement}</h2>
    </div>
    <DismissibleAlert
      title={_.has(announcement, 'message.title') ? announcement.message.title : ''}
      visible={_.has(announcement, 'message')}
      alertType={_.has(announcement, 'message.alertType') ? announcement.message.alertType : ''}
      message={_.has(announcement, 'message.message') ? announcement.message.message : ''}
      onClick={closeAnnouncementMessage}
    />
    {/* end header, intro paragraph, dismissible alert */}

    {/* begin announcement meta */}
    <AnnouncementMeta
      id={announcement.displayID}
      modified={announcement.modified}
      created={announcement.created}
      onDeleteClick={confirmDelete}
    />
    {/* end announcement meta */}

    {/* begin announcement form */}
    <div className="announcement-form">
      <form>
        <div className="well">

          <AnnouncementFormContainer disabled />

          {/* begin action buttons */}
          <div className="row">
            <div className="pull-right">
              <ActionButtons
                disabled={false}
                actionText={Trans.modify}
                onClick={() => router.push(`/announcement/edit/${announcement.id}`)}
                cancelText={Trans.back}
                cancelAction={() => router.push('/')}
              />
            </div>
          </div>
          {/* end action buttons */}

        </div>
      </form>
    </div>
    {/* end announcement form */}

    {/* begin confirmation modals */}
    <div className="confirmation-modals">
      <ConfirmationModal
        id="confirm-delete"
        header={Trans.confirmDeleteHeader}
        content={Trans.confirmDelete}
        confirmHandler={() => deleteAnnouncementThunk(router.push)}
      />
    </div>
    {/* end confirmation modals */}

  </div>
);

export const AnnouncementViewContainer = connect(({
  announcement,
}) => ({
  announcement,
}), _.pick(actionCreators,
  'closeAnnouncementMessage',
  'deleteAnnouncementThunk'))(withRouter(AnnouncementView));
