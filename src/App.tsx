import React from "react";
import Router from "./routes/Router";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducers from "./modules/redux/reducers";
import api from "./modules/api";
import { logout } from "./modules/redux/actions";
import ToastContainer, { toast } from "./components/ToastContainer";

const store = createStore(reducers);

api.setAccessTokenFactory(() => store.getState().auth.accessToken || "");

api.errorStream.subscribe(code => {
  switch (code) {
    case 401:
      toast("Credenciales Invalidas", { type: "error" });
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

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router />
      <ToastContainer />
    </Provider>
  );
};

export default App;
