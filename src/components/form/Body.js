import React from 'react';
import CKEditorWrapper from './CKEditorWrapper';

/**
 * React component for an announcement's body
 * @param {string} body
 * @param {function} setBody
 * @param {boolean} disabled
 * @returns {XML}
 */
export default ({ body, setBody, disabled }) => (
  <div className="form-group">
    <CKEditorWrapper
      id="id_body"
      value={body}
      onChange={setBody}
      disabled={disabled}
    />
  </div>
);
