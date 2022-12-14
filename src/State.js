import React, { createContext,useState } from "react";
export const  StateContext = createContext();

const StateProvider = ({ children }) => {
    const [fetchState, setfetchSate] = useState(false);
   
    return (
      <StateContext.Provider value={{ fetchState, setfetchSate }}>
        {children}
      </StateContext.Provider>
    );
  };

  export default StateProvider;