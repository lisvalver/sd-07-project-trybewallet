import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import login from '../actions/index';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      doneEmail: false,
      donePassword: false,
    };
    this.testEmail = this.testEmail.bind(this);
    this.testPassword = this.testPassword.bind(this);
  }

  testEmail(value) {
    const isValid = value.match(/^\w+@[a-zA-Z_]+?.[a-zA-Z]{2,3}$/);
    const { email } = this.props;
    if (isValid) {
      email(value);
      return this.setState({ email: value, doneEmail: true });
    }
    return this.setState({ email: value, doneEmail: false });
  }

  testPassword(value) {
    // const { donePassword } = this.state;
    const six = 6;
    if (value.length >= six) {
      return this.setState({ password: value, donePassword: true });
    }
    return this.setState({ password: value, donePassword: false });
  }

  render() {
    // console.log(this.props);
    const { email, password, doneEmail, donePassword } = this.state;
    // console.log(doneEmail)
    // console.log(donePassword)
    return (
      <div className="form">
        <label htmlFor="email">
          E-mail
          <input
            required
            id="email"
            type="email"
            placeholder="Digite seu e-mail"
            className="form-control"
            value={ email }
            data-testid="email-input"
            onChange={ (e) => this.testEmail(e.target.value) }
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            required
            id="password"
            type="password"
            name="password"
            placeholder="Digite sua senha"
            className="form-control"
            value={ password }
            data-testid="password-input"
            onChange={ (e) => this.testPassword(e.target.value) }
          />
        </label>
        <Link to="/carteira" data-testid="btn-login">
          <button
            id="entryButton"
            type="button"
            data-testid="button-login"
            className="button-login"
            disabled={ !donePassword || !doneEmail }
            onClick={ () => login(email) }
          >
            Entrar
          </button>
        </Link>
      </div>
    );
  }
}

function mapDispathToProps(dispath) {
  return {
    email(email) {
      const action = login(email);
      dispath(action);
    },
  };
}
Login.propTypes = {
  email: PropTypes.func.isRequired,
};

export default connect(null, mapDispathToProps)(Login);

// import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// import { login } from '../actions';
// // import './Login.css';
// class Login extends Component {
//   constructor() {
//     super();
//     this.testEmail = this.testEmail.bind(this);
//     this.testPassword = this.testPassword.bind(this);
//     this.state = {
//       email: '',
//       password: '',
//       doneEmail: false,
//       donePassword: false,
//     };
//   }
//   testEmail(value) {
//     const isValid = value.match(/^\w+@[a-zA-Z_]+?.[a-zA-Z]{2,3}$/);
//     const { email } = this.props;
//     if (isValid) {
//       email(value);
//       return this.setState({ email: value, doneEmail: true });
//     }
//     return this.setState({ email: value, doneEmail: false });
//   }
//   testPassword(value) {
//     // const { donePassword } = this.state;
//     const six = 6;
//     if (value.length >= six) {
//       return this.setState({ password: value, donePassword: true });
//     }
//     return this.setState({ password: value, donePassword: false });
//   }
//   render() {
//     const { email, password, doneEmail, donePassword } = this.state;
//     return (
//       <div className="main-content">
//         <h1 className="header">Trybe - WALLET</h1>
//         <label htmlFor="email" className="email">
//           Email:
//           <input
//             type="email"
//             required
//             value={ email }
//             onChange={ ({ target: { value } }) => this.testEmail(value) }
//             data-testid="email-input"
//             className="input-email"
//           />
//         </label>
//         <br />
//         <div className="separator" />
//         <label htmlFor="password" className="password">
//           Senha:
//           <input
//             type="password"
//             value={ password }
//             required
//             onChange={ ({ target: { value } }) => this.testPassword(value) }
//             data-testid="password-input"
//             className="input-password"
//           />
//         </label>
//         <br />
//         <Link to="/carteira">
//           <button
//             id="entryButton"
//             type="button"
//             data-testid="button-login"
//             className="button-login"
//             disabled={ !donePassword || !doneEmail }
//             onClick={ () => login(email) }
//           >
//             Entrar
//           </button>
//         </Link>
//       </div>
//     );
//   }
// }
// const mapDispatchToProps = (dispatch) => ({
//   email: (email) => dispatch(login(email)),
// });
// Login.propTypes = {
//   email: PropTypes.func.isRequired,
// };
// export default connect(null, mapDispatchToProps)(Login);
