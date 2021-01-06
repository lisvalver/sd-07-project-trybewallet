import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrency, walletActions } from '../../store/ducks/wallet';
import * as data from '../../services/data';

class WalletForm extends Component {
  constructor() {
    super();

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  handleInputChange({ target: { name, value } }) {
    const { setCurrentExpense } = this.props;
    if (value) {
      setCurrentExpense({ [name]: value });
    } else {
      setCurrentExpense({ [name]: name === 'value' ? '0' : '' });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const {
      addExpense,
      getCurrencies,
      editExpense,
      editMode,
      validateExpense,
      setCanValidate,
    } = this.props;

    setCanValidate();

    if (Object.values(validateExpense).every(({ status }) => status === true)) {
      if (!editMode) {
        getCurrencies()
          .then(() => {
            addExpense();
          });
      } else {
        editExpense();
      }
    }
  }

  handleCancel(event) {
    event.preventDefault();
    const {
      setEditMode,
    } = this.props;
    setEditMode(false);
  }

  render() {
    const {
      currencies,
      isFetching,
      editMode,
      currentExpense,
      canValidate,
      validateExpense,
    } = this.props;

    const {
      value,
      description,
      currency,
      method,
      tag,
    } = currentExpense;

    const {
      optionsMethod,
      optionsTag,
    } = data;

    return (
      <div className="ui grid">
        <div
          inverted="true"
          className={ editMode
            ? 'green centered middle aligned row'
            : 'grey centered middle aligned row' }
        >
          <form
            className={ isFetching
              ? 'ui large loading form'
              : 'ui large form' }
          >
            <div className="equal width fields">
              <div
                className={ canValidate
                  && !validateExpense.value.status
                  ? 'field error'
                  : 'field' }
              >
                <input
                  name="value"
                  value={ value }
                  placeholder="Valor"
                  data-testid="value-input"
                  type="number"
                  onChange={ (event) => this.handleInputChange(event) }
                />
              </div>
              <div
                className={ canValidate
                  && !validateExpense.description.status
                  ? 'field error'
                  : 'field' }
              >
                <input
                  type="text"
                  name="description"
                  value={ description }
                  placeholder="Descrição"
                  data-testid="description-input"
                  onChange={ (event) => this.handleInputChange(event) }
                />
              </div>
              <div
                className={ canValidate
                  && !validateExpense.currency.status
                  ? 'field error'
                  : 'field' }
              >
                <select
                  name="currency"
                  value={ currency }
                  data-testid="currency-input"
                  onChange={ (event) => this.handleInputChange(event) }
                >
                  <option value="" disabled defaultValue hidden>[Moeda]</option>
                  { currencies && currencies.map((key) => (
                    <option
                      key={ key }
                      data-testid={ key }
                      value={ key }
                    >
                      { key }
                    </option>
                  ))}
                </select>
              </div>
              <div
                className={ canValidate
                  && !validateExpense.method.status
                  ? 'field error'
                  : 'field' }
              >
                <select
                  name="method"
                  value={ method }
                  data-testid="method-input"
                  onChange={ (event) => this.handleInputChange(event) }
                >
                  <option value="" disabled defaultValue hidden>
                    [Forma de Pagamento]
                  </option>
                  {
                    optionsMethod.map((item) => (
                      <option key={ item } value={ item }>{ item }</option>
                    ))
                  }
                </select>
              </div>
              <div
                className={ canValidate
                  && !validateExpense.tag.status
                  ? 'field error'
                  : 'field' }
              >
                <select
                  name="tag"
                  value={ tag }
                  data-testid="tag-input"
                  onChange={ (event) => this.handleInputChange(event) }
                >
                  <option value="" disabled defaultValue hidden>[Categoria]</option>
                  {
                    optionsTag.map((item) => (
                      <option key={ item } value={ item }>{ item }</option>
                    ))
                  }
                </select>
              </div>
              { editMode
                ? (
                  <div className="ui large buttons">
                    <button
                      type="submit"
                      className="ui button"
                      onClick={ (event) => this.handleCancel(event) }
                    >
                      Cancelar
                    </button>
                    <div className="or" />
                    <button
                      type="submit"
                      className="ui blue fluid button"
                      onClick={ (event) => this.handleSubmit(event) }
                    >
                      Editar despesa
                    </button>
                  </div>
                )
                : (
                  <button
                    type="submit"
                    onClick={ (event) => this.handleSubmit(event) }
                    className="ui green large fluid button"
                  >
                    Adicionar despesa
                  </button>
                )}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

WalletForm.propTypes = {
  addExpense: PropTypes.func.isRequired,
  editExpense: PropTypes.func.isRequired,
  getCurrencies: PropTypes.func.isRequired,
  setCurrentExpense: PropTypes.func.isRequired,
  setCanValidate: PropTypes.func.isRequired,
  setEditMode: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string),
  isFetching: PropTypes.bool,
  editMode: PropTypes.bool,
  currentExpense: PropTypes.shape({
    value: PropTypes.string,
    description: PropTypes.string,
    currency: PropTypes.string,
    method: PropTypes.string,
    tag: PropTypes.string,
  }),
  validateExpense: PropTypes.shape({
    value: PropTypes.shape({
      msg: PropTypes.string,
      status: PropTypes.bool,
    }),
    description: PropTypes.shape({
      msg: PropTypes.string,
      status: PropTypes.bool,
    }),
    currency: PropTypes.shape({
      msg: PropTypes.string,
      status: PropTypes.bool,
    }),
    method: PropTypes.shape({
      msg: PropTypes.string,
      status: PropTypes.bool,
    }),
    tag: PropTypes.shape({
      msg: PropTypes.string,
      status: PropTypes.bool,
    }),
  }),
  canValidate: PropTypes.bool,
};

WalletForm.defaultProps = {
  currencies: [],
  isFetching: false,
  editMode: false,
  currentExpense: {
    value: '',
    description: '',
    currency: '',
    method: '',
    tag: '',
  },
  validateExpense: {
    value: { msg: 'O valor da despesa deve ser maior que zero.', status: false },
    description: { msg: 'Informe a descrição da despesa.', status: false },
    currency: { msg: 'Informe a moeda da despesa.', status: false },
    method: { msg: 'Informe método de pagamento da despesa.', status: false },
    tag: { msg: 'Informe a categoria da despesa.', status: false },
  },
  canValidate: false,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  isFetching: state.wallet.isFetching,
  editMode: state.wallet.editMode,
  currentExpense: state.wallet.currentExpense,
  validateExpense: state.wallet.validateExpense,
  canValidate: state.wallet.canValidate,
});

const mapDispatchToProps = {
  getCurrencies: fetchCurrency,
  addExpense: walletActions.addExpense,
  editExpense: walletActions.editExpenses,
  setCurrentExpense: walletActions.setCurrentExpense,
  setCanValidate: walletActions.setCanValidate,
  setEditMode: walletActions.setEditMode,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
