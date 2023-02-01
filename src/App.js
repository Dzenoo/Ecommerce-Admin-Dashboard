import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./shared/hooks/auth-hook";
import { AuthContext } from "./shared/context/AuthContext";

import Auth from "./auth/Auth";
import Products from "./products/pages/Products";
import Orders from "./orders/pages/Orders";
import Users from "./users/pages/Users";
import Dashboard from "./dashboard/Dashboard";
import Navigation from "./shared/components/navbar/Navigation";
import CreateProduct from "./products/pages/CreateProduct";
import UpdateProduct from "./products/pages/UpdateProduct";

import "./App.css";

function App() {
  const { token, userId, login, logout } = useAuth();
  const auth = useContext(AuthContext);

  let routes;
  if (token) {
    routes = (
      <>
        <Route path="/" element={<Dashboard />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:productId" element={<UpdateProduct />} />
        <Route path="/addproduct" element={<CreateProduct />} />
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
      {auth.isLoggedIn || <Navigation />}
      <main>
        <Routes>{routes}</Routes>
      </main>
    </AuthContext.Provider>
  );
}

export default App;
