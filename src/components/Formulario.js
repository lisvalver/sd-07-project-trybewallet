import React, { Component } from 'react';
// import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Formulario extends Component {
  constructor(props) {
    super(props);

    this.sendNewExpenseInfos = this.sendNewExpenseInfos.bind(this);

    this.state = {
      newExpenseValue: 0,
    };
  }

  sendNewExpenseInfos({ target }) {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    // const { wallet } = this.props;
    // const { currencies, expenses } = wallet;
    const { newExpenseValue } = this.state;
    return (
      <div>
        <form id="addExpensesForm">
          <h2>Adicionar Nova Despesa</h2>
          <label htmlFor="newExpenseValue">
            Valor da Despesa:
            <input
              type="number"
              id="newExpenseValue"
              name="newExpenseValue"
              step="0.01"
              min="0"
              value={ newExpenseValue }
              data-testid="value-input"
              onChange={ this.sendNewExpenseInfos }
            />
          </label>
        </form>
      </div>
    );
  }
}

// const mapStateToProps = (state) => ({
//   wallet: state.wallet,
// });

Formulario.propTypes = {
  wallet: PropTypes.shape({
    expenses: PropTypes.arrayOf.isRequired,
  }).isRequired,
};

// export default connect(mapStateToProps, mapDispatchToProps)(Formulario);

export default Formulario;
