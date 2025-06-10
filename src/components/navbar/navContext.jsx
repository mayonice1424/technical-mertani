/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from 'react';

const NavContext = createContext();

export const NavProvider = ({ children }) => {
  const [nav, setNav] = useState(false);

  return (
    <NavContext.Provider value={{ nav, setNav }}>
      {children}
    </NavContext.Provider>
  );
}

export const useNav = () => {
  return useContext(NavContext);
};
