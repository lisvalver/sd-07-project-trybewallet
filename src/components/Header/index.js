import React from 'react';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { email, expenses } = this.props;
    return (
      <div>
        <h1 data-testid="email-field">{email}</h1>
        <h2 data-testid="total-field">
          {expenses.reduce(
            (acc, act) => acc
              + Number(act.exchangeRates[act.currency].ask) * Number(act.value),
            0,
          )}
        </h2>
        <h2 data-testid="header-currency-field">BRL</h2>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
