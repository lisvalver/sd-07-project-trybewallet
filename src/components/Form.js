import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExpense, fetchExchangeRates } from '../actions';
import '../style/Form.css';

class Form extends Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
    this.addExpense = this.addExpense.bind(this);
  }

  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  addExpense() {
    const { getCurrencies, dispatchAddExpense } = this.props;
    const expense = this.state;
    getCurrencies();
    dispatchAddExpense(expense);
  }

  render() {
    const { isFetching } = this.props;
    if (isFetching) return <p>Loading...</p>;
    const { value, description, currency, method, tag } = this.state;
    const { currencies } = this.props;
    const filteredCurrenciesKeys = Object.keys(currencies).filter((c) => c !== 'USDT');
    const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    const methods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    return (
      <div className="input-bar">
        <div className="input-field">
          <span>Valor:</span>
          <input
            type="number"
            value={ value }
            data-testid="value-input"
            onChange={ (e) => this.setState({ value: e.target.value }) }
          />
        </div>
        <div className="input-field">
          <span>Moeda:</span>
          <select
            data-testid="currency-input"
            onChange={ (e) => this.setState({ currency: e.target.value }) }
            value={ currency }
          >
            {filteredCurrenciesKeys.map((curr) => (
              <option
                key={ curr }
                data-testid={ curr }
                value={ curr }
              >
                {curr}
              </option>))}
          </select>
        </div>
        <div className="input-field">
          <span>Tag:</span>
          <select
            data-testid="tag-input"
            onChange={ (e) => this.setState({ tag: e.target.value }) }
            value={ tag }
          >
            {tags.map((t) => (
              <option
                key={ t }
                value={ t }

              >
                {t}
              </option>))}
          </select>
        </div>
        <div className="input-field">
          <span>Método de pagamento:</span>
          <select
            data-testid="method-input"
            onChange={ (e) => this.setState({ method: e.target.value }) }
            value={ method }
          >
            {methods.map((meth) => (
              <option
                key={ meth }
                value={ meth }
              >
                {meth}
              </option>))}
          </select>
        </div>
        <div className="input-field">
          <span>Descrição:</span>
          <input
            type="text"
            value={ description }
            data-testid="description-input"
            onChange={ (e) => this.setState({ description: e.target.value }) }
          />
        </div>
        <button
          type="button"
          className="btn-add-expense"
          onClick={ this.addExpense }
        >
          Adicionar despesa
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  isFetching: state.wallet.isFetching,
});

Form.propTypes = {
  getCurrencies: PropTypes.func.isRequired,
  dispatchAddExpense: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.object).isRequired,
  isFetching: PropTypes.bool.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchAddExpense: (e) => dispatch(addExpense(e)),
  getCurrencies: (e) => dispatch(fetchExchangeRates(e)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
