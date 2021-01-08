import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrency } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();
    this.hanldleDropdown = this.hanldleDropdown.bind(this);
  }

  componentDidMount() {
    const { fetchCurrencyA } = this.props;
    fetchCurrencyA();
  }

  hanldleDropdown() {
    const { currencies } = this.props;
    const arrayCurrencies = Object.entries(currencies);
    arrayCurrencies.splice(1, 1);
    console.log(arrayCurrencies);
    return arrayCurrencies.map((currencie) => (
      <option
        data-testid={ currencie[0] }
        key={ currencie[0] }
        value={ currencie[0] }
      >
        {currencie[0]}
      </option>
    ));
  }

  render() {
    const { email } = this.props;
    return (
      <div>
        <header>
          <div data-testid="email-field">
            Email:
            { email }
          </div>
          <div data-testid="total-field">
            Total:
            { 0 }
          </div>
          <div data-testid="header-currency-field">
            Cambio: BRL
          </div>
        </header>
        <form>
          <input data-testid="value-input" />
          <textarea data-testid="description-input" />
          <select
            name="currency"
            id="currency"
            data-testid="currency-input"
          >
            {this.hanldleDropdown()}
          </select>
        </form>
      </div>
    );
  }
}

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  fetchCurrencyA: PropTypes.func.isRequired,
  currencies: PropTypes.shape({
  }).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencyA: () => dispatch(fetchCurrency()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
