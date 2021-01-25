import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { changeEmail, changePassword } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      checkedDatas: true,
      password: '',
    };
    this.activateButton = this.activateButton.bind(this);
    this.sendData = this.sendData.bind(this);
    this.handlerInputs = this.handlerInputs.bind(this);
  }

  sendData(e) {
    e.preventDefault();
    const { email, password } = this.state;
    const { history, changeEmailUser, changePasswordUser } = this.props;
    changeEmailUser(email);
    changePasswordUser(password);
    history.push('/carteira');
  }

  activateButton() {
    const { email, password } = this.state;
    const qtdCaracteres = 6;
    const emailRegex = /[\w.-]+@[\w-]+\.[\w-.]+/gi;
    const checkedEmail = emailRegex.test(email);
    const checkedPassword = password.length >= qtdCaracteres;

    if (checkedEmail && checkedPassword) {
      this.setState({ checkedDatas: false });
    } else {
      this.setState({ checkedDatas: true });
    }
  }

  handlerInputs({ target }) {
    const { value, name } = target;
    this.setState({ [name]: value }, () => {
      this.activateButton();
    });
  }

  render() {
    const { email, password, checkedDatas } = this.state;
    return (
      <div>
        <input
          type="email"
          placeholder="user@trybe.com"
          value={ email }
          name="email"
          onChange={ this.handlerInputs }
          data-testid="email-input"
        />
        <input
          type="password"
          placeholder="senha"
          value={ password }
          name="password"
          onChange={ this.handlerInputs }
          data-testid="password-input"
        />
        <button
          type="button"
          onClick={ (e) => this.sendData(e) }
          disabled={ checkedDatas }
        >
          Entrar
        </button>
      </div>);
  }
}

const mapDispatchToProps = (dispatch) => ({
  changeEmailUser: (email) => dispatch(changeEmail(email)),
  changePasswordUser: (password) => dispatch(changePassword(password)),
});

const mapStateToProps = (state) => ({
  email: state.user.email,
  password: state.user.password,
});

Login.propTypes = {
  changeEmailUser: PropTypes.func.isRequired,
  changePasswordUser: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
