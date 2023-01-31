import React from "react";

export const AuthContext = React.createContext({
  token: null,
  userId: null,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});
