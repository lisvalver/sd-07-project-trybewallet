import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import ExpensesForm from '../components/ExpensesForm';

class Wallet extends React.Component {
  render() {
    // const { currencies } = this.props;
    return (
      <div>
        <Header />
        <ExpensesForm />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currency: state.wallet.currency,
});

export default connect(
  mapStateToProps,
)(Wallet);
