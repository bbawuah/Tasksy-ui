import React, { createContext, useReducer } from "react";
import Reducer from "./Reducer";

// properties van de state
const initialState = {
  user: [],
  tasks: [],
  avatar: [],
  login: false,
  error: null,
};

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  /*
    Zorg ervoor dat de Store bereikbaar is door de gehele applicatie
    
    */
  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export const Context = createContext(initialState);
export default Store;
