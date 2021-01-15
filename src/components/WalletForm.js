import React from 'react';
import { connect } from 'react-redux';
import { expenseToSave, upDateCurrencies } from '../actions';

class WalletForm extends React.Component {
  constructor() {
    super();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.state = {
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
  }

  handleInputChange({ target }) {
    this.setState({ [target.name]: target.value });
  }

  render() {
    const {
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;

    const { saveExpenses, currencies, isFetching, upDateCurrencies } = this.props;
    console.log(this.props);
    const expenses = {
      value,
      description,
      currency,
      method,
      tag,
    };
    return (
      <div>
        { isFetching ? 'loading...'
          : <form>
            <input
              name="value"
              onChange={ (e) => this.handleInputChange(e) }
              data-testid="value-input"
            />
            <input
              name="description"
              onChange={ (e) => this.handleInputChange(e) }
              data-testid="description-input"
            />
            <select
              name="currency"
              onChange={ (e) => this.handleInputChange(e) }
              data-testid="currency-input"
            >
              {currencies.map((currentCurrency) => (
                <option key={ currentCurrency } data-testid={ currentCurrency }>{currentCurrency}</option>
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
            <button
              type="button"
              onClick={ () => {
                upDateCurrencies();
                saveExpenses(expenses);
              } }
            >
              Adicionar despesa
            </button>
            </form>}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  isFetching: state.wallet.isFetching,
  total: state,
});

const mapDispatchToProps = (dispatch) => ({
  saveExpenses: (expense) => dispatch(expenseToSave(expense)),
  upDateCurrencies: () => dispatch(upDateCurrencies()),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
