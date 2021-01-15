import React, { Component } from 'react';

import { connect } from 'react-redux';

class WalletHeader extends Component {
  render() {
    const { email } = this.props;
    return (
      <div>
        <div data-testid="email-field">{email}</div>
        <div data-testid="total-field">0</div>
        <div data-testid="header-currency-field">BRL</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(WalletHeader);
