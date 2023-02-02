import React from "react";

import "./UserItem.css";

const UserItem = ({ user }) => {
  return (
    <ul className="users_list">
      {user.map((u) => (
        <li className="user_item" key={u.id}>
          <h1>{u.name}</h1>
          <p>Email: {u.email}</p>
          <span>Id: {u.id}</span>
        </li>
      ))}
    </ul>
  );
};

export default UserItem;
