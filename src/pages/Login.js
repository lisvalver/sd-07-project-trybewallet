import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { addUser } from '../actions';
// import addUser from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      validated: false,
      emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      maximiumLength: 6,
    };
  }

  // verifyFields(event) {
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   const maximiumLength = 6;
  //   const { email, password } = this.state;
  //   if (emailRegex.test(email) && password.length >= maximiumLength) {
  //     this.setState({ validated: true });
  //     this.emailStore();
  //     // saveData(email, password);
  //   } else {
  //     this.setState({ validated: false });
  //   }
  // }

  updateEmail(value) {
    this.setState({
      email: value,
    });
  }

  updatePassword(value) {
    this.setState({
      password: value,
    });
  }

  emailStore() {
    const { email } = this.state;
    const { handleLogin } = this.props;
    this.setState({ validated: true });
    handleLogin(email);
  }

  render() {
    const { validated, emailRegex, maximiumLength, email, password } = this.state;
    if (validated) return <Redirect to="/carteira" />;
    return (
      <div>
        <form>
          <input
            type="text"
            data-testid="email-input"
            onChange={ (event) => this.updateEmail(event.target.value) }
          />
          <input
            type="password"
            data-testid="password-input"
            onChange={ (event) => this.updatePassword(event.target.value) }
          />
          <button
            disabled={ emailRegex.test(email)
              && password.length >= maximiumLength ? '' : 'disabled' }
            onClick={ () => this.emailStore() }
            type="submit"
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

// function dispatcher(dispatch) {
//   return {
//     saveData: (email, password) => dispatch(addUser(email, password)),
//   };
// }

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};

// export default connect(null, dispatcher)(Login);
const mapDispatchToProps = (dispatch) => ({
  handleLogin: (email) => dispatch(addUser(email)),
});

export default connect(null, mapDispatchToProps)(Login);
