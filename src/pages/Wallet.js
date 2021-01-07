import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Wallet extends React.Component {
  render() {
    console.log(this.props);
    const { email } = this.props;
    return (
      <div>
        <header>
          <p data-testid="email-field">
            {email}
            {' '}
          </p>
          <p>Despesa Total: </p>
          <p data-testid="total-field">0</p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
      </div>);
  }
}
Wallet.propTypes = {
  email: PropTypes.string.isRequired,
};
const mapStateToProps = (state) => ({
  email: state.user.email,
});
export default connect(mapStateToProps)(Wallet);
