import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Header = (props) => {
  const { email } = props;
  return (
    <header>
      <div>
        <h1 data-testid="email-field">{email}</h1>
        <p data-testid="total-field"> 0 </p>
        <p data-testid="header-currency-field"> BRL </p>
      </div>
    </header>
  );
};

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
