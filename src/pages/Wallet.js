import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExpenses, fetchCurrencies } from '../actions';
import Expenses from './componentes/Expenses';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.handleFormInput = this.handleFormInput.bind(this);
    this.state = {
      cash: 0,
      currency: 'USD',
      methodInput: 'Dinheiro',
      tagInput: 'Lazer',
      infor: '',
      despesaTotal: 0,
    };
  }

  componentDidMount() {
    const { fetchCurrency } = this.props;
    fetchCurrency();
  }

  handleFormInput(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    const { email, saveExpenses } = this.props;
    const { cash, currency, methodInput, tagInput, infor, despesaTotal } = this.state;
    return (
      <div>
        <header>
          <span data-testid="email-field">
            E-mail:
            { email }
          </span>
          <span data-testid="total-field">
            Despesa Total:
            R$
            { despesaTotal }
            ,00
          </span>
          <span data-testid="header-currency-field">
            BRL
          </span>
        </header>
        <form>
          <label htmlFor="cash">
            Valor:
            <input
              name="cash"
              id="cash"
              type="number"
              data-testid="value-input"
              pattern="\d*"
              min="0"
              value={ cash }
              onChange={ (event) => this.handleFormInput(event) }
            />
          </label>
          <label htmlFor="currency">
            <select
              id="currency"
              data-testid="currency-input"
              name="currency"
              value={ currency }
              onChange={ (event) => this.handleFormInput(event) }
            >
              <option value="USD" data-testid="USD">USD</option>
              <option value="CAD" data-testid="CAD">CAD</option>
              <option value="EUR" data-testid="EUR">EUR</option>
              <option value="GBP" data-testid="GBP">GBP</option>
              <option value="ARS" data-testid="ARS">ARS</option>
              <option value="BTC" data-testid="BTC">BTC</option>
              <option value="LTC" data-testid="LTC">LTC</option>
              <option value="JPY" data-testid="JPY">JPY</option>
              <option value="CHF" data-testid="CHF">CHF</option>
              <option value="AUD" data-testid="AUD">AUD</option>
              <option value="CNY" data-testid="CNY">CNY</option>
              <option value="ILS" data-testid="ILS">ILS</option>
              <option value="ETH" data-testid="ETH">ETH</option>
              <option value="XRP" data-testid="XRP">XRP</option>
            </select>
          </label>
          <label htmlFor="method-input">
            Método de Pagamento:
            <select
              data-testid="method-input"
              id="method-input"
              name="methodInput"
              value={ methodInput }
              onChange={ (event) => this.handleFormInput(event) }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag-input">
            <select
              data-testid="tag-input"
              id="tag-input"
              name="tagInput"
              value={ tagInput }
              onChange={ (event) => this.handleFormInput(event) }
            >
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <label htmlFor="infor">
            Descrição:
            <input
              data-testid="description-input"
              type="text"
              id="infor"
              name="infor"
              value={ infor }
              onChange={ (event) => this.handleFormInput(event) }
            />
          </label>
        </form>
        <button
          type="button"
          onClick={ () => saveExpenses(cash, currency, methodInput, tagInput, infor) }
        >
          Adicionar despesa
        </button>
        <Expenses />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    email: state.user.email,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    saveExpenses: (cash, currency, methodInput, tagInput, infor) => dispatch(
      addExpenses(cash, currency, methodInput, tagInput, infor),
    ),
    fetchCurrency: () => dispatch(fetchCurrencies()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  email: PropTypes.string,
}.isRequired;
