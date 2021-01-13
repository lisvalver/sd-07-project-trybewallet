import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { newExpense, currencyApi } from '../actions';
import apiWallet from '../services/api';

class AddExpenses extends Component {
  constructor(props) {
    super(props);

    this.currencyArray = this.currencyArray.bind(this);
    this.addExpenses = this.addExpenses.bind(this);

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
    const currency = await apiWallet();
    this.currencyArray(currency);
  }

  currencyArray(currency) {
    this.setState({
      exchangeRates: { ...currency },
    });
  }

  addExpenses() {
    const { api, send, randomId } = this.props;
    const { exchangeRates, currency, description, method, tag, value } = this.state;
    const numberId = randomId;

    send({
      id: numberId,
      exchangeRates,
      currency,
      description,
      method,
      tag,
      value,
    });

    this.setState({
      value: 0,
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    });

    api();
  }

  render() {
    const { exchangeRates, currency, value, method, tag, description } = this.state;

    return (
      <div>
        <form>
          <label htmlFor="value">
            Valor:
            <input
              type="number"
              min="0"
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
                .map((i) => (
                  <option
                    key={ i.code }
                    value={ i.code }
                    data-testid={ i.code }
                  >
                    {i.code}
                  </option>
                ))}
            </select>
          </label>
          <label htmlFor="pagamento">
            Método de Pagamento:
            <select
              id="pagamento"
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
            onClick={ () => this.addExpenses() }
          >
            Adicionar despesa
          </button>
        </form>
      </div>
    );
  }
}

AddExpenses.propTypes = {
  send: PropTypes.func,
  randomId: PropTypes.number,
  api: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  send: (addExpense) => dispatch(newExpense(addExpense)),
  api: (currency) => dispatch(currencyApi(currency)),
});

const mapStateToProps = ({ wallet: { expenses, randomId } }) => ({ expenses, randomId });

export default connect(mapStateToProps, mapDispatchToProps)(AddExpenses);
