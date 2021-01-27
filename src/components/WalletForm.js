import React from 'react';
import PropTypes, { string } from 'prop-types';
import { connect } from 'react-redux';
import {
  expenseToSave,
  saveEditedExpenseAction,
  upDateCurrencies,
} from '../actions';

class WalletForm extends React.Component {
  constructor() {
    super();
    this.changeID = this.changeID.bind(this);
    this.resetInput = this.resetInput.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.editingSetState = this.editingSetState.bind(this);
    this.ShowSaveNewOrEditedExpenseBtn = this.ShowSaveNewOrEditedExpenseBtn.bind(
      this,
    );
    this.saveEditedExpense = this.saveEditedExpense.bind(this);

    this.state = {
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
  }

  changeID() {
    const { id } = this.state;
    this.setState({ id: id + 1 });
  }

  handleInputChange({ target }) {
    this.setState({ [target.name]: target.value });
  }

  resetInput() {
    this.setState({
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  }

  editingSetState() {
    const {
      expenseToEdit: { id, value, description, currency, method, tag, exchangeRates },
    } = this.props;
    this.setState({
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    });
  }

  saveEditedExpense() {
    const { saveEditedExpenseDispatch } = this.props;
    const { id, value, description, currency, method, tag, exchangeRates } = this.state;
    const objEditedToSave = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    };
    saveEditedExpenseDispatch(objEditedToSave);
  }

  ShowSaveNewOrEditedExpenseBtn() {
    const { isEditing, saveExpenses } = this.props;
    const { id, value, description, currency, method, tag } = this.state;
    const expenseObjToSave = {
      id,
      value,
      description,
      currency,
      method,
      tag,
    };
    if (!isEditing) {
      return (
        <button
          type="button"
          onClick={ () => {
            // upDateCurrencies();
            this.changeID();
            saveExpenses(expenseObjToSave);
            this.resetInput();
          } }
        >
          Adicionar despesa
        </button>
      );
    }
    return (
      <button
        type="button"
        data-testid="edit-btn"
        onClick={ this.saveEditedExpense }
      >
        Editar despesa
      </button>
    );
  }

  render() {
    const { value, description } = this.state;

    const { currenciesOptions, isFetching, isEditing } = this.props;

    if (isEditing && value === 0) this.editingSetState();

    return (
      <div>
        {isFetching ? (
          'loading...'
        ) : (
          <form>
            <label htmlFor="value">
              <input
                id="value"
                name="value"
                value={ value }
                onChange={ (e) => this.handleInputChange(e) }
                data-testid="value-input"
              />
            </label>
            <input
              value={ description }
              name="description"
              onChange={ (e) => this.handleInputChange(e) }
              data-testid="description-input"
            />
            <select
              name="currency"
              onChange={ (e) => this.handleInputChange(e) }
              data-testid="currency-input"
            >
              {currenciesOptions
                && currenciesOptions.map((currentCurrency) => (
                  <option key={ currentCurrency } data-testid={ currentCurrency }>
                    {currentCurrency}
                  </option>
                ))}
            </select>
            <select
              name="method"
              onChange={ (e) => this.handleInputChange(e) }
              data-testid="method-input"
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
            <select
              name="tag"
              onChange={ this.handleInputChange }
              data-testid="tag-input"
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
            {this.ShowSaveNewOrEditedExpenseBtn()}
          </form>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expensesState: state.wallet.expenses,
  expenseToEdit: state.wallet.expenseToEdit,
  isEditing: state.wallet.isEditing,
  allInfosCurrencies: state.wallet.allInfosCurrencies,
  currenciesOptions: state.wallet.currenciesOptions,
  isFetching: state.wallet.isFetching,
  total: state,
});

const mapDispatchToProps = (dispatch) => ({
  saveExpenses: (expenseObjToSave) => dispatch(expenseToSave(expenseObjToSave)),
  upDateCurrencies: () => dispatch(upDateCurrencies()),
  saveEditedExpenseDispatch: (objEditedToSave) => {
    dispatch(saveEditedExpenseAction(objEditedToSave));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);

WalletForm.propTypes = {
  saveExpenses: PropTypes.func.isRequired,
  currenciesOptions: PropTypes.arrayOf(string).isRequired,
  isFetching: PropTypes.bool.isRequired,
  isEditing: PropTypes.bool.isRequired,
  saveEditedExpenseDispatch: PropTypes.func.isRequired,
  expenseToEdit: PropTypes.shape({
    id: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
    currency: PropTypes.arrayOf(PropTypes.string).isRequired,
    exchangeRates: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
};
