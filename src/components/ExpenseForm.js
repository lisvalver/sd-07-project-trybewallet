import React from "react";
import { connect } from 'react-redux';
import * as actions from '../actions/index';

class ExpenseForm extends React.Component {
  constructor() {
    super();
    this.state = {
      expense: '',
      description: '',
      method: '',
      tag: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { loadCurrencies } = this.props;
    // this.setState({
    //   isLoading: true,
    // }, async () => {
    //   const data = loadCurrencies();
    //   this.setState({
    //     moedas: [data]
    //   })
    // })
    loadCurrencies();
  }

  handleChange(event) {
    const { target } = event;
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.buttonValidation);
  }

  render() {
    return (
      <div>
        <form>
          <label htmlFor="expense">
            Valor da despesa
            <div>
              <input
                name="expense"
                data-testid="value-input"
                placeholder="Digite seu despesa"
                id="expense"
                type="text"
                value={this.state.expense}
                onChange={this.handleChange}
              />
            </div>
          </label>{" "}
          <label htmlFor="description">Descrição</label>{" "}
          <div>
            <input
              name="description"
              data-testid="description-input"
              placeholder="Descrição da despesa"
              id="description"
              type="text"
              value={this.state.description}
              onChange={this.handleChange}
            />
          </div>
          <label htmlFor="method-input" data-testid="method-input-label">
            Forma de pagamento
            <select
              style={{ marginLeft: 10 }}
              name="method"
              onChange={this.handleChange}
              id="method-input"
              data-testid="method-input"
              value={this.state.method}
            >
            {}
            </select>
          </label>
          <label htmlFor="method-input" data-testid="method-input-label">
            Forma de pagamento
            <select
              style={{ marginLeft: 10 }}
              name="method"
              onChange={this.handleChange}
              id="method-input"
              data-testid="method-input"
              value={this.state.method}
            >
              <option value="money" data-testid="method-option">
                Dinheiro
              </option>
              <option value="credit" data-testid="method-option">
                Cartão de crédito
              </option>
              <option value="debit" data-testid="method-option">
                Cartão de débito
              </option>
            </select>
          </label>
          <label htmlFor="tag-input" data-testid="tag-input-label">
            Categoria
            <select
              style={{ marginLeft: 10 }}
              name="tag"
              onChange={this.handleChange}
              id="tag-input"
              data-testid="tag-input"
              value={this.state.tag}
            >
              <option value="food" data-testid="tag-option">
              Alimentação
              </option>
              <option value="plesure" data-testid="tag-option">
              Lazer
              </option>
              <option value="work" data-testid="tag-option">
              Trabalho
              </option>
              <option value="transport" data-testid="tag-option">
              Transporte
              </option>
              <option value="health" data-testid="tag-option">
              Saúde
              </option>
            </select>
          </label>
          <button
            type="button"
          >
            Adicionar despesa
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  loadCurrencies: () => dispatch(actions.fetchCurrencies()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
