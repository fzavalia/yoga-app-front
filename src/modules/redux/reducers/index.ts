import { combineReducers } from "redux";
import { AuthActionTypes } from "../actions";
import { Route } from "../../../routes/routes";
import preLoginRoutes from "../../../routes/preLoginRoutes";
import postLoginRoutes from "../../../routes/postLoginRoutes";

export interface AuthState {
  isLoggedIn: boolean;
  user?: any;
  accessToken?: string;
  routes: Route[];
}

const persistedAccessToken = localStorage.getItem("at") || undefined;

const hasPersistedAccessToken = Boolean(persistedAccessToken);

const initialState: AuthState = {
  isLoggedIn: hasPersistedAccessToken,
  routes: hasPersistedAccessToken ? postLoginRoutes : preLoginRoutes,
  accessToken: persistedAccessToken
};

function authReducer(state = initialState, action: AuthActionTypes): AuthState {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("at", action.accessToken);
      return {
        isLoggedIn: true,
        accessToken: action.accessToken,
        routes: postLoginRoutes
      };
    case "LOGOUT":
      localStorage.removeItem("at");
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
