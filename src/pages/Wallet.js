import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/WalletHeader';
import AddExpense from '../components/AddExpense';
import ExpensesTable from '../components/ExpensesTable';
import { fetchCurrencies } from '../actions';

class Wallet extends Component {
  async componentDidMount() {
    const { fetchApi } = this.props;
    await fetchApi();
  }

  render() {
    const { currencies, expenseIndex, isFetching } = this.props;
    return (
      <div>
        <Header />
        {
          !isFetching && (
            <AddExpense currencies={ currencies } expenseIndex={ expenseIndex } />
          )
        }
        <ExpensesTable />
      </div>);
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies,
  expenseIndex: state.wallet.expenseIndex,
  isFetching: state.wallet.isFetching,
});

const mapDispatchToProps = (dispatch) => ({
  fetchApi: () => dispatch(fetchCurrencies()),
});

Wallet.propTypes = ({
  currencies: PropTypes.shape(PropTypes.object).isRequired,
  isFetching: PropTypes.bool.isRequired,
  fetchApi: PropTypes.func.isRequired,
  expenseIndex: PropTypes.number.isRequired,
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
