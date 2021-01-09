import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editExpenses, isEdited } from '../actions';

class Edit extends Component {
  constructor(props) {
    super(props);
    const { expense, idReceived } = this.props;
    if (idReceived >= 0) {
      this.state = {
        value: expense[idReceived].value,
        currency: expense[idReceived].currency,
        method: expense[idReceived].method,
        tag: expense[idReceived].tag,
        description: expense[idReceived].description,
      };
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  }

  HandleSubmit(event) {
    event.preventDefault();
    const { expense, editExpense, idReceived, isEdit } = this.props;
    const { value, currency, method, tag, description } = this.state;
    let obj = {
      value,
      currency,
      method,
      tag,
      description,
    };
    obj = Object.assign(expense[idReceived], obj);
    const numberLTZero = -1;
    isEdit(numberLTZero);
    editExpense(obj);
    this.setState({
      value: '0',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    });
  }

  render() {
    const { value, currency, method, tag, description } = this.state;
    const { currencies = [] } = this.props;
    return (
      <div>
        {
          (currencies.length === 0) ? (
            <span>Carregando...</span>
          ) : (
            <form onSubmit={ (event) => this.HandleSubmit(event) }>
              <label htmlFor="value">
                Valor:
                <input
                  id="value"
                  type="text"
                  name="value"
                  value={ value }
                  data-testid="value-input"
                  onChange={ (event) => this.handleChange(event) }
                />
              </label>

              <label htmlFor="currency">
                Moeda:
                <select
                  id="currency"
                  name="currency"
                  value={ currency }
                  data-testid="currency-input"
                  onChange={ (event) => this.handleChange(event) }
                >
                  {currencies.map((curr) => (
                    (curr !== 'USDT')
                    && (
                      <option key={ curr } value={ curr } data-testid={ curr }>
                        {curr}
                      </option>
                    )
                  ))}
                </select>
              </label>

              <label htmlFor="method">
                Método de pagamento:
                <select
                  id="method"
                  name="method"
                  value={ method }
                  data-testid="method-input"
                  onChange={ (event) => this.handleChange(event) }
                >
                  <option value="Dinheiro">Dinheiro</option>
                  <option value="Cartão de crédito">Cartão de crédito</option>
                  <option value="Cartão de débito">Cartão de débito</option>
                </select>
              </label>

              <label htmlFor="tag">
                Tag:
                <select
                  id="tag"
                  name="tag"
                  value={ tag }
                  data-testid="tag-input"
                  onChange={ (event) => this.handleChange(event) }
                >
                  <option value="Alimentação">Alimentação</option>
                  <option value="Lazer">Lazer</option>
                  <option value="Trabalho">Trabalho</option>
                  <option value="Transporte">Transporte</option>
                  <option value="Saúde">Saúde</option>
                </select>
              </label>

              <label htmlFor="description">
                Descrição:
                <input
                  id="description"
                  type="text"
                  name="description"
                  value={ description }
                  data-testid="description-input"
                  onChange={ (event) => this.handleChange(event) }
                />
              </label>

              <button type="submit">Editar despesa</button>
            </form>
          )
        }
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  editExpense: (id, expense) => dispatch(editExpenses(id, expense)),
  isEdit: (id) => dispatch(isEdited(id)),
});

const mapStateToProps = (state) => ({
  idReceived: state.wallet.isEdit,
  currencies: state.wallet.exchangeRateKeys,
  expense: state.wallet.expenses,
});

Edit.propTypes = {
  isEdit: PropTypes.func.isRequired,
  idReceived: PropTypes.number.isRequired,
  editExpense: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(String).isRequired,

  expense: PropTypes.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
