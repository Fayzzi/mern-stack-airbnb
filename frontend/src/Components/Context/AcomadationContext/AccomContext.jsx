// Updated Context and Reducer
// AcomContext.js
import { createContext, useReducer } from "react";

export const AcomContext = createContext();

const reducerfunc = (state, action) => {
  switch (action.type) {
    case "SHOWALL":
      return {
        Accomadations: action.payload,
      };

    case "DELETE":
      return {
        Accomadations: state.Accomadations.filter(
          (item) => item._id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export const AcomContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducerfunc, {
    Accomadations: [],
  });

  return (
    <AcomContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AcomContext.Provider>
  );
};
