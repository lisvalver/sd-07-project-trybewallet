import React from 'react';
import Form from '../Components/Login';
import '../App.css';
import Logo from '../images/logo.jpg';

class Login extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="left-content">
          <img src={ Logo } alt="Logo" className="logo" />
          <div className="welcome-msg">
            Welcome Back
            <p className="sub-title">
              Your wallet manager
            </p>
          </div>
          <Form />
        </div>
        <div className="right-content" />
      </div>
    );
  }
}

export default Login;
