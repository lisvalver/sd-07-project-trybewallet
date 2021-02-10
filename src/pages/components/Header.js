import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { email } = this.props;
    return (
      <>
        <p>
          Email:
          {' '}
          <span data-testid="email-field">{email}</span>
        </p>
        <p>
          Despesa Total:
          {' '}
          <span data-testid="total-field">0</span>
          {' '}
        </p>
        <span data-testid="header-currency-field">BRL</span>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  email: PropTypes.string.isRequired,
};
