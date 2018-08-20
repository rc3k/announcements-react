import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

/**
 * React component wrapping a Bootstrap dismissible alert
 * @param {string} title
 * @param {boolean} visible
 * @param {string} alertType
 * @param {string} message
 * @param {function} onClick
 * @returns {XML}
 */
const DismissibleAlert = ({
  title, visible, alertType, message, onClick,
}) => (visible ? (
  <div className={`alert alert-${alertType} alert-dismissible`} role="alert">
    <button type="button" className="close" onClick={onClick} aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
    {_.size(title) > 0 ? <strong>{title}</strong> : null}
    {' '}
    {message}
  </div>
) : <div />);

DismissibleAlert.propTypes = {
  title: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  alertType: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default DismissibleAlert;
