import React from 'react';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { name } = this.props;
    return (
      <form>
        <header data-testid="email-field">
          { name }
        </header>
      </form>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Header;
