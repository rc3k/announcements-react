import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { AnnouncementAddContainer } from '../components/AnnouncementAdd';
import { addAnnouncement } from '../actionCreators';

export default class RouteAddAnnouncement extends React.Component {
  /**
   * React component lifecycle method
   */
  componentDidMount() {
    this.props.addAnnouncement();
  }

  /**
   * render
   * @returns {XML}
   */
  render() {
    return <AnnouncementAddContainer />;
  }
}

RouteAddAnnouncement.propTypes = {
  addAnnouncement: PropTypes.func,
};

export const RouteAddAnnouncementContainer = connect(() => ({}), { addAnnouncement })(RouteAddAnnouncement);
