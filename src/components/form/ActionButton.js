import React from 'react';

/**
 * React component wrapping a button to create an announcement
 * @param {boolean} disabled
 * @param {function} onClick
 * @param {string} text
 * @returns {XML}
 */
const ActionButton = ({ disabled, onClick, text }) => (
  <button
    type="button"
    disabled={disabled}
    onClick={onClick}
    className="btn btn-default"
  >
    {text}
  </button>
);

ActionButton.defaultProps = {
  icon: null,
  classes: null,
  disabled: false,
};

export default ActionButton;
