import React from 'react';
import { Header, Despesas, Table } from '../Components';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Despesas />
        <Table />
      </div>
    );
  }
}

export default Wallet;
