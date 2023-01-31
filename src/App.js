import React from "react";
import { Route, Routes } from "react-router-dom";
import { useAuth } from "./shared/hooks/auth-hook";
import { AuthContext } from "./shared/context/AuthContext";

import Auth from "./auth/Auth";
import Products from "./products/pages/Products";
import Orders from "./orders/pages/Orders";
import Users from "./users/pages/Users";

function App() {
  const { token, userId, login, logout } = useAuth();

  let routes;

  if (token) {
    routes = (
      <>
        <Route path="/orders" element={<Orders />} />
        <Route path="/products" element={<Products />} />
        <Route path="/users" element={<Users />} />
      </>
    );
  } else {
    routes = (
      <>
        <Route path="/auth" element={<Auth />} />
      </>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        token: token,
        isLoggedIn: !!token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <main>
        <Routes>{routes}</Routes>
      </main>
    </AuthContext.Provider>
  );
}

export default App;
