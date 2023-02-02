import React, { useContext } from "react";
import { MainContext } from "../../shared/context/MainContext";
import OrderItem from "../components/OrderItem";

const Orders = () => {
  const main = useContext(MainContext);

  return (
    <div className="order_wrapper">
      <OrderItem orders={main.orders} />
    </div>
  );
};

export default Orders;
