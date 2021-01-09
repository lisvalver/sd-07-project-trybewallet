import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies, expenses } from '../actions';

class FormDespesa extends Component {
  constructor() {
    super();
    this.handleAddExpense = this.handleAddExpense.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.savingState = this.savingState.bind(this);
    // this.filteredCurrencies = this.filteredCurrencies.bind(this);
    this.state = {
      id: 0,
      value: '',
      description: '',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {},
      currency: 'USD',
      ask: '',
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

  savingState() {
    const { addExpense, currencies, getAllCurrencies } = this.props;
    getAllCurrencies();

    this.setState(() => ({
      exchangeRates: currencies[0],
    }), () => {
      addExpense(this.state);
      this.setState((previousState) => ({
        id: previousState.id + 1,
        method: 'Dinheiro',
        tag: 'Alimentação',
        currency: 'USD',
      }));
    });
  }

  handleAddExpense() {
    this.savingState();
  }

  render() {
    // console.log(this.props);
    const { value, description, tag, category, currency } = this.state;
    const { currencies } = this.props;
    let arrayCurrencies;
    if (currencies.length > 0) {
      arrayCurrencies = this.removingUSDT(currencies);
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

        <select
          data-testid="method-input"
          value={ tag }
          onChange={ (event) => this.handleChange('method', event.target.value) }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>

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
