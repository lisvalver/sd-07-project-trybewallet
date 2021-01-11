import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      despesatotal: 0,
    }

    this.calculaDespesa = this.calculaDespesa.bind(this);
  }

  calculaDespesa() {
    const { expenses } = this.props;
    const despesatotal = (expenses.reduce((acc, item) => acc
    + item.espense.value * item.exchangeRates[item.currency].ask, 0)).toFixed(2);
    this.setState({ despesatotal }); 
  }

  render() {
    const { email } = this.props;
    const { despesatotal } = this.state; 
    return (
      <header>
        <section data-testid="email-field">
          Email:
          { ' ' }
          { email }
          { ' ' }
          <div data-testid="total-field">
            Despesas Totais: R$
            { ' ' }
            { despesatotal }
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
