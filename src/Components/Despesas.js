import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fecthAction, wallet } from '../actions';

class Despesas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expense: {
        value: 0,
        description: '',
        currency: '',
        method: 'Dinheiro',
        tag: '',
      },
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount(){
    const { fecthEconomy } = this.props;
    fecthEconomy();
  }

  onChange({ target }) {
    const { expense } = this.state;
    const { name, value } = target;
    this.setState({ expense: { ...expense, [name]: value } });
  }

  clearAll() {
    this.setState((prevState) => ({
      ...prevState,
      expense: {
        value: 0,
        description: '',
        currency: '',
        method: '',
        tag: '',
      },
    }));
  }

  async handleSubmit() {
    const { walletSave, fecthEconomy } = this.props;
    const { expense } = this.state;
    const result = await fecthEconomy();
    walletSave( expense, result.payload )
    this.clearAll();
  }

  render() {
    const method = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const categoria = [
      'Alimentação',
      'Lazer',
      'Trabalho',
      'Transporte',
      'Saúde',
    ];
    const { isFetching, currency } = this.props;
    const { value, description } = this.state.expense;
    return (
      <div>
        {isFetching ? (
          <p> Loading... </p>
        ) : (
          <div>
            <label htmlFor="value">
              Valor Despesas
              <input
                name="value"
                id="value"
                value={value}
                onChange={(event) => this.onChange(event)}
                data-testid="value-input"
                required
              />
            </label>
            <label htmlFor="description">
              Descrição Despesas
              <input
                name="description"
                id="description"
                value={description}
                onChange={(event) => this.onChange(event)}
                data-testid="description-input"
                required
              />
            </label>
            <label htmlFor="currency">
              Currency Despesas
              {'   '}
              <select
                name="currency"
                id="currency"
                data-testid="currency-input"
                onChange={(event) => this.onChange(event)}
                required
              >
                <option value=""> Selecione uma opção </option>
                {currency &&
                  currency.map((opcao) => (
                    <option key={opcao} data-testid={opcao} value={opcao}>
                      {opcao}
                    </option>
                  ))}
              </select>
            </label>
            <div>
              <label htmlFor="method">
                Método de Pagamento
                {'   '}
                <select
                  name="method"
                  id="method"
                  data-testid="method-input"
                  onChange={(event) => this.onChange(event)}
                  required
                >
                  <option value=""> Selecione uma opção </option>
                  {method.map((pag) => (
                    <option key={pag} data-testid={pag} value={pag}>
                      {pag}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div>
              <label htmlFor="tag">
                Categoria
                {'   '}
                <select
                  name="tag"
                  id="tag"
                  data-testid="tag-input"
                  onChange={(event) => this.onChange(event)}
                  required
                >
                  <option value=""> Selecione uma opção </option>
                  {categoria.map((tag) => (
                    <option key={tag} data-testid={tag} value={tag}>
                      {tag}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>
        )}
        <button type="button" onClick={() => this.handleSubmit() }>
          Adicionar Despesas
        </button>
      </div>
    );
  }
}

Despesas.propTypes = {
  payload: PropTypes.objectOf.isRequired,
  isFetching: PropTypes.bool.isRequired,
  currency: PropTypes.objectOf.isRequired,
  walletSave: PropTypes.func.isRequired,
  fecthEconomy: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  payload: state.economyApi.payload,
  expenses: state.wallet.expenses,
  currency: state.economyApi.currency,
  isFetching: state.economyApi.isFetching,
});

const mapDispatchToProps = (dispatch) => ({
  fecthEconomy: () => dispatch(fecthAction()),
  walletSave: (expenses, exchangeRates) => dispatch(wallet(expenses, exchangeRates)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Despesas);
