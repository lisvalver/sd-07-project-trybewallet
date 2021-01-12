import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as action from '../actions';

class Wallet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      description: '',
      method: 'Dinheiro',
      currency: 'USD',
      tag: 'Alimentação',
      value: 0,
      total: 0,
    };

    this.handleFetch = this.handleFetch.bind(this);
    this.handleAddExpense = this.handleAddExpense.bind(this);
  }

  componentDidMount() {
    this.handleFetch();
  }

  handleFetch() {
    const { fetchMyCurrencyList, expenses } = this.props;
    if (expenses) {
      fetchMyCurrencyList();
    }
  }

  async handleAddExpense(event) {
    event.preventDefault();
    const { addExp, currencyList, fetchMyCurrencyList } = this.props;
    await fetchMyCurrencyList();
    await this.setState({ exchangeRates: currencyList });
    await addExp(this.state);
    const { total, value } = this.state;
    const totalNum = parseInt(total, 10);
    const valueNum = parseInt(value, 10);
    this.setState({
      total: totalNum + valueNum,
    });
    this.setState({
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  }

  render() {
    const { userLogin, currencyList } = this.props;
    const filterCurrencies = Object.keys(currencyList)
      .filter((currency) => currency !== 'USDT');
    const { value, description, currency, method, tag, total } = this.state;
    return (
      <div>
        <div>
          <span data-testid="email-field">{ userLogin }</span>
          <span data-testid="total-field">{ total }</span>
          <span data-testid="header-currency-field">BRL</span>
        </div>
        <div>
          <form onSubmit={ (e) => this.handleAddExpense(e) }>
            <label htmlFor="expense">
              Valor da despeza:
              <input
                type="number"
                id="expense"
                value={ value }
                data-testid="value-input"
                onChange={ (e) => this.setState({ value: e.target.value }) }
              />
            </label>
            <label htmlFor="description">
              Descrição da despeza:
              <input
                type="text"
                id="description"
                data-testid="description-input"
                onChange={ (e) => this.setState({ description: e.target.value }) }
                value={ description }
              />
            </label>
            <label htmlFor="currency">
              Selecione o Câmbio
              <select
                data-testid="currency-input"
                id="currency"
                onChange={ (e) => this.setState({ currency: e.target.value }) }
                value={ currency }
              >
                {filterCurrencies.map((element, index) => (
                  <option data-testid={ element } key={ index } value={ element }>
                    {element}
                  </option>
                ))}
                ;
              </select>
            </label>
            <label htmlFor="method">
              Selecione Método de Pagamento:
              <select
                data-testid="method-input"
                id="method"
                onChange={ (e) => this.setState({ method: e.target.value }) }
                value={ method }
              >
                <option>Dinheiro</option>
                <option>Cartão de crédito</option>
                <option>Cartão de débito</option>
              </select>
            </label>
            <label htmlFor="tag">
              Tag:
              <select
                data-testid="tag-input"
                id="tag"
                onChange={ (e) => this.setState({ tag: e.target.value }) }
                value={ tag }
              >
                <option>Alimentatação</option>
                <option>Lazer</option>
                <option>Trabalho</option>
                <option>Transporte</option>
                <option>Saúde</option>
              </select>
              <button type="submit">Adicionar despesa</button>
            </label>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userLogin: state.user.email,
  currencyList: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  fetchMyCurrencyList: () => dispatch(action.fetchingAPI),
  addExp: (expense) => dispatch(action.newExpenseAction(expense)),
});

Wallet.propTypes = {
  userLogin: PropTypes.string.isRequired,
  fetchMyCurrencyList: PropTypes.func.isRequired,
  currencyList: PropTypes.arrayOf(PropTypes.object).isRequired,
  addExp: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
