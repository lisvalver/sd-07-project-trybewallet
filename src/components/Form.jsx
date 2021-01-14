import React from 'react'
import { connect } from 'react-redux';
// import wallet from '../actions/wallet';
// import callAPI from '../service/api';

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      valueInput: 0,
      descriptionInput: '',
      currencyInput: 'BRL',
      methodInput: 'Dinheiro',
      tagInput: 'Alimentação',
    };

    this.updateStateInputs = this.updateStateInputs.bind(this);
    this.filterCurrencies = this.filterCurrencies.bind(this);
  }  // componentDidMount() {
  //   this.getCurrencyList();
  // }



  // getCurrencyList() {
  //   this.setState(async () => {
  //     const fetchResult = await callAPI();
  //     const currencyList = Object.keys(fetchResult);
  //     const expectedCurrencyList = currencyList.filter((currentCurrency) => 'USDT' !== currentCurrency);
  //     this.setState({ currencyList: expectedCurrencyList });
  //   });
  // }

  filterCurrencies() {
    const { currencies } = this.props;
    const keysOfCurrencies = Object.keys(currencies);
    const filteredCurrencies = keysOfCurrencies.filter((currentCurrency) => 'USDT' !== currentCurrency);
    return filteredCurrencies;
  }

  updateStateInputs({ target }) {
    this.setState({ [target.name]: target.value });
  }

  render() {
    const {
      valueInput,
      descriptionInput,
      currencyInput,
      methodInput,
      tagInput,
    } = this.state;

    const currencyList = this.filterCurrencies();

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
        <button
          type="submit"
          // onClick={ () => wallet(this.state) }
        >
          Adicionar despesa
        </button>
      </fieldset>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

// const mapDispatchToProps = (dispatch) => ({
//   wallet: (inputValues) => dispatch(wallet(inputValues)),
// });

// export default connect(null, mapDispatchToProps)(Form);
export default connect(mapStateToProps, null)(Form);
