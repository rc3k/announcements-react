import React from 'react';
import _ from 'lodash';

import ActionButton from './ActionButton';
import Trans from '../../Trans';

/**
 * React component for the announcement metadata
 * @param {string} id
 * @param {object} modified
 * @param {object} created
 * @param {function} onDeleteClick
 * @returns {XML}
 */
export default ({
  id, modified, created, onDeleteClick,
}) => (

  <div className="row announcement-meta">

    {/* begin announcement metadata */}
    <div className="col-md-6">
      <div className="unique-announcement-id text-left">
        <label>
          {Trans.uniqueAnnouncementID}
          :
        </label>
        <span>{id}</span>
      </div>
      {(!_.isObject(modified) || _.isEqual(modified, created)) ? null : (
        <div className="last-modified text-left">
          <label>
            {Trans.lastModified}
            :
          </label>
          <span>{modified.format('dddd Do MMMM YYYY HH:mm')}</span>
        </div>
      )}
    </div>
    {/* end announcement metadata */}

    {/* begin delete button */}
    <div className="col-md-6">
      <ActionButton
        onClick={onDeleteClick}
        text={Trans.delete}
        icon="trash"
        classes={['btn-delete', 'pull-right']}
      />
    </div>
    {/* end delete button */}
  </div>
);
