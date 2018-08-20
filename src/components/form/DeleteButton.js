import React from 'react';
import PropTypes from 'prop-types';

/**
 * React component wrapping a button to create an announcement
 * @param {boolean} disabled
 * @param {function} onClick
 * @param {string} text
 * @param {?string} icon
 * @returns {XML}
 */
export const ActionButton = ({
  disabled, onClick, text, icon,
}) => {
  // assigning the below function to 'f' is a workaround for a strange Babel(ify) problem
  // without this, I get a compiler error "'import' and 'export' may appear only with 'sourceType: module'"
  const f = () => onClick();
  return (
    <button
      disabled={disabled}
      onClick={f}
      className="btn btn-default"
    >
      {icon ? (
        <span className={`glyphicon glyphicon-${icon}`} />
      ) : null}
      {text}
    </button>
  );
};

ActionButton.defaultProps = {
  icon: null,
};

export default ActionButton;
