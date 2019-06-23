import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import Router from "./routes/Router";
import reducers from "./modules/redux/reducers";
import api from "./modules/api";
import { logout, startLoading, stopLoading } from "./modules/redux/actions";
import ToastContainer, { toast } from "./components/ToastContainer";

// Date Picker styles
import "react-datepicker/dist/react-datepicker.css";

// React Table styles
import "react-table/react-table.css";
import Loading from "./components/Loading";

// Redux store
const store = createStore(reducers);

// Api obtains the access token from the redux store
api.setAccessTokenFactory(() => store.getState().auth.accessToken || "");

// When any request to api fails, display a toast with a message according to the response status
api.errorStream.subscribe(code => {
  switch (code) {
    case 401:
      toast("Credenciales Invalidas", { type: "error" });
      // This code is returned also when the access token is invalid. In that case, logout the user to return to the login screen
      store.dispatch(logout());
      break;
    case 422:
      toast("Los datos provistos no son validos", { type: "error" });
      break;
    case 403:
      toast("No esta autorizado para realizar esa acción", { type: "error" });
      break;
    case 500:
      toast("Error del servidor", { type: "error" });
      break;
    default:
      toast("Error desconocido", { type: "error" });
      break;
  }
});

// Show loading component when requests are made

api.requestStartedStream.subscribe(() => store.dispatch(startLoading()))

api.requestEndedStream.subscribe(() => store.dispatch(stopLoading()))

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router />
      <Loading />
      <ToastContainer />
    </Provider>
  );
};

export default App;
