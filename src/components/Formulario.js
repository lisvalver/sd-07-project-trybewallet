import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import apiCurrenciesDispatch from '../actions';

class Formulario extends Component {
  constructor(props) {
    super(props);

    this.sendNewExpenseInfos = this.sendNewExpenseInfos.bind(this);

    this.state = {
      newExpenseValue: 0,
      expenseDescription: '',
      selectedCurrency: '',
    };
  }

  componentDidMount() {
    const { apiCurrencies } = this.props;
    apiCurrencies();
  }

  sendNewExpenseInfos({ target }) {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { wallet } = this.props;
    const {
      currencies,
      // expenses,
      isFetching,
      // error,
    } = wallet;
    const { newExpenseValue, expenseDescription, selectedCurrency } = this.state;
    return (
      <div>
        {isFetching ? <p>Carregando...</p>
          : (
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
              <br />
              <label htmlFor="expenseDescription">
                Valor da Despesa:
                <input
                  type="text"
                  id="expenseDescription"
                  name="expenseDescription"
                  value={ expenseDescription }
                  data-testid="description-input"
                  onChange={ this.sendNewExpenseInfos }
                />
              </label>
              <br />
              <label htmlFor="currency">
                Moeda:
                <select
                  id="currency"
                  name="currency"
                  data-testid="currency-input"
                  value={ selectedCurrency }
                  onChange={ this.sendNewExpenseInfos }
                >
                  {currencies.map((currency) => (
                    <option
                      key={ currency }
                      data-testid={ `${currency}` }
                    >
                      {currency}
                    </option>))}
                </select>
              </label>
            </form>
          )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  wallet: state.wallet,
});

const mapDispatchToProps = (dispatch) => ({
  apiCurrencies: () => dispatch(apiCurrenciesDispatch()),
});

Formulario.propTypes = {
  wallet: PropTypes.shape({
    expenses: PropTypes.arrayOf.isRequired,
    currencies: PropTypes.arrayOf.isRequired,
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.string,
  }).isRequired,
  apiCurrencies: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Formulario);
