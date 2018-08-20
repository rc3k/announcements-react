import React from 'react';
import { withRouter } from 'react-router';
import _ from 'lodash';
import moment from 'moment';

/**
 * React component for an announcement row
 * @param {object} history
 * @param {object} announcement
 * @returns {XML}
 */
const TableRow = ({ history, announcement }) => {
  const recipient = announcement.recipient.split('\n');
  const visibleFrom = moment(announcement.visible_from);
  return (
    <tr onClick={() => history.push(`/edit/${announcement.id}`)}>
      <td>
        {announcement.display_id}
        {announcement.modified > announcement.created ? (
          <span className="glyphicon glyphicon-pencil">&nbsp;</span>
        ) : null}
      </td>
      <td>
        {_.map(recipient, (r, i) => (<span key={i} className="clearfix">{_.trim(r)}</span>))}
      </td>
      <td>
        {visibleFrom.format('DD/MM/YYYY')}
        {visibleFrom > moment() ? (
          <span className="glyphicon glyphicon-time">&nbsp;</span>
        ) : null}
      </td>
      <td>{announcement.subject}</td>
    </tr>
  );
};

export default withRouter(TableRow);
