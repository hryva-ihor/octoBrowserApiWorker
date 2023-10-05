import React, { createContext, useMemo, useState } from "react";
import { useSelector } from "react-redux";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const { email, token, id } = useSelector((state) => state.user);
  const value = { email, token, id };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider };
