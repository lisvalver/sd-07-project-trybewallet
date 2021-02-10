import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      totalValue: 0,
    };

    this.createTotal = this.createTotal.bind(this);
  }

  createTotal() {
    const { expenses } = this.props;
    const total = expenses.reduce((acc, atual) => {
      return acc + atual.value * atual.exchangeRates[atual.currency].ask;
    }, 0);

    return acc;
  }

  render() {
    const { email } = this.props;
    // const INITIAL_VALUE = (zeroTotal = 0) => zeroTotal;
    return (
      <div>
        <header className="header-wallet">
          <div className="info-box">
            <p>
              <strong>Email: </strong>
              <span data-testid="email-field">{ email }</span>
            </p>
            <p className="expense-box">
              <strong>Despesa total: </strong>
              <span data-testid="total-field">{ this.createTotal() }</span>
              <span data-testid="header-currency-field">BRL</span>
            </p>
          </div>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
  total: state.wallet.total,
  currencies: state.wallet.currencies,
});

Header.propTypes = {
  expenses: PropTypes.arrayOf().isRequired,
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
