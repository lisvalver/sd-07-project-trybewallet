import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import currencyAPI from '../services/currencyAPI';
import { addExpense, updateExpense } from '../actions/index';

class EditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      validCurrency: [''],
      valor: 0,
      despesa: '',
      moeda: 'USD',
      pagamento: 'Dinheiro',
      categoria: 'Alimentação',
      expenseId: '',
      exchangeRates: {},
    };
    this.atualizaEstado = this.atualizaEstado.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.editExpenses = this.editExpenses.bind(this);
  }

  async componentDidMount() {
    const currencyObj = await currencyAPI();
    const onlyCurrencies = Object.keys(currencyObj);
    this.atualizaEstado(onlyCurrencies);
  }

  atualizaEstado(currencies) {
    const { editInfo } = this.props;
    this.setState({
      validCurrency: currencies.filter((curr) => curr !== 'USDT'),
      valor: editInfo.value,
      despesa: editInfo.description,
      moeda: editInfo.currency,
      pagamento: editInfo.method,
      categoria: editInfo.tag,
      expenseId: editInfo.id,
      exchangeRates: editInfo.exchangeRates,
    });
  }

  handleChange(chave, valor) {
    this.setState({
      [chave]: valor,
    });
  }

  editExpenses() {
    const {
      expenseId,
      valor,
      despesa,
      moeda,
      pagamento,
      categoria,
      exchangeRates,
    } = this.state;
    const { update } = this.props;
    const edited = {
      id: expenseId,
      value: valor,
      description: despesa,
      currency: moeda,
      method: pagamento,
      tag: categoria,
      exchangeRates,
    };
    update(edited);
  }

  render() {
    const {
      validCurrency,
      valor,
      despesa,
      moeda,
      pagamento,
      categoria,
    } = this.state;

    return (
      <div>
        <span>FORMULÁRIO PARA EDITAR</span>
        <form>
          <input
            id="value-input"
            data-testid="value-input"
            type="number"
            placeholder="Valor da despesa"
            onChange={ (event) => this.handleChange('valor', event.target.value) }
            value={ valor }
          />
          <input
            id="description-input"
            data-testid="description-input"
            type="text"
            placeholder="Despesa"
            onChange={ (event) => this.handleChange('despesa', event.target.value) }
            value={ despesa }
          />
          <label htmlFor="currency-input">
            Selecione uma moeda
            <select
              id="currency-input"
              data-testid="currency-input"
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
          <label htmlFor="method-input">
            Selecione a forma de pagamento
            <select
              id="method-input"
              data-testid="method-input"
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
          <label htmlFor="tag-input">
            Selecione uma categoria
            <select
              id="tag-input"
              data-testid="tag-input"
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
            onClick={ () => this.editExpenses() }
          >
            Editar despesa
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  add: (e) => dispatch(addExpense(e)),
  update: (e) => dispatch(updateExpense(e)),
});

const mapStateToProps = (state) => ({
  nextId: state.wallet.nextId,
  editInfo: state.wallet.editInfo,
});

export default connect(mapStateToProps, mapDispatchToProps)(EditForm);

EditForm.propTypes = {
  add: PropTypes.func,
  nextId: PropTypes.number,
  update: PropTypes.number,
}.isRequired;
