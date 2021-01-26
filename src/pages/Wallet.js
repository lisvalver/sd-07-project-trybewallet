import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrency } from '../actions';

class Wallet extends React.Component {
  constructor(props) {
    super(props);

    this.filterCurrencies = this.filterCurrencies.bind(this);
  }

  componentDidMount() {
    const { requestCurrencies } = this.props;
    requestCurrencies();
  }

  filterCurrencies() {
    const { currencies } = this.props;
    const response = [];
    currencies.forEach((el) => el.codein !== 'BRLT' && response.push(el));
    return response;
  }

  render() {
    const { userEmail } = this.props;
    return (
      <div>
        TrybeWallet
        <header>
          <span data-testid="email-field">{userEmail}</span>
          <span data-testid="total-field">{0}</span>
          <span data-testid="header-currency-field">BRL</span>
        </header>
        <form>
          <label htmlFor="valueInput">
            Valor:
            <input
              data-testid="value-input"
              type="number"
              name="valueInput"
              id="valueInput"
            />
          </label>
          <label htmlFor="descriptionInput">
            Descrição
            <input
              data-testid="description-input"
              type="text"
              name="descriptionInput"
              id="descriptionInput"
            />
          </label>
          <label htmlFor="currencyInput">
            Moeda:
            <select
              data-testid="currency-input"
              name="currencyInput"
              id="currencyInput"
            >
              {
                this.filterCurrencies().map(({ code }) => (
                  <option
                    data-testid={ code }
                    key={ code }
                    name={ code }
                    value={ code }
                  >
                    {code}
                  </option>
                ))
              }
            </select>
            <select
              data-testid="method-input"
              name="currencyInput"
              id="currencyInput"
            >
              <option
                name="dinheiro"
                value="dinheiro"
              >
                Dinheiro
              </option>

              <option
                name="credito"
                value="credito"
              >
                Cartão de crédito
              </option>

              <option
                name="debito"
                value="debito"
              >
                Cartão de débito
              </option>
            </select>

            <select
              data-testid="tag-input"
              name="currencyInput"
              id="currencyInput"
            >
              <option
                name="alimentacao"
                value="alimentacao"
              >
                Alimentação
              </option>

              <option
                name="lazer"
                value="lazer"
              >
                Lazer
              </option>

              <option
                name="trabalho"
                value="trabalho"
              >
                Trabalho
              </option>

              <option
                name="transporte"
                value="transporte"
              >
                Transporte
              </option>

              <option
                name="saude"
                value="saude"
              >
                Saúde
              </option>
            </select>
          </label>
          <button type="button">Adicionar despesa</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  requestCurrencies: () => dispatch(fetchCurrency()),
});

Wallet.propTypes = {
  userEmail: PropTypes.string.isRequired,
  requestCurrencies: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.shape({
    ask: PropTypes.string.isRequired,
    bid: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
    codein: PropTypes.string.isRequired,
    create_date: PropTypes.string.isRequired,
    high: PropTypes.string.isRequired,
    low: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    pctChange: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
    varBid: PropTypes.string.isRequired,
  }).isRequired).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
