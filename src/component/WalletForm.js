import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExpense, fetchThunk } from '../actions';
import ExpenseTable from './ExpenseTable';

class WalletForm extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };

    this.handleEvent = this.handleEvent.bind(this);
  }

  componentDidMount() {
    const { fetchThunkAction } = this.props;
    console.log(fetchThunkAction());
  }

  handleEvent({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { addExpenseAction, currenciesAlias, fetchThunkAction } = this.props;
    return (
      <div>
        <form>
          <label htmlFor="value-input">
            <span>Valor:</span>
            <input
              onChange={ this.handleEvent }
              name="value"
              id="value-input"
              data-testid="value-input"
            />
          </label>

          <label htmlFor="description-input">
            <span>Descrição:</span>
            <input
              name="description"
              id="description-input"
              data-testid="description-input"
              onChange={ this.handleEvent }
            />
          </label>

          <select
            name="currency"
            data-testid="currency-input"
            onChange={ this.handleEvent }
          >
            {currenciesAlias.map((currency) => (
              <option key={ currency } data-testid={ currency }>{currency}</option>
            ))}
          </select>

          <select name="method" data-testid="method-input" onChange={ this.handleEvent }>
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>

          <select name="tag" data-testid="tag-input" onChange={ this.handleEvent }>
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>

          <button
            onClick={ () => {
              fetchThunkAction();
              addExpenseAction(this.state);
            } }
            type="button"
          >
            Adicionar despesa
          </button>
        </form>
        <ExpenseTable />
      </div>
    );
  }
}

WalletForm.propTypes = {
  fetchThunkAction: PropTypes.func.isRequired,
  addExpenseAction: PropTypes.func.isRequired,
  currenciesAlias: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = ({ wallet: currencies }) => ({
  currenciesAlias: currencies.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  addExpenseAction: (expense) => dispatch(addExpense(expense)),
  fetchThunkAction: () => (dispatch(fetchThunk())),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
