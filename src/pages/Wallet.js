import React from 'react';
import Header from '../components/Header';
import AddExpense from '../components/AddExpense';
import * as api from '../services/api';
// import Expenses from '../components/Expenses';

class Wallet extends React.Component {
  render() {
    const currencies = api.fetchCurrencies();
    console.log(currencies);
    return (
      <div>
        <Header />
        <AddExpense />
        {/* <Expenses /> */}
      </div>
    );
  }
}

export default Wallet;
