import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  constructor() {
    super();

    this.sumOfExpenses = this.sumOfExpenses.bind(this);
  }

  // method Number() usado para converter a soma para número; Visto na documentação MDN;

  sumOfExpenses() {
    const { totalExpenses } = this.props;
    const sumOfTotalExpense = totalExpenses.reduce((acc, curr) => {
      const { value, exchangeRates, currency } = curr;
      return Number(acc + exchangeRates[currency].ask * value);
    }, 0);
    return sumOfTotalExpense;
  }

  render() {
    const { email, totalExpenses } = this.props;
    return (
      <div>
        <p data-testid="email-field">{email}</p>
        <h5 data-testid="total-field">
          {totalExpenses && totalExpenses.length > 0 ? this.sumOfExpenses().toFixed(2) : 0 }
        </h5>
        <h5 data-testid="header-currency-field">BRL</h5>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  totalExpenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  totalExpenses: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps)(Header);
