import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TableItem from '../components/TableItem';
import Option from '../components/Option';
import {
  fetchWalletExpenses,
  addWalletCurrencies,
  addWalletExpenses,
} from '../actions';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.sendCurrencies = this.sendCurrencies.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateExpenses = this.updateExpenses.bind(this);
    this.renderCells = this.renderCells.bind(this);
    this.totalExpenses = this.totalExpenses.bind(this);
    this.state = {
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'dinheiro',
      tag: 'alimentacao',
      exchangeRates: [],
    };
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
        tag: 'alimentacao',
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
        <TableItem
          key={ expense.id }
          expense={ expense }
        />
      ));
    }
  }

  render() {
    const { user, wallet } = this.props;
    const { value, description, currency, method, tag, exchangeRates } = this.state;
    const currenciesKeys = Object.keys(exchangeRates);
    return (
      <div>
        <header>
          <div data-testid="email-field">{user}</div>
          <div data-testid="total-field">{ this.totalExpenses(wallet) }</div>
          <div data-testid="header-currency-field">BRL</div>
        </header>
        <form>
          <label htmlFor="value">
            Valor:
            <input
              id="value"
              type="text"
              data-testid="value-input"
              name="value"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="description">
            Descrição:
            <input
              id="description"
              type="text"
              data-testid="description-input"
              name="description"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="currency">
            Moeda:
            <select
              id="currency"
              name="currency"
              value={ currency }
              data-testid="currency-input"
              onChange={ this.handleChange }
            >
              { currenciesKeys.map((coin) => (
                <Option
                  key={ coin }
                  currency={ coin }
                />))}
            </select>
          </label>
          <label htmlFor="method">
            Método de Pagamento:
            <select
              id="method"
              name="method"
              value={ method }
              data-testid="method-input"
              onChange={ this.handleChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Tag:
            <select
              id="tag"
              name="tag"
              value={ tag }
              data-testid="tag-input"
              onChange={ this.handleChange }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
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
            <tbody>
              { this.renderCells(wallet) }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.email,
  wallet: state.wallet,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: (wallet) => dispatch(fetchWalletExpenses(wallet)),
  addExpenses: (wallet) => dispatch(addWalletExpenses(wallet)),
  addCurrencies: (wallet) => dispatch(addWalletCurrencies(wallet)),
});

Wallet.propTypes = {
  user: PropTypes.string.isRequired,
  fetchCurrencies: PropTypes.func.isRequired,
  addCurrencies: PropTypes.func.isRequired,
  addExpenses: PropTypes.func.isRequired,
  wallet: PropTypes.shape({
    expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
