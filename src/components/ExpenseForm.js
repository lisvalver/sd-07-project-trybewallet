import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import getCurrencies from '../services/currencyAPI';
import { EXPENSE } from '../actions';

class ExpenseForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      method: ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'],
      tag: ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'],
      currencies: [],
      loading: true,
      exInput: [],
    };
    this.fetchCurrency = this.fetchCurrency.bind(this);
  }

  componentDidMount() {
    this.fetchCurrency();
  }

  fetchCurrency() {
    this.setState(async () => {
      const endPoint = 'https://economia.awesomeapi.com.br/json/all';
      const fetched = await getCurrencies(endPoint);
      this.setState({ currencies: Object.keys(fetched), loading: false });
    });
  }

  handleClick(event) {
    const { expense } = this.props;
    const { exInput } = this.state;
    event.preventDefault();
    expense(exInput);
  }

  renderValueInput() {
    return (
      <label htmlFor="value">
        Valor:
        <input
          className="input"
          type="text"
          placeholder="Valor"
          id="value"
          data-testid="value-input"
        />
      </label>
    );
  }

  renderCurrSelect() {
    const { currencies } = this.state;
    return (
      <label htmlFor="currency">
        Moeda:
        <select
          className="input"
          placeholder="Moeda"
          id="currency"
          data-testid="currency-input"
        >
          {currencies.map((currency) => (
            currency !== 'USDT' ? (
              <option key={ currency } value={ currency } data-testid={ currency }>
                {currency}
              </option>
            ) : (
              'erro'
            )
          ))}
        </select>
      </label>
    );
  }

  renderMethodSelect() {
    const { method } = this.state;
    return (
      <label htmlFor="method">
        Método:
        <select className="input" id="method" data-testid="method-input">
          {method.map((item) => (
            <option key={ item } value={ item }>
              {item}
            </option>
          ))}
        </select>
      </label>
    );
  }

  renderTagSelect() {
    const { tag } = this.state;
    return (
      <label htmlFor="tag">
        Tag:
        <select className="input" id="tag" data-testid="tag-input">
          {tag.map((item) => (
            <option key={ item } value={ item }>
              {item}
            </option>
          ))}
        </select>
      </label>
    );
  }

  renderDescrInput() {
    return (
      <label htmlFor="description">
        Descrição:
        <input
          className="input"
          type="text"
          placeholder="Sua descrição"
          id="description"
          data-testid="description-input"
        />
      </label>
    );
  }

  render() {
    const { loading } = this.state;
    return (
      <section className="form">
        <div>
          {loading ? (
            'LOADING'
          ) : (
            <form onSubmit={ this.handleClick }>
              {this.renderValueInput()}
              {this.renderCurrSelect()}
              {this.renderMethodSelect()}
              {this.renderTagSelect()}
              {this.renderDescrInput()}
              <button className="button" type="submit">
                Adicionar despesa
              </button>
            </form>
          )}
        </div>
      </section>
    );
  }
}

// const mapStateToProps = (state) => ({
//   email: state.user.email,
// });

const mapDispatchToProps = (dispatch) => ({
  expense: (exInput) => dispatch(EXPENSE(exInput)),
});

ExpenseForm.propTypes = {
  expense: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(ExpenseForm);
