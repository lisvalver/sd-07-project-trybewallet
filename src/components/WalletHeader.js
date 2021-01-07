import React from 'react';
import { connect } from 'react-redux';

class WalletHeader extends React.Component {
  render() {
    const { email, expenses } = this.props;
    const total = expenses.reduce((acc, expenses) => {
      //return acc + currentValue
    }, 0);
    return (
      <header>
        <div>
          <p data-testid="email-field">{ email }</p>
        </div>
        <div>
          <p data-testid="total-field">{ expenses }</p>
        </div>
        <div>
          <p data-testid="header-currency-field">BRL</p>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(WalletHeader);
