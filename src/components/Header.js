import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { email } = this.props;
    const INITIAL_EXPENSES = 0;
    return (
      <div>
        <div data-testid="email-field">{ email }</div>
        <div data-testid="total-field">{ INITIAL_EXPENSES }</div>
        <div data-testid="header-currency-field">BRL</div>
      </div>
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
