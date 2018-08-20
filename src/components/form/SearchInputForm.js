import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

export default class SearchInputForm extends React.Component {
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
   * invoked N seconds after an "onChange" event, thereby suggesting the user is no longer typing and the component
   * has therefore become inactive
   */
  onInactive() {
    if (_.isFunction(this.props.onInactive)) {
      this.props.onInactive();
    }
  }

  /**
   * @param {object} event
   */
  onChange(event) {
    this.safeClearTimeout();
    this.timeout = setTimeout(_.bind(this.onInactive, this), 1000);
    if (_.isFunction(this.props.onChange)) {
      this.props.onChange(event.target.value);
    }
  }

  /**
   * render
   * @returns {XML}
   */
  render() {
    return (
      <form className="search-input-form">
        <div className="form-group">
          {this.props.label ? <label htmlFor="search-input">{this.props.label}</label> : null}
          <input
            id="search-input"
            type="text"
            className="form-control"
            onChange={_.bind(this.onChange, this)}
            value={this.props.value}
            placeholder={this.props.placeholder}
            size={_.max([_.size(this.props.placeholder), 30])}
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
