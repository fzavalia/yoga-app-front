import { combineReducers } from "redux";
import { AuthActionTypes, LoadingActionTypes } from "../actions";
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

interface LoadingState {
  isLoading: boolean;
  loadingStack: number;
}

const loadingInitialState: LoadingState = {
  isLoading: false,
  loadingStack: 0
};

function loadingReducer(
  state = loadingInitialState,
  action: LoadingActionTypes
): LoadingState {
  switch (action.type) {
    case "START_LOADING":
      return {
        isLoading: true,
        loadingStack: state.loadingStack + 1
      };
    case "STOP_LOADING":
      return {
        isLoading: state.loadingStack - 1 > 0,
        loadingStack: state.loadingStack - 1
      };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  auth: authReducer,
  loading: loadingReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
