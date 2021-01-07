import React from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
import currencyAPI from '../services/currencyAPI';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      validCurrency: [''],
    };
    this.atualizaEstado = this.atualizaEstado.bind(this);
  }

  async componentDidMount() {
    const currencyObj = await currencyAPI();
    const onlyCurrencies = Object.keys(currencyObj);
    this.atualizaEstado(onlyCurrencies);
  }

  atualizaEstado(currencies) {
    this.setState({
      validCurrency: currencies.filter((curr) => curr !== 'USDT'),
    });
  }

  render() {
    const { validCurrency } = this.state;
    return (
      <div>
        <form>
          <input
            data-testid="value-input"
            type="number"
            placeholder="Valor da despesa"
          />
          <input
            data-testid="description-input"
            type="text"
            placeholder="Despesa"
          />
          <label htmlFor="moedas">
            Selecione uma moeda
            <select data-testid="currency-input" name="moedas">
              {validCurrency.map((currency) => (
                <option data-testid={ currency } value={ currency } key={ currency }>
                  {currency}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="pagamento">
            Selecione a forma de pagamento
            <select data-testid="method-input" name="pagamento">
              <option value="Dinheiro" key="dinheiro">
                Dinheiro
              </option>
              <option value="CartaoC" key="cartaoC">
                Cartão de crédito
              </option>
              <option value="CartaoD" key="cartaoD">
                Cartão de débito
              </option>
            </select>
          </label>
          <label htmlFor="tag">
            Selecione uma categoria
            <select data-testid="tag-input" name="tag">
              <option value="Alimentacao" key="alimentacao">
                Alimentação
              </option>
              <option value="Lazer" key="lazer">
                Lazer
              </option>
              <option value="Trabalho" key="trabalho">
                Trabalho
              </option>
              <option value="Transporte" key="transporte">
                Transporte
              </option>
              <option value="saude" key="saude">
                Saúde
              </option>
            </select>
          </label>
          <button type="button">Adicionar despesa</button>
        </form>
      </div>
    );
  }
}

export default Form;
