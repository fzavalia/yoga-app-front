import React, { Component } from "react";
import {
  InputName,
  InputContainer
} from "../../components/FormBuilder/FormBuilder";
import Input from "../../components/FormBuilder/Input";
import Button from "../../components/Button";
import helpers from "../../helpers";
import api from "../../modules/api";
import Paper from "../../components/Paper";
import { login, LoginAction } from "../../redux/actions";
import { connect } from "react-redux";

class Login extends Component<{
  login: (user: any, accessToken: string) => LoginAction;
}> {
  state = {
    email: "",
    password: ""
  };

  loginButtonRef = React.createRef<HTMLDivElement>();

  render() {
    return (
      <Paper
        style={{ width: "100%", maxWidth: 500, alignSelf: "center" }}
        onKeyDown={e => {
          if (e.key === "Enter" && this.loginButtonRef.current) {
            this.loginButtonRef.current.click();
          }
        }}
      >
        <p>Ingrese sus datos para loguearse a la plataforma</p>
        <form onSubmit={e => e.preventDefault()}>
          <InputContainer>
            <InputName>Email</InputName>
            <Input
              name="email"
              type="text"
              onChange={(_, value) => this.setState({ email: value })}
              value={this.state.email}
              autoComplete="username"
            />
          </InputContainer>
          <InputContainer>
            <InputName>Contraseña</InputName>
            <Input
              name="password"
              type="password"
              onChange={(_, value) => this.setState({ password: value })}
              value={this.state.password}
              autoComplete="current-password"
            />
          </InputContainer>
          <Button
            ref={this.loginButtonRef}
            colors={{ main: helpers.color.secondary }}
            onClick={() => {
              api.auth
                .login(this.state.email, this.state.password)
                .then(x => this.props.login(x.user, x.accessToken));
            }}
          >
            Ingresar
          </Button>
        </form>
      </Paper>
    );
  }
}

export default connect(
  null,
  dispatch => ({
    login: (user: any, accessToken: string) =>
      dispatch(login(user, accessToken))
  })
)(Login);
