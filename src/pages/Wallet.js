import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.currencies = this.currencies.bind(this);
    this.state = {
      list: [],
    };
  }

  componentDidMount() {
    this.generateCurrencies();
  }

  currencies() {
    const { list } = this.state;
    return list.map((item) => (
      <option key={ item } data-testid={ item } value={ item }>{item}</option>
    ));
  }

  async generateCurrencies() {
    const url = 'https://economia.awesomeapi.com.br/json/all';
    await fetch(url)
      .then((item) => item.json())
      .then((item) => Object.keys(item))
      .then((item) => item.filter((one) => one !== 'USDT'))
      .then((item) => this.setState({ list: item }));
    this.currencies();
  }

  render() {
    console.log(this.props);
    const { email } = this.props;
    return (
      <div>
        <header>
          <p data-testid="email-field">
            {email}
            {' '}
          </p>
          <p>Despesa Total: </p>
          <p data-testid="total-field">0</p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
        <section>
          <form>
            <label htmlFor="new_expense_value">
              {' '}
              Valor:
              <input
                type="number"
                name="new_expense_value"
                id="new_expense_value"
                data-testid="value-input"
              />
            </label>
            <label htmlFor="new_expense_description">
              Descrição:
              <input
                type="text"
                name="new_expense_description"
                id="new_expense_description"
                data-testid="description-input"
              />
            </label>
            <label htmlFor="currency">
              Choose a currency:
              <select id="currencies">
                {this.currencies()}
              </select>
            </label>
            <label htmlFor="payment_method">
              Choose a currency:
              <select data-testid="method-input">
                <option value="Dinheiro">Dinheiro</option>
                <option value="credit_card">Cartão de crédito</option>
                <option value="debit_card">Cartão de débito</option>
              </select>
            </label>

            <label htmlFor="category">
              Categoria:
              <select data-testid="tag-input">
                <option value="alimentacao">Alimentação</option>
                <option value="lazer">Lazer</option>
                <option value="trabalho">Trabalho</option>
                <option value="transporte">Transporte</option>
                <option value="saude">Saúde</option>
              </select>
            </label>
            <button type="button">Adicionar despesa</button>
          </form>
        </section>
      </div>);
  }
}
Wallet.propTypes = {
  email: PropTypes.string.isRequired,
};
const mapStateToProps = (state) => ({
  email: state.user.email,
});
export default connect(mapStateToProps)(Wallet);
