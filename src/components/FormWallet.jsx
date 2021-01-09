import React, { Component } from 'react';
import { connect } from 'react-redux';
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
    const { sendCost, currencies } = this.props;
    const { payment, tagCost, cost } = this.state;
    const { value, description, currency, method, tag } = cost;
    const filterCurrencies = currencies.filter(coin => coin !== 'USDT');
    // console.log(filterCurrencies);
    return (
      <form>
        <fieldset>
          <legend>Despesas</legend>
          <div>
            <label htmlFor='value'>Adicionar Despesa</label>
            <input
              type='number'
              data-testid='value-input'
              name='value'
              id='value'
              value={value}
              onChange={this.getInformationsCost}
            />
          </div>
          <div>
            <label htmlFor='description'>Descrição Despesa</label>
            <input
              type='text'
              data-testid='description-input'
              name='description'
              id='description'
              value={description}
              onChange={this.getInformationsCost}
            />
          </div>
          <div>
            <label htmlFor='currency'>Tipo da moeda</label>
            <select
              data-testid='currency-input'
              name='currency'
              id='currency'
              value={currency}
              onChange={this.getInformationsCost}>
              {filterCurrencies.map(coin => (
                <option key={coin} data-testid={coin}>
                  {coin}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor='method'>Pagamento</label>
            <select
              data-testid='method-input'
              name='method'
              id='method'
              value={method}
              onChange={this.getInformationsCost}>
              {payment.map(method => (
                <option key={method}>{method}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor='tag'>Despesa</label>
            <select
              data-testid='tag-input'
              name='tag'
              id='tag'
              value={tag}
              onChange={this.getInformationsCost}>
              {tagCost.map(tag => (
                <option key={tag}>{tag}</option>
              ))}
            </select>
          </div>
        </fieldset>
        <button type='button' onClick={() => sendCost(cost)}>
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
});

const mapDispatchToProps = dispatch => ({
  updateCurrencies: currency => dispatch(sendCurrencies(currency)),
  sendCost: form => dispatch(sendFormAndExhangesRates(form)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormWallet);
