import React from 'react';

class Login extends React.Component {
  constructor () {
    super();
    
  }
  
  render() {
    return (
      <div>
        <form>
          <input type="text" data-testid="email-input" />
          <input type="password" data-testid="password-input" />
          <button>Entrar</button>
        </form>
      </div>
    );
  }
}

export default Login;
