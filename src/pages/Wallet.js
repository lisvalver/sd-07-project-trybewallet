import React from 'react';
import Header from '../components/header';
import Form from '../components/form';
import Tablet from '../components/table';

class Wallet extends React.Component {
  render() {
    return (
      <header>
        <Header />
        <br />
        <Form />
        <Tablet />
      </header>
    );
  }
}

export default Wallet;
