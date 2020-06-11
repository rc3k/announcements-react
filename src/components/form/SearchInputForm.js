import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

export default class SearchInputForm extends React.Component {
  /**
   * invoked N seconds after an "onChange" event,
   * thereby suggesting the user is no longer typing and the component
   * has therefore become inactive
   */
  onInactive() {
    const { onInactive } = this.props;
    if (_.isFunction(onInactive)) {
      onInactive();
    }
  }

  /**
   * @param {object} event
   */
  onChange(event) {
    const { onChange } = this.props;
    this.safeClearTimeout();
    this.timeout = setTimeout(_.bind(this.onInactive, this), 1000);
    if (_.isFunction(onChange)) {
      onChange(event.target.value);
    }
  }

  /**
   * clears the timeout
   */
  safeClearTimeout() {
    if (_.has(this, 'timeout') && _.isNumber(this.timeout)) {
      clearTimeout(this.timeout);
      delete this.timeout;
    }
  }

  /**
   * render
   * @returns {XML}
   */
  render() {
    const { label, value, placeholder } = this.props;
    return (
      <form className="search-input-form">
        <div className="form-group">
          {label ? <label htmlFor="search-input">{label}</label> : null}
          <input
            id="search-input"
            type="text"
            className="form-control"
            onChange={_.bind(this.onChange, this)}
            value={value}
            placeholder={placeholder}
            size={_.max([_.size(placeholder), 30])}
          />
        </div>
      </form>
    );
  }
}

SearchInputForm.propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onInactive: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

SearchInputForm.defaultProps = {
  placeholder: '',
};
