import React from 'react';
import Header from '../components/Header';
import ExpenseForm from '../components/ExpenseForm';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header { ...this.props } />
        <ExpenseForm { ...this.props } />
      </div>
    );
  }
}

export default Wallet;
