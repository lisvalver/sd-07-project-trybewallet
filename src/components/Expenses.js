import React from 'react';
import { connect } from 'react-redux';

class Expenses extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    const currencies = ['USD', 'CAD', 'EUR', 'GBP', 'ARS', 'BTC', 'LTC', 'JPY', 'CHF', 'AUD', 'CNY', 'ILS', 'ETH', 'XRP', 'USDT'];
    return (
      <form>
        <input
          onChange={ (event) => this.handleChange(event) }
          name="value"
          type="text"
          data-testid="value-input"
        />
        <input
          onChange={ (event) => this.handleChange(event) }
          name="description"
          type="text"
          data-testid="description-input"
        />
        <select
          onChange={ (event) => this.handleChange(event) }
          name="currency"
          data-testid="currency-input"
        >
          {currencies.map((currency) => {
            if (currency !== 'USDT') {
              return (
                <option key={ currency } value={ currency } data-testid={ currency }>
                  {currency}
                </option>
              );
            }
            return false;
          })}
        </select>
        <select
          name="method"
          onChange={ (event) => this.handleChange(event) }
          data-testid="method-input"
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>

        <select
          name="tag"
          onChange={ (event) => this.handleChange(event) }
          data-testid="tag-input"
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>

        <button type="button">Adicionar despesa</button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Expenses);
