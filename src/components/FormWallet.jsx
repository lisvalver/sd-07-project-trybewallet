import React, { Component } from 'react';
import { connect } from 'react-redux';
import { coins } from '../actions';

class FormWallet extends Component {
  constructor() {
    super();

    this.state = {
      coins: [],
      payment: ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'],
      tagCost: ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'],
      cost: {
        value: '',
        description: '',
        currency: '',
        method: '',
        tag: '',
      }
    };
  }

  async componentDidMount() {
    const { allCoins } = this.props;
    const endpoint = 'https://economia.awesomeapi.com.br/json/all';
    const response = await fetch(endpoint);
    const data = await response.json();
    const coins = Object.keys(data);
    const filterCoins = coins.filter(coin => coin !== 'USDT');
    console.log(filterCoins);

    this.setState(
      prevState => ({
        coins: [...prevState.coins, ...filterCoins],
      }),
      () => allCoins(filterCoins),
    );
  }

  render() {
    const { coins, payment, tagCost } = this.state;
    return (
      <form>
        <fieldset>
          <legend>Despesas</legend>
          <div>
            <label htmlFor='expense'>Adicionar Despesa</label>
            <input
              type='number'
              data-testid='value-input'
              name='expense'
              id='expense'
            />
          </div>
          <div>
            <label htmlFor='description'>Descrição Despesa</label>
            <input
              type='text'
              data-testid='description-input'
              name='description'
              id='description'
            />
          </div>
          <div>
            <label htmlFor='coins'>Tipo da moeda</label>
            <select data-testid='currency-input' name='coins' id='coins'>
              {coins.map(coin => (
                <option key={coin} data-testid={coin}>
                  {coin}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor='payment'>Pagamento</label>
            <select data-testid='method-input' name='payment' id='payment'>
              {payment.map(method => (
                <option key={method}>{method}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor='tagCost'>Despesa</label>
            <select data-testid='tag-input' name='tagCost' id='tagCost'>
              {tagCost.map(tag => (
                <option key={tag}>{tag}</option>
              ))}
            </select>
          </div>
        </fieldset>
        <button>Adicionar despesa</button>
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  allCoins: value => dispatch(coins(value)),
});

export default connect(null, mapDispatchToProps)(FormWallet);
