import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./shared/hooks/auth-hook";
import { AuthContext } from "./shared/context/AuthContext";

import Auth from "./auth/Auth";
import Products from "./products/pages/Products";
import Orders from "./orders/pages/Orders";
import Users from "./users/pages/Users";
import Dashboard from "./Dashboard/Dashboard";
import Navigation from "./shared/navbar/Navigation";

import "./App.css";

function App() {
  const { token, userId, login, logout } = useAuth();

  let routes;
  if (token) {
    routes = (
      <>
        <Route path="/" element={<Dashboard />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/products" element={<Products />} />
        <Route path="/users" element={<Users />} />
        <Route path="*" element={<Navigate to="/" />} />
      </>
    );
  } else {
    routes = (
      <>
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<Navigate to="/auth" />} />
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
      <section className="main_section">
        <Navigation />
        <main>
          <Routes>{routes}</Routes>
        </main>
      </section>
    </AuthContext.Provider>
  );
}

export default App;
