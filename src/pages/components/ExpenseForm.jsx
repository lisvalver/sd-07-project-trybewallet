import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  requestCurrency,
  requestCurrencyObject,
  changeExpenses,
  changeTotalExpenses,
  newExpenses } from '../../actions';

const initialState = {
  id: 0,
  value: 0,
  currency: '',
  method: 'Dinheiro',
  tag: 'Alimentação',
  description: '',
};
class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.handleChanges = this.handleChanges.bind(this);
    this.submitDatas = this.submitDatas.bind(this);
    this.handleCurrencyInit = this.handleCurrencyInit.bind(this);
    this.editRowSetState = this.editRowSetState.bind(this);
  }

  componentDidMount() {
    const { requestCoin } = this.props;
    requestCoin();
  }

  editRowSetState() {
    const { editExpenses } = this.props;
    const { value, currency, method, tag, description } = editExpenses;
    this.setState({ value, currency, method, tag, description });
    console.log('Objeto de edição ', editExpenses);
  }

  handleCurrencyInit() {
    const { currencies } = this.props;
    this.setState({ currency: currencies[0] });
  }

  handleChanges({ target }) {
    const { currency } = this.state;

    const { name, value } = target;
    this.setState({ [name]: value });

    if (!currency) this.handleCurrencyInit();
  }

  async submitDatas() {
    const { id, value, currency, method, tag, description } = this.state;
    const {
      submitExpenses,
      totalExpenses = 0,
      submitTotalExpenses,
      requestCurrencyObj,
      creatNewExpenses,
      editing,
    } = this.props;
    await requestCurrencyObj();

    const { currenciesObj } = this.props;

    const { ask } = currenciesObj[currency];

    const total = Math
      .round((parseFloat(totalExpenses) + parseFloat(value) * ask) * 100) / 100;

    const expense = {
      id,
      value,
      currency,
      method,
      tag,
      description,
      exchangeRates: currenciesObj,
    };
    console.log(total);
    if (editing) creatNewExpenses(expense);
    else submitExpenses(expense);
    submitTotalExpenses(total);
    this.setState({ id: id + 1, value: 0 });
  }

  render() {
    const { currencies, editing } = this.props;
    const { value, currency, method, tag, description } = this.state;
    if (editing && value === 0) this.editRowSetState();
    return (
      <section>
        <form>
          <div className="field">
            <label htmlFor="value" className="label">
              Valor:
              <div className="control">
                <input
                  type="number"
                  id="value"
                  name="value"
                  value={ value }
                  className="input"
                  data-testid="value-input"
                  onChange={ this.handleChanges }
                />
              </div>
            </label>
          </div>
          <div className="field">
            <label htmlFor="currency" className="label">
              Moedas:
              <div className="control select">
                <select
                  name="currency"
                  id="currency"
                  data-testid="currency-input"
                  value={ currency }
                  onChange={ this.handleChanges }
                >
                  {currencies.map((coin, index) => (
                    <option name="currency" key={ index } data-testid={ coin }>
                      {coin}
                    </option>
                  ))}
                </select>
              </div>
            </label>
          </div>
          <div className="field">
            <label htmlFor="method" className="label">
              Método:
              <div className="control select">
                <select
                  name="method"
                  value={ method }
                  onChange={ this.handleChanges }
                  id="method"
                  data-testid="method-input"
                >
                  <option value="Dinheiro"> Dinheiro</option>
                  <option value="Cartão de crédito"> Cartão de crédito</option>
                  <option value="Cartão de débito"> Cartão de débito</option>
                </select>
              </div>
            </label>
          </div>
          <div className="field">
            <label htmlFor="tag" className="label">
              Tag:
              <div className="control select">
                <select
                  name="tag"
                  velue={ tag }
                  onChange={ this.handleChanges }
                  id="tag"
                  data-testid="tag-input"
                >
                  <option value="Alimentação">Alimentação</option>
                  <option value="Lazer">Lazer</option>
                  <option value="Trabalho">Trabalho</option>
                  <option value="Transporte"> Transporte</option>
                  <option value="Saúde"> Saúde</option>
                </select>
              </div>
            </label>
          </div>
          <div className="field">
            <label htmlFor="description" className="label">
              Descrição:
              <div className="control">
                <input
                  type="text"
                  name="description"
                  value={ description }
                  onChange={ this.handleChanges }
                  id="description"
                  className="input"
                  data-testid="description-input"
                />
              </div>
            </label>
          </div>
          <div className="field">
            <div className="buttons">
              <input
                type="button"
                value="Adicionar despesa"
                name="enviar"
                id="enviar"
                className="button is-success"
                onClick={ this.submitDatas }
              />
            </div>
          </div>
        </form>
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  requestCoin: () => dispatch(requestCurrency()),
  requestCurrencyObj: () => dispatch(requestCurrencyObject()),
  submitExpenses: (expenses) => dispatch(changeExpenses(expenses)),
  submitTotalExpenses: (total) => dispatch(changeTotalExpenses(total)),
  creatNewExpenses: (expenses) => dispatch(newExpenses(expenses)),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  currenciesObj: state.wallet.currenciesObj,
  expenses: state.wallet.expenses,
  totalExpenses: state.wallet.totalExpenses,
  editExpenses: state.wallet.editExpenses,
  editing: state.wallet.editing,
});

ExpenseForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  requestCoin: PropTypes.func.isRequired,
  requestCurrencyObj: PropTypes.func.isRequired,
  submitExpenses: PropTypes.func.isRequired,
  submitTotalExpenses: PropTypes.func.isRequired,
  currenciesObj: PropTypes.arrayOf(PropTypes.string).isRequired,
  totalExpenses: PropTypes.number.isRequired,
  creatNewExpenses: PropTypes.func.isRequired,
  editing: PropTypes.bool.isRequired,
  editExpenses: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
