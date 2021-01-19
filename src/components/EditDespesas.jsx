import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencyAction, addExpensesAction, isEditAction } from '../actions';

class EditDespesas extends React.Component {
  constructor(props) {
    super(props);
    const { editExpense } = this.props;
    const { id: ids, value: values, description: descriptions,
      currency: currencys, method: methods, tag: tags } = editExpense;
    this.state = {
      id: ids,
      value: values,
      description: descriptions,
      currency: currencys,
      method: methods,
      tag: tags,
    };
    this.handlerExpensesChange = this.handlerExpensesChange.bind(this);
    this.handlerEditExpenses = this.handlerEditExpenses.bind(this);
  }

  componentDidMount() {
    const { fetchCurrency } = this.props;
    fetchCurrency();
  }

  handlerExpensesChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  handlerEditExpenses() {
    const { isEdit, expense, editExpense } = this.props;

    expense.filter((exp) => exp.id === editExpense.id
      && Object.assign(exp, this.state));

    isEdit(expense);
  }

  render() {
    const { currency, editExpense } = this.props;
    const { value: values, description: descriptions,
      currency: currencys, method: methods, tag: tags } = editExpense;

    return (
      <section className="section-despesas">
        Valor:
        <input
          type="number"
          name="value"
          defaultValue={ values }
          data-testid="value-input"
          onChange={ this.handlerExpensesChange }
        />
        Descrição:
        <input
          type="text"
          name="description"
          defaultValue={ descriptions }
          data-testid="description-input"
          onChange={ this.handlerExpensesChange }
        />
        Moeda:
        <select
          name="currency"
          data-testid="currency-input"
          onChange={ this.handlerExpensesChange }
        >
          {Object.keys(currency).filter((usdt) => usdt !== 'USDT')
            .map((currencies) => (
              <option
                key={ currencies }
                data-testid={ currencies }
                value={ currencies }
                selected={ currencies === currencys }
              >
                { currencies }
              </option>
            ))}
        </select>
        Método:
        <select
          name="method"
          data-testid="method-input"
          onChange={ this.handlerExpensesChange }
        >
          <option selected={ methods === 'Dinheiro' } value="Dinheiro">Dinheiro</option>
          <option
            selected={ methods === 'Cartão de crédito' }
            value="Cartão de crédito"
          >
            Cartão de crédito
          </option>
          <option
            selected={ methods === 'Cartão de débito' }
            value="Cartão de débito"
          >
            Cartão de débito
          </option>
        </select>
        Tag
        <select
          name="tag"
          data-testid="tag-input"
          onChange={ this.handlerExpensesChange }
        >
          <option
            selected={ tags === 'Alimentação' }
            value="Alimentação"
          >
            Alimentação
          </option>
          <option selected={ tags === 'Lazer' } value="Lazer">Lazer</option>
          <option selected={ tags === 'Trabalho' } value="Trabalho">Trabalho</option>
          <option
            selected={ tags === 'Transporte' }
            value="Transporte"
          >
            Transporte
          </option>
          <option selected={ tags === 'Saúde' } value="Saúde">Saúde</option>
        </select>
        <button
          type="button"
          onClick={ this.handlerEditExpenses }
        >
          Editar despesa
        </button>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  currency: state.wallet.currencies,
  expense: state.wallet.expenses,
  editExpense: state.wallet.editExpenses,
  edit: state.wallet.edit,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrency: () => dispatch(fetchCurrencyAction()),
  addExpenses: (expense) => dispatch(addExpensesAction(expense)),
  isEdit: (expense) => dispatch(isEditAction(expense)),
});

EditDespesas.propTypes = {
  currency: PropTypes.shape({}).isRequired,
  fetchCurrency: PropTypes.func.isRequired,
  editExpense: PropTypes.shape({
    id: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
  }).isRequired,
  isEdit: PropTypes.func.isRequired,
  expense: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditDespesas);
