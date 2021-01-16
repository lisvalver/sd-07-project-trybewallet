import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editExpense, editRequest } from '../actions';
import fetchDataCurency from '../api/api';

class ChangeExpensesForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currenciesOption: [],
      value: 0,
      description: '',
      currency: '',
      method: '',
      tag: '',
    };

    this.fetchInitialState = this.fetchInitialState.bind(this);
    this.getHandle = this.getHandle.bind(this);
    this.fetchEditExpenses = this.fetchEditExpenses.bind(this);
  }

  componentDidMount() {
    this.fetchInitialState();
  }

  getHandle({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  async fetchInitialState() {
    const currencyResponse = await fetchDataCurency();
    const currencies = Object.keys(currencyResponse)
      .filter((currency) => currency !== 'USDT');
    const { idChange } = this.props;
    const { actualExpenses } = this.props;
    const {
      value: valueExp,
      description: descriptionExp,
      currency: currencyExp,
      method: methodExp,
      tag: tagExp,
    } = actualExpenses
      .find(({ id }) => id === idChange);

    this.setState({
      currenciesOption: currencies,
      value: valueExp,
      description: descriptionExp,
      currency: currencyExp,
      method: methodExp,
      tag: tagExp,
    });
  }

  async fetchEditExpenses() {
    const { value, description, currency, method, tag } = this.state;
    const { edtExpense, edtRequest, idChange } = this.props;
    const exchangeRates = await fetchDataCurency();
    const expenseObject = {
      id: idChange,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    };
    edtExpense(idChange, expenseObject);
    edtRequest(0, false);
  }

  render() {
    const { currenciesOption, currency, value, description, method, tag } = this.state;
    const paymentsMethod = [
      'Dinheiro',
      'Cartão de crédito',
      'Cartão de débito',
    ];

    const expenseCategory = [
      'Alimentação',
      'Lazer',
      'Trabalho',
      'Transporte',
      'Saúde',
    ];

    const cancelEditExpenses = () => {
      const { edtRequest } = this.props;
      edtRequest(0, false);
    };

    return (
      <form>
        <label htmlFor="value">
          Expense Value:
          <input
            type="text"
            id="value"
            name="value"
            value={ value }
            data-testid="value-input"
            onChange={ this.getHandle }
          />
        </label>

        <label htmlFor="description">
          Expense Description:
          <input
            type="text"
            name="description"
            value={ description }
            id="description"
            data-testid="description-input"
            onChange={ this.getHandle }
          />
        </label>

        <span>Expense Currency:</span>
        <select
          name="currency"
          id="currency"
          value={ currency }
          data-testid="currency-input"
          onChange={ this.getHandle }
        >
          {currenciesOption.sort()
            .map((option, index) => (
              <option
                key={ index }
                name={ option }
                value={ option }
                id={ option }
                data-testid={ option }
              >
                { option }
              </option>
            ))}
        </select>

        <span>Payment Method:</span>
        <select
          name="method"
          id="method"
          value={ method }
          data-testid="method-input"
          onChange={ this.getHandle }
        >
          {paymentsMethod
            .map((payment, index) => (
              <option
                key={ index }
                name={ payment }
                id={ payment }
                value={ payment }
              >
                { payment }
              </option>
            ))}
        </select>

        <span>Expense Category:</span>
        <select
          name="tag"
          id="tag"
          value={ tag }
          data-testid="tag-input"
          onChange={ this.getHandle }
        >
          {expenseCategory
            .map((expense, index) => (
              <option
                key={ index }
                name={ expense }
                id={ expense }
                value={ expense }
              >
                { expense }
              </option>
            ))}
        </select>

        <button type="button" onClick={ cancelEditExpenses }>Cancelar</button>
        <button type="button" onClick={ this.fetchEditExpenses }>Editar despesa</button>
      </form>
    );
  }
}

ChangeExpensesForm.propTypes = ({
  actualExpenses: PropTypes.shape({
    filter: PropTypes.func,
  }),
  edtExpense: PropTypes.func,
  edtRequest: PropTypes.func,
  idChange: PropTypes.number,
}).isRequired;

const mapStateToProps = (state) => ({
  actualExpenses: state.wallet.expenses,
  idChange: state.wallet.idToEdit,
});

const mapDispatchToProps = (dispatch) => ({
  edtExpense: (id, objectExpense) => (dispatch(editExpense(id, objectExpense))),
  edtRequest: (id, boolean) => (dispatch(editRequest(id, boolean))),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangeExpensesForm);
