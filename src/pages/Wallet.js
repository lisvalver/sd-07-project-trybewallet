import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrenciesToSelectOptions } from '../actions';
import Expenses from '../components/expenses';
import Header from '../components/header';
import Table from '../components/table';
import FetchAPI from '../services';

class Wallet extends React.Component {
  async componentDidMount() {
    const { getCurrencies } = this.props;
    const response = await FetchAPI();
    getCurrencies(Object.keys(response).filter((item) => item !== 'USDT'));
  }

  render() {
    return (
      <div>
        <div>
          <Header />
        </div>
        <div>
          <Expenses />
        </div>
        <Table />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: (currencies) => dispatch(getCurrenciesToSelectOptions(currencies)),
});

Wallet.propTypes = {
  getCurrencies: PropTypes.func.isRequired,
};

// export default Wallet;
export default connect(null, mapDispatchToProps)(Wallet);
