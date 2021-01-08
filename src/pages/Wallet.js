import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import '../App.css';
import { fetchCurrences, actionSaved } from '../actions/index';

class Wallet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      number: 0,
      exchangeRates: {},
    };
    this.test = this.test.bind(this);
    this.handlerInput = this.handlerInput.bind(this);
    this.findCurrency = this.findCurrency.bind(this);
    this.valueTotal = this.valueTotal.bind(this);
    this.deletedExpense = this.deletedExpense.bind(this);
  }

  componentDidMount() {
    const { fetchCurrence } = this.props;
    fetchCurrence();
  }

  findCurrency(code) {
    const { currency } = this.props;
    return currency.find((item) => item.code === code) || { high: 0 };
  }

  handlerInput({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  test() {
    const { saved, currency } = this.props;
    this.setState((id) => ({
      id: id.id + 1,
      exchangeRates: currency,
    }));
    saved(this.state);
  }

  deletedExpense(id) {
    const { expenses } = this.props;
    expenses.splice(id, 1);
    this.setState({
      number: 1,
    });
  }

  valueTotal(expense) {
    if (expense) {
      return expense.map(
        (item) => this.findCurrency(item.currency).high * item.value,
      )
        .reduce((acc, reduce) => acc + reduce, 0);
    }
    return 0;
  }

  render() {
    const { email, currency, expenses } = this.props;

    return (
      <div>
        <header className="header-form">
          <p data-testid="email-field">
            Email:
            {email}
          </p>
          <p>
            Dispesa total:
            <span
              data-testid="total-field"
            >
              {
                this.valueTotal(expenses).toFixed(2).toString()
              }
            </span>
          </p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
        <form>
          <p>Valor:</p>
          <input
            onChange={ this.handlerInput }
            name="value"
            data-testid="value-input"
            id="value"
            type="number"
          />
          <p>Descrição:</p>
          <input
            onChange={ this.handlerInput }
            name="description"
            id="descrição"
            data-testid="description-input"
            type="text"
          />
          <p>Moeda:</p>
          <select
            onChange={ this.handlerInput }
            name="currency"
            data-testid="currency-input"
            id="moeda"
          >
            {currency.map(
              (item) => (
                <option
                  value={ item.code }
                  data-testid={ item.code }
                  key={ item.code }
                >
                  {item.code}
                </option>
              ),
            )}
          </select>
          <p htmlFor="method-payment">Método de pagamento:</p>
          <select onChange={ this.handlerInput } name="method" data-testid="method-input">
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de cŕedito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
          <p>Tag:</p>
          <select onChange={ this.handlerInput } name="tag" data-testid="tag-input">
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
          <button type="button" onClick={ this.test }>Adicionar despesa</button>
        </form>
        <table border="1">
          <thead>
            <tr>
              <td>Descrição</td>
              <td>Tag</td>
              <td>Método de pagamento</td>
              <td>Valor</td>
              <td>Moeda</td>
              <td>Câmbio utilizado</td>
              <td>Valor convertido</td>
              <td>Moeda de conversão</td>
              <td>Editar/Excluir</td>
            </tr>
          </thead>
          {expenses.map((item, index) => (
            <tbody key={ index }>
              <tr>
                <td>{item.description}</td>
                <td>{item.tag}</td>
                <td>{item.method}</td>
                <td>
                  {item.currency}
                  {' '}
                  {item.value}
                  .00
                </td>
                <td>{this.findCurrency(item.currency).name}</td>
                <td>{this.findCurrency(item.currency).high}</td>
                <td>
                  R$
                  {(this.findCurrency(item.currency).high * item.value).toFixed(2)}
                </td>
                <td>Real</td>
                <td>
                  <button
                    data-testid="delete-btn"
                    onClick={ () => this.deletedExpense(index) }
                    type="button"
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currency: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrence: () => dispatch(fetchCurrences()),
  saved: (expense) => dispatch(actionSaved(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  fetchCurrence: PropTypes.func.isRequired,
  currency: PropTypes.arrayOf.isRequired,
  saved: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf.isRequired,
};
