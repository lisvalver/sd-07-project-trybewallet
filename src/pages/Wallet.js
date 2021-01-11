import React from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { Redirect } from 'react-router-dom';
// import { wallet } from '../actions';
import Header from '../components/Header';
import Form from '../components/Form';
import Table from '../components/Table';

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

// const mapStateToProps = (state) => ({
//   userIsLogged: state.user.logged,
//   userEmail: state.user.email,
// });

// // const mapDispatchToProps = (dispatch) => ({
// //   userLogin: (email) => dispatch(login(email)),
// // });

export default Wallet;

// Wallet.propTypes = {
// //   userLogin: PropTypes.func.isRequired,
// //   userIsLogged: PropTypes.bool.isRequired,
//   userEmail: PropTypes.string.isRequired,
// };
