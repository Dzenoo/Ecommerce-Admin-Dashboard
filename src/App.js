import React from "react";
import { Route, Routes } from "react-router-dom";

import Auth from "./auth/Auth";
import Products from "./products/pages/Products";
import Orders from "./orders/pages/Orders";
import Users from "./users/pages/Users";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/orders" element={<Products />} />
        <Route path="/products" element={<Orders />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </div>
  );
}

export default App;
