import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { user } = this.props;
    return (
      <div className="App-header">
        <span data-testid="email-field">{user.email}</span>
        <div>
          <span data-testid="total-field">0</span>
          <span> </span>
          <span data-testid="header-currency-field">BRL</span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

Header.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Header);
