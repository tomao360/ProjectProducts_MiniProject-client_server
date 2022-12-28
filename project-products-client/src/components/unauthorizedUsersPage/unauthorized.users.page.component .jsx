import React from "react";

import { useAuth0 } from "@auth0/auth0-react";
import shop from "../../images/online-shopping.png";

import "./style.css";

export const UnauthorizedUsersPage = (props) => {
  const { loginWithRedirect } = useAuth0();
  return (
    <div className="container-main">
      <div>
        <img className="cart-img" src={shop} alt="Shop" />
      </div>
      <h1>Northwind Products</h1>
      <div>
        <button
          className="btn btn-secondary"
          onClick={() => loginWithRedirect("http://localhost:3000")}
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};
