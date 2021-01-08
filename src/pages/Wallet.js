import React from "react";
import { connect } from "react-redux";
import { fetchCurrencies, saveExpenseAction } from '../actions';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expenses: [],
      expenseId: 0,
      currencies: [],
      value: 0,
      currency: '',
      method: '',
      tag: '',
      description: '',
    }
  }


  handleSaveExpense = async () => {
    const { value, currency, method, tag, description, expenses } = this.state;
    const expense = {
      id: expenses.length + 1,
      value,
      description,
      currency,
      method,
      tag
    }

    await this.props.saveExpense(expense)
  }
  

  async componentDidMount () {
    await this.props.updateCurrencies();
    this.setState({currencies: this.props.currencyState })
  }

  handleOnChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    })
  }

  render() {
    const { currencies, value, currency, method, tag, description } = this.state;
    
    return (
      <div>
        <h1>TrybeWallet</h1>
        <h2 data-testid="email-field">bem vindo:{this.props.emailProp} </h2>
        <label>
          Total de gastos:
          <h3 data-testid="total-field">0</h3>
        </label>

        <label>
          Câmbio:
          <h3 data-testid="header-currency-field">BRL</h3>
        </label>

        <form>
          <label>
            Valor:
            <input data-testid="value-input" type="number" name="value" value={value} onChange={this.handleOnChange}/>
          </label>

          <label>
            Descrição:
            <input data-testid="description-input" type="text" name="description" value={description} onChange={this.handleOnChange} />
          </label>

          <label>
            Moeda:
            <select data-testid="currency-input" name="currency" value={currency} onChange={this.handleOnChange}>
              {currencies.map((currency, index) => <option data-testid={currency.code}key={index}>{currency.code}</option>)}
            </select>
          </label>

          <label>
            Metodo:
            <select data-testid="method-input" name="method"value={method} onChange={this.handleOnChange}>
                <option key="1">Dinheiro</option>
                <option key="2">Cartão de crédito</option>
                <option key="3">Cartão de débito</option>
            </select>
          </label>

          <label>
            Categoria:
            <select data-testid="tag-input" name="tag" value={tag} onChange={this.handleOnChange}>
                <option key="1">Alimentação</option>
                <option key="2">Lazer</option>
                <option key="3">Trabalho</option>
                <option key="4">Transporte</option>
                <option key="5">Saúde</option>
            </select>
          </label>
        </form>
        <button onClick={this.handleSaveExpense}>Adicionar despesa</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  emailProp: state.user.email,
  currencyState: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  updateCurrencies: () => dispatch(fetchCurrencies()),
  saveExpense: (expense) => dispatch(saveExpenseAction(expense)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
