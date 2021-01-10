import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Form from '../components/Form';
import { fetchData } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      description: '',
      currency: '',
      method: '',
      tag: '',
    };
  }
  render() {
    const { value, description, currency, method, tag} = this.state;
    const { userEmail, totalSum, currencyArray } = this.props;
    return (
      <div>
        <Header email={ userEmail } totalSum={ totalSum } />
        <Form
          value={ value }
          description={ description }
          currency={ currency }
          method={ method }
          tag={ tag }
          currencyArray={ currencyArray }
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  totalSum: state.wallet.total,
  currencyArray: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  userEmail: PropTypes.string.isRequired,
};
