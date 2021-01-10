import React from "react";
import { connect } from 'react-redux';
import * as actions from '../actions/index';

class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);
    const { currencies } = this.props;
    this.state = {
      expense: [],
      value: '',
      description: '',
      method: '',
      currency: '',
      tag: '',
      exchangeRates: currencies,
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
    this.setState({
      [name]: value,
    }, this.buttonValidation);
  }

  resetState() {
    const { currencies } = this.props;
    const filteredCurrencies = currencies.filter((filterCurrency) => filterCurrency.codein != 'BRLT')
    this.setState({
      expense: [],
      value: '',
      description: '',
      method: '',
      currency: '',
      tag: '',
      exchangeRates: filteredCurrencies,
    })
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { expenses, addExpenses, loadCurrencies, exchangeRates } = this.props;
    const { value, description, method, currency, tag } = this.state;
    await loadCurrencies();
    const { currencies } = this.props;
    const filteredCurrencies = currencies.filter((filterCurrency) => filterCurrency.codein != 'BRLT').sort()
    this.setState({
      expense: {
        id: expenses.length,
        value,
        currency,
        description,
        method,
        tag,
        exchangeRates: exchangeRates,
      },
    });
    addExpenses(this.state.expense);
    console.log(this.state.expense);
    console.log(expenses);
  }

  render() {
    const { currencies } = this.props;
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
                value={this.state.value}
                onChange={this.handleChange}
              />
            </div>
          </label>{" "}
          <label htmlFor="description">Descrição</label>{" "}
          <div>
            <input
              name="description"
              data-testid="description-input"
              placeholder="Descrição da despesa"
              id="description"
              type="text"
              value={this.state.description}
              onChange={this.handleChange}
            />
          </div>
          <label htmlFor="currency-input" data-testid="currency-input-label">
            Moeda
            <select
              style={{ marginLeft: 10 }}
              name="currency"
              onChange={this.handleChange}
              id="currency-input"
              data-testid="currency-input"
              value={this.state.currency}
            >
            {currencies.filter((filterCurrency) => filterCurrency.codein != 'BRLT').map((currency) => <option value={currency.code} data-testid={currency.code} />)}
            </select>
          </label>
          <label htmlFor="method-input" data-testid="method-input-label">
            Forma de pagamento
            <select
              style={{ marginLeft: 10 }}
              name="method"
              onChange={this.handleChange}
              id="method-input"
              data-testid="method-input"
              value={this.state.method}
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
              style={{ marginLeft: 10 }}
              name="tag"
              onChange={this.handleChange}
              id="tag-input"
              data-testid="tag-input"
              value={this.state.tag}
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
          <button
            type="button"
            onClick={this.handleSubmit}
          >
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
