import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { user, wallet } = this.props;
    return (
      <div className="App-header">
        <span data-testid="email-field">{user.email}</span>
        <div>
          <span data-testid="total-field">
            0
            {parseFloat(wallet.total).toFixed(2)}
          </span>
          <span> </span>
          <span data-testid="header-currency-field">BRL</span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  wallet: state.wallet,
});

Header.propTypes = {
  wallet: PropTypes.shape({
    total: PropTypes.number,
  }).isRequired,
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Header);
