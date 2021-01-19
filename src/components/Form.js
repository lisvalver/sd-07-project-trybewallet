import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getExpenseCurrency } from '../actions';

class Form extends Component {
  constructor(props) {
    super(props);

    this.mountExpense = this.mountExpense.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      api: [],
      valor: 0,
      descricao: '',
      moeda: 'USD',
      metodo: 'Dinheiro',
      tag: 'Alimentação',
      atualiza: '',
    };
  }

  componentDidMount() {
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => {
        response.json().then((obj) => {
          const array = [];
          Object.keys(obj).forEach((element) => {
            array.push(obj[element]);
          });
          this.setState({ api: array });
        });
      });
  }

  mountExpense() {
    const { expenses } = this.props;
    const {
      valor,
      descricao,
      moeda,
      metodo,
      tag,
    } = this.state;
    let idgenerated = 0;
    if (expenses.length === 0) {
      idgenerated = 0;
    } else {
      idgenerated = expenses[expenses.length - 1].id + 1;
    }
    const expense = {
      id: idgenerated,
      value: valor,
      description: descricao,
      currency: moeda,
      method: metodo,
      tag,
      exchangeRates: {},
    };
    return expense;
  }

  handleChange(e) {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    const {
      api,
      valor,
      descricao,
      moeda,
      metodo,
      tag,
    } = this.state;
    const { add } = this.props;

    return (
      <form className="wallet-form">
        <label htmlFor="valor">
          Valor:
          <input
            required
            data-testid="value-input"
            name="valor"
            value={ valor }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="descricao">
          Descrição:
          <input
            required
            value={ descricao }
            data-testid="description-input"
            name="descricao"
            onChange={ this.handleChange }
          />
        </label>
        <select
          required
          data-testid="currency-input"
          name="moeda"
          value={ moeda }
          onChange={ this.handleChange }
        >
          {api.map((element, index) => {
            const { code, codein } = element;
            if (codein !== 'BRLT') {
              return (
                <option
                  key={ index }
                  data-testid={ code }
                  value={ code }
                >
                  { code }
                </option>
              );
            }
            return ('');
          })}
        </select>
        <select
          required
          data-testid="method-input"
          name="metodo"
          value={ metodo }
          onChange={ this.handleChange }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">
            Cartão de crédito
          </option>
          <option value="Cartão de débito">
            Cartão de débito
          </option>
        </select>
        <select
          required
          data-testid="tag-input"
          name="tag"
          value={ tag }
          onChange={ this.handleChange }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
        <button
          type="button"
          onClick={ () => {
            const retorno = this.mountExpense();
            add(retorno);
          } }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}
const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  add: (value) => dispatch(getExpenseCurrency(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);

Form.propTypes = {
  add: PropTypes.func,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
  })),
};

Form.defaultProps = {
  add: PropTypes.func,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
  })),
};
