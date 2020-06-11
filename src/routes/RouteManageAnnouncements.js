import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { ManageAnnouncementsContainer } from '../components/ManageAnnouncements';
import * as actions from '../actionCreators';

export class RouteManageAnnouncements extends React.Component {
  /**
   * React component lifecycle method
   */
  componentDidMount() {
    const { getAnnouncementsThunk } = this.props;
    getAnnouncementsThunk();
  }

  /**
   * render
   * @returns {XML}
   */
  render() {
    return <ManageAnnouncementsContainer />;
  }
}

RouteManageAnnouncements.propTypes = {
  getAnnouncementsThunk: PropTypes.func.isRequired,
};

export const RouteManageAnnouncementsContainer = connect(
  () => ({}), { getAnnouncementsThunk: actions.getAnnouncementsThunk },
)(RouteManageAnnouncements);
