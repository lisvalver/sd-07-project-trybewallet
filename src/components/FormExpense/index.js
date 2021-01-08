import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { createExpense } from '../../actions';
import api from '../../services/api';
import './style.css';

class FormExpense extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
      currencies: [],
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    api.getCurrencies()
      .then((cur) => this.setState({ currencies: cur }));
  }

  handleInputChange({ name, value }) {
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { value, currency, method, tag, description } = this.state;
    const { createExpense: formCreateExpense, expensesLength } = this.props;
    formCreateExpense({
      id: expensesLength,
      value,
      currency,
      method,
      tag,
      description,
    });

    this.setState({
      value: 0,
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    });
  }

  render() {
    const { value, currency, method, tag, description, currencies } = this.state;
    return (
      <section className="expense__section">
        <form onSubmit={ (e) => this.handleSubmit(e) } className="expense__form">
          <div className="expense__field">
            <label htmlFor="value">
              Valor:
              <input
                id="value"
                name="value"
                value={ value }
                onChange={ ({ target }) => this.handleInputChange(target) }
                type="number"
                min="0.01"
                step="0.01"
                data-testid="value-input"
                required
              />
            </label>
          </div>
          <div className="expense__field">
            <label htmlFor="currency">
              Moeda:
              <select
                id="currency"
                name="currency"
                value={ currency }
                onChange={ ({ target }) => this.handleInputChange(target) }
                data-testid="currency-input"
              >
                {currencies.map((cur) => (
                  <option key={ cur } value={ cur } data-testid={ cur }>{cur}</option>
                ))}
              </select>
            </label>
          </div>
          <div className="expense__field">
            <label htmlFor="method">
              Método de Pagamento:
              <select
                id="method"
                name="method"
                value={ method }
                onChange={ ({ target }) => this.handleInputChange(target) }
                data-testid="method-input"
              >
                <option value="Dinheiro">Dinheiro</option>
                <option value="Cartão de crédito">Cartão de crédito</option>
                <option value="Cartão de débito">Cartão de débito</option>
              </select>
            </label>
          </div>
          <div className="expense__field">
            <label htmlFor="tag">
              Tag:
              <select
                id="tag"
                name="tag"
                value={ tag }
                onChange={ ({ target }) => this.handleInputChange(target) }
                data-testid="tag-input"
              >
                <option value="Alimentação">Alimentação</option>
                <option value="Lazer">Lazer</option>
                <option value="Trabalho">Trabalho</option>
                <option value="Transporte">Transporte</option>
                <option value="Saúde">Saúde</option>
              </select>
            </label>
          </div>
          <div className="expense__field">
            <label htmlFor="description">
              Descrição:
              <input
                id="description"
                name="description"
                value={ description }
                onChange={ ({ target }) => this.handleInputChange(target) }
                data-testid="description-input"
                type="text"
              />
            </label>
          </div>
          <div className="expense__field">
            <button type="submit">Adicionar despesa</button>
          </div>
        </form>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  expensesLength: state.wallet.expenses.length,
});

const mapDispatchToProps = {
  createExpense,
};

FormExpense.propTypes = {
  expensesLength: PropTypes.number.isRequired,
  createExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FormExpense);
