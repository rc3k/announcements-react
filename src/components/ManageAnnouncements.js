import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import TableHeading from './table/TableHeading';
import TableHeadingSortable from './table/TableHeadingSortable';
import TableRow from './table/TableRow';
import SearchInputForm from './form/SearchInputForm';
import DismissibleAlert from './DismissibleAlert';
import PaginationWrapper from './table/PaginationWrapper';
import Trans from '../Trans';
import * as actionCreators from '../actionCreators';

/**
 * get the column order
 * @param {object} query
 * @param {string} column
 * @returns {string}
 */
const getColumnOrder = (query, column) => (query.column === column ? query.order : '');

/**
 * get the table row HTML
 * @param {object[]} announcements
 * @returns {XML[]}
 */
const tableRows = (announcements) => _.map(announcements, (ann) => (
  <TableRow
    key={ann.id}
    announcement={ann}
  />
));

/**
 * React component for managing announcements
 * @param {object} announcementsList
 * @param {object} announcementsQuery
 * @param {function} closeAnnouncementsListMessage
 * @param {function} setSortOrderThunk
 * @param {function} setPageThunk
 * @param {function} setQuery
 * @param {function} resetQueryThunk
 * @param {function} resetPageThunk
 * @returns {XML}
 */
export const ManageAnnouncements = ({
  announcementsList,
  announcementsQuery,
  closeAnnouncementsListMessage,
  setSortOrderThunk,
  setPageThunk,
  setQuery,
  resetPageThunk,
  resetQueryThunk,
}) => (
  <div className="manage-announcements">

    {/* begin heading, intro paragraph, dismissible alert */}
    <div className="row well">
      <h2 className="pull-left">{Trans.announcementManagement}</h2>
      <Link to="/add" className="btn btn-link pull-right">{Trans.createNewAnnouncement}</Link>
    </div>
    <p>{Trans.announcementManagementDescription}</p>
    <DismissibleAlert
      title={_.has(announcementsList, 'message.title') ? announcementsList.message.title : ''}
      visible={_.has(announcementsList, 'message')}
      alertType={_.has(announcementsList, 'message.alertType') ? announcementsList.message.alertType : ''}
      message={_.has(announcementsList, 'message.message') ? announcementsList.message.message : ''}
      onClick={closeAnnouncementsListMessage}
    />
    {/* end heading, intro paragraph, dismissible alert */}

    {/* begin header actions */}
    <h3>{Trans.searchAnnouncements}</h3>
    <div className="row announcements-search">
      <div className="pull-left">
        <SearchInputForm
          value={announcementsQuery.q}
          label=""
          onChange={setQuery}
          onInactive={resetPageThunk}
          placeholder={Trans.searchAnnouncementsDesc}
        />
      </div>
      <div className="pull-left">
        <a onClick={() => resetQueryThunk('')}>{Trans.resetQuery}</a>
      </div>
    </div>
    {/* end header actions */}

    {/* begin pagination */}
    <PaginationWrapper
      page={announcementsQuery.page}
      total={announcementsList.total}
      perPage={announcementsQuery.per_page}
      onPageChange={setPageThunk}
    />
    {/* end pagination */}

    {/* begin announcements table */}
    <table className="table table-striped table-hover table-announcements">
      <thead>
        <tr>
          <TableHeadingSortable
            column="announcement_id"
            order={getColumnOrder(announcementsQuery, 'announcement_id')}
            setSortOrder={setSortOrderThunk}
          />
          <TableHeadingSortable
            column="recipient"
            order={getColumnOrder(announcementsQuery, 'recipient')}
            setSortOrder={setSortOrderThunk}
          />
          <TableHeadingSortable
            column="visible_from"
            order={getColumnOrder(announcementsQuery, 'visible_from')}
            setSortOrder={setSortOrderThunk}
          />
          <TableHeading
            column="subject"
          />
        </tr>
      </thead>
      <tbody>
        {_.size(announcementsList.announcements) === 0 ? (
          <tr>
            <td colSpan="6">{Trans.noAnnouncements}</td>
          </tr>
        ) : null}
        {tableRows(announcementsList.announcements)}
      </tbody>
    </table>
    {/* end announcements table */}

    {/* begin pagination */}
    <PaginationWrapper
      page={announcementsQuery.page}
      total={announcementsList.total}
      perPage={announcementsQuery.per_page}
      onPageChange={setPageThunk}
    />
    {/* end pagination */}

  </div>
);

export const ManageAnnouncementsContainer = connect(({
  announcementsList,
  announcementsQuery,
}) => ({
  announcementsList,
  announcementsQuery,
}), _.pick(actionCreators, [
  'closeAnnouncementsListMessage',
  'setSortOrderThunk',
  'setPageThunk',
  'setQuery',
  'resetPageThunk',
  'resetQueryThunk']))(ManageAnnouncements);
