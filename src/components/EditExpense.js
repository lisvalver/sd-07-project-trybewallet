import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { editExpenseEnd, editCurrentExpense } from '../actions';

class EditExpense extends Component {
  constructor(props) {
    super(props);

    this.expenseEditField = this.expenseEditField.bind(this);
    this.editExpense = this.editExpense.bind(this);

    this.state = {
      exchangeRates: {},
      value: 0,
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    };
  }

  componentDidMount() {
    const { expenses, expenseId } = this.props;
    const editExpense = expenses.filter((item) => item.id === Number(expenseId))[0];

    this.expenseEditField(editExpense);
  }

  expenseEditField({ exchangeRates, value, currency, method, tag, description }) {
    this.setState({
      exchangeRates,
      value,
      currency,
      method,
      tag,
      description,
    });
  }

  editExpense() {
    const { editEnd, editCurrent } = this.props;
    const { exchangeRates, value, currency, method, tag, description } = this.state;

    editCurrent({
      exchangeRates,
      value,
      currency,
      method,
      tag,
      description,
    });

    editEnd();
  }

  render() {
    const { exchangeRates, value, currency, method, tag, description } = this.state;

    return (
      <div
        style={ {
          display: 'flex',
          justifyContent: 'space-around',
          backgroundColor: 'green',
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
            onClick={ () => this.editExpense() }
          >
            Editar despesa
          </button>
        </form>
      </div>
    );
  }
}

EditExpense.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object),
  expenseId: PropTypes.number,
  editExpenseEnd: PropTypes.func,
  editCurrentExpense: PropTypes.func,
}.isRequired;

const mapStateToProps = ({ wallet: { expenses, expenseId } }) => ({
  expenses,
  expenseId,
});

const mapDispatchToProps = (dispatch) => ({
  editEnd: (expense) => dispatch(editExpenseEnd(expense)),
  editCurrent: (currentExpense) => dispatch(editCurrentExpense(currentExpense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpense);
