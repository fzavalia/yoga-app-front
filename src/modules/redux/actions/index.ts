export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export interface LoginAction {
  type: typeof LOGIN;
  accessToken: string;
}

export interface LogoutAction {
  type: typeof LOGOUT;
}

export type AuthActionTypes = LoginAction | LogoutAction;

export function login(accessToken: string): LoginAction {
  return {
    type: LOGIN,
    accessToken
  };
}

export function logout(): LogoutAction {
  return {
    type: LOGOUT
  };
}
