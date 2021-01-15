import React from 'react';
import Header from '../component/header';
import Form from '../component/form';
import Table from '../component/table';

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
