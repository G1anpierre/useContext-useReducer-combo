import "./styles.css";
import React from "react";
import { Formular, FormContextProvider, useFormContext } from "./Formular";

const initialState = {
  isLogged: false,
  username: "",
  lastname: ""
};

const AuthenticateContext = React.createContext();

const AuthenticateReducer = (state, action) => {
  switch (action.type) {
    case "LogIn":
      return {
        ...state,
        isLogged: true,
        username: action.name,
        lastname: action.lastname
      };
    case "LogOut":
      return {
        ...state,
        isLogged: false,
        username: "",
        lastname: ""
      };
    default:
      return state;
  }
};

export const AuthenticateContextProvider = ({ children }) => {
  const [globalState, GlobalDispatch] = React.useReducer(
    AuthenticateReducer,
    initialState
  );

  const value = [globalState, GlobalDispatch];

  return (
    <AuthenticateContext.Provider value={value}>
      {children}
    </AuthenticateContext.Provider>
  );
};

const logmein = (dispatch) => {
  return dispatch({ type: "LogIn", name: "Gianpierre", lastname: "Fernandez" });
};
const logmeout = (dispatch) => {
  return dispatch({ type: "LogOut" });
};

const useContextWithError = () => {
  const useAuthenticateContext = React.useContext(AuthenticateContext);
  if (useAuthenticateContext === undefined) {
    throw new Error(`useCounter must be used within a CounterProvider`);
  }
  return useAuthenticateContext;
};

function UserDataDisplay() {
  const [formState] = useFormContext();
  console.log("formState", formState);
  return <pre>{JSON.stringify(formState, null, 2)}</pre>;
}

export function App() {
  const useAthenticateContext = useContextWithError(AuthenticateContext);
  const [globalState, GlobalDispatch] = useAthenticateContext;

  return (
    <div className="App">
      <AuthenticateContextProvider>
        <FormContextProvider>
          <h1>Hello CodeSandbox</h1>
          <h2>Start editing to see some magic happen!</h2>
          {globalState.isLogged ? (
            <button onClick={() => logmeout(GlobalDispatch)}>LogOut</button>
          ) : (
            <button onClick={() => logmein(GlobalDispatch)}>Login</button>
          )}
          <Formular />
          <UserDataDisplay />
        </FormContextProvider>
      </AuthenticateContextProvider>
    </div>
  );
}
