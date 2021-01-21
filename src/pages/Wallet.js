import React from 'react';
import { useSelector } from 'react-redux';
import Form from '../components/Form';
import FormEdit from '../components/FormEdit';
import Header from '../components/Header';
import Table from '../components/Table';

const Wallet = () => {
  const editing = useSelector((edit) => edit.wallet.isEditing);
  return (
    <div>
      <Header />
      {!editing ? <Form /> : <FormEdit />}
      <Table />
    </div>
  );
};

export default Wallet;
