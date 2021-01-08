import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExpenses, failedRequest, fetchCurrency } from '../actions';
import Table from '../component/Table';

class Wallet extends Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };

    this.handleChanger = this.handleChanger.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { fetchData } = this.props;
    fetchData(null, false);
  }

  handleChanger({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  handleSubmit() {
    const { fetchData } = this.props;
    fetchData(this.state, true);
  }

  render() {
    const { email, mapcurrency = [], totalValue = 0 } = this.props;
    console.log(mapcurrency);
    const {
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
          <p data-testid="total-field">{totalValue}</p>
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
            {(mapcurrency).map((item) => (item !== 'USDT' ? (
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
        <Table />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  mapcurrency: state.wallet.currency,
  totalValue: state.wallet.totalValue,

});

const mapDispatchToProps = (dispatch) => ({
  addExpense: (expense) => dispatch(addExpenses(expense)),
  fail: (error) => dispatch(failedRequest(error)),
  fetchData: (a, b) => dispatch(fetchCurrency(a, b)),

});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  mapcurrency: PropTypes.arrayOf(PropTypes.string).isRequired,
  fetchData: PropTypes.func.isRequired,
  totalValue: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
