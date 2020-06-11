import React from 'react';
import ActionButton from './ActionButton';

/**
 * React component for rendering form action buttons (cancel and submit)
 * @param {boolean} disabled
 * @param {string} cancelText
 * @param {string} cancelAction
 * @param {string} actionText
 * @param {function} onClick
 * @returns {XML}
 */
export default ({
  disabled, cancelText, cancelAction, actionText, onClick,
}) => (
  <div className="action-buttons">
    <a href="#" onClick={cancelAction}>{cancelText}</a>
    <ActionButton
      disabled={disabled}
      onClick={onClick}
      text={actionText}
    />
  </div>
);
