import React from 'react';
import Header from '../components/header';
import Table from '../components/table';

class Wallet extends React.Component {
  render() {
    return (
      <header>
        <Header />
        <br />
        <Table />
      </header>
    );
  }
}

export default Wallet;
