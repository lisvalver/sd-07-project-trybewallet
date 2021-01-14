import React from 'react';
import AddExpenses from '../components/AddExpenses';
import Header from '../components/Header';
import List from '../components/List';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <AddExpenses />
        <List />
      </div>
    );
  }
}

export default Wallet;
