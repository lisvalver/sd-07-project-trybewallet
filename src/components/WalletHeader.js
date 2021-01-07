import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class WalletHeader extends Component {
  render() {
    const { email } = this.props;
    return (
      <div>
        <div data-testid="email-field">
          {email}
        </div>
        <br />
        <div data-testid="total-field">
          0
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
};

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(WalletHeader);
