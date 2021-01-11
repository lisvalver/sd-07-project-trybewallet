import React, { Component } from 'react';
import { connect } from 'react-redux';
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

const mapStateToProps = (state) => ({
  wallet: state.wallet,
});

Option.propTypes = {
  currency: propTypes.string,
}.isRequired;

export default connect(mapStateToProps, null)(Option);
