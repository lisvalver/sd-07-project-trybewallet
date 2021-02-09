import React from 'react';
import Header from '../components/Header';
import Form from '../components/ExpensesForm';
import Table from '../components/ExpensesTable';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Form />
        <Table />
      </div>
    );
  }
}

export default Wallet;
