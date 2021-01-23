import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { requestApiAndAnsewrs, actionExpenses } from '../actions';

class ExpenseAddForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentacao',
      exchangeRates: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.updateCurrency = this.updateCurrency.bind(this);
    this.addDespesa = this.addDespesa.bind(this);
  }

  componentDidMount() {
    this.updateCurrency();
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  addDespesa() {
    this.setState((prevState) => {
      const { addExpenses } = this.props;
      const expenseInfo = prevState;
      const initialState = {
        id: expenseInfo.id + 1,
        value: 0,
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
      };
      addExpenses(expenseInfo);
      this.updateCurrency();
      return initialState;
    });
  }

  async updateCurrency() {
    const { fetchApi } = this.props;
    const { currency } = await fetchApi();
    this.setState({ exchangeRates: currency });
  }

  render() {
    const { moeda } = this.props;
    const { value, description, currency, method, tag, exchangeRates } = this.state;
    console.log(exchangeRates);
    delete moeda.USDT;
    const currencyKeys = Object.keys(moeda);

    return (
      <div>
        <form>
          <label htmlFor="value">
            Valor:
            <input
              id="value"
              type="text"
              data-testid="value-input"
              name="value"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="description">
            Descrição:
            <input
              id="description"
              type="text"
              data-testid="description-input"
              name="description"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="currency">
            Moeda:
            <select
              data-testid="currency-input"
              id="currency"
              value={ currency }
              name="currency"
              onChange={ this.handleChange }
            >
              {currencyKeys.map((item, index) => (
                <option
                  key={ index }
                  value={ item }
                  data-testid={ item }
                  currency={ item }
                  name={ item }
                >
                  { item }
                </option>
              ))}
            </select>
          </label>

          <select
            data-testid="method-input"
            name="method"
            value={ method }
            onChange={ this.handleChange }
          >
            Método de pagamento:
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>

          <label htmlFor="tag">
            Tag:
            <select
              value={ tag }
              data-testid="tag-input"
              id="tag"
              name="tag"
              onChange={ this.handleChange }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>

          <button type="button" onClick={ this.addDespesa }>Adicionar despesa</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  moeda: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchApi: (element) => dispatch(requestApiAndAnsewrs(element)),
  addExpenses: (addExpense) => dispatch(actionExpenses(addExpense)),
});

ExpenseAddForm.propTypes = {
  moeda: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchApi: PropTypes.func.isRequired,
  addExpenses: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseAddForm);
