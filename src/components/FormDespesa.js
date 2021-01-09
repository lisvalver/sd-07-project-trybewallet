import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies, expenses } from '../actions';

class FormDespesa extends Component {
  constructor() {
    super();
    this.handleAddExpense = this.handleAddExpense.bind(this);
    this.handleChange = this.handleChange.bind(this);
    // this.filteredCurrencies = this.filteredCurrencies.bind(this);
    this.state = {
      id: 0,
      value: '',
      description: '',
      method: 'Dinheiro',
      category: 'Alimentação',
      exchangeRates: {},
      currency: 'USD',
      ask: '',
      name: '',
    };
  }

  componentDidMount() {
    const { getAllCurrencies } = this.props;
    getAllCurrencies();
  }

  removingUSDT(arrayOfObjects) {
    const currenciesWithoutUSDT = Object.entries(arrayOfObjects[0])
      .filter((value) => value[0] !== 'USDT')
      .map((newValue) => newValue[0]);

    return currenciesWithoutUSDT;
  }

  handleChange(field, newValue) {
    this.setState({ [field]: newValue });
  }

  handleAddExpense() {
    const { getAllCurrencies } = this.props;
    getAllCurrencies();
    const { addExpense, currencies } = this.props;
    const allCurrencies = currencies[0];
    const { currency } = this.state;
    // const { currency } = this.state;
    console.log(this.state);
    console.log(currency);
    console.log(allCurrencies);
    const askValue = allCurrencies[currency].ask;
    const nameCurrency = allCurrencies[currency].name;
    console.log(askValue);
    console.log(nameCurrency);
    this.setState(
      () => ({
        exchangeRates: allCurrencies,
        ask: askValue,
        name: nameCurrency,
      }),
      () => {
        addExpense(this.state);
        this.setState((previousState) => ({
          id: previousState.id + 1,
          value: '',
          description: '',
          method: 'Dinheiro',
          category: 'Alimentação',
          exchangeRates: {},
          ask: '',
          name: '',
          currency: 'USD',
        }));
      },
    );
    console.log(this.state);
    // addExpense(this.state);
    // console.log(allCurrencies[currency]);
  }
  /*
  filteredCurrencies() {
    const { currencies } = this.props;
    console.log(currencies);
    return currencies[0].filter();
  } */

  render() {
    // console.log(this.props);
    const { value, description, method, category, currency } = this.state;
    const { currencies } = this.props;
    let arrayCurrencies;
    if (currencies.length > 0) {
      // arrayCurrencies = Object.keys(currencies[0]);
      arrayCurrencies = this.removingUSDT(currencies);
      // console.log(this.state);
    } else {
      arrayCurrencies = [];
    }
    return (
      <div>
        <input
          data-testid="value-input"
          placeholder="Valor da Despesa"
          value={ value }
          onChange={ (event) => this.handleChange('value', event.target.value) }
        />
        <input
          data-testid="description-input"
          placeholder="Descrição da Despesa"
          value={ description }
          onChange={ (event) => this.handleChange('description', event.target.value) }
        />

        <select
          id="moeda"
          data-testid="currency-input"
          value={ currency }
          onChange={ (event) => this.handleChange('currency', event.target.value) }
        >
          {
            arrayCurrencies.length === 0
              ? null
              : arrayCurrencies.map(
                (itemCurrency) => (
                  <option
                    key={ itemCurrency }
                    data-testid={ itemCurrency }
                    value={ itemCurrency }
                  >
                    {itemCurrency}
                  </option>
                ),
              )
          }
        </select>

        <label htmlFor="formaDePagamento">
          Forma de Pagamento:
          <select
            id="formaDePagamento"
            data-testid="method-input"
            value={ method }
            onChange={ (event) => this.handleChange('method', event.target.value) }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="categoria">
          Categoria:
          <select
            id="categoria"
            data-testid="tag-input"
            value={ category }
            onChange={ (event) => this.handleChange('category', event.target.value) }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>

        <button type="button" onClick={ () => this.handleAddExpense() }>
          Adicionar despesa
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  getAllCurrencies: () => dispatch(fetchCurrencies()),
  addExpense: (expense) => dispatch(expenses(expense)),
});

FormDespesa.propTypes = {
  currencies: PropTypes.arrayOf(String).isRequired,
  getAllCurrencies: PropTypes.func.isRequired,
  addExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FormDespesa);
