import React from 'react';
import HeaderWallet from './components/HeaderWallet';
import FormWallet from './components/FormWallet';
import TableWallet from './components/TableWallet';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <HeaderWallet />
        <FormWallet />
        <TableWallet />
      </div>
    );
  }
}

export default Wallet;
