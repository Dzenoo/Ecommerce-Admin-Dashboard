import React from "react";

export const AuthContext = React.createContext({
  token: null,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});
