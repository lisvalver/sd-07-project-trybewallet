import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import currencyAPI from '../services/currencyAPI';
import { addExpense, updateTotalExpenses } from '../actions/index';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      validCurrency: [''],
      valor: 0,
      despesa: '',
      moeda: 'USD',
      pagamento: 'Dinheiro',
      categoria: 'Alimentação',
    };
    this.atualizaEstado = this.atualizaEstado.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.sendData = this.sendData.bind(this);
    this.sumExpenses = this.sumExpenses.bind(this);
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

  handleChange(chave, valor) {
    this.setState({
      [chave]: valor,
    });
  }

  sumExpenses(value, exchange) {
    return value * exchange;
  }

  async sendData() {
    const { add, nextId, update } = this.props;
    const { valor, despesa, moeda, pagamento, categoria } = this.state;
    const exchangeData = await currencyAPI();
    const data = {
      id: nextId,
      value: valor,
      description: despesa,
      currency: moeda,
      method: pagamento,
      tag: categoria,
      exchangeRates: exchangeData,
    };
    add(data);
    const exchange = exchangeData[moeda].ask;
    update(this.sumExpenses(valor, exchange));
  }

  render() {
    const { validCurrency, valor, despesa, moeda, pagamento, categoria } = this.state;

    return (
      <div>
        <form>
          <input
            data-testid="value-input"
            type="number"
            placeholder="Valor da despesa"
            onChange={ (event) => this.handleChange('valor', event.target.value) }
            value={ valor }
          />
          <input
            data-testid="description-input"
            type="text"
            placeholder="Despesa"
            onChange={ (event) => this.handleChange('despesa', event.target.value) }
            value={ despesa }
          />
          <label htmlFor="moedas">
            Selecione uma moeda
            <select
              data-testid="currency-input"
              id="moedas"
              onChange={ (event) => this.handleChange('moeda', event.target.value) }
              value={ moeda }
            >
              {validCurrency.map((currency) => (
                <option data-testid={ currency } value={ currency } key={ currency }>
                  {currency}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="pagamento">
            Selecione a forma de pagamento
            <select
              data-testid="method-input"
              id="pagamento"
              onChange={ (event) => this.handleChange('pagamento', event.target.value) }
              value={ pagamento }
            >
              <option value="Dinheiro" key="dinheiro">
                Dinheiro
              </option>
              <option value="Cartão de crédito" key="cartaoC">
                Cartão de crédito
              </option>
              <option value="Cartão de débito" key="cartaoD">
                Cartão de débito
              </option>
            </select>
          </label>
          <label htmlFor="tag">
            Selecione uma categoria
            <select
              data-testid="tag-input"
              id="tag"
              onChange={ (event) => this.handleChange('categoria', event.target.value) }
              value={ categoria }
            >
              <option value="Alimentação" key="alimentacao">
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
              <option value="Saúde" key="saude">
                Saúde
              </option>
            </select>
          </label>
          <button
            type="button"
            onClick={ () => this.sendData() }
          >
            Adicionar despesa
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  add: (e) => dispatch(addExpense(e)),
  update: (e) => dispatch(updateTotalExpenses(e)),
});

const mapStateToProps = (state) => ({
  nextId: state.wallet.nextId,
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);

Form.propTypes = {
  add: PropTypes.func,
  nextId: PropTypes.number,
  update: PropTypes.number,
}.isRequired;
