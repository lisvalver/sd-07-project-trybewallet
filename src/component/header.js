import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  constructor() {
    super();
    this.calcExpenses = this.calcExpenses.bind(this);
  }

  calcExpenses() {
    const { wallet } = this.props;
    if (wallet.length === 0) return 0;
    amount = wallet.reduce((previousValue, { value }) => {
      const montante = previousValue + value;
      return montante;
    }, 0);
  }

  render() {
    const { email } = this.props;

    return (
      <header>
        <div data-testid="email-field">
          Email:
          {email}
        </div>
        <div data-testid="total-field">
          Despesa: 0
        </div>
        <div data-testid="header-currency-field">
          Câmbio: BRL
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  wallet: state.wallet,
});

export default connect(mapStateToProps, null)(Header);

Header.propTypes = {
  email: PropTypes.string.isRequired,
};
