import React from 'react';
import {Store} from "redux";
import {Provider} from "react-redux";
import {BrowserRouter as Router} from 'react-router-dom';

import {ServicesCreator} from "../core/services/services-creator";
import {generateStore} from "../core/store";
import {ServiceContextProvider} from "../core/service-context";

import ErrorModal from "./error-modal/error-modal";
import Navigation from "./navigation/navigation";
import Routes from "./routes";

import {IInitialState} from "../core/store";

const App = () => {
  const store: Store<IInitialState, AppAction> = generateStore();
  let apiRequestConfig = {
    "baseURL": "https://api.github.com/",
    "headers": {
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
  }
  const services = ServicesCreator.createServices(apiRequestConfig);
  return (
    <Provider store={store}>
      <ServiceContextProvider value={services}>
        <Router>
          <ErrorModal />
          <Navigation/>
          <Routes/>
        </Router>
      </ServiceContextProvider>
    </Provider>
  );
};

export default App;
