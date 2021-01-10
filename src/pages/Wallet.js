import React from 'react';
import Header from '../components/Header';
import ExpenseForm from '../components/ExpenseForm';
import ListExpenses from '../components/ListExpenses';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <ExpenseForm />
        <ListExpenses />
      </div>
    );
  }
}

export default Wallet;
