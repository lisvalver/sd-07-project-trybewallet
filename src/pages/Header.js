import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { userEmail, totalSum = 0 } = this.props;
    return (
      <div>
        <p data-testid="email-field">{ userEmail }</p>
        <p data-testid="total-field">{ totalSum.toString() }</p>
        <p data-testid="header-currency-field">BRL</p>
      </div>
    );
  }
}

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
  totalSum: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  totalSum: state.wallet.total,
});

export default connect(mapStateToProps)(Header);
