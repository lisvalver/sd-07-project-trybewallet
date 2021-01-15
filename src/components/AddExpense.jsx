import React from 'react';
// import * as api from '../services/api';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';

class AddExpense extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      value: 0,
      description: '',
      currency: '',
      paymentMethod: '',
      category: '',
    };
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleClick() {
    // Lógica do clique
    console.log('Clicado');
  }

  render() {
    const {
      value,
      description,
      currency,
      paymentMethod,
      category,
    } = this.state;
    return (
      <div className="App">
        <form>
          <label htmlFor="value">
            Valor:
            <input
              data-testid="value-input"
              type="number"
              name="value"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="description">
            Adicionar Descrição:
            <input
              data-testid="description-input"
              type="text"
              name="description"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="currency">
            Selecionar moeda:
            <select
              data-testid="currency-input"
              id="currency"
              name="currency"
              value={ currency }
              onChange={ this.handleChange }
            >
              <option>Selecione</option>
              <option key="USD" data-testid="USD">
                USD
              </option>
              <option key="CAD" data-testid="CAD">
                CAD
              </option>
              <option key="EUR" data-testid="EUR">
                EUR
              </option>
              <option key="GBP" data-testid="GBP">
                GBP
              </option>
              <option key="ARS" data-testid="ARS">
                ARS
              </option>
              <option key="BTC" data-testid="BTC">
                BTC
              </option>
              <option key="LTC" data-testid="LTC">
                LTC
              </option>
              <option key="JPY" data-testid="JPY">
                JPY
              </option>
              <option key="CHF" data-testid="CHF">
                CHF
              </option>
              <option key="AUD" data-testid="AUD">
                AUD
              </option>
              <option key="CNY" data-testid="CNY">
                CNY
              </option>
              <option key="ILS" data-testid="ILS">
                ILS
              </option>
              <option key="ETH" data-testid="ETH">
                ETH
              </option>
              <option key="XRP" data-testid="XRP">
                XRP
              </option>
              {/* Estudante Arthur Massaini: */}
              {/* https://github.com/tryber/sd-07-project-trybewallet/pull/35 */}
              {/* {currencies.map((element) => (
                <option key={ element.name } data-testid={ element.code }>
                  {element.code}
                </option>
              ))} */}
            </select>
          </label>

          <label htmlFor="paymentMethod">
            Método de pagamento:
            <select
              data-testid="method-input"
              id="paymentMethod"
              name="paymentMethod"
              value={ paymentMethod }
              onChange={ this.handleChange }
            >
              <option>Selecione</option>
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>

          <label htmlFor="category">
            Categoria:
            <select
              data-testid="tag-input"
              id="category"
              name="category"
              value={ category }
              onChange={ this.handleChange }
            >
              <option>Selecione</option>
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>

          <button
            type="button"
            onClick={ this.handleClick }
          >
            Adicionar despesas
          </button>
        </form>
      </div>
    );
  }
}

export default AddExpense;
