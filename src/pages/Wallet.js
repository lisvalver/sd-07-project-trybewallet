import React from 'react';
import { connect } from 'react-redux';

class Wallet extends React.Component {
  render() {
    // eslint-disable-next-line react/prop-types
    const { email } = this.props;
    return (
      <div>
        TrybeWallet
        <header>
          <p data-testid="email-field">{email}</p>
          <p data-testid="total-field">{0}</p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
      </div>);
  }
}
const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Wallet);
