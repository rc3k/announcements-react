import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { AnnouncementViewContainer } from '../components/AnnouncementView';
import * as actions from '../actionCreators';

export class RouteViewAnnouncement extends React.Component {
  /**
   * React component lifecycle method
   */
  componentDidMount() {
    const { match, getAnnouncementThunk } = this.props;
    getAnnouncementThunk(match.params.id);
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
  getAnnouncementThunk: PropTypes.func.isRequired,
  params: PropTypes.objectOf(PropTypes.string).isRequired,
};

export const RouteViewAnnouncementContainer = connect(
  () => ({}),
  { getAnnouncementThunk: actions.getAnnouncementThunk },
)(RouteViewAnnouncement);
