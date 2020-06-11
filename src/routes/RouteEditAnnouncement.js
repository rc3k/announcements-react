import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { AnnouncementEditContainer } from '../components/AnnouncementEdit';
import * as actions from '../actionCreators';

export class RouteEditAnnouncement extends React.Component {
  /**
   * React component lifecycle method
   */
  componentDidMount() {
    const { getAnnouncementThunk, match } = this.props;
    getAnnouncementThunk(match.params.id);
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
  getAnnouncementThunk: PropTypes.func.isRequired,
  params: PropTypes.objectOf(PropTypes.string).isRequired,
};

export const RouteEditAnnouncementContainer = connect(
  () => ({}), { getAnnouncementThunk: actions.getAnnouncementThunk },
)(RouteEditAnnouncement);
