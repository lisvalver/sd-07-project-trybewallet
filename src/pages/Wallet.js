import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../Components/Header';

class Wallet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      totalExpenses: 0,
    };
  }

  render() {
    const { user } = this.props;
    const { totalExpenses } = this.state;
    return (
      <div>
        <Header
          user={ user }
          totalExpenses={ totalExpenses }
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Wallet);

Wallet.propTypes = {
  user: PropTypes.string.isRequired,
};
