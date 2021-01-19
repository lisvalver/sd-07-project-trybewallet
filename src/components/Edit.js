import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateExpense } from '../actions';

class Edit extends Component {
  constructor(props) {
    super(props);

    this.mountExpense = this.mountExpense.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      api: [],
      id: '',
      valor: '',
      descricao: '',
      moeda: '',
      metodo: '',
      tag: '',
      exchangeRates: {},
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
    const { index, expenses } = this.props;
    const {
      id: test,
      value,
      description,
      currency,
      method,
      tag: ntag,
      exchangeRates: obj,
    } = expenses[parseInt(index)];
    this.setState({
      id: test,
      valor: value,
      descricao: description,
      moeda: currency,
      metodo: method,
      tag: ntag,
      exchangeRates: obj,
    });
  }

  mountExpense() {
    const {
      id: idd,
      valor,
      descricao,
      moeda,
      metodo,
      tag,
      exchangeRates,
    } = this.state;
    const expense = {
      id: idd,
      value: valor,
      description: descricao,
      currency: moeda,
      method: metodo,
      tag,
      exchangeRates,
    };
    return expense;
  }

  handleChange(e) {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    const { update, handleEdit } = this.props;
    const { api, valor, descricao, tag, moeda, metodo } = this.state;

    return (
      <form className="edit-form">
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
            console.log(retorno.exchangeRates);
            update(index, retorno);
            handleEdit();
          } }
        >
          Editar despesa
        </button>
      </form>
    );
  }
}
const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  update: (index, value) => dispatch(updateExpense(index, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Edit);

Edit.propTypes = {
  index: PropTypes.string,
  update: PropTypes.func,
  handleEdit: PropTypes.func,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.string,
    description: PropTypes.string,
    currency: PropTypes.string,
    method: PropTypes.string,
    tag: PropTypes.string,
    exchangeRates: PropTypes.shape({}),
  })),
};

Edit.defaultProps = {
  index: PropTypes.string,
  update: PropTypes.func,
  handleEdit: PropTypes.func,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.string,
    description: PropTypes.string,
    currency: PropTypes.string,
    method: PropTypes.string,
    tag: PropTypes.string,
    exchangeRates: PropTypes.shape({}),
  })),
};
