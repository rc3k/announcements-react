import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { AnnouncementViewContainer } from '../components/AnnouncementView';
import { getAnnouncementThunk } from '../actionCreators';

export class RouteViewAnnouncement extends React.Component {
  /**
   * React component lifecycle method
   */
  componentDidMount() {
    this.props.getAnnouncementThunk(this.props.match.params.id);
  }

  /**
   * render
   * @returns {XML}
   */
  render() {
    return <AnnouncementViewContainer />;
  }
}

RouteViewAnnouncement.propTypes = {
  getAnnouncementThunk: PropTypes.func,
  params: PropTypes.object,
};

export const RouteViewAnnouncementContainer = connect(() => ({}), { getAnnouncementThunk })(RouteViewAnnouncement);
