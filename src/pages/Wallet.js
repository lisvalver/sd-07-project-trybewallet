import React from 'react';
import AddExpenses from '../components/AddExpenses';
import Header from '../components/Header';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <AddExpenses />
      </div>
    );
  }
}

export default Wallet;
