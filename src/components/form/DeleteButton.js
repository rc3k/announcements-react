import React from 'react';

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
  const f = () => onClick();
  return (
    <button
      type="button"
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
