import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Wallet extends React.Component {
  render() {
    const { user } = this.props;
    return (
      <div>
        <header>
          <div data-testid="email-field">{user}</div>
          <div data-testid="total-field">Despesa Total: R$0,00</div>
          <div data-testid="header-currency-field">BRL</div>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.email,
});

Wallet.propTypes = {
  user: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Wallet);
