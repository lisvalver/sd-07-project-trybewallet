import React from 'react';
import Header from '../components/Header';
import AddExpense from '../components/AddExpense';
import Expenses from '../components/Expenses';
// import * as api from '../services/api';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <AddExpense />
        <Expenses />
      </div>
    );
  }
}

export default Wallet;
