import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { AiOutlineFolderAdd } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import { AiOutlineHome } from "react-icons/ai";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiOutlineShopping } from "react-icons/ai";
import "./Navigation.css";
import { AuthContext } from "../../context/AuthContext";

const Navigation = () => {
  const auth = useContext(AuthContext);

  return (
    <div className="sidebar__navigation">
      <div className="logo__section">
        <h1>Ambi Admin</h1>
      </div>

      <div className="navlinks__section">
        {auth.isLoggedIn && (
          <ul>
            <li>
              <NavLink to="/">
                <AiOutlineHome />
                Pocetna
              </NavLink>
            </li>
            <li>
              <NavLink to="/products">
                <AiOutlineShopping />
                Proizvodi
              </NavLink>
            </li>
            <li>
              <NavLink to="/addproduct">
                <AiOutlineFolderAdd />
                Dodaj Proizvod
              </NavLink>
            </li>
            <li>
              <NavLink to="/orders">
                <AiOutlineShoppingCart />
                Porudzbine
              </NavLink>
            </li>
            <li>
              <NavLink to="/users">
                <FiUsers />
                Korisnici
              </NavLink>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navigation;
