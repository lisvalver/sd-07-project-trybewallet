import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import apiCurrenciesDispatch from '../actions/apiCurrencies';
import newEDataConstructorDispatch from '../actions/newEDataConstructor';

class Formulario extends Component {
  constructor(props) {
    super(props);

    this.sendNewExpenseInfos = this.sendNewExpenseInfos.bind(this);
    this.submitNewExpense = this.submitNewExpense.bind(this);

    this.state = {
      expenseValue: 0,
      expenseDescription: '',
      currency: '',
      paymentMethod: '',
      expenseTag: '',
    };
  }

  componentDidMount() {
    const { apiCurrencies } = this.props;
    apiCurrencies();
  }

  sendNewExpenseInfos({ target }) {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  }

  submitNewExpense() {
    const { wallet } = this.props;
    const { expenses } = wallet;
    const {
      expenseValue,
      expenseDescription,
      currency,
      paymentMethod,
      expenseTag,
    } = this.state;
    const { newEDataConstructor } = this.props;
    const id = expenses.lenght + 1;
    const newExpense = {
      id,
      value: expenseValue,
      description: expenseDescription,
      currency,
      method: paymentMethod,
      tag: expenseTag,
    };
    newEDataConstructor(expenses, newExpense);
  }

  render() {
    const { wallet } = this.props;
    const {
      currencies,
      // expenses,
      isFetching,
      // error,
    } = wallet;
    const {
      expenseValue,
      expenseDescription,
      currency,
      paymentMethod,
      expenseTag,
    } = this.state;
    return (
      <div>
        {isFetching ? <p>Carregando...</p>
          : (
            <form id="addNewExpenseForm">
              <h2>Adicionar Nova Despesa</h2>
              <label htmlFor="expenseValue">
                Valor:
                <input
                  type="number"
                  id="expenseValue"
                  name="expenseValue"
                  step="0.01"
                  min="0"
                  data-testid="value-input"
                  value={ expenseValue }
                  onChange={ this.sendNewExpenseInfos }
                />
              </label>
              <br />
              <label htmlFor="expenseDescription">
                Descrição:
                <input
                  type="text"
                  id="expenseDescription"
                  name="expenseDescription"
                  data-testid="description-input"
                  value={ expenseDescription }
                  onChange={ this.sendNewExpenseInfos }
                />
              </label>
              <br />
              <label htmlFor="currency">
                Moeda:
                <select
                  id="currency"
                  name="currency"
                  data-testid="currency-input"
                  value={ currency }
                  onChange={ this.sendNewExpenseInfos }
                >
                  {currencies.map((currencyOption) => (
                    <option
                      key={ currencyOption }
                      data-testid={ `${currencyOption}` }
                    >
                      {currencyOption}
                    </option>))}
                </select>
              </label>
              <br />
              <label htmlFor="paymentMethod">
                Método de Pagamento:
                <select
                  id="paymentMethod"
                  name="paymentMethod"
                  data-testid="method-input"
                  value={ paymentMethod }
                  onChange={ this.sendNewExpenseInfos }
                >
                  <option key="money">Dinheiro</option>
                  <option key="creditCard">Cartão de crédito</option>
                  <option key="debitCard">Cartão de débito</option>
                </select>
              </label>
              <br />
              <label htmlFor="expenseTag">
                Tag:
                <select
                  id="expenseTag"
                  name="expenseTag"
                  data-testid="tag-input"
                  value={ expenseTag }
                  onChange={ this.sendNewExpenseInfos }
                >
                  <option key="food">Alimentação</option>
                  <option key="recreation">Lazer</option>
                  <option key="work">Trabalho</option>
                  <option key="transport">Transporte</option>
                  <option key="health">Saúde</option>
                </select>
              </label>
              <br />
              <button
                type="submit"
                name="Adicionar Despesa"
                data-testid="login-submit-btn"
                onClick={ this.submitNewExpense() }
              >
                Adicionar despesa
              </button>
            </form>
          )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  wallet: state.wallet,
});

const mapDispatchToProps = (dispatch) => ({
  apiCurrencies: () => dispatch(apiCurrenciesDispatch()),
  newEDataConstructor: (expenses, newExpense) => dispatch(
    newEDataConstructorDispatch(expenses, newExpense),
  ),
});

Formulario.propTypes = {
  wallet: PropTypes.shape({
    expenses: PropTypes.arrayOf.isRequired,
    currencies: PropTypes.arrayOf.isRequired,
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.string,
  }).isRequired,
  apiCurrencies: PropTypes.func.isRequired,
  newEDataConstructor: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Formulario);
