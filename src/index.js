import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
// this provider function of react-redux library let you access the 'store'(which stores all the states) and "Reducers".
// Three libraries are needed to use react: redux, redux-logger,react-redux.
// Above can be installed with npm in terminal

import { PersistGate } from "redux-persist/integration/react"; // Just like above "Provider" this lets you access "persisted" store which is contained in "persistor" variable below. This will be rendered as a component below and passing the persisted store or "persistor" variable that we have defined as a prop. This needs to wrap <App /> component otherwise will not work. This finally stores the reducers or the states in persist storage.
import { store, persistor } from "../src/components/redux/store";
ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
