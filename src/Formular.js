import React from "react";

const initialState = {
  username: "",
  description: "",
  biography: ""
};

const FormContext = React.createContext();

const formReducer = (state, action) => {
  switch (action.type) {
    case "updateForm":
      return {
        ...state,
        username: action.username,
        description: action.description,
        biography: action.biography
      };

    case "resetForm":
      return {
        ...state,
        username: "",
        description: "",
        biography: ""
      };
    default:
      return state;
  }
};

export const FormContextProvider = ({ children }) => {
  const [formState, formDispatch] = React.useReducer(formReducer, initialState);

  const value = [formState, formDispatch];

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};

// Form useContext that checks for Errors

export const useFormContext = () => {
  const formContext = React.useContext(FormContext);
  if (formContext === undefined) {
    throw new Error("useContext has to be used inside of a Context Provider");
  }
  return formContext;
};

// importable helpers like facebook does

const updateUser = (formGlobalState, formLocalState) => {
  return { ...formGlobalState, ...formLocalState };
};

const onSubmiting = (dispatch, updateResult) =>
  dispatch({ type: "updateForm", ...updateResult });
const onReseting = (dispatch) => dispatch({ type: "resetForm" });

// Component Formular

const Formular = () => {
  // form global Context
  const [formState, formDispatch] = useFormContext();

  // form local state management
  const [localState, setLocalState] = React.useState(formState);

  const handleChange = (e) => {
    e.preventDefault();
    setLocalState({ ...localState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updateResult = updateUser(formState, localState);
    onSubmiting(formDispatch, updateResult);
  };

  const handleReset = (e) => {
    e.preventDefault();

    console.log("reseting");
    onReseting(formDispatch);
  };

  return (
    <>
      <h1>Formular</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>userName:</label>
          <input
            onChange={(e) => handleChange(e)}
            name="username"
            value={localState.username}
          ></input>
        </div>
        <div>
          <label>description:</label>
          <textarea
            onChange={(e) => handleChange(e)}
            name="description"
            value={localState.description}
          ></textarea>
        </div>
        <div>
          <label>Biography:</label>
          <textarea
            onChange={(e) => handleChange(e)}
            name="biography"
            value={localState.biography}
          ></textarea>
        </div>
        <button>Submit</button>
        <button onClick={handleReset}>Reset</button>
      </form>
    </>
  );
};

export { Formular };
