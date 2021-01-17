import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Header = (props) => {
  const { email, sum } = props;
  return (
    <header>
      <div>
        <h1 data-testid="email-field">
          Email:
          {email}
        </h1>
        <p value="187.12" data-testid="total-field">
          0
          {parseFloat(sum).toFixed(2)}
        </p>
        <p data-testid="header-currency-field"> BRL </p>
      </div>
    </header>
  );
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  sum: state.wallet.sum,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  sum: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
