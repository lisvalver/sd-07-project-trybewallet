import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.apiFetch = this.apiFetch.bind(this);
  }

  async apiFetch() {
    try {
      const requestCurrencies = await fetch('https://economia.awesomeapi.com.br/json/all');
      const result = requestCurrencies.json();
      return result;
    } catch (error) {
      return error;
    }
  }

  render() {
    const { email } = this.props;
    return (
      <div>
        <header>
          <span data-testid="email-field">{ email }</span>
          <span data-testid="total-field">Depesa geral: 0</span>
          <span data-testid="header-currency-field">Câmbio: BRL</span>
        </header>
        <form>
          <input type="text" data-testid="value-input" placeholder="Valor"/>
          <input type="text" data-testid="description-input" placeholder="Descrição"/>
          <select>
            <option></option>
          </select>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Wallet);

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
};
