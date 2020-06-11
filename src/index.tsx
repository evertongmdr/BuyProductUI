import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/redux/index";

import { FormProvider } from "./contexts/formType";
import { AuthProvider } from "./contexts/auth";

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <FormProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </FormProvider>
    </BrowserRouter>
  </Provider>
);
ReactDOM.render(app, document.getElementById("root"));
