import * as React from "react";
import { useHttpClient } from "../hooks/http-hook";

export const MainContext = React.createContext();

export function MainProvider({ children }) {
  const { sendRequest, isLoading, error, clearError } = useHttpClient();
  const [orders, setOrders] = React.useState([]);
  const [users, setUsers] = React.useState([]);

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

  return (
    <MainContext.Provider value={{ orders, users }}>
      {children}
    </MainContext.Provider>
  );
}
