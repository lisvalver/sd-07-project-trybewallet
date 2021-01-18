import React from "react";
import { connect } from "react-redux";
import { expenseToSave, upDateCurrencies } from "../actions";

class WalletForm extends React.Component {
  constructor() {
    super();
    this.changeID = this.changeID.bind(this);
    this.resetInput = this.resetInput.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.state = {
      id: 0,
      value: 0,
      description: "",
      currency: "USD",
      method: "Dinheiro",
      tag: "Alimentação",
    };
  }

  changeID() {
    const { id } = this.state;
    this.setState({ id: id + 1 });
  }

  handleInputChange({ target }) {
    this.setState({ [target.name]: target.value });
  }

  resetInput() {
    this.setState({
      value: 0,
      description: "",
      currency: "USD",
      method: "Dinheiro",
      tag: "Alimentação",
    });
  }

  render() {
    const { id, value, description, currency, method, tag } = this.state;

    const {
      saveExpenses,
      currenciesOptions,
      isFetching,
      upDateCurrencies,
      allInfosCurrencies,
      expensesState,
    } = this.props;
    
    const expenseObjToSave = {
      id,
      value,
      description,
      currency,
      method,
      tag,
    };

    return (
      <div>
        {isFetching ? (
          "loading..."
        ) : (
          <form>
            <label htmlFor="value" />
            <input
              name="value"
              value={this.state.value}
              onChange={(e) => this.handleInputChange(e)}
              data-testid="value-input"
            />
            <input
              name="description"
              onChange={(e) => this.handleInputChange(e)}
              data-testid="description-input"
            />
            <select
              name="currency"
              onChange={(e) => this.handleInputChange(e)}
              data-testid="currency-input"
            >
              {currenciesOptions &&
                currenciesOptions.map((currentCurrency) => (
                  <option key={currentCurrency} data-testid={currentCurrency}>
                    {currentCurrency}
                  </option>
                ))}
            </select>
            <select
              name="method"
              onChange={(e) => this.handleInputChange(e)}
              data-testid="method-input"
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
            <select
              name="tag"
              onChange={this.handleInputChange}
              data-testid="tag-input"
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
            <button
              type="button"
              onClick={() => {
                // upDateCurrencies();
                this.changeID();
                saveExpenses(expenseObjToSave);
                this.resetInput();
              }}
            >
              Adicionar despesa
            </button>
          </form>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expensesState: state.wallet.expenses,
  allInfosCurrencies: state.wallet.allInfosCurrencies,
  currenciesOptions: state.wallet.currenciesOptions,
  isFetching: state.wallet.isFetching,
  total: state,
});

const mapDispatchToProps = (dispatch) => ({
  saveExpenses: (expenseObjToSave) => dispatch(expenseToSave(expenseObjToSave)),
  upDateCurrencies: () => dispatch(upDateCurrencies()),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
