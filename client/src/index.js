import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";
import { Provider } from "react-redux"; //Will keep track of global store/state and that allows us to access that store from anywhere inside the app
import reducers from "./reducers";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

const store = createStore(reducers, compose(applyMiddleware(thunk)));

const theme = createTheme();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="666191404237-opc995m98pjfq90lrdrjjsf9d2quqavd.apps.googleusercontent.com">
      <ThemeProvider theme={theme}>
        <StyledEngineProvider injectFirst>
          <Provider store={store}>
            <App theme={theme} />
          </Provider>
        </StyledEngineProvider>
      </ThemeProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
