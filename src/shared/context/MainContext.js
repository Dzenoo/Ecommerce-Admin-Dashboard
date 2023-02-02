import * as React from "react";
import { useHttpClient } from "../hooks/http-hook";
import { AuthContext } from "../context/AuthContext";

export const MainContext = React.createContext();

export function MainProvider({ children }) {
  const { sendRequest, isLoading, error, clearError } = useHttpClient();
  const [orders, setOrders] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const auth = React.useContext(AuthContext);

  // Fetch Orders
  React.useEffect(() => {
    const fetchOrders = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/orders`
        );
        setOrders(responseData.orders);
      } catch (err) {}
    };
    fetchOrders();
  }, []);

  // Fetch Users
  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users`
        );
        setUsers(responseData.users);
      } catch (err) {}
    };
    fetchUsers();
  }, []);

  const deleteOrderHandler = async (enteredId) => {
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/orders/${enteredId}`,
        "DELETE",
        null,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
    } catch (err) {}
    onDelete(enteredId);
  };

  const onDelete = (enteredId) => {
    setOrders((prevOrders) => prevOrders.filter((o) => o._id !== enteredId));
  };

  return (
    <MainContext.Provider value={{ orders, users, deleteOrderHandler }}>
      {children}
    </MainContext.Provider>
  );
}
