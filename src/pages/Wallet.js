import React from 'react';
import { connect } from 'react-redux';
import Form from '../components/Form';
import Header from '../components/header';
import Table from '../components/Table';
import '../index.css';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <h1 className="title">WALLET APP</h1>
        <h2 className="subtitle">SUA CARTEIRA DIGITAL</h2>
        <Header />
        <Form />
        <Table />
      </div>
    );
  }
}

export default connect(null, null)(Wallet);
