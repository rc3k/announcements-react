import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

export default class CKEditorWrapper extends React.Component {
  /**
   * React component lifecycle method
   */
  componentDidMount() {
    if (_.has(window, 'CKEDITOR.replace')) {
      const {
        id, removeButtons, onChange, value,
      } = this.props;
      this.editor = CKEDITOR.replace(id, { // eslint-disable-line no-undef
        removeButtons,
      });
      this.invokeOnChange = true;
      this.editor.on('change', () => {
        if (this.invokeOnChange) {
          onChange(this.editor.getData());
        }
      });
      this.editor.setData(value);
    }
  }

  /**
   * React component lifecycle method
   */
  componentWillReceiveProps({ value }) {
    if (_.has(this, 'editor') && value !== this.editor.getData()) {
      this.invokeOnChange = false;
      this.editor.setData(value);
      this.invokeOnChange = true;
    }
  }

  /**
   * React component lifecycle method
   */
  componentWillUnmount() {
    if (_.has(this, 'editor')) {
      this.editor.destroy();
    }
  }

  /**
   * @returns {XML}
   */
  render() {
    const {
      id, onChange, value, disabled,
    } = this.props;
    return (
      <textarea
        className="form-control"
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        disabled={disabled}
      />
    );
  }
}

CKEditorWrapper.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  removeButtons: PropTypes.string,
};

CKEditorWrapper.defaultProps = {
  disabled: false,
  removeButtons: 'Cut,Copy,Paste,Undo,Redo,Anchor,Strike,Subscript,Superscript,About',
};
