import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExpense } from '../actions';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.currencies = this.currencies.bind(this);
    this.addExpenseButton = this.addExpenseButton.bind(this);
    this.state = {
      total: 0,
      list: [],
      expenses: [],
      value: 0,
      description: '',
      currency: '',
      payment: '',
      tag: '',
    };
  }

  componentDidMount() {
    this.generateCurrencies();
  }

  async addExpenseButton() {
    const url = 'https://economia.awesomeapi.com.br/json/all';
    const { expenses, value, description, currency, payment, tag, total } = this.state;
    const exchangeRates = await fetch(url)
      .then((item) => item.json());
    console.log(value);
    console.log(total);
    let sum = total;
    sum += parseFloat(value);
    // this.setState({ exchangeRates, total})
    const newExpense = {
      id: expenses.length,
      value,
      description,
      currency,
      payment,
      tag,
      exchangeRates,
    };
    expenses.push(newExpense);
    this.setState({
      expenses,
      total: sum,
    });
    const { adicionarDespesa } = this.props;
    adicionarDespesa(expenses);
  }

  currencies() {
    const { list } = this.state;
    return list.map((item) => (
      <option key={ item } data-testid={ item } value={ item }>{item}</option>
    ));
  }

  async generateCurrencies() {
    const url = 'https://economia.awesomeapi.com.br/json/all';
    await fetch(url)
      .then((item) => item.json())
      .then((item) => Object.keys(item))
      .then((item) => item.filter((one) => one !== 'USDT'))
      .then((item) => this.setState({ list: item }));
    this.currencies();
  }

  render() {
    console.log(this.props);
    const { email } = this.props;
    const { total } = this.state;
    return (
      <div>
        <header>
          <p data-testid="email-field">
            {email}
            {' '}
          </p>
          <p>Despesa Total: </p>
          <p data-testid="total-field">{total}</p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
        <section>
          <form>
            <label htmlFor="new_expense_value">
              {' '}
              Valor:
              <input
                type="number"
                name="new_expense_value"
                id="new_expense_value"
                data-testid="value-input"
                onChange={ ({ target }) => {
                  this.setState({
                    value: target.value,
                  });
                } }
              />
            </label>
            <label htmlFor="new_expense_description">
              Descrição:
              <input
                type="text"
                name="new_expense_description"
                id="new_expense_description"
                data-testid="description-input"
                onChange={ ({ target }) => {
                  this.setState({
                    description: target.value,
                  });
                } }
              />
            </label>
            <label htmlFor="currency">
              Choose a currency:
              <select id="currencies">
                {this.currencies()}
              </select>
            </label>
            <label htmlFor="payment_method">
              Método de Pagamento:
              <select
                data-testid="method-input"
                id="payment_method"
                onChange={ ({ target }) => {
                  this.setState({
                    payment: target.value,
                  });
                } }
              >
                <option value="Dinheiro">Dinheiro</option>
                <option value="credit_card">Cartão de crédito</option>
                <option value="debit_card">Cartão de débito</option>
              </select>
            </label>

            <label htmlFor="category">
              Categoria:
              <select
                data-testid="tag-input"
                id="tag"
                onChange={ ({ target }) => {
                  this.setState({
                    tag: target.value,
                  });
                } }
              >
                <option value="alimentacao">Alimentação</option>
                <option value="lazer">Lazer</option>
                <option value="trabalho">Trabalho</option>
                <option value="transporte">Transporte</option>
                <option value="saude">Saúde</option>
              </select>
            </label>
            <button
              type="button"
              onClick={ () => this.addExpenseButton() }
            >
              Adicionar despesa
            </button>
          </form>
        </section>
      </div>);
  }
}
Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  adicionarDespesa: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  email: state.user.email,
});
const mapDispatchToProps = (dispatch) => ({ // só inclui funções
  adicionarDespesa: (expense) => dispatch(addExpense(expense)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
