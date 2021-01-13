import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../actions/index';

class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expense: [],
      value: '',
      description: '',
      method: '',
      currency: '',
      tag: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { loadCurrencies } = this.props;
    // this.setState({
    //   isLoading: true,
    // }, async () => {
    //   const data = loadCurrencies();
    //   this.setState({
    //     moedas: [data]
    //   })
    // })
    loadCurrencies();
  }

  handleChange(event) {
    const { target } = event;
    const { name, value } = target;
    this.setState(
      {
        [name]: value,
      },
      this.buttonValidation,
    );
  }

  resetState() {
    this.setState({
      expense: [],
      value: '',
      description: '',
      method: '',
      currency: '',
      tag: '',
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { expenses, addExpenses, loadCurrencies, exchangeRates } = this.props;
    const { value, description, method, currency, tag } = this.state;
    await loadCurrencies();
    console.log(exchangeRates);
    // const { currencies } = this.props;
    // const filteredCurrencies = currencies
    //   .filter((filterCurrency) => filterCurrency.codein != "BRLT")
    //   .sort();
    this.setState({
      expense: {
        id: expenses.length,
        value,
        currency,
        description,
        method,
        tag,
        exchangeRates,
      },
    });
    const { expense } = this.state;
    addExpenses(expense);
    this.resetState();
  }

  render() {
    const { currencies } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="value">
            Valor da despesa
            <div>
              <input
                name="value"
                data-testid="value-input"
                placeholder="Digite seu despesa"
                id="value"
                type="text"
                value={ value }
                onChange={ this.handleChange }
              />
            </div>
          </label>
          {' '}
          <label htmlFor="description">
            O que é?
            <div>
              <input
                name="description"
                data-testid="description-input"
                placeholder="Descrição da despesa"
                id="description"
                type="text"
                value={ description }
                onChange={ this.handleChange }
              />
            </div>
          </label>
          {' '}
          <label htmlFor="currency-input" data-testid="currency-input-label">
            Sigla
            <select
              style={ { marginLeft: 10 } }
              name="currency"
              onChange={ this.handleChange }
              id="currency-input"
              data-testid="currency-input"
              value={ currency }
            >
              {currencies
                .filter((filterCurrency) => filterCurrency.codein !== 'BRLT')
                .map((currencyInfo, index) => (
                  <option
                    key={ index }
                    value={ currencyInfo.code }
                    data-testid={ currencyInfo.code }
                  >
                    {currencyInfo.code}
                  </option>
                ))}
            </select>
          </label>
          <label htmlFor="method-input" data-testid="method-input-label">
            Forma de pagamento
            <select
              style={ { marginLeft: 10 } }
              name="method"
              onChange={ this.handleChange }
              id="method-input"
              data-testid="method-input"
              value={ method }
            >
              <option value="Dinheiro" data-testid="method-option">
                Dinheiro
              </option>
              <option value="Cartão de crédito" data-testid="method-option">
                Cartão de crédito
              </option>
              <option value="Cartão de débito" data-testid="method-option">
                Cartão de débito
              </option>
            </select>
          </label>
          <label htmlFor="tag-input" data-testid="tag-input-label">
            Categoria
            <select
              style={ { marginLeft: 10 } }
              name="tag"
              onChange={ this.handleChange }
              id="tag-input"
              data-testid="tag-input"
              value={ tag }
            >
              <option value="Alimentação" data-testid="tag-option">
                Alimentação
              </option>
              <option value="Lazer" data-testid="tag-option">
                Lazer
              </option>
              <option value="Trabalho" data-testid="tag-option">
                Trabalho
              </option>
              <option value="Transporte" data-testid="tag-option">
                Transporte
              </option>
              <option value="Saúde" data-testid="tag-option">
                Saúde
              </option>
            </select>
          </label>
          <button type="button" onClick={ this.handleSubmit }>
            Adicionar despesa
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  exchangeRates: state.wallet.exchangeRates,
});

const mapDispatchToProps = (dispatch) => ({
  loadCurrencies: () => dispatch(actions.fetchCurrencies()),
  addExpenses: (expense) => dispatch(actions.addExpenses(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);

ExpenseForm.propTypes = {
  loadCurrencies: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  addExpenses: PropTypes.func.isRequired,
  exchangeRates: PropTypes.objectOf(PropTypes.object).isRequired,
  currencies: PropTypes.arrayOf(PropTypes.object).isRequired,
};
