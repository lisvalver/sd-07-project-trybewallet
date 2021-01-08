import React from 'react';
import { connect } from 'react-redux';

class Header extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    const { email, totalExpense } = this.props;
    const COIN_TYPE = 'BRL'

    return(
      <header>
        <div>
          <p>
            Email:
            <span data-testid="email-field">
              { email }
            </span>
          </p>
          <p>
            Despesa Total:
            <span data-testid="total-field">
              { totalExpense }
            </span>
            <span data-testid="header-currency-field">
              { COIN_TYPE }
            </span>
          </p>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  const expensesArr = state.wallet.expenses;

  const totalExpense = expensesArr.reduce((result, expense) => {
    const value = expense.value;
    const currency = expense.currency;
    const teste2 = expense.exchangeRates[currency].ask;
    const convertForBRL = Number(value) * Number(teste2);
    return result + convertForBRL;
  }, 0);

  return ({ email: state.user.email, totalExpense });
}

export default connect(mapStateToProps, null)(Header);
