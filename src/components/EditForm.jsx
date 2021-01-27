import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { editExpenses, buttonExpenses, toggleForm } from '../actions';

class EditForm extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.buttonClick = this.buttonClick.bind(this);

    this.state = {
      methodOptions: ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'],
      tagOptions: ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'],
      expense: {
        value: '',
        description: '',
        currency: '',
        method: '',
        tag: '',
      },
    };
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState((previuosState) => ({
      expense: { ...previuosState.expense, [name]: value },
    }));
  }

  async buttonClick() {
    const { editExpensesDispatch, editId, toggleFormDispatch } = this.props;
    const { expense } = this.state;
    editExpensesDispatch(editId, expense);
    this.setState({ expense: {
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
    } });
    toggleFormDispatch(false);
  }

  render() {
    const { currenciesState } = this.props;
    const { methodOptions, tagOptions, expense } = this.state;
    const { value, description, currency, method, tag } = expense;
    return (
      <form className="edit-form">
        <label htmlFor="value-input">
          Valor editado:
          <input
            type="text"
            data-testid="value-input"
            id="value-input"
            name="value"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="description-input">
          Descrição:
          <input
            type="text"
            data-testid="description-input"
            id="description-input"
            name="description"
            value={ description }
            onChange={ this.handleChange }
          />
          <select
            className="currency-input"
            data-testid="currency-input"
            name="currency"
            value={ currency }
            onChange={ this.handleChange }
          >
            <option selected>Selecione a sua moeda</option>
            {currenciesState.map((c) => (
              <option key={ c } data-testid={ c }>
                {c}
              </option>
            ))}
          </select>
          <select
            className="method-input"
            data-testid="method-input"
            name="method"
            value={ method }
            onChange={ this.handleChange }
          >
            <option selected>Selecione o pagamento</option>
            {methodOptions.map((m) => (
              <option key={ m } data-testid={ m }>
                {m}
              </option>
            ))}
          </select>
          <select
            className="tag-input"
            data-testid="tag-input"
            name="tag"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option selected>Selecione a categoria da despesa</option>
            {tagOptions.map((t) => (
              <option key={ t } data-testid={ t }>
                {t}
              </option>
            ))}
          </select>
        </label>
        <button type="button" onClick={ this.buttonClick }>
          Editar despesa
        </button>
      </form>
    );
  }
}

EditForm.propTypes = {
  editExpensesDispatch: PropTypes.func.isRequired,
  currenciesState: PropTypes.func.isRequired,
  toggleFormDispatch: PropTypes.func.isRequired,
  editId: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  currenciesState: state.wallet.currencies,
  editId: state.wallet.editingExpense,
});

const mapDispatchToProps = (dispatch) => ({
  buttonExpensesDispatch: (ex) => dispatch(buttonExpenses(ex)),
  editExpensesDispatch: (expense, editId) => dispatch(editExpenses(expense, editId)),
  toggleFormDispatch: (status, currentId) => dispatch(toggleForm(status, currentId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditForm);
