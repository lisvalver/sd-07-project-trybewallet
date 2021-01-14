import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Logo from '../services/Logo';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = ({ displayedValue: 0 });

    this.getTotalValue = this.getTotalValue.bind(this);
  }

  getTotalValue(displayedValue) {
    const { wallet: { expenses } } = this.props;
    const convertedValue = expenses
      .map(({ value, currency, exchangeRates }) => {
        const converted = value * exchangeRates[currency].ask;
        return converted + displayedValue;
      });
    const sum = convertedValue.reduce((cur, acc) => cur + acc, 0);
    const total = sum.toFixed(2);
    return total;
  }

  render() {
    const { email } = this.props;
    const { displayedValue } = this.state;
    return (
      <header className="email-field">
        {Logo('wallet-icons')}
        <div>
          <div className="user-header">
            <div data-testid="email-field">
              <strong>{email}</strong>
            </div>
            Despesa total:
            <span data-testid="total-field">{ this.getTotalValue(displayedValue) }</span>
            <span data-testid="header-currency-field">BRL</span>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  const { email } = state.user;
  const { wallet } = state;
  return { email, wallet };
};

Header.propTypes = {
  email: PropTypes.string,
  expenses: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps)(Header);
