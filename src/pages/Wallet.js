import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import actions from '../actions';
import extraFunc from './extraFunc';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.fetchApi = this.fetchApi.bind(this);
    this.totalField = this.totalField.bind(this);
    this.state = {
      exchangeRates: {},
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Cartão de crédito',
      tag: 'Lazer',
      totalValue: 0,
    };
  }

  componentDidMount() {
    this.fetchApi();
  }

  async fetchApi() {
    const result = await fetch('https://economia.awesomeapi.com.br/json/all');
    result.json().then((values) => this.setState({ exchangeRates: values }));
  }

  totalField() {
    const { wallet } = this.props;
    const { expenses } = wallet;
    const result = expenses.reduce((element, next) => {
      const { currency, exchangeRates: rate, value } = next;
      const currencyName = currency;
      const object = Object.entries(rate).find((excha) => excha[0] === currencyName);
      const adjust = 10000;
      const total = parseInt(element * adjust, 10) / adjust;
      const exchange = parseInt(object[1].ask * adjust, 10) / adjust;
      const values = parseInt(value * adjust, 10) / adjust;
      return total + (exchange * values);
    }, 0);
    this.setState(({ totalValue: result }));
  }

  render() {
    const { returnParse, discoverName } = extraFunc;
    const { user, addExpense, wallet, delExpense } = this.props;
    const { expenses } = wallet;
    const { email } = user;
    const {
      exchangeRates,
      value,
      id,
      description,
      currency,
      method,
      tag,
      totalValue,
    } = this.state;
    return (
      <div>
        <div>
          <h1 data-testid="email-field">{email}</h1>
          <p data-testid="total-field">{parseInt(totalValue * 100, 10) / 100}</p>
          <p data-testid="header-currency-field">BRL</p>
          <form>
            <label htmlFor="expense">
              Dispesa:
              <input
                type="number"
                onChange={ ({ target }) => this.setState({ value: target.value }) }
                id="expense"
                data-testid="value-input"
                value={ value }
              />
            </label>
            <label htmlFor="expenseDescribe">
              Descrição:
              <textarea
                type="text"
                onChange={ ({ target }) => this.setState({ description: target.value }) }
                id="expenseDescribe"
                data-testid="description-input"
                value={ description }
              />
            </label>
            <select
              onChange={ ({ target }) => this.setState({ currency: target.value }) }
              value={ currency }
              data-testid="currency-input"
            >
              {Object.keys(exchangeRates).map((element) => {
                if (element !== 'USDT') {
                  return (
                    <option
                      key={ element }
                      data-testid={ element }
                      value={ element }
                    >
                      {element}
                    </option>);
                }
                return 'xuxu';
              })}
            </select>
            <label htmlFor="paymentForm">
              Forma de pagamento:
              <select
                type="text"
                id="paymentForm"
                data-testid="method-input"
                onChange={ ({ target }) => this.setState({ method: target.value }) }
                value={ method }
              >
                <option>Dinheiro</option>
                <option>Cartão de crédito</option>
                <option>Cartão de débito</option>
              </select>
            </label>
            <label htmlFor="paymentForm">
              Tipo do gasto:
              <select
                type="text"
                id="paymentForm"
                data-testid="tag-input"
                onChange={ async ({ target }) => {
                  this.setState({ tag: target.value });
                } }
                value={ tag }
                onMouseLeave={ this.fetchApi }
              >
                <option>Alimentação</option>
                <option>Lazer</option>
                <option>Trabalho</option>
                <option>Transporte</option>
                <option>Saúde</option>
              </select>
            </label>
            <button
              type="button"
              onClick={ async () => {
                this.setState({ id: id + 1, description: '', value: 0 });
                await addExpense(this.state);
                this.totalField();
              } }
            >
              Adicionar Despesas
            </button>
          </form>
        </div>
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
            {expenses.map((values) => (
              <tr key={ values.id }>
                <td key="description">{ values.description }</td>
                <td key="tag">{ values.tag}</td>
                <td key="method">{ values.method}</td>
                <td key="value">{`${returnParse(values.value)}`}</td>
                <td key="convert">
                  {discoverName(values.currency, values.exchangeRates).name}
                </td>
                <td key="current">
                  {discoverName(values.currency, values.exchangeRates).newAsk}
                </td>
                <td
                  key="convertV"
                >
                  {discoverName(values.currency, values.exchangeRates, values).converted}
                </td>
                <td key="currency">Real</td>
                <td>
                  <button type="button">Editar</button>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ async () => {
                      await delExpense(values.id);
                      this.totalField();
                    } }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>);
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  wallet: state.wallet,
});
const { addExpenseAction, delExpenseAction } = actions;
const mapDispatchToProps = (dispatch) => ({
  addExpense: (e) => dispatch(addExpenseAction(e)),
  delExpense: (e) => dispatch(delExpenseAction(e)),
});

Wallet.propTypes = {
  user: PropTypes.objectOf(PropTypes.string).isRequired,
  wallet: PropTypes.shape.isRequired,
  addExpense: PropTypes.func.isRequired,
  delExpense: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
