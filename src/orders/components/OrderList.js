import React from "react";

import OrderItem from "./OrderItem";

const OrderList = ({ orders }) => {
  return (
    <div className="order_list">
      <OrderItem orders={orders} />
    </div>
  );
};

export default OrderList;
