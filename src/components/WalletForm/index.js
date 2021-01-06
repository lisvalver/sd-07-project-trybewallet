import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Form, Grid } from 'semantic-ui-react';
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
      <Grid>
        <Grid.Row
          color={ editMode ? 'green' : 'grey' }
          verticalAlign="middle"
          centered
          inverted="true"
        >
          <Form loading={ isFetching } size="large">
            <Form.Group widths="equal">
              <Form.Field
                name="value"
                control="input"
                error={ canValidate
                  && !validateExpense.value.status }
                /* ? validateExpense.value.msg : false  */
                value={ value }
                placeholder="Valor"
                data-testid="value-input"
                type="number"
                onChange={ (event) => this.handleInputChange(event) }
              />
              <Form.Field
                name="description"
                control="input"
                error={ canValidate
                  && !validateExpense.description.status }
                /* ? validateExpense.description.msg : false */
                value={ description }
                placeholder="Descrição"
                data-testid="description-input"
                onChange={ (event) => this.handleInputChange(event) }
              />
              <Form.Field
                name="currency"
                control="select"
                error={ canValidate
                  && !validateExpense.currency.status }
                /* ? validateExpense.currency.msg : false */
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

              </Form.Field>
              <Form.Field
                name="method"
                control="select"
                error={ canValidate
                  && !validateExpense.method.status }
                /* ? validateExpense.method.msg : false  */
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
              </Form.Field>
              <Form.Field
                name="tag"
                control="select"
                error={ canValidate
                  && !validateExpense.tag.status }
                /* ? validateExpense.tag.msg : false */
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
              </Form.Field>
              { editMode
                ? (
                  <Button.Group size="large">
                    <Button
                      onClick={ (event) => this.handleCancel(event) }
                    >
                      Cancelar
                    </Button>
                    <Button.Or text="ou" />
                    <Button
                      onClick={ (event) => this.handleSubmit(event) }
                      color="blue"
                      fluid
                    >
                      Editar despesa
                    </Button>
                  </Button.Group>
                )
                : (
                  <Button
                    onClick={ (event) => this.handleSubmit(event) }
                    color="green"
                    size="large"
                    fluid
                  >
                    Adicionar despesa
                  </Button>
                )}
            </Form.Group>
          </Form>
        </Grid.Row>
      </Grid>
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
