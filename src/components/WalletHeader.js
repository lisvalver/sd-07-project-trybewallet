import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class WalletHeader extends Component {
  render() {
    const { email, total = 0 } = this.props;
    return (
      <div>
        <div data-testid="email-field">
          {email}
        </div>
        <br />
        <div data-testid="total-field">
          {total}
        </div>
        <br />
        <div data-testid="header-currency-field">
          BRL
        </div>
      </div>);
  }
}

WalletHeader.propTypes = {
  email: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  total: state.wallet.total,
});

export default connect(mapStateToProps)(WalletHeader);
