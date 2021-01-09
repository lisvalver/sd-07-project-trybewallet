import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Header.css';

class Header extends React.Component {
  render() {
    const { email, totalExpense } = this.props;
    return (

      <header className="wallet-header">
        <h1 className="wallet-logo">TrybeWallet</h1>
        <div className="wallet-header-information">
          <h3 data-testid="email-field">{ email }</h3>
          <h3 data-testid="total-field">{` Total:  ${totalExpense.toString()}`}</h3>
          <h3 data-testid="header-currency-field">BRL</h3>
        </div>
      </header>

    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  totalExpense: state.wallet.totalExpense,
});

Header.defaultProps = {
  totalExpense: 0,
};

Header.propTypes = {
  email: PropTypes.string.isRequired,
  totalExpense: PropTypes.number,
};

export default connect(mapStateToProps)(Header);
