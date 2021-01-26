import React from 'react';
import { connect } from 'react-redux';

class Wallet extends React.Component {
  render() {
    const { email, total = 0 } = this.props;
    return (
      <div>
        <header>
          <h1 data-testid="email-field">{email}</h1>
          <h2 data-testid="total-field">{total}</h2>
          <h3 data-testid="header-currency-field">BRL</h3>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ // trouxe o rootReducer
  email: state.user.email,
  total: state.wallet.total,
});

export default connect(mapStateToProps)(Wallet);
