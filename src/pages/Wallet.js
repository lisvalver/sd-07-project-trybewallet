import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExpenses, failedRequest, request } from '../actions';

class Wallet extends Component {
  constructor() {
    super();
    this.state = {
      totalDespesas: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {},
    };
    this.handleChanger = this.handleChanger.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChanger({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  handleSubmit() {
    this.fetchApi();
    this.setState({
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  }

  fetchApi() {
    const { addExpense, fail, requisited } = this.props;
    const url = 'https://economia.awesomeapi.com.br/json/all';
    requisited();
    return fetch(url)
      .then((result) => result.json())
      .then((json) => {
        const data = this.state;
        data.exchangeRates = json;
      })
      .then((object) => addExpense(object))
      .catch((error) => fail(error));
  }

  render() {
    const { email, moedas } = this.props;
    const {
      totalDespesas,
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;

    return (
      <div>
        <header>
          <p data-testid="email-field">{email}</p>
          <p data-testid="total-field">{totalDespesas}</p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
        <form>
          <input
            data-testid="value-input"
            name="value"
            value={ value }
            onChange={ (e) => this.handleChanger(e) }
          />
          <input
            data-testid="description-input"
            name="description"
            value={ description }
            onChange={ (e) => this.handleChanger(e) }
          />
          <select
            data-testid="currency-input"
            name="currency"
            value={ currency }
            onChange={ (e) => this.handleChanger(e) }
          >
            {moedas.map((item) => (item !== 'USDT' ? (
              <option key={ item } value={ item } data-testid={ item }>
                {item}
              </option>
            ) : (
              false
            )))}
          </select>

          <select
            data-testid="method-input"
            name="method"
            value={ method }
            onChange={ (e) => this.handleChanger(e) }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
          <select
            data-testid="tag-input"
            name="tag"
            value={ tag }
            onChange={ (e) => this.handleChanger(e) }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
          <button type="button" onClick={ this.handleSubmit }>
            Adicionar Despesa
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  moedas: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  addExpense: (expense) => dispatch(addExpenses(expense)),
  fail: (error) => dispatch(failedRequest(error)),
  requisited: () => dispatch(request()),
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  addExpense: PropTypes.arrayOf(PropTypes.object).isRequired,
  moedas: PropTypes.func.isRequired,
  requisited: PropTypes.func.isRequired,
  fail: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
