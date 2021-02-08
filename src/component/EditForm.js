import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchThunk, editData } from '../actions';
import ExpenseTable from './ExpenseTable';

class EditForm extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      id: '',
    };

    this.handleEvent = this.handleEvent.bind(this);
    this.clearInput = this.clearInput.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  componentDidMount() {
    const { fetchThunkAction } = this.props;
    console.log(fetchThunkAction());
    this.updateState();
  }

  handleEvent({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  clearInput() {
    this.setState({
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  }

  updateState() {
    const { editItemProps } = this.props;
    const {
      value,
      description,
      currency,
      method,
      tag,
      id,
      exchangeRates,
    } = editItemProps;

    this.setState({
      value,
      description,
      currency,
      method,
      tag,
      id,
      exchangeRates,
    });
  }

  render() {
    const { currenciesAlias, editDataAction } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="value-input">
            <span>Valor:</span>
            <input
              onChange={ this.handleEvent }
              name="value"
              id="value-input"
              data-testid="value-input"
              type="number"
              value={ value }
            />
          </label>

          <label htmlFor="description-input">
            <span>Descrição:</span>
            <input
              name="description"
              id="description-input"
              data-testid="description-input"
              onChange={ this.handleEvent }
              value={ description }
            />
          </label>

          <select
            name="currency"
            data-testid="currency-input"
            onChange={ this.handleEvent }
            value={ currency }
          >
            {currenciesAlias.map((currencyEx) => (
              <option key={ currencyEx } data-testid={ currencyEx }>{currencyEx}</option>
            ))}
          </select>

          <select
            name="method"
            data-testid="method-input"
            onChange={ this.handleEvent }
            value={ method }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>

          <select
            name="tag"
            data-testid="tag-input"
            onChange={ this.handleEvent }
            value={ tag }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>

          <button
            onClick={ () => {
              editDataAction(this.state);
            } }
            type="button"
          >
            Editar despesa
          </button>
        </form>
        <ExpenseTable />
      </div>
    );
  }
}

EditForm.propTypes = {
  fetchThunkAction: PropTypes.func.isRequired,
  currenciesAlias: PropTypes.arrayOf(PropTypes.string).isRequired,
  editDataAction: PropTypes.func.isRequired,
  editItemProps: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = ({ wallet: { currencies, editItem } }) => ({
  currenciesAlias: currencies,
  editItemProps: editItem,
});

const mapDispatchToProps = (dispatch) => ({
  fetchThunkAction: () => (dispatch(fetchThunk())),
  editDataAction: (data) => (dispatch(editData(data))),

});

export default connect(mapStateToProps, mapDispatchToProps)(EditForm);
