import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { email, totalExpenses = 0 } = this.props;
    return (
      <header>
        <p data-testid="email-field">{`Email: ${email} `}</p>
        <div data-testid="total-field">
          Total de Despesas:
          <span>{totalExpenses}</span>
        </div>
        <p data-testid="header-currency-field">BRL</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
  totalExpenses: state.wallet.totalExpenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  totalExpenses: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(Header);
