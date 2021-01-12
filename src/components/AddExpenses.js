import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { newExpense } from '../actions';
import apiCurrency from '../services/api';

class AddExpenses extends Component {
  constructor(props) {
    super(props);

    this.currencyArray = this.currencyArray.bind(this);

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

  addExpenses() {
    const { send } = this.props;
    const { exchangeRates, currency, description, method, tag, value } = this.state;

    send({
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
          <label htmlFor>
            Método de Pagamento:
            <select
              data-testid="method-input"
              onChange={ (e) => this.setState({ method: e.target.value }) }
              value={ method }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor>
            Tag:
            <select
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
          >
            Adicionar despesa
          </button>
        </form>
      </div>
    );
  }
}

AddExpenses.propTypes = {
  send: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  send: (addExpenses) => dispatch(newExpense(addExpenses)),
});

const mapStateToProps = ({ wallet: { expenses } }) => ({ expenses });

export default connect(mapStateToProps, mapDispatchToProps)(AddExpenses);
