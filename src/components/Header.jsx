// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

// class Header extends Component {
//   constructor(props) {
//     super(props);
//     this.expensesAmount = this.expensesAmount.bind(this);
//     this.state = {
//       amount: 0,
//     };
//   }

//   expensesAmount() {
//     const { expenses } = this.props;
//     let amount = 0;
//     if (expenses.length === 0) {
//       this.setState({ amount });
//     }
//     expenses.forEach((expense) => {
//       amount += parseFloat(expense.value);
//     });
//     this.setState({ amount });
//   }

//   render() {
//     const { emailInfo } = this.props;
//     const { amount } = this.state;
//     return (
      
//     );
//   }
// }

// const mapStateToProps = (state) => ({
//   expenses: state.wallet.expenses,
// });

// Header.propTypes = {
//   emailInfo: PropTypes.string.isRequired,
// };

// export default connect(mapStateToProps)(Header);
