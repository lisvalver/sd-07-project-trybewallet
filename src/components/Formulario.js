import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    // const { wallet } = this.props;
    // const { currencies, expenses } = wallet;
    return (
      <div>
        <h2>Adicionar Nova Despesa</h2>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  wallet: state.wallet,
});

Header.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }).isRequired,
  wallet: PropTypes.shape({
    expenses: PropTypes.arrayOf.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Formulario);
