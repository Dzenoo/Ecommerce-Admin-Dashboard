import React, { useContext } from "react";
import Button from "../../shared/components/Form/Button";
import { MainContext } from "../../shared/context/MainContext";

import "./OrderItem.css";

const OrderItem = ({ orders }) => {
  const main = useContext(MainContext);

  return (
    <div className="orders_section">
      {orders.map((order) => (
        <div key={order._id} className="naslovi">
          <Button danger onClick={() => main.deleteOrderHandler(order._id)}>
            Izbrisi
          </Button>
          <h3>Informacije o porudzbini</h3>
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
            <div key={item._id} className="product_info">
              <h3>Informacije o proizvodu</h3>
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
        </div>
      ))}
    </div>
  );
};

export default OrderItem;
