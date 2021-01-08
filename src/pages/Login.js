import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addEmail } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      validate: true,
    };
    this.handleChanger = this.handleChanger.bind(this);
    this.validate = this.validate.bind(this);
  }

  validate() {
    const { email, password } = this.state;
    const minNumber = 5;
    if (email.match(/\S+@\S+\.\S+/) && password.length > minNumber) {
      this.setState({ validate: false });
    } else {
      this.setState({ validate: true });
    }
  }

  handleChanger({ target: { name, value } }) {
    this.setState({ [name]: value }, this.validate);
  }

  render() {
    const { email, password, validate } = this.state;
    // eslint-disable-next-line react/prop-types
    const { addEmailSave } = this.props;
    return (
      <div>
        <input
          data-testid="email-input"
          type="email"
          name="email"
          value={ email }
          onChange={ (event) => this.handleChanger(event) }
        />
        <input
          data-testid="password-input"
          type="text"
          name="password"
          value={ password }
          onChange={ (event) => this.handleChanger(event) }
        />
        <Link to="carteira">
          <input
            type="button"
            value="Entrar"
            disabled={ validate }
            onClick={ () => addEmailSave(email) }
          />
        </Link>
      </div>);
  }
}

const mapDispatchToProps = (dispatch) => ({
  addEmailSave: (email) => dispatch(addEmail(email)),
});

Login.propTypes = {
  addEmailSave: PropTypes.shape({
    addEmailSave: PropTypes.string.isRequired,
  }).isRequired,
};
export default connect(null, mapDispatchToProps)(Login);
