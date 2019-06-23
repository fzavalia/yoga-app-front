// Auth

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

// Loading

export const START_LOADING = "START_LOADING";
export const STOP_LOADING = "STOP_LOADING";

export interface StartLoadingAction {
  type: typeof START_LOADING;
}

export interface StopLoadingAction {
  type: typeof STOP_LOADING;
}

export type LoadingActionTypes = StartLoadingAction | StopLoadingAction;

export function startLoading(): StartLoadingAction {
  return {
    type: START_LOADING
  };
}

export function stopLoading(): StopLoadingAction {
  return {
    type: STOP_LOADING
  };
}
