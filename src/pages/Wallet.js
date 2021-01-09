import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { HeaderWallet, AddExpense } from '../components';
import { addExpense } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();
    this.saveExpense = this.saveExpense.bind(this);
    this.state = {
      currencies: [],
    };
  }

  componentDidMount() {
    this.fetchCurrencies();
  }

  async fetchCurrencies() {
    const getFetch = (url) => fetch(url).then((element) => element.json());
    const url = 'https://economia.awesomeapi.com.br/json/all';
    try {
      const promisse = await getFetch(url);
      const arrCurrencies = Object.assign([], promisse);
      return this.setState({ currencies: arrCurrencies });
    } catch (err) { return 'Erro'; }
  }

  saveExpense(date) {
    this.fetchCurrencies();
    const { dispatchExpense } = this.props;
    dispatchExpense(date);
  }

  render() {
    const { currencies } = this.state;
    const { email, expenses } = this.props;
    return (
      <div>
        <HeaderWallet email={ email } expenses={ expenses } />
        <AddExpense currencies={ currencies } saveExpense={ this.saveExpense } />
      </div>
    );
  }
}

const mapStateToProps = ({ user: { email }, wallet: { expenses } }) => (
  { email, expenses }
);

const mapDispatchToProps = (dispatch) => ({
  dispatchExpense: (payload) => dispatch(addExpense(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatchExpense: PropTypes.func.isRequired,
};
