import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { AnnouncementEditContainer } from '../components/AnnouncementEdit';
import { getAnnouncementThunk } from '../actionCreators';

export class RouteEditAnnouncement extends React.Component {
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
    return <AnnouncementEditContainer />;
  }
}

RouteEditAnnouncement.propTypes = {
  getAnnouncementThunk: PropTypes.func,
  params: PropTypes.object,
};

export const RouteEditAnnouncementContainer = connect(() => ({}), { getAnnouncementThunk })(RouteEditAnnouncement);
