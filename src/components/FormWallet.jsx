import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { sendCurrencies, sendFormAndExhangesRates } from '../actions';

class FormWallet extends Component {
  constructor() {
    super();

    this.getInformationsCost = this.getInformationsCost.bind(this);

    this.state = {
      payment: ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'],
      tagCost: ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'],
      cost: {
        value: '',
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
      },
    };
  }

  componentDidMount() {
    const { updateCurrencies } = this.props;
    updateCurrencies();
  }

  getInformationsCost({ target }) {
    const { name, value } = target;
    this.setState(({ cost }) => ({
      cost: { ...cost, [name]: value },
    }));
  }

  render() {
    const { sendCost, currencies, updateCount, expenses } = this.props;
    const { payment, tagCost, cost } = this.state;
    const { value, description, currency, method, tag } = cost;
    const filterCurrencies = currencies.filter((coin) => coin !== 'USDT');
    // console.log(filterCurrencies);
    console.log(expenses);
    return (
      <form>
        <fieldset>
          <legend>Despesas</legend>
          <div>
            <label htmlFor="value">
              Adicionar Despesa
              <input
                type="number"
                data-testid="value-input"
                name="value"
                id="value"
                value={ value }
                onChange={ this.getInformationsCost }
                required
              />
            </label>
          </div>
          <div>
            <label htmlFor="description">
              Descrição Despesa
              <input
                type="text"
                data-testid="description-input"
                name="description"
                id="description"
                value={ description }
                onChange={ this.getInformationsCost }
                required
              />
            </label>
          </div>
          <div>
            <label htmlFor="currency">
              Tipo da moeda
              <select
                data-testid="currency-input"
                name="currency"
                id="currency"
                value={ currency }
                onChange={ this.getInformationsCost }
                required
              >
                {filterCurrencies.map((coin) => (
                  <option key={ coin } data-testid={ coin }>
                    {coin}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div>
            <label htmlFor="method">
              Pagamento
              <select
                data-testid="method-input"
                name="method"
                id="method"
                value={ method }
                onChange={ this.getInformationsCost }
                required
              >
                {payment.map((payMethod) => (
                  <option key={ payMethod }>{payMethod}</option>
                ))}
              </select>
            </label>
          </div>
          <div>
            <label htmlFor="tag">
              Despesa
              <select
                data-testid="tag-input"
                name="tag"
                id="tag"
                value={ tag }
                onChange={ this.getInformationsCost }
                required
              >
                {tagCost.map((expenseTag) => (
                  <option key={ expenseTag }>{expenseTag}</option>
                ))}
              </select>
            </label>
          </div>
        </fieldset>
        <button
          type="button"
          onClick={() => { 
            sendCost(cost);
            updateCount(); 
          }}>
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
  expenses: wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  updateCurrencies: (currency) => dispatch(sendCurrencies(currency)),
  sendCost: (form) => dispatch(sendFormAndExhangesRates(form)),
});

FormWallet.propTypes = {
  updateCurrencies: PropTypes.func.isRequired,
  sendCost: PropTypes.func.isRequired,
  updateCount: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(String).isRequired,
  expenses: PropTypes.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FormWallet);
