import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { userEmail } = this.props;
    return (
      <div>
        <div data-testid="email-field">{ userEmail }</div>
        <div data-testid="total-field">0</div>
        <div data-testid="header-currency-field">BRL</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
};
