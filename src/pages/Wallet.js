import React from 'react';
import Header from '../components/Header';
import Despesas from '../components/Despesas';
import Table from '../components/Table';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        TrybeWallet
        <Header />
        <Despesas />
        <Table />
      </div>
    );
  }
}

export default Wallet;
