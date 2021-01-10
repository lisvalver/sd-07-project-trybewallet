import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { HeaderWallet, AddExpense } from '../components';
import { addExpense, fetchCurrencies } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();
    this.changeState = this.changeState.bind(this);
    this.saveExpense = this.saveExpense.bind(this);
    this.state = {
      exchangeRates: {},
      description: '',
      currency: '',
      method: '',
      value: '0',
      tag: '',
    };
  }

  componentDidMount() {
    this.setCurrenciesState();
  }

  async setCurrenciesState() {
    const { acFetchCurrencies } = this.props;
    await acFetchCurrencies();
    const { currencies } = this.props;
    this.setState({ exchangeRates: currencies });
  }

  changeState({ target: { id, value } }) {
    this.setState({ [id]: value });
  }

  saveExpense() {
    const { dispatchExpense } = this.props;
    this.setCurrenciesState();
    dispatchExpense(this.state);
  }

  render() {
    const { email, expenses, currencies } = this.props;
    return (
      <div>
        <HeaderWallet email={ email } expenses={ expenses } />
        <AddExpense
          saveExpense={ this.saveExpense }
          changeState={ this.changeState }
          currencies={ currencies }
        />
      </div>
    );
  }
}

const mapStateToProps = ({ user: { email }, wallet: { expenses, currencies } }) => (
  { email, expenses, currencies }
);

const mapDispatchToProps = (dispatch) => ({
  dispatchExpense: (payload) => dispatch(addExpense(payload)),
  acFetchCurrencies: () => dispatch(fetchCurrencies()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  currencies: PropTypes.objectOf(PropTypes.object).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatchExpense: PropTypes.func.isRequired,
  acFetchCurrencies: PropTypes.func.isRequired,
};
