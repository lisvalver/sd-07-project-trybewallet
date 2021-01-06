import React from 'react';
import Header from '../components/Header';
import FormWallet from '../components/FormWallet';
// import ExpenseTable from '../components/ExpenseTable';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <FormWallet />
      </div>
    );
  }
}

export default Wallet;
