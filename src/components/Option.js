import React, { Component } from 'react';
import propTypes from 'prop-types';

class Option extends Component {
  render() {
    const { currency } = this.props;
    return (
      <option value={ currency } data-testid={ currency }>
        { currency }
      </option>
    );
  }
}

Option.propTypes = {
  currency: propTypes.string,
}.isRequired;

export default Option;
