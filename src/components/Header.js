import React from 'react';

class Header extends React.Component {
  render() {
    const { user } = this.props;
    return (
      <div>
        <header data-testid="email-field">
          Email: { user }
        </header>
      </div>
    );
  }
}

export default Header;
