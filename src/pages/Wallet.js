import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/index';
import Table from '../components/Table';

class Wallet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      description: '',
      currency: 'BRL',
      method: 'Dinheiro',
      tag: 'Alimentação',
    }
  }

  componentDidMount() {
    this.props.fetchCurrencies()
  }

  submitExpense = async () => {
    await fetch('https://economia.awesomeapi.com.br/json/all')
    .then((result) => result.json())
    .then((data) =>  {
      delete data.USDT
      const expense = {
        "value": this.state.value,
        "description": this.state.description,
        "currency": this.state.currency,
        "method": this.state.method,
        "tag": this.state.tag,
        "exchangeRates": data,
      }
      this.props.addExpense(expense)
    });
  }

  removeExpense = (id) => {
    this.props.removeExpense(id);
  }

  handleChange = (event, key) => {
    this.setState({
      [key]: event.target.value,
    });
  }

  render() {
    let currencies = []
    if (this.props.currencies) {
      currencies = this.props.currencies.map(elem => {
        return (<option data-testid={elem} value={elem} key={elem}>{elem}</option>)
      })
    }
    return (
      <div>
        <header>
          <span data-testid="email-field">{this.props.email}</span>
          <span data-testid="total-field">{this.props.money ? this.props.money : 0}</span>
          <h1 data-testid="header-currency-field">BRL</h1>
        </header>
        <div>
          <input data-testid="value-input" type="number" onChange={(event) => this.handleChange(event, 'value')} value={this.state.value}></input>
          <input data-testid="description-input" type="text" onChange={(event) => this.handleChange(event, 'description')} value={this.state.description}></input>
          <select data-testid="currency-input" onChange={(event) => this.handleChange(event, 'currency')} value={this.state.currency}>
          {currencies}
          </select>
          <select data-testid="method-input" onChange={(event) => this.handleChange(event, 'method')} value={this.state.method}>
            <option value='Dinheiro'>Dinheiro</option>
            <option value='Cartão de crédito'>Cartão de crédito</option>
            <option value='Cartão de débito'>Cartão de débito</option>
          </select>
          <select data-testid="tag-input" onChange={(event) => this.handleChange(event, 'tag')} value={this.state.tag}>
            <option value='Alimentação'>Alimentação</option>
            <option value='Lazer'>Lazer</option>
            <option value='Trabalho'>Trabalho</option>
            <option value='Transporte'>Transporte</option>
            <option value='Saúde'>Saúde</option>
          </select>
        </div>
      <button
      onClick={this.submitExpense}
      >Adicionar despesa
      </button>
      <Table value={this.props.expenses} remove={this.removeExpense}/>
    </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    email: state.user.email,
    money: state.wallet.money,
    currencies: state.wallet.currencies,
    expenses: state.wallet.expenses,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addExpense: expense => {
      dispatch(actionCreators.addExpense(expense));
    },
    removeExpense: id => {
      dispatch(actionCreators.removeExpense(id));
    },
    fetchCurrencies: () => {
      dispatch(actionCreators.fetchCurrencies());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
