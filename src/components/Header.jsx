import React from 'react';

class Header extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {

    return(
      <header>
        <div>
          <p>
            Email:
            <span data-testid="email-field">
              
            </span>
          </p>
          <p>
            Despesa Total:
            <span>
              
            </span>
            <span>
              
            </span>
          </p>
        </div>
      </header>
    );
  }
}
