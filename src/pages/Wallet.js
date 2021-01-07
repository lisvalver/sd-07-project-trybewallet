import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { Redirect } from 'react-router-dom';
// import { wallet } from '../actions';

class Wallet extends React.Component {
  render() {
    const { userEmail } = this.props;
    return (
      <div>
        <header>
          <div data-testid="email-field">{ userEmail }</div>
          <div data-testid="total-field">0</div>
          <div data-testid="header-currency-field">BRL</div>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userIsLogged: state.user.logged,
  userEmail: state.user.email,
});

// const mapDispatchToProps = (dispatch) => ({
//   userLogin: (email) => dispatch(login(email)),
// });

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
//   userLogin: PropTypes.func.isRequired,
//   userIsLogged: PropTypes.bool.isRequired,
  userEmail: PropTypes.string.isRequired,
};
