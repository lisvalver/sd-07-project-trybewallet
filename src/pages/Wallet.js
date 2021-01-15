import React from 'react';
import { connect } from 'react-redux';
import ProtoTypes from 'prop-types';
import SimpleTable from '../components/simpleTable';
import {
  fetchWalletExpenses,
  addWalletCurrencies,
  addWalletExpenses,
} from '../actions/index';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'dinheiro',
      tag: 'alimentaçao',
      exchangeRates: [],
    };
    this.sendCurrencies = this.sendCurrencies.bind(this);
    this.updateExpenses = this.updateExpenses.bind(this);
    this.totalExpenses = this.totalExpenses.bind(this);
    this.renderCells = this.renderCells.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.sendCurrencies();
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  async sendCurrencies() {
    const { fetchCurrencies, addCurrencies } = this.props;
    const { wallet } = await fetchCurrencies();
    delete wallet.USDT;
    addCurrencies(wallet);
    this.setState({ exchangeRates: wallet });
    return wallet;
  }

  async updateExpenses() {
    const { addExpenses, fetchCurrencies } = this.props;
    await fetchCurrencies();
    this.setState((prevState) => {
      const expenseInfo = prevState;
      const initialState = {
        id: expenseInfo.id + 1,
        value: '',
        description: '',
        currency: 'USD',
        method: 'dinheiro',
        tag: 'alimentação',
      };
      addExpenses(expenseInfo);
      return initialState;
    });
  }

  totalExpenses(wallet) {
    let totalExpenses = 0;
    const { expenses } = wallet;
    expenses.map((expense) => {
      const { currency, exchangeRates, value } = expense;
      const myCurrency = exchangeRates[`${currency}`];
      totalExpenses += parseFloat(
        (parseFloat(value) * parseFloat(myCurrency.ask)).toFixed(2),
      );
      return totalExpenses;
    });
    return totalExpenses;
  }

  renderCells(wallet) {
    const { expenses } = wallet;
    if (expenses.length > 0) {
      return expenses.map((expense) => (
        <SimpleTable key={ expense.id } expense={ expense } />
      ));
    }
  }

  render() {
    const { wallet, email } = this.props;
    const {
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    } = this.state;
    const currenciesKeys = Object.keys(exchangeRates);

    return (
      <div>
        <header>
          <div data-testid="email-field">{email}</div>
          <div data-testid="total-field">{this.totalExpenses(wallet)}</div>
          <div data-testid="header-currency-field">BRL</div>
        </header>
        <form>
          <input
            id="value"
            name="value"
            data-testid="value-input"
            value={ value }
            onChange={ this.handleChange }
          />
          <input
            name="description"
            id="description"
            data-testid="description-input"
            value={ description }
            onChange={ this.handleChange }
          />
          <select
            id="currency"
            data-testid="currency-input"
            name="currency"
            value={ currency }
            onChange={ this.handleChange }
          >
            {currenciesKeys.map((coin) => (
              <option data-testid={ coin } key={ coin } value={ coin }>
                { coin }
              </option>
            ))}
          </select>
          <select
            id="method"
            name="method"
            data-testid="method-input"
            value={ method }
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>

          <select
            id="tag"
            name="tag"
            data-testid="tag-input"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>

          <button type="button" id="button-enter" onClick={ this.updateExpenses }>
            Adicionar despesa
          </button>
        </form>
        <div>
          <table>
            <thead>
              <tr>
                <th>Descrição</th>
                <th>Tag</th>
                <th>Método de pagamento</th>
                <th>Valor</th>
                <th>Moeda</th>
                <th>Câmbio utilizado</th>
                <th>Valor convertido</th>
                <th>Moeda de conversão</th>
                <th>Editar/Excluir</th>
              </tr>
            </thead>
            <tbody>{this.renderCells(wallet)}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  wallet: state.wallet,
  email: state.user.email,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: (wallet) => dispatch(fetchWalletExpenses(wallet)),
  addExpenses: (wallet) => dispatch(addWalletExpenses(wallet)),
  addCurrencies: (wallet) => dispatch(addWalletCurrencies(wallet)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  email: ProtoTypes.string.isRequired,
  fetchCurrencies: ProtoTypes.func.isRequired,
  addCurrencies: ProtoTypes.func.isRequired,
  addExpenses: ProtoTypes.func.isRequired,
  wallet: ProtoTypes.shape({
    expenses: ProtoTypes.arrayOf(ProtoTypes.object).isRequired,
  }).isRequired,
};
