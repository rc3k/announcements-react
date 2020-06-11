import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import _ from 'lodash';

import { AnnouncementFormContainer } from './AnnouncementForm';
import AnnouncementMeta from './form/AnnouncementMeta';
import ActionButtons from './form/ActionButtons';
import ConfirmationModal from './modal/ConfirmationModal';
import DismissibleAlert from './DismissibleAlert';
import Trans from '../Trans';
import * as actionCreators from '../actionCreators';
import { createOrUpdateDisabled, formIsClean } from '../lib';

/**
 * Whether the update button is disabled
 * @param {object} announcement
 * @param {object} announcementCache
 * @returns {boolean}
 */
const updateButtonDisabled = (announcement, announcementCache) => {
  if (formIsClean(announcement, announcementCache)) {
    return true;
  }
  return createOrUpdateDisabled(announcement);
};

/**
 * Confirm cancel
 * @param {object} announcement
 * @param {object} announcementCache
 * @param {object} router
 */
const confirmCancel = (announcement, announcementCache, history, openModal) => {
  if (!formIsClean(announcement, announcementCache)) {
    openModal('confirm-cancel');
  } else {
    history.push('/');
  }
};

/**
 * Confirm delete
 */
const confirmDelete = (openModal) => {
  openModal('confirm-delete');
};

/**
 * React component for editing an announcement
 * @param {object} router
 * @param {object} announcement
 * @param {object} announcementCache
 * @param {function} closeAnnouncementMessage
 * @param {function} putAnnouncementThunk
 * @param {function} deleteAnnouncementThunk
 * @returns {XML}
 */
export const AnnouncementEdit = (
  {
    history,
    announcement,
    announcementCache,
    closeAnnouncementMessage,
    putAnnouncementThunk,
    deleteAnnouncementThunk,
    modals,
    openModal,
    closeModal,
  },
) => (
  <div className="edit-announcement">

    {/* begin header, intro paragraph, dismissible alert */}
    <div className="row well">
      <h2 className="pull-left">{Trans.modifyAnnouncement}</h2>
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
      onDeleteClick={() => confirmDelete(openModal)}
    />
    {/* end announcement meta */}

    {/* begin announcement form */}
    <div className="announcement-form">
      <div className="well">

        <AnnouncementFormContainer disabled={false} />

        {/* begin action buttons */}
        <div className="row">
          <div className="pull-right">
            <ActionButtons
              disabled={updateButtonDisabled(announcement, announcementCache)}
              actionText={Trans.saveChanges}
              onClick={() => openModal('confirm-update')}
              cancelText={Trans.cancel}
              cancelAction={() => confirmCancel(
                announcement, announcementCache, history, openModal,
              )}
            />
          </div>
        </div>
        {/* end action buttons */}

      </div>
    </div>
    {/* end announcement form */}

    {/* begin confirmation modals */}
    <div className="confirmation-modals">
      <ConfirmationModal
        id="confirm-update"
        show={_.has(modals, 'confirm-update') && modals['confirm-update']}
        header={Trans.confirmUpdateHeader}
        content={Trans.confirmUpdate}
        confirmHandler={() => {
          putAnnouncementThunk();
          closeModal('confirm-update');
          history.push('/');
        }}
        cancelHandler={() => closeModal('confirm-update')}
      />
      <ConfirmationModal
        id="confirm-cancel"
        show={_.has(modals, 'confirm-cancel') && modals['confirm-cancel']}
        header={Trans.confirmCancelHeader}
        content={Trans.confirmCancel}
        confirmHandler={() => {
          closeModal('confirm-cancel');
          history.push('/');
        }}
        cancelHandler={() => closeModal('confirm-cancel')}
      />
      <ConfirmationModal
        id="confirm-delete"
        show={_.has(modals, 'confirm-delete') && modals['confirm-delete']}
        header={Trans.confirmDeleteHeader}
        content={Trans.confirmDelete}
        confirmHandler={() => {
          deleteAnnouncementThunk(history.push);
          closeModal('confirm-delete');
        }}
        cancelHandler={() => closeModal('confirm-delete')}
      />
    </div>
    {/* end confirmation modals */}

  </div>
);

export const AnnouncementEditContainer = connect(
  ({
    announcement,
    announcementCache,
    modals,
  }) => ({
    announcement,
    announcementCache,
    modals,
  }), _.pick(actionCreators, [
    'closeAnnouncementMessage',
    'putAnnouncementThunk',
    'deleteAnnouncementThunk',
    'openModal',
    'closeModal',
  ]),
)(withRouter(AnnouncementEdit));
