import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  expensesAction,
  expensesCurrencyAction,
  fetchGetCurrencies,
} from '../../actions';

import getCurrencies from "../../services/api";

class FormDespesa extends React.Component {
  constructor(props) {
    super(props);
    this.changeInputs = this.changeInputs.bind(this);
    this.handleAddDespesa = this.handleAddDespesa.bind(this);
  }

  componentDidMount() {
    this.updateCurrencies();
  }

  changeInputs({ target }) {
    const { name, value } = target;
    const { expenses,setExpense } = this.props;
    setExpense({ [name]: value });
    const newID = expenses.length ? expenses[expenses.length - 1].id + 1 : 0;
    setExpense({ id: newID });
  }

  async handleAddDespesa(event) {
    event.preventDefault();
    const { setExpense } = this.props;
    const exchangeRates = await getCurrencies();
    setExpense({ exchangeRates });
    this.handleSetExpense()
  }

  handleSetExpense() {
    const { expense, setExpenses } = this.props;
    setExpenses(expense);
  }

  updateCurrencies() {
    const { currenciesAction, currencies } = this.props;
    currenciesAction();
    return currencies;
  }

  render() {
    const { currencies, expense, expenses } = this.props;
    const {
      value,
      description,
      currency,
      method,
      tag,
    } = expense;
    return (
      <div>
        <div>
          <form>
            <div>
              Valor:
              <input
                name="value"
                type="number"
                value={ value }
                data-testid="value-input"
                onChange={ this.changeInputs }
              />
            </div>
            <div>
              Descrição:
              <input
                name="description"
                type="text"
                value={ description }
                data-testid="description-input"
                onChange={ this.changeInputs }
              />
            </div>
            <div>
              Moeda
              <select
                data-testid="currency-input"
                name="currency"
                value={ currency }
                onChange={ this.changeInputs }
              >
                {currencies.map((curr) => (
                  <option
                    value={ curr.code }
                    data-testid={ curr.code }
                    key={ curr.code }
                  >
                    { curr.code }
                  </option>
                ))}
              </select>
            </div>
            <div>
              Método de Pagamento
              <select
                data-testid="method-input"
                name="method"
                value={ method }
                onChange={ this.changeInputs }
              >
                <option value="Dinheiro">Dinheiro</option>
                <option value="Cartão de crédito">Cartão de crédito</option>
                <option value="Cartão de débito">Cartão de débito</option>
              </select>
            </div>
            <div>
              Categoria
              <select
                data-testid="tag-input"
                name="tag"
                value={ tag }
                onChange={ this.changeInputs }
              >
                <option value="Alimentacão">Alimentação</option>
                <option value="Lazer">Lazer</option>
                <option value="Trabalho">Trabalho</option>
                <option value="Transporte">Transporte</option>
                <option value="Saúde">Saúde</option>
              </select>
            </div>
            <button onClick={ this.handleAddDespesa }>
              Adicionar despesa
            </button>
          </form>
          <div>
            {expenses.map((expen) => (
              <p key={expen.id}>{ expen.description }</p>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

FormDespesa.propTypes = {
  expense: PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.string,
    description: PropTypes.string,
    currency: PropTypes.string,
    method: PropTypes.string,
    tag: PropTypes.string,
    exchangeRates: PropTypes.shape(),
  }).isRequired,
  currencies: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    codein: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    high: PropTypes.string.isRequired,
    low: PropTypes.string.isRequired,
    varBid: PropTypes.string.isRequired,
    pctChange: PropTypes.string.isRequired,
    bid: PropTypes.string.isRequired,
    ask: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
    create_date: PropTypes.string.isRequired
  })).isRequired,
  currenciesAction: PropTypes.func.isRequired,
  setExpense: PropTypes.func.isRequired,
  setExpenses: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.string,
    description: PropTypes.string,
    currency: PropTypes.string,
    method: PropTypes.string,
    tag: PropTypes.string,
    exchangeRates: PropTypes.shape(),
  })).isRequired,
};

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
  expense: wallet.expense,
  expenses: wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  currenciesAction: () => dispatch(fetchGetCurrencies()),
  setExpenses: (expenses) => dispatch(expensesAction(expenses)),
  setExpense: (expense) => dispatch(expensesCurrencyAction(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormDespesa);
