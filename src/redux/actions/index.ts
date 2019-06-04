export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export interface LoginAction {
  type: typeof LOGIN;
  user: any;
  accessToken: string;
}

export interface LogoutAction {
  type: typeof LOGOUT;
}

export type AuthActionTypes = LoginAction | LogoutAction;

export function login(user: any, accessToken: string): LoginAction {
  return {
    type: LOGIN,
    user,
    accessToken
  };
}

export function logout(): LogoutAction {
  return {
    type: LOGOUT
  };
}
