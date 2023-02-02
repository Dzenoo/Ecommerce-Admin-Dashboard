import React from "react";

import "./OrderItem.css";

const OrderItem = ({ orders }) => {
  return (
    <div className="order_item">
      {orders.map((order) => (
        <li key={order._id}>
          <h3>Informacije p kupcu</h3>
          <p>
            Id: <b>{order._id}</b>
          </p>
          <p>
            Ime: <b>{order.customer.name}</b>
          </p>
          <p>
            Prezime:<b>{order.customer.surname}</b>
          </p>
          <p>
            Grad:<b> {order.customer.city}</b>
          </p>
          <p>
            Drzava:<b>{order.customer.country}</b>
          </p>
          <p>
            Postanski broj: <b>{order.customer.postalcode}</b>
          </p>
          <p>
            Telefon: <b> {order.customer.phone}</b>
          </p>

          {order.items.product.map((item) => (
            <div key={item._id} className="order_product">
              <h3>Informacije o Porudzbini</h3>
              <p>
                Ime <b>{item.title}</b>
              </p>

              <p>
                Cena: <b>{item.price} DIN</b>
              </p>
              <p>
                Kolicina:<b> {item.quantity}</b>
              </p>
              <p>
                Velicina: <b>{item.option}</b>
              </p>
              <p>
                Ukupna cena: <b>{item.totalPrice} DIN</b>
              </p>

              <img
                src={`${process.env.REACT_APP_ASSETS_URL}/${item.image}`}
                alt={item.title}
              />
            </div>
          ))}
        </li>
      ))}
    </div>
  );
};

export default OrderItem;
