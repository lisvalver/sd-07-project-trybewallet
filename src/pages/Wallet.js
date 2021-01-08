import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExpense } from '../actions';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.currencies = this.currencies.bind(this);
    this.addExpenseButton = this.addExpenseButton.bind(this);
    this.zerarCampos = this.zerarCampos.bind(this);
    this.state = {
      total: 0,
      list: [],
      expenses: [],
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
  }

  componentDidMount() {
    this.generateCurrencies();
  }

  async addExpenseButton() {
    const url = 'https://economia.awesomeapi.com.br/json/all';
    const { expenses, value, description, currency, method, tag } = this.state;
    const exchangeRates = await fetch(url)
      .then((item) => item.json());

    const newExpense = {
      id: expenses.length,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    };
    expenses.push(newExpense);
    let sum = expenses.reduce((acumulador, valorAtual) => {
      console.log(`valor${value}moeda ${currency}cotacao
      ${valorAtual.exchangeRates[currency].ask}`);
      return ((valorAtual.value * valorAtual.exchangeRates[currency].ask) + acumulador);
    }, 0);
    sum = sum.toFixed(2);
    this.setState({
      expenses,
      total: sum,
    });
    const { adicionarDespesa } = this.props;
    adicionarDespesa(expenses);
    // salvarDespesas(expenses);
    this.zerarCampos();
  }

  zerarCampos() {
    document.getElementById('new_expense_value').value = 0;
    document.getElementById('new_expense_description').value = '';
    document.getElementById('currencies').value = 'USD';
    document.getElementById('payment_method').value = 'Dinheiro';
    document.getElementById('tag').value = 'alimentacao';
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
  }

  render() {
    const { email } = this.props;
    const { total, value } = this.state;
    return (
      <div>
        <header>
          <p data-testid="email-field">
            {email}
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
                value={ value }
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
            <label htmlFor="currencies">
              Choose a currency:

              <select
                id="currencies"
                data-testid="currency-input"
                onChange={ ({ target }) => {
                  this.setState({
                    currency: target.value,
                  });
                } }
              >
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
                    method: target.value,
                  });
                } }
              >
                <option value="Dinheiro">Dinheiro</option>
                <option value="Cartão de crédito">Cartão de crédito</option>
                <option value="Cartão de débito">Cartão de débito</option>
              </select>
            </label>

            <label htmlFor="tag">
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
                <option value="Alimentacao">Alimentação</option>
                <option value="Lazer">Lazer</option>
                <option value="Trabalho">Trabalho</option>
                <option value="Transporte">Transporte</option>
                <option value="Saude">Saúde</option>
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
