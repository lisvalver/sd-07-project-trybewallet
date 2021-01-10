import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Wallet extends Component {
  render() {
    const { userLogin } = this.props;
    return (
      <div>
        <span data-testid="email-field">{ userLogin }</span>
        <span data-testid="total-field">0</span>
        <span data-testid="header-currency-field">BRL</span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userLogin: state.user.email,
});

Wallet.propTypes = {
  userLogin: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Wallet);
