import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fetchAPI from '../services/fetchAPI';
import { actionAPI, actionEdit, actionChangeEditState } from '../actions';

class Form extends Component {
  constructor() {
    super();
    this.state = {
      currencies: [],
      currency: 'USD',
      value: 0,
      description: 'any description',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
    this.fetchData = this.fetchData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.counter = 0;
  }

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    const resp = await fetchAPI();
    this.setState({
      currencies: Object.keys(resp),
    });
  }

  handleChange({ target: { name, value } }) {
    // console.log(name, value);
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { ActionAPI, ActionEdit, editingMode, editingId, exitEditMode } = this.props;
    // console.log(editingId);
    const { currency, value, description, method, tag } = this.state;
    const id = this.counter;
    if (editingMode) {
      ActionEdit({ currency, value, description, method, tag, id: editingId });
    } else {
      ActionAPI({ currency, value, description, method, tag, id });
    }
    exitEditMode(false);
    this.counter += 1;
  }

  render() {
    const {
      currencies,
      currency,
      value,
      description,
      method,
      tag,
    } = this.state;
    const { editingMode } = this.props;
    return (
      <div>
        <form onSubmit={ this.handleSubmit }>
          <label htmlFor="disp">
            Despesas
            <input
              name="value"
              type="number"
              data-testid="value-input"
              id="disp"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="desc">
            <input
              name="description"
              type="text"
              data-testid="description-input"
              id="desc"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>

          <select
            name="currency"
            id="curr"
            data-testid="currency-input"
            onChange={ this.handleChange }
            value={ currency }
          >
            {currencies.map((curr) => (
              <option key={ curr } data-testid={ curr } value={ curr }>
                {curr}
              </option>
            ))}
          </select>

          <select
            name="method"
            id="pay"
            data-testid="method-input"
            onChange={ this.handleChange }
            value={ method }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>

          <select
            name="tag"
            id="desp"
            data-testid="tag-input"
            onChange={ this.handleChange }
            value={ tag }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>

          <button type="submit">
            {editingMode ? 'Editar despesa' : 'Adicionar despesa'}
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  editingMode: store.wallet.editor,
  editingId: store.wallet.idToEdit,
});

const mapDispatchToProps = {
  ActionAPI: actionAPI,
  ActionEdit: actionEdit,
  exitEditMode: actionChangeEditState,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);

Form.propTypes = {
  ActionAPI: PropTypes.func.isRequired,
  ActionEdit: PropTypes.func.isRequired,
  editingMode: PropTypes.bool.isRequired,
  editingId: PropTypes.number.isRequired,
  exitEditMode: PropTypes.func.isRequired,
};
