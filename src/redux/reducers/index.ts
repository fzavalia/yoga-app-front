import { combineReducers } from "redux";
import { AuthActionTypes } from "../actions";
import { Route } from "../../routes/routes";
import preLoginRoutes from "../../routes/preLoginRoutes";
import postLoginRoutes from "../../routes/postLoginRoutes";

export interface AuthState {
  isLoggedIn: boolean;
  user?: any;
  accessToken?: string;
  routes: Route[];
}

const initialState: AuthState = {
  isLoggedIn: false,
  routes: preLoginRoutes
};

function authReducer(state = initialState, action: AuthActionTypes): AuthState {
  switch (action.type) {
    case "LOGIN":
      return {
        isLoggedIn: true,
        user: action.user,
        accessToken: action.accessToken,
        routes: postLoginRoutes
      };
    case "LOGOUT":
      return {
        isLoggedIn: false,
        routes: preLoginRoutes
      };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  auth: authReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
