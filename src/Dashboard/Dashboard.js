import React, { useEffect, useState } from "react";
import { useHttpClient } from "../shared/hooks/http-hook";

import priceIcon from "../shared/assets/1.png";
import orderIcon from "../shared/assets/2.png";
import productIcon from "../shared/assets/3.png";

import "./Dashboard.css";

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const { sendRequest, isLoading, error, clearError } = useHttpClient();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/orders`
        );
        setOrders(responseData.orders);
      } catch (err) {}
    };
    fetchOrders();
  }, [sendRequest]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users`
        );
        setUsers(responseData.users);
      } catch (err) {}
    };
    fetchUsers();
  }, [sendRequest]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/products`
        );
        setProducts(responseData.products);
      } catch (err) {}
    };
    fetchProducts();
  }, [sendRequest]);

  return (
    <>
      <div className="dashboard_hero">
        <h1>Dashboard</h1>
      </div>
      <div className="dashboard_wrapper">
        <div className="card price_item">
          <img src={orderIcon} alt="price" />
          <div className="menu">
            <p>Ukupno porudzbina</p>
            <h2>{orders.length}</h2>
          </div>
        </div>
        <div className="card productt_item">
          <img src={priceIcon} alt="price" />
          <div className="menu">
            <p>Ukupno proizvoda</p>
            <h2>{products.length}</h2>
          </div>
        </div>
        <div className="card user_item">
          <img src={productIcon} alt="price" />
          <div className="menu">
            <p>Ukupno korisnika</p>
            <h2>{users.length}</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
