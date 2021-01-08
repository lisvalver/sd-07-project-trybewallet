import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { wallet } from '../actions';

class Header extends Component {
  componentDidMount() {
    const { despesasTotais } = this.props;
    const despesa = 0;
    despesasTotais(despesa);
  }

  render() {
    const { email, despesas } = this.props;
    return (
      <header>
        <section data-testid="email-field">
          Email:
          { ' ' }
          { email }
        </section>
        <section data-testid="total-field">
          Despesas Totais: R$
          { ' ' }
          { despesas }
        </section>
        <section data-testid="header-currency-field">BRL</section>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  despesas: PropTypes.string.isRequired,
  despesasTotais: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  despesas: state.wallet.despesas,
});

const mapDispatchToProps = (dispatch) => ({
  despesasTotais: (despesaTotal) => dispatch(wallet(despesaTotal)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
