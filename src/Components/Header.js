import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { wallet } from '../actions';

class Header extends Component {
  render() {
    const { email, despesas } = this.props;
    return (
      <header>
        <section data-testid="email-field">
          Email:
          { email }
        </section>
        <section data-testid="total-field">
          Despesas Totais: R$
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
};

const mapStateToProps = (state) => ({
  email: state.user.email,
});

const mapDispatchToProps = (dispatch) => ({
  despesasTotais: (payload) => dispatch(wallet(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
