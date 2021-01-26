import React from 'react';
import { connect } from 'react-redux';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      valor: '',
      descricao: '',
      moeda: 'USD',
      pgto: 'Dinheiro',
      categoria: 'Alimentação',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  render() {
    const { valor, descricao, moeda, pgto, categoria } = this.state;
    const { email, total = 0 } = this.props;
    return (
      <div>
        <header>
          <h1 data-testid="email-field">{email}</h1>
          <h2 data-testid="total-field">{total}</h2>
          <h3 data-testid="header-currency-field">BRL</h3>
        </header>
        <form>
          <label htmlFor="despesa">
            Valor da despesa:
            <input
              data-testid="value-input"
              id="despesa"
              type="number"
              min={ 0 }
              value={ valor }
              name="valor"
              onChange={ (event) => this.handleChange(event) }
            />
          </label>
          <label htmlFor="descricao">
            Descrição:
            <input
              data-testid="description-input"
              id="descricao"
              type="text"
              value={ descricao }
              name="descricao"
              onChange={ (event) => this.handleChange(event) }
            />
          </label>
          <label htmlFor="moeda">
            Moeda:
            <select
              id="moeda"
              value={ moeda }
              name="moeda"
              data-testid="currency-input"
              onChange={ (event) => this.handleChange(event) }
            >
              <option data-testid="USD" value="USD">
                USD
              </option>
              <option data-testid="CAD" value="CAD">
                CAD
              </option>
              <option data-testid="EUR" value="EUR">
                EUR
              </option>
              <option data-testid="GBP" value="GBP">
                GBP
              </option>
              <option data-testid="ARS" value="ARS">
                ARS
              </option>
              <option data-testid="BTC" value="BTC">
                BTC
              </option>
              <option data-testid="LTC" value="LTC">
                LTC
              </option>
              <option data-testid="JPY" value="JPY">
                JPY
              </option>
              <option data-testid="CHF" value="CHF">
                CHF
              </option>
              <option data-testid="AUD" value="AUD">
                AUD
              </option>
              <option data-testid="CNY" value="CNY">
                CNY
              </option>
              <option data-testid="ILS" value="ILS">
                ILS
              </option>
              <option data-testid="ETH" value="ETH">
                ETH
              </option>
              <option data-testid="XRP" value="XRP">
                XRP
              </option>
            </select>
          </label>
          <label htmlFor="pgto">
            Pagamento:
            <select
              value={ pgto }
              name="pgto"
              id="pgto"
              data-testid="method-input"
              onChange={ (event) => this.handleChange(event) }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de débito">Cartão de débito</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
            </select>
          </label>
          <label htmlFor="categoria">
            Tag:
            <select
              value={ categoria }
              name="categoria"
              id="categoria"
              data-testid="tag-input"
              onChange={ (event) => this.handleChange(event) }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <button
            type="button"
            //onClick={ }
          >
            Adiconar despesa
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  // trouxe o rootReducer
  email: state.user.email,
  total: state.wallet.total,
});

export default connect(mapStateToProps)(Wallet);
