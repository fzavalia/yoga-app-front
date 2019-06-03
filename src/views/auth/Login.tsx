import React, { useState, useRef } from "react";
import {
  InputName,
  InputContainer
} from "../../components/FormBuilder/FormBuilder";
import Input from "../../components/FormBuilder/Input";
import Button from "../../components/Button";
import helpers from "../../helpers";
import api from "../../modules/api";

const Login = () => {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const loginButtonRef = useRef<HTMLDivElement>(null);

  return (
    <div
      style={{
        height: "calc(100vh - 2rem)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
      }}
    >
      <div
        style={{ width: "100%", maxWidth: 500, alignSelf: "center" }}
        onKeyDown={e => {
          if (e.key === "Enter" && loginButtonRef.current) {
            loginButtonRef.current.click();
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
              onChange={(_, value) => setEmail(value)}
              value={email}
              autoComplete='username'
            />
          </InputContainer>
          <InputContainer>
            <InputName>Contraseña</InputName>
            <Input
              name="password"
              type="password"
              onChange={(_, value) => setPassword(value)}
              value={password}
              autoComplete='current-password'
            />
          </InputContainer>
          <Button
            ref={loginButtonRef}
            style={{ float: "right" }}
            colors={{ main: helpers.color.secondary }}
            onClick={() => {
              api.auth.login(email, password).then(console.log);
            }}
          >
            Ingresar
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
