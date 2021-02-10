import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import AddExpenseForm from '../components/AddExpenseForm';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <AddExpenseForm />
      </div>);
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Wallet);
