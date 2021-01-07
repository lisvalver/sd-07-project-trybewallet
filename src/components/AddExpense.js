import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import apiCurrency from '../services/apiCurrency';
import { sendExpense, fetchCurrencies } from '../actions';

class AddExpense extends Component {
  constructor(props) {
    super(props);

    this.currencyArray = this.currencyArray.bind(this);
    this.saveExpenses = this.saveExpenses.bind(this);

    this.state = {
      exchangeRates: {},
      value: 0,
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    };
  }

  async componentDidMount() {
    const currency = await apiCurrency();
    this.currencyArray(currency);
  }

  currencyArray(currency) {
    this.setState({
      exchangeRates: { ...currency },
    });
  }

  saveExpenses() {
    const { send, randomId, fetch } = this.props;
    const { exchangeRates, value, currency, method, tag, description } = this.state;
    const idNumber = randomId;

    send({
      id: idNumber,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    });

    this.setState({
      value: 0,
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    });

    fetch();
  }

  render() {
    const { exchangeRates, value, currency, method, tag, description } = this.state;

    return (
      <div
        style={ {
          display: 'flex',
          justifyContent: 'space-around',
          backgroundColor: 'lightGray',
          height: 50,
          alignItems: 'center',
        } }
      >
        <form>
          <label htmlFor="value">
            Valor:
            <input
              type="number"
              min="0"
              id="value"
              data-testid="value-input"
              onChange={ (e) => this.setState({ value: e.target.value }) }
              value={ value }
            />
          </label>
          <label htmlFor="currency">
            Moeda:
            <select
              id="currency"
              data-testid="currency-input"
              onChange={ (e) => this.setState({ currency: e.target.value }) }
              value={ currency }
            >
              {Object.values(exchangeRates)
                .filter((element) => element.codein !== 'BRLT')
                .map((item) => (
                  <option
                    key={ item.code }
                    value={ item.code }
                    data-testid={ item.code }
                  >
                    {item.code}
                  </option>
                ))}
            </select>
          </label>
          <label htmlFor="payment">
            Método de Pagamento:
            <select
              id="payment"
              data-testid="method-input"
              onChange={ (e) => this.setState({ method: e.target.value }) }
              value={ method }
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
              data-testid="tag-input"
              onChange={ (e) => this.setState({ tag: e.target.value }) }
              value={ tag }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <label htmlFor="description">
            Descrição:
            <input
              type="text"
              id="description"
              maxLength="40"
              data-testid="description-input"
              onChange={ (e) => this.setState({ description: e.target.value }) }
              value={ description }
            />
          </label>
          <button
            type="button"
            onClick={ () => this.saveExpenses() }
          >
            Adicionar despesa
          </button>
        </form>
      </div>
    );
  }
}

AddExpense.propTypes = {
  sendExpense: PropTypes.func,
  randomId: PropTypes.number,
  fetchCurrencies: PropTypes.func,
}.isRequired;

const mapStateToProps = ({ wallet: { expenses, randomId } }) => ({ expenses, randomId });

const mapDispatchToProps = (dispatch) => ({
  send: (addExpense) => dispatch(sendExpense(addExpense)),
  fetch: (currecyObject) => dispatch(fetchCurrencies(currecyObject)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddExpense);
