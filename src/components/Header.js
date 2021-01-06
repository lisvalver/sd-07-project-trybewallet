import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  sumValues() {
    const { expenses } = this.props;
    if (expenses.length === 0) return 0;
    let result = 0;
    expenses.forEach(({ value, exchangeRates, currency }) => {
      result += value * exchangeRates[currency].ask;
    });
    return Number(result).toFixed(2);
  }

  render() {
    const { email } = this.props;

    return (
      <div
        style={ {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'orange',
        } }
      >
        <h1 style={ { marginLeft: 40 } }>Trybe Wallet</h1>
        <div>
          <span
            data-testid="email-field"
            style={ { marginRight: 50 } }
          >
            Email:
            { email }
          </span>
          <span
            data-testid="total-field"
            style={ { marginRight: 10 } }
          >
            Despesa total: R$
            {this.sumValues()}
          </span>
          <span
            data-testid="header-currency-field"
            style={ { marginRight: 40 } }
          >
            BRL
          </span>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object),
  email: PropTypes.string,
}.isRequired;

const mapStateToProps = ({ user: { email }, wallet: { expenses } }) => ({
  email,
  expenses,
});

export default connect(mapStateToProps)(Header);
