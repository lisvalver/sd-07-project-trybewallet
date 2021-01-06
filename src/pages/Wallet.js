import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Navbar } from 'react-bootstrap';
import Form from '../components/Form';
import TableComp from '../components/Table';

class Wallet extends React.Component {
  constructor() {
    super();
    this.expenseCounter = this.expenseCounter.bind(this);
  }

  expenseCounter(expenses) {
    return expenses.reduce((acc, { value, currency, exchangeRates }) => {
      const multiplier = exchangeRates[currency].ask;
      return acc + value * multiplier;
    }, 0);
  }

  render() {
    const { email, expenses } = this.props;
    return (
      <div>
        <header>
          <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">Trybe Wallet</Navbar.Brand>
            <div className="d-flex">
              <span data-testid="email-field">{email}</span>
              <p data-testid="total-field">{this.expenseCounter(expenses)}</p>
              <p data-testid="header-currency-field">BRL</p>
            </div>
          </Navbar>
        </header>
        <Form />
        <TableComp />
      </div>
    );
  }
}

const mapStateToProps = ({ user: { email }, wallet: { expenses } }) => ({
  email,
  expenses,
});

export default connect(mapStateToProps)(Wallet);

Wallet.propTypes = {
  expenses: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};
