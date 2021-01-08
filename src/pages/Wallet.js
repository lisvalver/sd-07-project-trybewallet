import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      atualExpenses: 0,
    };
  }

  render() {
    const { email, currencies } = this.props;
    const { atualExpenses } = this.state;

    return (
      <div>
        <header>
          <h3 data-testid="email-field">{ email }</h3>
          <h4 data-testid="total-field">{ atualExpenses }</h4>
          <h4 data-testid="header-currency-field">{ currencies }</h4>
        </header>
        <form>
          <label htmlFor="addExpenses">
            Adicione valor da despesa
            <input name="addExpenses" type="number" data-testid="value-input" />
          </label>
          <label htmlFor="discription">
            Descrição da despesa
            <input name="discription" type="number" data-testid="description-input" />
          </label>
          <select>
            <option></option>
          </select>
        </form>
      </div>
    );
  }
}

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  currencies: PropTypes.arrayOf.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(Wallet);
