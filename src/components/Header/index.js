import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { userEmail, amount = 0 } = this.props;
    const amountPrecision = amount.toFixed(2);

    return (
      <header>
        <span>
          TrybeWallet
        </span>
        <span data-testid="email-field">
          { `Email: ${userEmail}` }
        </span>
        <span data-testid="total-field">
          { `Despesa Total: R$ ${amountPrecision}` }
        </span>
        <span data-testid="header-currency-field">
          BRL
        </span>
      </header>
    );
  }
}

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  amount: state.wallet.expenseValueConverted,
});

export default connect(mapStateToProps)(Header);
