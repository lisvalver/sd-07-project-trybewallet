import React from 'react';
import Header from '../components/header';
import Expenses from '../components/expenses';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Expenses />
      </div>
    );
  }
}

export default Wallet;
