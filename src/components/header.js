import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { email } = this.props;
    const totalExpenses = 0;
    const atualExchange = 'BRL';
    return (
      <div>
        <span data-testid="email-field">
          Usuário:
          {email}
        </span>
        <span data-testid="total-field">
          Total das despesas:
          {totalExpenses}
        </span>
        <span data-testid="header-currency-field">
          Câmbio atual:
          {atualExchange}
        </span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  email: PropTypes.string,
}.isRequired;
