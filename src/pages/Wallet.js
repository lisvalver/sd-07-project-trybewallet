import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Logo from '../services/Logo';
import GetIcon from '../services/Icons';

class Wallet extends React.Component {
  render() {
    const { email } = this.props;
    return (
      <header className="email-field">
        {Logo('wallet-icons')}
        <div>
          <div className="user-header" data-testid="total-field">
            <div data-testid="email-field">
              <strong>{email}</strong>
            </div>
            Despesa total: 0
            <span data-testid="header-currency-field">BRL</span>
          </div>
        </div>
        <GetIcon className="wallet-icons" name="BoxArrowDownLeftIcon" />
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  const { email } = state.user;
  return { email };
};

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Wallet);
