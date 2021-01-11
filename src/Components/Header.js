import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  constructor(props) {
    super(props);
    this.calculaDespesa = this.calculaDespesa.bind(this);
  }

  calculaDespesa() {
    const { expenses } = this.props;
    return (expenses.reduce((acc, item) => acc
    + item.value * item.exchangeRates[item.currency].ask, 0)).toFixed(2);
  }

  render() {
    const { email } = this.props;
    return (
      <header>
        <section data-testid="email-field">
          Email:
          { ' ' }
          { email === undefined ? 'email não inserido ' : email }
          { ' ' }
          <div data-testid="total-field">
            Despesas Totais: R$
            { ' ' }
            { this.calculaDespesa() }
            { ' ' }
            <span data-testid="header-currency-field">BRL</span>
          </div>
        </section>

      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.objectOf.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
