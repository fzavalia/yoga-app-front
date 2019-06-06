import React from "react";
import Router from "./routes/Router";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducers from "./redux/reducers";
import api from "./modules/api";
import { logout } from "./redux/actions";

const store = createStore(reducers);

api.setAccessTokenFactory(() => store.getState().auth.accessToken || "");

api.errorStream.subscribe(code => {
  if (code === 401) {
    store.dispatch(logout());
  }
});

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
};

export default App;
