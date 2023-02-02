import React, { useContext } from "react";
import { MainContext } from "../../shared/context/MainContext";
import OrderList from "../components/OrderList";

const Orders = () => {
  const main = useContext(MainContext);

  return (
    <div className="order_wrapper">
      <OrderList orders={main.orders} />
    </div>
  );
};

export default Orders;
