import { StrictMode } from "react";
import ReactDOM from "react-dom";

import { App, AuthenticateContextProvider } from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <AuthenticateContextProvider>
      <App />
    </AuthenticateContextProvider>
  </StrictMode>,
  rootElement
);
