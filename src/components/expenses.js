import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { addDebitsToExpenses, getCurrency } from '../actions/index';

class Expenses extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.saveExpense = this.saveExpense.bind(this);

    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
  }

  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  saveExpense() {
    const { id, value, description, currency, method, tag } = this.state;
    const { add } = this.props;
    this.setState({ id: id + 1 });
    add({ id, value, description, currency, method, tag });
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  }

  render() {
    const { coins } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <div>
        <div className="Form">
          <fieldset>
            <div className="expense-container">
              <div className="value">
                <label htmlFor="value">
                  Valor:
                  <input
                    name="value"
                    type="number"
                    step="0.01"
                    value={ value }
                    data-testid="value-input"
                    onChange={ this.handleChange }
                  />
                </label>
              </div>
              <div className="description">
                <label htmlFor="description">
                  Descrição:
                  <input
                    name="description"
                    type="text"
                    value={ description }
                    data-testid="description-input"
                    onChange={ this.handleChange }
                  />
                </label>
              </div>
              <div className="currency">
                Moeda:
                <select
                  name="currency"
                  value={ currency }
                  data-testid="currency-input"
                  onChange={ this.handleChange }
                >
                  {Object.keys(coins).filter((coin) => coin !== 'USDT')
                    .map((currencyCode) => (
                      <option
                        value={ currencyCode }
                        data-testid={ currencyCode }
                        key={ currencyCode }
                      >
                        { currencyCode }
                      </option>
                    ))}
                </select>
              </div>
              <div className="payment-method">
                Método de pagamento:
                <select
                  name="method"
                  value={ method }
                  data-testid="method-input"
                  onChange={ this.handleChange }
                >
                  <option value="Dinheiro">Dinheiro</option>
                  <option value="Cartão de crédito">Cartão de crédito</option>
                  <option value="Cartão de débito">Cartão de débito</option>
                </select>
              </div>
              <div className="tag">
                Tag:
                <select
                  name="tag"
                  value={ tag }
                  data-testid="tag-input"
                  onChange={ this.handleChange }
                >
                  <option value="Alimentação">Alimentação</option>
                  <option value="Lazer">Lazer</option>
                  <option value="Trabalho">Trabalho</option>
                  <option value="Transporte">Transporte</option>
                  <option value="Saúde">Saúde</option>
                </select>
              </div>
            </div>
          </fieldset>
          <div className="add-expense-button">
            <button
              type="button"
              onClick={ this.saveExpense }
            >
              Adicionar despesa
            </button>
          </div>
        </div>
      </div>);
  }
}

const mapStateToProps = (state) => ({
  coins: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(getCurrency()),
  add: (object) => dispatch(addDebitsToExpenses(object)) });

export default connect(mapStateToProps, mapDispatchToProps)(Expenses);

Expenses.propTypes = {
  add: propTypes.func.isRequired,
  getCurrencies: propTypes.func.isRequired,
  coins: propTypes.arrayOf(propTypes.object),
}.isRequired;
