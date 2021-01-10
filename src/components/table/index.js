import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense } from '../../actions';
import TableHead from './TableHead';
import TableBody from './TableBody';

class Table extends React.Component {
  render() {
    const { expenses, expenseDelete } = this.props;
    return (
      <div>
        <table>
          <TableHead />
          <TableBody expenses={ expenses } expenseDelete={ expenseDelete } />
        </table>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});
const mapDispatchToProps = (dispatch) => ({
  expenseDelete: (expense) => dispatch(deleteExpense(expense)),
});
Table.propTypes = {
  expenses: propTypes.arrayOf(propTypes.object).isRequired,
  expenseDelete: propTypes.func.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(Table);
