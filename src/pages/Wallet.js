import React from 'react';
import Header from './Components/Header';
import GetExpenses from './Components/GetExpenses';
import HeaderExpenses from './Components/HeaderExpenses';
import Expenses from './Components/Expenses';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <GetExpenses />
        <HeaderExpenses />
        <Expenses />
      </div>
    );
  }
}

export default Wallet;
