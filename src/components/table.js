import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Table extends React.Component {
  render() {
    return (
      <div>Tabela</div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);

// Descrição -> Vem do state global (expenses[0].description)
// Tag -> Vem do state global (expenses[0].tag)
// Método de pagamento -> Vem do state global (expenses[0].method)
// Valor -> Vem do state global (expenses[0].value)
// Moeda -> Vem do state global (expenses[0].currency)
// Câmbio utilizado -> Vem do state global (expenses[0].exchangeRates(find).ask)
// Valor convertido -> Cambio utilizado * Valor
// Moeda de conversão -> 'BRL' (a confirmar)
