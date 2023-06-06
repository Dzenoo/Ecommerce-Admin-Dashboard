import React, { useContext } from "react";
import { MainContext } from "../../shared/context/MainContext";
import UserItem from "../components/UserItem";
const Users = () => {
  const main = useContext(MainContext);
  return (
    <div className="user_wrapper">
    
       <UserItem user={main.users} />
    </div>
  );
};

export default Users;
