import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { handleEditChange, actualizeExpense, disallowEditing } from '../../actions';
import api from '../../services/api';
import './style.css';

class EditFormExpense extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    const { handleEditChange: tableHandleChange } = this.props;
    tableHandleChange(name, value);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { editExpenseInfo } = this.props;
    const { value, id, currency, method, tag, description } = editExpenseInfo;
    const { actualizeExpense: tableActualizeExpense } = this.props;
    tableActualizeExpense({
      id,
      value,
      currency,
      method,
      tag,
      description,
    });
    const { disallowEditing: handleDisllowEdition } = this.props;
    handleDisllowEdition();
  }

  render() {
    const { editExpenseInfo } = this.props;
    const { value, exchangeRates, method, tag, description, currency } = editExpenseInfo;
    const { currencies } = this.state;
    return (
      <section className="editExpense__section">
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
                value={ exchangeRates[currency].code }
                onChange={ ({ target }) => this.handleInputChange(target) }
                data-testid="currency-input"
              >
                { currencies.map((cur) => (
                  <option key={ cur } value={ cur } data-testid={ cur }>{cur}</option>
                )) }
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
            <button type="submit">Editar despesa</button>
          </div>
        </form>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  expensesLength: state.wallet.expenses.length,
  editExpenseInfo: state.edit.expense,
});

const mapDispatchToProps = {
  handleEditChange,
  actualizeExpense,
  disallowEditing,
};

EditFormExpense.propTypes = {
  actualizeExpense: PropTypes.func.isRequired,
  handleEditChange: PropTypes.func.isRequired,
  disallowEditing: PropTypes.func.isRequired,
  editExpenseInfo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired,
    exchangeRates: PropTypes.objectOf(PropTypes.object).isRequired,
    method: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditFormExpense);
