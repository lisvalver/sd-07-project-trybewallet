import React from 'react'
import { connect } from 'react-redux';
import wallet from '../actions/wallet';
import callAPI from '../service/api';

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      valueInput: '',
      descriptionInput: '',
      currencyInput: 'USD',
      methodInput: 'Dinheiro',
      tagInput: 'Alimentação',
      currencyList: [],
    };

    this.updateStateInputs = this.updateStateInputs.bind(this);
  }

  componentDidMount() {
    this.getCurrencyList();
  }

  getCurrencyList() {
    this.setState(async () => {
      const fetchResult = await callAPI();
      const currencyList = Object.keys(fetchResult);
      const expectedCurrencyList = currencyList.filter((currentCurrency) => 'USDT' !== currentCurrency);
      this.setState({ currencyList: expectedCurrencyList });
    });
  }

  updateStateInputs({ target }) {
    this.setState({ [target.name]: target.value });
  }

  render() {
    const {
      currencyList,
      valueInput,
      descriptionInput,
      currencyInput,
      methodInput,
      tagInput,
    } = this.state;

    return(
      <fieldset>
        <legend>Tabela de gastos</legend>
        <label htmlFor="valueInput">
          Valor:
          <input
            data-testid="value-input"
            name="valueInput"
            id="valueInput"
            type="number"
            placeholder="ex: 00.00"
            value={ valueInput }
            onChange={ this.updateStateInputs }
          />
        </label>
        <label htmlFor="descriptionInput">
          Descrição:
          <input
            data-testid="description-input"
            name="descriptionInput"
            id="descriptionInput"
            type="text"
            placeholder="ex: Compra de mês"
            value={ descriptionInput }
            onChange={ this.updateStateInputs }
          />
        </label>
        <label htmlFor="currencyInput">
          <select
            data-testid="currency-input"
            name="currencyInput"
            id="currencyInput"
            value={ currencyInput }
            onChange={ this.updateStateInputs }
          >
            {currencyList.map((currency) => (
              <option key={ currency } data-testid={ currency }>
                { currency }
              </option>))}
          </select>
        </label>
        <label htmlFor="methodInput">
          <select
            data-testid="method-input"
            name="methodInput"
            id="methodInput"
            value={ methodInput }
            onChange={ this.updateStateInputs }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tagInput">
          <select
            data-testid="tag-input"
            name="tagInput"
            id="tagInput"
            value={ tagInput }
            onChange={ this.updateStateInputs }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <button type="submit">Adicionar despesa</button>
      </fieldset>
    );
  }
}

const mapStateToProps = (state) => {
  
}

export default Form;
