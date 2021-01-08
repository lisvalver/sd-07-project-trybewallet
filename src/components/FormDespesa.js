import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies, expenses } from '../actions';

class FormDespesa extends Component {
  constructor() {
    super();
    this.handleAddExpense = this.handleAddExpense.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      id: 0,
      value: '',
      description: '',
      method: '',
      category: '',
    };
  }

  componentDidMount() {
    const { getAllCurrencies } = this.props;
    getAllCurrencies();
  }

  handleChange(field, newValue) {
    this.setState({ [field]: newValue });
  }

  handleAddExpense() {
    const { addExpense } = this.props;
    addExpense(this.state);
  }

  render() {
    const { value, description, method, category } = this.state;
    const { currencies } = this.props;
    let arrayCurrencies;
    if (currencies.length > 0) {
      // console.log(currencies[0]);
      // console.log(Object.keys(currencies[0]));
      arrayCurrencies = Object.keys(currencies[0]);
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
        >
          {
            arrayCurrencies.length === 0
              ? null
              : arrayCurrencies.map(
                (currency) => (
                  <option
                    key={ currency }
                    data-testid={ currency }
                  >
                    {currency}
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
  currencies: PropTypes.arrayOf().isRequired,
  getAllCurrencies: PropTypes.func.isRequired,
  addExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FormDespesa);
