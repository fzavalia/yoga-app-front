import React from "react";
import Router from "./routes/Router";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducers from "./redux/reducers";

export const store = createStore(reducers);

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
};

export default App;
