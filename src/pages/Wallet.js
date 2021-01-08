import React from 'react';
import AddExpenses from '../components/AddExpenses';
import HeaderWallet from '../components/HeaderWallet';
import TableExpenses from '../components/TableExpenses';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <HeaderWallet />
        <AddExpenses />
        <TableExpenses />
      </div>
    );
  }
}

export default Wallet;

// para fazer o ultimo req utilize o operador ternário para renderizar addExpenses ou EditExpenses
